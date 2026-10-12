import { NextResponse } from "next/server";
import { bookingRequestSchema } from "@/lib/booking";
import { getCar } from "@/data/cars";
import { getZone } from "@/data/zones";
import { quote, rentalDays, usd, type AddOnId } from "@/lib/pricing";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const parsed = bookingRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Check the form." }, { status: 422 });
  }
  const r = parsed.data;
  if (r.website) return NextResponse.json({ ok: true, emailed: false }); // bot

  const car = getCar(r.car);
  const zone = getZone(r.zone);
  const days = rentalDays(new Date(r.start), new Date(r.end));
  if (!car || !zone || !days) {
    return NextResponse.json({ ok: false, error: "That car, delivery area or date range isn't available." }, { status: 422 });
  }
  const fee = zone.fee ?? 0;
  const q = quote({ car, days, deliveryFee: fee, returnFee: fee, addOns: r.addons as AddOnId[] });

  const summary = [
    `New booking request: ${car.name}`,
    `${r.start} → ${r.end} (${days} days)`,
    `Delivery: ${zone.name}${r.address ? `, ${r.address}` : ""}`,
    `Add-ons: ${r.addons.join(", ") || "none"}`,
    `Quoted total: ${usd(q.total)} (deposit ${usd(q.deposit)})`,
    `Guest: ${r.name} · ${r.email} · ${r.phone} · age ${r.driverAge}`,
    r.notes ? `Notes: ${r.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const key = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_NOTIFY_EMAIL;
  const from = process.env.BOOKING_FROM_EMAIL;
  let emailed = false;
  if (key && to && from) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, reply_to: r.email, subject: `Booking request: ${car.name}, ${days} days`, text: summary }),
    });
    emailed = res.ok;
    if (!res.ok) console.error("Resend failed", res.status, await res.text());
  } else {
    console.log(summary);
  }
  return NextResponse.json({ ok: true, emailed });
}
