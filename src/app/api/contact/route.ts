import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

// --- Validation schema (zod) ---
const schema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters").max(80),
  email: z.string().trim().email("Please enter a valid email").max(254),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters.")
    .max(2000),
  hp: z.string().max(512).optional(),
});

// --- Tiny in-memory rate-limit per IP (60s window) ---
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_HITS = 5; // allow 5 requests/min/IP

function rateLimit(ip: string) {
  const now = Date.now();
  for (const [address, hit] of hits) {
    if (now - hit.ts >= WINDOW_MS) hits.delete(address);
  }
  const entry = hits.get(ip);

  if (!entry || now - entry.ts > WINDOW_MS) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }

  entry.count++;
  if (entry.count > MAX_HITS) return true;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // Basic rate limit
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "0.0.0.0";

    if (rateLimit(ip)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Too many requests. Please try again in a minute.",
        },
        { status: 429 }
      );
    }

    const maxBodyLength = 16_384;
    if (Number(req.headers.get("content-length")) > maxBodyLength) {
      return NextResponse.json(
        { ok: false, error: "Your message is too large." },
        { status: 413 },
      );
    }

    const body = await req.text();
    if (body.length > maxBodyLength) {
      return NextResponse.json(
        { ok: false, error: "Your message is too large." },
        { status: 413 },
      );
    }

    let data: unknown;
    try {
      data = JSON.parse(body);
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid request. Please try again." },
        { status: 400 },
      );
    }
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      // build field->messages map no issues
      const fieldErrors: Record<string, string[]> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path.join(".") || "_form";
        (fieldErrors[key] ??= []).push(issue.message);
      }

      return NextResponse.json(
        { ok: false, errors: fieldErrors },
        { status: 400 }
      );
    }

    // Honeypot tripped
    if (parsed.data.hp && parsed.data.hp.length > 0) {
      return NextResponse.json({ ok: true }); // silently succeed
    }

    const { name, email, message } = parsed.data;

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM;
    const to = process.env.CONTACT_TO;
    if (!apiKey || !from || !to) {
      return NextResponse.json(
        {
          ok: false,
          error: "The contact form is temporarily unavailable. Please email me directly.",
        },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);

    // Send via Resend
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New portfolio inquiry — ${name}`,
      text:
        `Name: ${name}\nEmail: ${email}\n\n` +
        `Message:\n${message}\n\n` +
        `---\nIP: ${ip}`,
    });

    if (error) {
      console.error("Contact email delivery failed.");
      return NextResponse.json(
        { ok: false, error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    console.error("Contact request failed.");
    return NextResponse.json(
      { ok: false, error: "Unexpected error. Please try again later." },
      { status: 500 }
    );
  }
}
