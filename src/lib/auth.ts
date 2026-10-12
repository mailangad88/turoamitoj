// Admin sessions: a signed, expiring cookie. Works in the Edge middleware and in Node (Web Crypto in both).
// Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET (32+ random characters) in the environment.

export const SESSION_COOKIE = "rnd_admin";
export const SESSION_HOURS = 12;

const enc = new TextEncoder();

export function authConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && (process.env.ADMIN_SESSION_SECRET ?? "").length >= 32);
}

async function hmac(secret: string, message: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSession(secret: string, now = Date.now()) {
  const exp = now + SESSION_HOURS * 3600_000;
  return `${exp}.${await hmac(secret, `admin.${exp}`)}`;
}

export async function verifySession(token: string | undefined, secret: string | undefined, now = Date.now()) {
  if (!token || !secret) return false;
  const [expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!exp || !sig || exp < now) return false;
  return safeEqual(sig, await hmac(secret, `admin.${exp}`));
}

/** Compares HMACs of both strings so the check takes the same time whatever the input. */
export async function passwordMatches(input: string, expected: string, secret: string) {
  return safeEqual(await hmac(secret, `pw.${input}`), await hmac(secret, `pw.${expected}`));
}
