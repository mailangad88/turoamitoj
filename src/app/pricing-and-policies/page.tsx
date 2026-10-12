import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { coloradoFees, deposit } from "@/config/site";
import { lengthDiscounts, addOns } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing and rental policies",
  description: "Deposits, mileage, fuel, young drivers, cancellation, tolls and Colorado rental fees for our Denver car rentals.",
  alternates: { canonical: "/pricing-and-policies" },
};

export default function Page() {
  const perDay = (coloradoFees.dailyRentalFee + coloradoFees.congestionImpactFee).toFixed(2);
  return (
    <>
      <PageHeader eyebrow="Pricing and policies" title="What you pay, and the rules of the road" lede="Everything that affects your total, in one place. The price you see at checkout already includes these." />
      <section className="wrap mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="prose-site min-w-0">
          <h2>Discounts for longer trips</h2>
          <ul>{lengthDiscounts.slice().reverse().map((d) => <li key={d.label}><strong>{d.label}</strong> ({d.minDays}+ days): {d.rate * 100}% off the daily rate</li>)}</ul>
          <h2>Taxes and Colorado fees</h2>
          <p>
            Rentals of 30 days or less include Colorado and Denver sales tax, plus Colorado&apos;s daily vehicle rental fee (${coloradoFees.dailyRentalFee.toFixed(2)}) and congestion impact fee (${coloradoFees.congestionImpactFee.toFixed(2)}), ${perDay} a day in total for {coloradoFees.effective}. Rentals over 30 consecutive days are exempt.
          </p>
          <h2>Deposit</h2>
          <p>${deposit.standard} for most cars, ${deposit.premium} for larger 4x4s. It&apos;s a hold on your card placed 24 hours before pickup and released after check-in, usually within 3 business days.</p>
          <h2>Drivers</h2>
          <ul>
            <li>Primary driver 25 or older with a license held for 2+ years. Ages 21 to 24 can rent crossovers with a $25/day young-driver fee.</li>
            <li>License and selfie check before pickup. Extra drivers must be verified too.</li>
          </ul>
          <h2>Mileage and fuel</h2>
          <ul>
            <li>200 miles a day (250 on the Tesla), pooled across the trip. Extra miles $0.40 each.</li>
            <li>Return with the same fuel level, or we refuel at the pump price plus $10. Teslas: return above 20%.</li>
          </ul>
          <h2>Tolls and tickets</h2>
          <p>E-470 and the Express Lanes bill by plate. Tolls pass through at cost, with no admin fee. Parking and camera tickets pass through with a $25 processing fee.</p>
          <h2>Cancellation</h2>
          <p>Full refund up to 72 hours before pickup. Inside 72 hours we keep one day&apos;s rate. Free date changes when CDOT closes I-70 or the Eisenhower Tunnel.</p>
          <h2>Not allowed</h2>
          <ul><li>Off-road driving beyond maintained dirt roads</li><li>Smoking or vaping</li><li>Pets without the pet add-on</li><li>Racing, towing without a hitch, or rideshare driving</li></ul>
        </div>
        <aside className="card h-fit p-5">
          <h2 className="font-display text-[18px] font-semibold">Add-ons</h2>
          <ul className="mt-3 space-y-2 text-[14px]">
            {addOns.map((a) => (
              <li key={a.id} className="flex justify-between gap-3"><span>{a.label}</span><span className="tabular-nums text-muted">${a.perDay}/day{a.maxTotal ? `, max $${a.maxTotal}` : ""}</span></li>
            ))}
          </ul>
        </aside>
      </section>
    </>
  );
}
