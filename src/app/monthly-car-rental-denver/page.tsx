import type { Metadata } from "next";
import Link from "next/link";
import { SeasonalPage } from "@/components/SeasonalPage";
import { photos } from "@/data/photos";
import { coloradoFees } from "@/config/site";

export const metadata: Metadata = {
  title: "Monthly car rental in Denver",
  description:
    "Monthly car rentals in Denver for travel nurses, relocation and insurance replacement. 30% off daily rates, delivered, and no Colorado daily rental fees past 30 days.",
  alternates: { canonical: "/monthly-car-rental-denver" },
};

export default function Page() {
  const perDay = (coloradoFees.dailyRentalFee + coloradoFees.congestionImpactFee).toFixed(2);
  return (
    <SeasonalPage
      path="/monthly-car-rental-denver"
      photo={photos.unionStationHall}
      eyebrow="Monthly and relocation"
      title="Monthly car rental in Denver"
      lede="30% off the daily rate, delivered to your apartment, and maintenance handled by us. Book 31 days or more and Colorado's daily rental fees drop away."
      carFilter={(c) => !c.ev || c.dailyRate < 110}
      carsHeading="Good cars for a month"
      sections={[
        {
          heading: "Who rents by the month",
          body: (
            <ul>
              <li><strong>Travel nurses</strong> on 13-week contracts at Denver Health, UCHealth Anschutz and the metro hospitals.</li>
              <li><strong>People relocating</strong> while their car ships or before they buy.</li>
              <li><strong>Insurance replacement</strong> while your car is in the body shop.</li>
              <li><strong>Remote workers</strong> spending a season near the mountains.</li>
            </ul>
          ),
        },
        {
          heading: "Why 31 days costs less than 30",
          body: (
            <p>
              Colorado charges ${perDay} a day in rental fees ({coloradoFees.effective}) on rentals of 30 days or less, and short-term
              rentals carry sales tax. Rentals over 30 consecutive days are exempt from both. Our prices show the difference
              automatically. More in the <Link href="/guides/monthly-car-rental-denver">monthly rental guide</Link>.
            </p>
          ),
        },
      ]}
      aside={
        <div className="card p-5">
          <h2 className="font-display text-[18px] font-semibold">Need a quote for 2+ months?</h2>
          <p className="mt-2 text-[14px] text-ink-soft">Corporate, insurance and long-stay rates on request.</p>
          <Link href="/business" className="btn-ghost mt-4 w-full">Ask for a quote</Link>
        </div>
      }
      faqs={[
        { q: "Is there a mileage cap on monthly rentals?", a: "Monthly rentals include 2,500 miles. Extra miles are $0.30 each." },
        { q: "Can I swap cars mid-rental?", a: "Yes, once per month at no charge, subject to availability. Handy for a mountain weekend." },
      ]}
    />
  );
}
