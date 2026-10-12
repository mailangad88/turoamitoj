import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Trip planning tools",
  description: "Free tools for Colorado drivers: Traction Law checker, ski trip cost estimator, and a Turo vs direct booking calculator.",
  alternates: { canonical: "/tools" },
};

const tools = [
  ["/tools/traction-law-checker", "Traction Law checker", "Is this car legal on I-70 today? Tire type, tread and chains in, answer out."],
  ["/tools/ski-trip-estimator", "Ski trip estimator", "Resort, days and group size in, the right car and the all-in cost out."],
  ["/tools/turo-vs-direct", "Turo vs direct", "See what platform fees add to the same car and dates."],
];

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Tools" title="Plan the trip before you book" />
      <section className="wrap mt-10 grid gap-5 md:grid-cols-3">
        {tools.map(([href, t, b]) => (
          <Link key={href} href={href} className="card p-6 transition hover:border-navy/40">
            <span className="font-display text-[21px] font-semibold">{t}</span>
            <span className="mt-2 block text-[15px] text-navy-soft">{b}</span>
          </Link>
        ))}
      </section>
    </>
  );
}
