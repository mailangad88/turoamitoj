import { describe, expect, it } from "vitest";
import { createSession, passwordMatches, verifySession } from "./auth";

const secret = "x".repeat(40);

describe("admin sessions", () => {
  it("accepts a fresh token and rejects a tampered or expired one", async () => {
    const now = Date.UTC(2026, 9, 12);
    const token = await createSession(secret, now);
    expect(await verifySession(token, secret, now + 1000)).toBe(true);
    expect(await verifySession(token.replace(/.$/, (c) => (c === "A" ? "B" : "A")), secret, now)).toBe(false);
    expect(await verifySession(token, "y".repeat(40), now)).toBe(false);
    expect(await verifySession(token, secret, now + 13 * 3600_000)).toBe(false);
    expect(await verifySession(`${now + 9e9}.forged`, secret, now)).toBe(false);
  });
  it("checks passwords", async () => {
    expect(await passwordMatches("open sesame", "open sesame", secret)).toBe(true);
    expect(await passwordMatches("open sesam", "open sesame", secret)).toBe(false);
  });
});
