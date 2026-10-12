import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Guest reviews of our Denver car rentals, plus our record on Turo and Google.",
  alternates: { canonical: "/reviews" },
};

// First-party reviews will come from the booking system after each trip. No reviews are invented here.
export default function Page() {
  const badges = [
    site.turo.rating && site.turo.trips && site.turo.profileUrl
      ? { label: `${site.turo.rating.toFixed(1)}★ from ${site.turo.trips} trips on Turo`, href: site.turo.profileUrl }
      : null,
    site.google.rating && site.google.reviews && site.google.profileUrl
      ? { label: `${site.google.rating.toFixed(1)}★ from ${site.google.reviews} Google reviews`, href: site.google.profileUrl }
      : null,
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <>
      <PageHeader eyebrow="Reviews" title="What guests say" lede="Every review here comes from a completed trip. We ask each guest the day after they return the car." />
      <section className="wrap mt-10 grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="font-display text-[20px] font-semibold">Direct bookings</h2>
          <p className="mt-2 text-[15px] text-ink-soft">Reviews from guests who booked on this site will appear here after their trips.</p>
        </div>
        <div className="card p-6">
          <h2 className="font-display text-[20px] font-semibold">Elsewhere</h2>
          {badges.length ? (
            <ul className="mt-3 space-y-2">{badges.map((b) => <li key={b.href}><a href={b.href} className="font-semibold underline decoration-brand decoration-2 underline-offset-4" target="_blank" rel="noopener noreferrer">{b.label}</a></li>)}</ul>
          ) : (
            <p className="mt-2 text-[15px] text-ink-soft">Links to our Turo and Google profiles go here once they&apos;re set up.</p>
          )}
        </div>
      </section>
      <section className="wrap mt-10">
        <p className="text-[15px] text-ink-soft">Rented from us? <Link href="/about" className="underline">Get in touch</Link> and tell us how it went.</p>
      </section>
    </>
  );
}
