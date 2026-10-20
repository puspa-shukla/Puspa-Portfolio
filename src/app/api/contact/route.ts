import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact";

// Messages are delivered through Resend's REST API. Configure these on the
// server (Vercel/Netlify environment variables or .env.local), never in code:
//   RESEND_API_KEY      - API key from https://resend.com
//   CONTACT_TO_EMAIL    - inbox that receives messages
//   CONTACT_FROM_EMAIL  - optional verified sender, e.g. "Portfolio <hello@yourdomain.com>"
// Without them the route answers 503 and the form offers an email fallback.

// Best-effort flood guard: at most RATE_LIMIT sends per IP per window, per
// server instance. Not a substitute for a shared store, but stops simple bursts.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const recentSends = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const sends = (recentSends.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  if (sends.length >= RATE_LIMIT) {
    recentSends.set(ip, sends);
    return true;
  }
  sends.push(now);
  recentSends.set(ip, sends);
  if (recentSends.size > 1000) {
    for (const [key, times] of recentSends) {
      if (times.every((time) => now - time >= RATE_WINDOW_MS)) recentSends.delete(key);
    }
  }
  return false;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const { data, errors } = validateContact(body);
  if (!data) {
    return NextResponse.json({ error: "validation", errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const from =
    process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
  const safeName = data.name.replace(/[\r\n]+/g, " ");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `[Portfolio] ${data.inquiry} from ${safeName}`,
        text: [
          `Name: ${safeName}`,
          `Email: ${data.email}`,
          `Inquiry: ${data.inquiry}`,
          "",
          data.message,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      console.error("Contact email failed", response.status, await response.text());
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("Contact email failed", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
