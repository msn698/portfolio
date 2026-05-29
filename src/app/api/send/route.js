import { NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const fromEmail = process.env.FROM_EMAIL;
const ownerEmail = process.env.OWNER_EMAIL;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const MIN_FORM_FILL_MS = 4000;

const rateLimitStore = globalThis.__contactRateLimitStore || new Map();
if (!globalThis.__contactRateLimitStore) {
  globalThis.__contactRateLimitStore = rateLimitStore;
}

function escapeHtml(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getClientIp(req) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(key) {
  const now = Date.now();
  const entries = rateLimitStore.get(key) || [];
  const recent = entries.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(key, recent);
    return true;
  }

  recent.push(now);
  rateLimitStore.set(key, recent);
  return false;
}

function detectSpam(subject, message) {
  const text = `${subject} ${message}`.toLowerCase();
  const urlMatches = text.match(/https?:\/\//g) || [];
  const spamSignals = [
    "buy now",
    "casino",
    "viagra",
    "seo service",
    "crypto recovery",
    "telegram",
    "whatsapp group"
  ];

  if (urlMatches.length > 2) return "Too many links in message.";
  if (spamSignals.some((term) => text.includes(term))) {
    return "Message flagged as spam.";
  }

  return null;
}

function validatePayload(email, subject, message, website, startedAt) {
  if (website && website.trim() !== "") return "Spam detected.";

  if (startedAt) {
    const elapsed = Date.now() - Number(startedAt);
    if (!Number.isFinite(elapsed) || elapsed < MIN_FORM_FILL_MS) {
      return "Form submitted too quickly.";
    }
  }

  if (!email || !subject || !message) return "Missing required fields.";
  if (!EMAIL_RE.test(email)) return "Invalid email address.";
  if (subject.length > 200) return "Subject is too long.";
  if (message.length > 5000) return "Message is too long.";

  const spamError = detectSpam(subject, message);
  if (spamError) return spamError;

  return null;
}

async function sendEmail(emailData) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Email API request failed");
  }

  return response.json();
}

export async function POST(req) {
  if (!RESEND_API_KEY || !fromEmail || !ownerEmail) {
    return NextResponse.json(
      {
        success: false,
        error: "Email service not configured.",
        code: "CONFIG_MISSING",
      },
      { status: 503 }
    );
  }

  const { email, subject, message, website, startedAt } = await req.json();

  const ip = getClientIp(req);
  const emailKey = (email || "").trim().toLowerCase();
  if (isRateLimited(`ip:${ip}`) || (emailKey && isRateLimited(`email:${emailKey}`))) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many requests. Please wait a bit and try again.",
        code: "RATE_LIMITED",
      },
      { status: 429 }
    );
  }

  const validationError = validatePayload(email, subject, message, website, startedAt);

  if (validationError) {
    return NextResponse.json(
      { success: false, error: validationError },
      { status: 400 }
    );
  }

  const safeEmail = escapeHtml(email.trim());
  const safeSubject = escapeHtml(subject.trim());
  const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br/>");

  const emailTemplate = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2d2d2d;">New Contact Message</h1>
      <p><strong>From:</strong> ${safeEmail}</p>
      <p><strong>Subject:</strong> ${safeSubject}</p>
      <p><strong>Message:</strong></p>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        ${safeMessage}
      </div>
    </div>
  `;

  const confirmationTemplate = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2d2d2d;">Thank you for your message!</h1>
      <p>I have received your message and will get back to you shortly.</p>
      <p><strong>Your message details:</strong></p>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      </div>
    </div>
  `;

  try {
    await sendEmail({
      from: fromEmail,
      to: ownerEmail,
      reply_to: email,
      subject,
      html: emailTemplate,
    });

    const data = await sendEmail({
      from: fromEmail,
      to: email,
      reply_to: ownerEmail,
      subject: `Re: ${subject}`,
      html: confirmationTemplate,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Could not send message right now. Please try again shortly.",
        code: "EMAIL_SEND_FAILED",
      },
      { status: 502 }
    );
  }
}
