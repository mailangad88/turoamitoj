"use client";

import { useState } from "react";

type Props = { car: string; start: string; end: string; zone: string; addons: string[]; needsAddress: boolean };

export function BookingForm(props: Props) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      ...props,
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      driverAge: fd.get("driverAge"),
      address: fd.get("address") ?? "",
      notes: fd.get("notes") ?? "",
      website: fd.get("website") ?? "",
    };
    try {
      const res = await fetch("/api/booking-request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong. Try again or call us.");
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-lg border border-pine/30 bg-pine-tint p-6">
        <h2 className="font-display text-[22px] font-semibold text-pine">Request received</h2>
        <p className="mt-2 text-[16px] text-ink-soft">
          We&apos;ll confirm availability by text or email, usually within an hour during the day. You&apos;ll get a secure link
          to verify your license and pay once the car is confirmed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">Full name (as on your license)</label>
          <input id="name" name="name" className="field" autoComplete="name" required minLength={2} />
        </div>
        <div>
          <label htmlFor="phone" className="label">Mobile phone</label>
          <input id="phone" name="phone" type="tel" className="field" autoComplete="tel" required />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="label">Email</label>
        <input id="email" name="email" type="email" className="field" autoComplete="email" required />
      </div>
      {props.needsAddress && (
        <div>
          <label htmlFor="address" className="label">Delivery address or hotel</label>
          <input id="address" name="address" className="field" autoComplete="street-address" required />
        </div>
      )}
      <fieldset>
        <legend className="label">Primary driver&apos;s age</legend>
        <div className="flex gap-5 text-[15px]">
          <label className="flex items-center gap-2"><input type="radio" id="age-25" name="driverAge" value="25+" defaultChecked className="accent-[#111111]" /> 25 or older</label>
          <label className="flex items-center gap-2"><input type="radio" id="age-21" name="driverAge" value="21-24" className="accent-[#111111]" /> 21 to 24</label>
        </div>
      </fieldset>
      <div>
        <label htmlFor="notes" className="label">Anything we should know? (optional)</label>
        <textarea id="notes" name="notes" rows={3} className="field" placeholder="Flight number, ski resort, child seat ages…" />
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {state === "error" && <p className="rounded-md bg-rust-tint px-3 py-2 text-[14px] text-rust">{error}</p>}
      <button type="submit" className="btn-brand py-3.5 text-[16px]" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send booking request"}
      </button>
      <p className="text-[13px] text-muted">No payment now. We confirm the car first, then send a secure link for license check, agreement and payment.</p>
    </form>
  );
}
