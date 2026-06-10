import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  ADMIN_COOKIE_NAME,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/adminSession";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 5;

// Valid bcrypt hash of a random throwaway string. Compared against when the
// email doesn't match so both branches cost one bcrypt verify (no user
// enumeration via response timing).
const DUMMY_HASH = "$2b$12$Jw/JxZ3Kld6JsT.rvzpIP.1.IwOsmUrrqZTPE3f2qVCb8OfLoBz16";

// Note: in-memory limiter is per serverless instance; good enough as a
// brute-force speed bump for a single-admin portal.
const attemptStore = globalThis.__adminLoginAttempts || new Map();
if (!globalThis.__adminLoginAttempts) {
  globalThis.__adminLoginAttempts = attemptStore;
}

function getClientIp(req) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (attemptStore.get(ip) || []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );
  attemptStore.set(ip, recent);
  return recent.length >= RATE_LIMIT_MAX_ATTEMPTS;
}

function recordAttempt(ip) {
  const entries = attemptStore.get(ip) || [];
  entries.push(Date.now());
  attemptStore.set(ip, entries);
}

const invalidResponse = () =>
  NextResponse.json({ success: false, error: "Invalid credentials." }, { status: 401 });

export async function POST(req) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!adminEmail || !adminPasswordHash || !sessionSecret) {
    return NextResponse.json(
      { success: false, error: "Service unavailable." },
      { status: 503 }
    );
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many attempts. Try again later." },
      { status: 429 }
    );
  }
  recordAttempt(ip);

  let body;
  try {
    body = await req.json();
  } catch {
    return invalidResponse();
  }

  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  if (!email || !password || password.length > 256 || email.length > 254) {
    return invalidResponse();
  }

  const emailMatches =
    email.toLowerCase() === adminEmail.trim().toLowerCase();
  // Always perform exactly one bcrypt comparison regardless of which field
  // is wrong, and return the same generic error either way.
  const passwordMatches = await bcrypt.compare(
    password,
    emailMatches ? adminPasswordHash : DUMMY_HASH
  );

  if (!emailMatches || !passwordMatches) {
    return invalidResponse();
  }

  attemptStore.delete(ip);
  const token = await createSessionToken(adminEmail);
  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, sessionCookieOptions);
  return res;
}
