import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { photos } from "@/data/photos";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Denver airport car rental: skip the counter",
  description: "How to get a delivered rental car when you land at Denver International Airport, using the A Line and hotel delivery.",
  alternates: { canonical: "/dia-car-delivery" },
};

export default function Page() {
  return (
    <>
      <PageHeader photo={photos.unionStation}
        eyebrow="Airport"
        title="Landing at DIA? Skip the rental shuttle."
        lede="We don't hand off cars at the airport terminals yet. Here's the fastest way to get your car instead."
      />
      <section className="wrap mt-12 grid gap-10 lg:grid-cols-2">
        <div className="prose-site">
          <h2>Option 1: the A Line</h2>
          <p>
            Take RTD&apos;s A Line train from the airport toward Union Station and get off at Central Park station. We meet you
            there with the car, close to our home base. It&apos;s usually faster than the rental-car shuttle and counter line.
          </p>
          <h2>Option 2: delivered to your hotel</h2>
          <p>
            Take the A Line or a ride to your hotel and we deliver the car there, or the evening before your ski day. See{" "}
            <Link href="/delivery-areas">delivery areas and fees</Link>.
          </p>
        </div>
        <div className="card h-fit p-6">
          <h2 className="font-display text-[20px] font-semibold">Why not at the terminal?</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-navy-soft">
            Rental companies that serve Denver International Airport pay the city a share of their airport revenue under a permit.
            We&apos;ll add terminal handoffs once that&apos;s in place, and this page will say so.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
