import Link from "next/link";
import Image from "next/image";
import { ArrowRight, PackageCheck, Snowflake, Truck } from "lucide-react";
import { PhotoCredit } from "@/components/PhotoCredit";
import { RouteMotion } from "@/components/motion/RouteMotion";
import { photos } from "@/data/photos";
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

const hero = photos.jeepSnowRoad;

const niches = [
  { href: "/ski-rental-denver", title: "Ski trips", body: "Racks, roof boxes and rated tires for I-70.", tag: "Sept–May", photo: photos.breckenridge },
  { href: "/rmnp", title: "National parks", body: "Rocky Mountain, Great Sand Dunes, Moab.", tag: "Year round", photo: photos.rmnpNight },
  { href: "/red-rocks", title: "Concert nights", body: "Get to Red Rocks and back without the shuttle.", tag: "Apr–Oct", photo: photos.redRocks },
  { href: "/monthly-car-rental-denver", title: "Monthly", body: "30% off, and no daily state fees past 30 days.", tag: "31+ days", photo: photos.unionStationHall },
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
      <section className="relative isolate overflow-hidden bg-ink text-cream">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
          style={{ objectPosition: hero.focus }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/10" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-ink/85 to-transparent lg:h-1/3" />
        <div className="wrap grid items-end gap-10 pb-16 pt-16 sm:pt-24 lg:min-h-[640px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:pb-20">
          <div>
            <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-brand">Denver car rental · delivered</p>
            <h1 className="font-display text-[42px] font-extrabold italic leading-[1.0] tracking-tight sm:text-[64px]">
              Mountain-ready Jeeps, delivered anywhere in Denver.
            </h1>
            <p className="mt-5 max-w-xl text-[18px] leading-relaxed text-cream/85">
              Two 4x4 Jeeps on M+S tires, ready for I-70 and the Traction Law. We bring the car to you. Book direct and skip
              the platform fees.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] uppercase tracking-[0.12em] text-cream/70">
              <span>4x4 with low range</span>
              <span>Up to 7 seats</span>
              <span>Price includes fees and tax</span>
            </div>
          </div>
          <div className="card p-4 text-ink shadow-2xl shadow-black/30 sm:p-6">
            <p className="mb-4 font-display text-[20px] font-semibold">When do you need it?</p>
            <TripSearchForm />
          </div>
        </div>
        <PhotoCredit photo={hero} className="absolute bottom-3 right-3" />
      </section>

      <section className="border-y border-line bg-panel/60">
        <div className="wrap py-8">
          <TrustRow />
        </div>
      </section>

      <section className="wrap mt-20 grid gap-8 md:grid-cols-3">
        {reasons.map((r) => (
          <div key={r.title}>
            <r.icon className="mb-4 text-brand-ink" size={26} strokeWidth={1.6} />
            <h2 className="font-display text-[22px] font-semibold">{r.title}</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">{r.body}</p>
          </div>
        ))}
      </section>

      <section className="wrap mt-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">The fleet</p>
            <h2 className="font-display text-[30px] font-semibold">Cars built for Colorado</h2>
          </div>
          <Link href="/cars" className="hidden font-semibold underline decoration-brand decoration-2 underline-offset-4 sm:inline">
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
            <Link
              key={n.href}
              href={n.href}
              className="group relative isolate flex aspect-[4/3] flex-col sm:aspect-[4/5] justify-end overflow-hidden rounded-xl bg-ink p-5 text-cream"
            >
              <Image
                src={n.photo.src}
                alt={n.photo.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="-z-20 object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/45 to-ink/5" />
              <span className="absolute left-4 top-4 rounded-full bg-black/35 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/90 backdrop-blur">
                {n.tag}
              </span>
              <span className="font-display text-[24px] font-semibold">{n.title}</span>
              <span className="mt-1 text-[15px] text-cream/80">{n.body}</span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand">
                Plan it <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
          Photos via <Link href="/credits" className="underline underline-offset-2">Unsplash</Link>
        </p>
      </section>

      <section className="wrap mt-20 grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div>
          <p className="eyebrow mb-2">Denver to the slopes</p>
          <h2 className="font-display text-[30px] font-semibold leading-tight">From your door to 11,158 feet</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
            The Traction Law zone on I-70 starts at Morrison, and from September through May every car needs rated tires or
            chains. Ours leave Denver ready, so the only thing you check at the tunnel is the view.
          </p>
          <Link href="/guides/denver-to-breckenridge" className="mt-5 inline-flex items-center gap-1.5 font-semibold underline decoration-brand decoration-2 underline-offset-4">
            Read the Denver to Breckenridge guide
          </Link>
        </div>
        <RouteMotion />
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
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <p className="eyebrow mb-2">Reviews</p>
          <h2 className="font-display text-[22px] font-semibold">Read what guests say</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
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
          <Link href="/guides" className="hidden font-semibold underline decoration-brand decoration-2 underline-offset-4 sm:inline">
            All guides
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {guides.map(({ meta }) => (
            <Link key={meta.slug} href={`/guides/${meta.slug}`} className="card p-5 transition hover:border-ink/40">
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
