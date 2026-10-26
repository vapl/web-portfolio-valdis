const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");

const compiled = ts.transpileModule(
  fs.readFileSync(path.join(__dirname, "../src/app/contact/page.tsx"), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } },
).outputText;

// Exercise form event handlers with isolated hooks and a fake network transport.
// No browser session, credentials or external email service is involved.
function createPage(fetchImplementation) {
  const slots = [];
  let cursor = 0, dirty = false, effects = [], timers = [], tree;
  const hooks = {
    useState(initial) {
      const position = cursor++;
      if (!slots[position]) slots[position] = { value: initial };
      return [slots[position].value, value => {
        const next = typeof value === "function" ? value(slots[position].value) : value;
        if (!Object.is(next, slots[position].value)) {
          slots[position].value = next;
          dirty = true;
        }
      }];
    },
    useEffect(callback, dependencies) {
      const position = cursor++;
      const previous = slots[position];
      if (!previous || dependencies.some((value, index) => !Object.is(value, previous.dependencies[index]))) {
        effects.push(() => {
          previous?.cleanup?.();
          slots[position] = { dependencies, cleanup: callback() };
        });
      }
    },
  };
  const module = { exports: {} };
  vm.runInNewContext(compiled, {
    exports: module.exports,
    require(name) {
      if (name === "react") return hooks;
      if (name === "react/jsx-runtime") return require(name);
      if (name === "framer-motion") return {
        AnimatePresence: "AnimatePresence",
        motion: new Proxy({}, { get: (_, key) => "motion." + key }),
      };
      if (["next/link", "@/components/ui/Button", "@/components/contact/EmailLink"].includes(name)) {
        return { __esModule: true, default: name };
      }
      throw Error("Unexpected import: " + name);
    },
    fetch: fetchImplementation,
    setTimeout(callback) { timers.push(callback); return timers.length; },
    clearTimeout() {},
  });
  function render() {
    do {
      dirty = false;
      cursor = 0;
      effects = [];
      tree = module.exports.default();
      effects.forEach(effect => effect());
    } while (dirty);
  }
  function find(predicate) {
    function walk(node) {
      if (!node || typeof node !== "object") return null;
      if (Array.isArray(node)) {
        for (const child of node) {
          const result = walk(child);
          if (result) return result;
        }
        return null;
      }
      if (predicate(node)) return node;
      return walk(node.props?.children);
    }
    return walk(tree);
  }
  const id = value => find(node => node.props?.id === value);
  render();
  timers.splice(0).forEach(callback => callback());
  render();
  find(node => node.type === "AnimatePresence" && node.props.onExitComplete).props.onExitComplete();
  render();
  id("contact-name").props.onInput({ target: { value: "Test Person" } });
  render();
  id("contact-email").props.onChange({ target: { value: "person@example.com" } });
  render();
  id("contact-message").props.onChange({ target: { value: "A useful test inquiry about a project." } });
  render();
  return {
    render, id, find,
    submit: () => find(node => node.type === "motion.form").props.onSubmit({ preventDefault() {} }),
  };
}

for (const [label, payload, expected] of [
  ["field errors", { ok: false, errors: { email: ["Server rejected this email."] } }, "Please check the highlighted fields."],
  ["rate limit", { ok: false, error: "Too many requests. Please try again in a minute." }, "Too many requests. Please try again in a minute."],
  ["unavailable service", { ok: false, error: "Please email me directly." }, "Please email me directly."],
]) {
  test("contact form displays " + label, async () => {
    const page = createPage(async url => {
      assert.equal(url, "/api/contact");
      return { ok: false, json: async () => payload };
    });
    await page.submit();
    page.render();
    assert.equal(page.find(node => node.props?.role === "alert").props.children, expected);
    if (label === "field errors") {
      assert.equal(page.id("email-error").props.children, "Server rejected this email.");
    }
  });
}

test("contact form explains network failures", async () => {
  const page = createPage(async () => { throw Error("offline"); });
  await page.submit();
  page.render();
  assert.ok(page.find(node => node.props?.role === "alert").props.children.includes("Unable to connect"));
});

test("contact form handles a non-JSON server response", async () => {
  const page = createPage(async () => ({ ok: false, json: async () => { throw Error("not-json"); } }));
  await page.submit();
  page.render();
  assert.ok(page.find(node => node.props?.role === "alert").props.children.includes("Unable to send"));
});

test("contact form disables pending submissions and clears the message on success", async () => {
  let complete, calls = 0;
  const page = createPage(() => {
    calls++;
    return new Promise(resolve => { complete = resolve; });
  });
  const submission = page.submit();
  page.render();
  assert.equal(page.find(node => node.type === "@/components/ui/Button").props.disabled, true);
  await page.submit();
  assert.equal(calls, 1);
  complete({ ok: true, json: async () => ({ ok: true }) });
  await submission;
  page.render();
  assert.equal(page.id("contact-message").props.value, "");
  assert.ok(page.find(node => node.props?.role === "status"));
});
