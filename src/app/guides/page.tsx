import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { photos } from "@/data/photos";
import { guides } from "@/content/guides";

export const metadata: Metadata = {
  title: "Colorado driving guides",
  description: "Local guides for driving in and around Denver: the Traction Law, ski-town drives, monthly rentals, national parks and events.",
  alternates: { canonical: "/guides" },
};

const planned = [
  ["Ski season", "I-70 timing and closures; chains vs AWD; what to pack in the car"],
  ["Airport", "DIA car rental: counter vs delivery; late arrivals; car seats"],
  ["Road trips", "Best road trips from Denver by season; Great Sand Dunes; Trail Ridge Road"],
  ["Events", "Getting to Red Rocks; Great American Beer Festival; Broncos game day"],
  ["Turo shoppers", "Turo fees explained; direct vs Turo; how protection plans differ"],
];

export default function Page() {
  return (
    <>
      <PageHeader photo={photos.continentalDivideRoad} eyebrow="Guides" title="Colorado driving guides" lede="Written by people who drive I-70 every week. Pick the trip you're planning." />
      <section className="wrap mt-10 grid gap-5 md:grid-cols-3">
        {guides.map(({ meta }) => (
          <Link key={meta.slug} href={`/guides/${meta.slug}`} className="card flex flex-col p-6 transition hover:border-ink/40">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{meta.cluster} · {meta.readMinutes} min</span>
            <span className="mt-3 font-display text-[21px] font-semibold leading-snug">{meta.title}</span>
            <span className="mt-2 text-[15px] text-ink-soft">{meta.description}</span>
          </Link>
        ))}
      </section>
      <section className="wrap mt-14">
        <h2 className="mb-4 font-display text-[22px] font-semibold">Coming next</h2>
        <ul className="divide-y divide-line border-y border-line text-[15px]">
          {planned.map(([c, t]) => (
            <li key={c} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-6"><span className="w-36 shrink-0 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">{c}</span><span className="text-ink-soft">{t}</span></li>
          ))}
        </ul>
      </section>
    </>
  );
}
