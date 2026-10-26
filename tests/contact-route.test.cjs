const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");
const { NextRequest } = require("next/server");

const source = fs.readFileSync(
  path.join(__dirname, "../src/app/api/contact/route.ts"),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;

const validMessage = {
  name: "  Test Person  ",
  email: " person@example.com ",
  message: "  A test inquiry about a project.  ",
  hp: "",
};

function createRoute({ missingConfiguration = false, sendError, throws = false } = {}) {
  const sent = [];
  const logs = [];
  let time = 100_000;
  const module = { exports: {} };
  vm.runInNewContext(compiled, {
    exports: module.exports,
    require(name) {
      if (name === "resend") {
        return {
          Resend: class {
            emails = {
              async send(message) {
                sent.push(message);
                if (throws) throw new Error("provider-private-details");
                return { error: sendError ?? null };
              },
            };
          },
        };
      }
      return require(name);
    },
    process: {
      env: missingConfiguration ? {} : {
        RESEND_API_KEY: "test-private-key",
        CONTACT_FROM: "sender@example.com",
        CONTACT_TO: "recipient@example.com",
      },
    },
    Date: { now: () => time },
    console: { error: (...args) => logs.push(args), log: (...args) => logs.push(args) },
  });
  return {
    sent,
    logs,
    advanceTime: (milliseconds) => { time += milliseconds; },
    post(payload, headers = {}) {
      return module.exports.POST(new NextRequest("http://localhost/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json", ...headers },
        body: typeof payload === "string" ? payload : JSON.stringify(payload),
      }));
    },
  };
}

test("valid submissions are normalized and passed to the email provider", async () => {
  const route = createRoute();
  const response = await route.post(validMessage);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(route.sent.length, 1);
  assert.equal(route.sent[0].replyTo, "person@example.com");
  assert.equal(route.sent[0].subject, "New portfolio inquiry — Test Person");
  assert.ok(route.sent[0].text.includes("Message:\nA test inquiry about a project.\n"));
  assert.deepEqual(route.logs, []);
});

test("invalid fields return errors without contacting the provider", async () => {
  const route = createRoute();
  const response = await route.post({ name: " ", email: "invalid", message: "short" });
  const result = await response.json();
  assert.equal(response.status, 400);
  assert.deepEqual(Object.keys(result.errors).sort(), ["email", "message", "name"]);
  assert.equal(route.sent.length, 0);
});

test("malformed JSON returns a useful client error", async () => {
  const route = createRoute();
  const response = await route.post("{not-json");
  assert.equal(response.status, 400);
  assert.equal(typeof (await response.json()).error, "string");
  assert.equal(route.sent.length, 0);
});

test("oversized requests are rejected before sending", async () => {
  const route = createRoute();
  const response = await route.post("x".repeat(16_385));
  assert.equal(response.status, 413);
  assert.equal(route.sent.length, 0);
});

test("honeypot submissions do not deliver email", async () => {
  const route = createRoute();
  const response = await route.post({ ...validMessage, hp: "https://spam.example" });
  assert.equal(response.status, 200);
  assert.equal(route.sent.length, 0);
});

test("missing configuration returns 503 without exposing secrets", async () => {
  const route = createRoute({ missingConfiguration: true });
  const response = await route.post(validMessage);
  assert.equal(response.status, 503);
  assert.ok((await response.json()).error.includes("email me directly"));
  assert.equal(route.sent.length, 0);
});

test("provider failures return safe messages", async () => {
  const route = createRoute({ sendError: { message: "provider-private-details" } });
  const response = await route.post(validMessage);
  assert.equal(response.status, 500);
  assert.ok(!(await response.text()).includes("provider-private-details"));
  assert.ok(!JSON.stringify(route.logs).includes("test-private-key"));
  assert.ok(!JSON.stringify(route.logs).includes("provider-private-details"));
});

test("provider exceptions return safe messages", async () => {
  const route = createRoute({ throws: true });
  const response = await route.post(validMessage);
  assert.equal(response.status, 500);
  assert.ok(!(await response.text()).includes("provider-private-details"));
});

test("rate limiting blocks excess requests and expires after a minute", async () => {
  const route = createRoute();
  const invalid = { ...validMessage, message: "short" };
  for (let i = 0; i < 5; i++) assert.equal((await route.post(invalid)).status, 400);
  assert.equal((await route.post(invalid)).status, 429);
  route.advanceTime(60_001);
  assert.equal((await route.post(invalid)).status, 400);
  assert.equal(route.sent.length, 0);
});
