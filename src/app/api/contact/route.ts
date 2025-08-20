import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

// --- Validation schema (zod) ---
const schema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(80),
    email: z.string().email("Please enter a valid email"),
    message: z.string().min(10, "Message should be at least 10 characters.").max(2000),
    hp: z.string().max(0).optional(), // honneypot MUST be empty
});

// --- Tiny in-memory rate-limit per IP (60s window) ---
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_HITS = 5; // allow 5 requests/min/IP

function rateLimit(ip: string) {
    const now = Date.now();
    const entry = hits.get(ip);

    if (!entry || now - entry.ts > WINDOW_MS) {
        hits.set(ip, { count: 1, ts: now });
        return false;
    }

    entry.count++;
    if (entry.count > MAX_HITS) return true;
    return false;
}

const API_KEY = process.env.RESEND_API_KEY;
console.log("API", API_KEY?.slice(0, 6)); // <- šis izprintēs pirmos 6 simbolus
if (!API_KEY) {
    throw new Error("Missing RESEND_API_KEY in environment variables");
}

const resend = new Resend(API_KEY);

export async function POST(req: NextRequest) {
    console.log("FROM", process.env.CONTACT_FROM);
    console.log("TO", process.env.CONTACT_TO);
    try {
        // Basic rate limit
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            req.headers.get("x-real-ip") ||
            "0.0.0.0";
        
        if (rateLimit(ip)) {
            return NextResponse.json(
                { ok: false, error: "Too many requests. Please try again in a minute." },
                { status: 429 }
            );
        }

        const data = await req.json();
        const parsed = schema.safeParse(data);

        if (!parsed.success) {
            // build field->messages map no issues
            const fieldErrors: Record<string, string[]> = {};
            for (const issue of parsed.error.issues) {
            const key = issue.path.join(".") || "_form";
            (fieldErrors[key] ??= []).push(issue.message);
        }

    return NextResponse.json({ ok: false, errors: fieldErrors }, { status: 400 });
  }

        // Honeypot tripped
        if (parsed.data.hp && parsed.data.hp.length > 0) {
            return NextResponse.json({ ok: true }); // silently succeed
        }

        const { name, email, message } = parsed.data;

        // Send via Resend
        const { error } = await resend.emails.send({
            from: process.env.CONTACT_FROM!,
            to: process.env.CONTACT_TO!,
            replyTo: email,
            subject: `New contact from ${name}`,
            text: 
                `Name: ${name}\nEmail: ${email}\n\n` +
                `Message:\n${message}\n\n` +
                `---\nIP: ${ip}`,
        });

        if (error) {
            console.error(error);
            return NextResponse.json(
                { ok: false, error: "Failed to send email. Please try again later." },
                { status: 500 }
            );
        }

        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { ok: false, error: "Unexpected error. Please try again later." },
            { status: 500 }
        );
    }
}