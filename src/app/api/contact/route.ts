import nodemailer from "nodemailer";
import { CONTACT_EMAIL } from "@/data/contact";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  website?: string;
};

const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX = 5;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function clientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(key);
  if (!bucket || now >= bucket.resetAt) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (bucket.count >= RATE_MAX) return true;
  bucket.count += 1;
  return false;
}

export async function POST(req: Request) {
  try {
    if (isRateLimited(clientKey(req))) {
      return Response.json(
        { ok: false, error: "Too many messages. Please try again later." },
        { status: 429 },
      );
    }

    const body = (await req.json()) as ContactBody;

    // Honeypot — bots fill hidden fields; humans leave them empty.
    if (String(body.website ?? "").trim()) {
      return Response.json({ ok: true });
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return Response.json(
        { ok: false, error: "Name, email, and query are required." },
        { status: 400 },
      );
    }

    if (name.length > 120 || email.length > 200 || message.length > 5000) {
      return Response.json({ ok: false, error: "Message is too long." }, { status: 400 });
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmailValid) {
      return Response.json({ ok: false, error: "Invalid email." }, { status: 400 });
    }

    const subjectName = name.replace(/[\r\n]+/g, " ");
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    // Gmail SMTP + Cloudflare Email Routing: From Gmail → hello@ → same Gmail is
    // deduped and never appears in Inbox. Deliver to the SMTP mailbox (plus-alias)
    // so the message shows up as new mail instead of vanishing as a duplicate.
    const configuredTo = (process.env.CONTACT_TO || user || "").trim();
    const usingGmailSmtp = (host ?? "").toLowerCase().includes("gmail");
    const to = usingGmailSmtp && user ? gmailPlusAlias(user, "fancifytext") : configuredTo;
    const from = process.env.CONTACT_FROM || user || CONTACT_EMAIL;

    if (!host || !user || !pass || !to) {
      return Response.json(
        { ok: false, error: "Email is not configured on server." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"FancifyText Contact" <${from}>`,
      replyTo: email,
      to,
      subject: `New FancifyText Query from ${subjectName}`,
      text: [
        "New FancifyText Contact Form Submission",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Query:",
        message,
      ].join("\n"),
      html: `
        <h2>New FancifyText Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Query:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Failed to send FancyText contact email:", error);
    return Response.json(
      { ok: false, error: "Something went wrong." },
      { status: 500 },
    );
  }
}

function gmailPlusAlias(address: string, tag: string): string {
  const at = address.lastIndexOf("@");
  if (at <= 0) return address;
  const local = address.slice(0, at);
  const domain = address.slice(at + 1);
  if (local.includes("+")) return address;
  return `${local}+${tag}@${domain}`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
