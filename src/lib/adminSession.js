import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE_NAME = "ms_sid";
export const SESSION_TTL_SECONDS = 60 * 60 * 2; // 2 hours

function getSecretKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  // Refuse to operate with a weak/missing secret rather than fall back.
  if (!secret || secret.length < 32) return null;
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(email) {
  const key = getSecretKey();
  if (!key) throw new Error("ADMIN_SESSION_SECRET is missing or too short (min 32 chars).");
  return new SignJWT({ sub: email, scope: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(key);
}

export async function verifySessionToken(token) {
  if (!token) return null;
  const key = getSecretKey();
  if (!key) return null;
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ["HS256"] });
    if (payload.scope !== "admin") return null;
    return payload;
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
};
