import { NextResponse } from "next/server";

const TO_EMAIL = "contact@castlecarpenters.us";
const FROM_EMAIL = "notifications@castlecarpenters.us";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
};

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
