import type { Metadata } from "next";
import Link from "next/link";
import { getCar } from "@/data/cars";
import { getZone } from "@/data/zones";
import { BookingForm } from "@/components/BookingForm";
import { quote, rentalDays, usd, type AddOnId } from "@/lib/pricing";

export const metadata: Metadata = { title: "Request a car", robots: { index: false } };

export default async function BookPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const s = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : "");
  const car = getCar(s("car"));
  const zone = getZone(s("zone") || "pickup");
  const days = rentalDays(new Date(s("start")), new Date(s("end")));
  const addons = s("addons") ? s("addons").split(",") : [];

  if (!car || !zone || !days) {
    return (
      <section className="wrap py-20">
        <h1 className="font-display text-[34px] font-semibold">Pick a car and dates first</h1>
        <p className="mt-3 text-navy-soft">Choose a car to see its price, then request it from there.</p>
        <Link href="/cars" className="btn-gold mt-6">Browse cars</Link>
      </section>
    );
  }
  const fee = zone.fee ?? 0;
  const q = quote({ car, days, deliveryFee: fee, returnFee: fee, addOns: addons as AddOnId[] });
  const fmt = (v: string) => new Date(v).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

  return (
    <section className="wrap grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0">
        <p className="eyebrow mb-2">Step 1 of 2 · Request</p>
        <h1 className="font-display text-[34px] font-semibold leading-tight">Request the {car.name}</h1>
        <p className="mb-8 mt-2 text-navy-soft">Tell us who&apos;s driving. We hold the car while we confirm.</p>
        <BookingForm car={car.slug} start={s("start")} end={s("end")} zone={zone.id} addons={addons} needsAddress={zone.id !== "pickup"} />
      </div>
      <aside className="card h-fit p-5 text-[14px]">
        <h2 className="font-display text-[18px] font-semibold">{car.name}</h2>
        <p className="mt-1 text-muted">{fmt(s("start"))} → {fmt(s("end"))}</p>
        <p className="text-muted">{zone.name}</p>
        <dl className="mt-4 space-y-1.5 border-t border-line pt-3">
          {q.lines.map((l) => (
            <div key={l.label} className="flex justify-between gap-3"><dt className="text-navy-soft">{l.label}</dt><dd className="tabular-nums">{usd(l.amount)}</dd></div>
          ))}
          <div className="flex justify-between gap-3"><dt className="text-navy-soft">Sales tax (estimate)</dt><dd className="tabular-nums">{usd(q.tax)}</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-navy-soft">Colorado rental fees</dt><dd className="tabular-nums">{usd(q.coloradoFees)}</dd></div>
          <div className="flex justify-between gap-3 border-t border-line pt-2 text-[16px] font-semibold"><dt>Total</dt><dd className="tabular-nums">{usd(q.total)}</dd></div>
        </dl>
        <p className="mt-2 text-[12px] text-muted">Refundable deposit hold: {usd(q.deposit)}</p>
        <Link href={`/cars/${car.slug}`} className="mt-4 inline-block text-[13px] underline">Change dates or add-ons</Link>
      </aside>
    </section>
  );
}
