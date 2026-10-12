import Link from "next/link";
import { Mountain, PackageCheck, Snowflake, Truck } from "lucide-react";
import { RidgelineArt } from "@/components/RidgelineArt";
import { TripSearchForm } from "@/components/TripSearchForm";
import { TrustRow } from "@/components/TrustRow";
import { CarCard } from "@/components/CarCard";
import { DeliveryProcess } from "@/components/diagrams/DeliveryProcess";
import { FaqList } from "@/components/FaqList";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { cars } from "@/data/cars";
import { faq } from "@/data/faq";
import { guides } from "@/content/guides";
import { faqSchema } from "@/lib/schema";
import { site } from "@/config/site";

const reasons = [
  {
    icon: Truck,
    title: "Delivered to you",
    body: "To your door, your hotel or the A Line. No shuttle to an off-site lot, no counter, no line.",
  },
  {
    icon: Snowflake,
    title: "Winter-ready, checked",
    body: "Rated tires with at least 3/16 inch of tread on every car, measured at every handoff. Traction Law sorted.",
  },
  {
    icon: PackageCheck,
    title: "One price, all in",
    body: "The total you see includes Colorado's rental fees and tax. Book direct and skip the platform fees.",
  },
];

const niches = [
  { href: "/ski-rental-denver", title: "Ski trips", body: "Racks, roof boxes and rated tires for I-70.", tag: "Sept–May" },
  { href: "/rmnp", title: "National parks", body: "Rocky Mountain, Great Sand Dunes, Moab.", tag: "Year round" },
  { href: "/red-rocks", title: "Concert nights", body: "Get to Red Rocks and back without the shuttle.", tag: "Apr–Oct" },
  { href: "/monthly-car-rental-denver", title: "Monthly", body: "30% off, and no daily state fees past 30 days.", tag: "31+ days" },
];

const included = [
  "200 miles a day, pooled across your trip",
  "Ice scraper, phone mount and USB-C cables",
  "Roadside assistance, day and night",
  "Tolls passed through at cost",
  "A clean car, inside and out",
  "Free date change if I-70 closes",
];

export default function Home() {
  return (
    <>
      <section className="wrap grid items-stretch gap-8 py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:py-14">
        <div className="flex flex-col justify-center">
          <p className="eyebrow mb-4">Denver car rental · delivered</p>
          <h1 className="font-display text-[40px] font-semibold leading-[1.02] tracking-tight sm:text-[58px]">
            Mountain-ready cars, delivered anywhere in Denver.
          </h1>
          <p className="mt-5 max-w-xl text-[18px] leading-relaxed text-navy-soft">
            AWD and 4x4 cars on winter-rated tires, with ski racks and Traction Law compliance built in. Book direct and skip
            the platform fees.
          </p>
          <div className="card mt-8 p-4 sm:p-5">
            <TripSearchForm />
          </div>
        </div>
        <RidgelineArt className="min-h-[300px] lg:min-h-full" />
      </section>

      <section className="border-y border-line bg-panel/60">
        <div className="wrap py-8">
          <TrustRow />
        </div>
      </section>

      <section className="wrap mt-20 grid gap-8 md:grid-cols-3">
        {reasons.map((r) => (
          <div key={r.title}>
            <r.icon className="mb-4 text-gold-ink" size={26} strokeWidth={1.6} />
            <h2 className="font-display text-[22px] font-semibold">{r.title}</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-navy-soft">{r.body}</p>
          </div>
        ))}
      </section>

      <section className="wrap mt-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">The fleet</p>
            <h2 className="font-display text-[30px] font-semibold">Cars built for Colorado</h2>
          </div>
          <Link href="/cars" className="hidden font-semibold underline decoration-gold decoration-2 underline-offset-4 sm:inline">
            All {cars.length} cars
          </Link>
        </div>
        <div className="grid max-w-4xl gap-5 sm:grid-cols-2">
          {cars.slice(0, 3).map((c) => (
            <CarCard key={c.slug} car={c} />
          ))}
        </div>
      </section>

      <section className="wrap mt-20">
        <p className="eyebrow mb-2">Trips</p>
        <h2 className="mb-6 font-display text-[30px] font-semibold">What are you driving to?</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {niches.map((n) => (
            <Link key={n.href} href={n.href} className="card group flex flex-col p-5 transition hover:border-navy/40">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{n.tag}</span>
              <span className="mt-6 font-display text-[22px] font-semibold">{n.title}</span>
              <span className="mt-1 text-[15px] text-navy-soft">{n.body}</span>
              <Mountain className="mt-5 text-gold-ink transition group-hover:translate-x-1" size={18} />
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap mt-20">
        <p className="eyebrow mb-2">How delivery works</p>
        <h2 className="mb-8 font-display text-[30px] font-semibold">From booking to the trailhead</h2>
        <DeliveryProcess />
      </section>

      <section className="wrap mt-20 grid gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-2">Included every trip</p>
          <h2 className="font-display text-[30px] font-semibold">No surprises at handoff</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {included.map((i) => (
              <li key={i} className="flex gap-3 text-[16px]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <p className="eyebrow mb-2">Reviews</p>
          <h2 className="font-display text-[22px] font-semibold">Read what guests say</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-navy-soft">
            Reviews from guests who book direct appear here after each trip. Until then, see our record on Turo and Google.
          </p>
          <Link href="/reviews" className="btn-ghost mt-5">
            See reviews
          </Link>
        </div>
      </section>

      <section className="wrap mt-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Guides and tools</p>
            <h2 className="font-display text-[30px] font-semibold">Plan the drive</h2>
          </div>
          <Link href="/guides" className="hidden font-semibold underline decoration-gold decoration-2 underline-offset-4 sm:inline">
            All guides
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {guides.map(({ meta }) => (
            <Link key={meta.slug} href={`/guides/${meta.slug}`} className="card p-5 transition hover:border-navy/40">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{meta.cluster} · {meta.readMinutes} min</span>
              <span className="mt-3 block font-display text-[19px] font-semibold leading-snug">{meta.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap mt-20">
        <p className="eyebrow mb-2">FAQ</p>
        <h2 className="mb-6 font-display text-[30px] font-semibold">Before you book</h2>
        <FaqList items={faq.slice(0, 8)} />
        <JsonLd data={faqSchema(faq.slice(0, 8))} />
      </section>

      <CtaBand title={`Your car's ready for the mountains. Book ${site.shortName} direct.`} />
    </>
  );
}
