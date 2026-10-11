import { NextResponse } from "next/server";

const TO_EMAIL = "contact@castlecarpenters.us";
const FROM_EMAIL = "notifications@castlecarpenters.us";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  turnstileToken?: unknown;
};

export async function GET() {
  const siteKey = process.env.TURNSTILE_SITE_KEY;
  if (!siteKey) {
    return NextResponse.json({ error: "The contact form is not configured yet." }, { status: 500 });
  }

  return NextResponse.json({ siteKey });
}

async function verifyTurnstile(token: string, request: Request) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) body.set("remoteip", ip);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const result = (await response.json().catch(() => null)) as { success?: boolean } | null;
  return response.ok && result?.success === true;
}

function asTrimmedString(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = asTrimmedString(body.name, 120);
  const email = asTrimmedString(body.email, 200);
  const phone = asTrimmedString(body.phone, 40);
  const message = asTrimmedString(body.message, 5000);

  if (!name || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "A name and valid email address are required." },
      { status: 400 },
    );
  }

  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.error("Missing TURNSTILE_SECRET_KEY");
    return NextResponse.json(
      { error: "The contact form is not configured yet." },
      { status: 500 },
    );
  }

  const turnstileToken = asTrimmedString(body.turnstileToken, 2048);
  if (!turnstileToken || !(await verifyTurnstile(turnstileToken, request))) {
    return NextResponse.json(
      { error: "Please complete the security check and try again." },
      { status: 400 },
    );
  }

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) {
    console.error("Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN");
    return NextResponse.json(
      { error: "The contact form is not configured yet." },
      { status: 500 },
    );
  }

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    "",
    message || "(No message provided.)",
  ].join("\n");

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: { address: FROM_EMAIL, name: "Castle Carpenters" },
        to: TO_EMAIL,
        reply_to: { address: email, name },
        subject: `New lead from ${name}`,
        text,
      }),
    },
  );

  const result = (await response.json().catch(() => null)) as { success?: boolean } | null;
  if (!response.ok || !result?.success) {
    console.error("Cloudflare email send failed", result);
    return NextResponse.json(
      { error: "We could not send your message. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
