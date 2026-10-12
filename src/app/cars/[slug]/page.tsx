import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { cars, getCar } from "@/data/cars";
import { CarSilhouette } from "@/components/CarSilhouette";
import { QuoteWidget } from "@/components/QuoteWidget";
import { JsonLd } from "@/components/JsonLd";
import { CarCard } from "@/components/CarCard";
import { breadcrumbSchema, carSchema } from "@/lib/schema";
import { site } from "@/config/site";

export function generateStaticParams() {
  return cars.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const car = getCar((await params).slug);
  if (!car) return {};
  return {
    title: `${car.name} rental in Denver`,
    description: `${car.summary} From $${car.dailyRate}/day, delivered in Denver.`,
    alternates: { canonical: `/cars/${car.slug}` },
  };
}

export default async function CarPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const car = getCar((await params).slug);
  if (!car) notFound();
  const sp = await searchParams;
  const s = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : undefined);

  const specs: [string, string][] = [
    ["Year", String(car.year)],
    ["Color", car.color],
    ["Drive", car.drive],
    ["Seats", String(car.seats)],
    ["Tires", car.tires],
    ["Miles included", `${car.milesPerDay} a day, pooled`],
    ["Ski rack", car.skiRack ? "Yes, roof box optional" : "No"],
    ["Fuel", car.ev ? "Electric, delivered at 80%" : "Return at the same level"],
  ];

  return (
    <>
      <nav aria-label="Breadcrumb" className="wrap pt-6 text-[13px] text-muted">
        <Link href="/cars" className="hover:text-ink">Cars</Link> / <span className="text-ink">{car.name}</span>
      </nav>
      <section className="wrap mt-4 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0">
          <div className="relative flex aspect-[16/9] items-end justify-center rounded-xl bg-gradient-to-b from-[#f1f0ee] to-[#dedcd8] px-10 pb-6">
            <CarSilhouette body={car.body} className="w-[70%] text-ink" />
            <span className="absolute left-4 top-4 rounded-full bg-panel/90 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              Photo shoot coming
            </span>
          </div>
          <div className="mt-8">
            <p className="eyebrow mb-2">{car.year} · {car.drive} · {car.seats} seats</p>
            <h1 className="font-display text-[34px] font-semibold leading-tight sm:text-[44px]">{car.name}</h1>
            <p className="mt-3 max-w-prose text-[18px] leading-relaxed text-ink-soft">{car.summary}</p>
            {car.tractionLawReady && (
              <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-pine-tint px-3 py-2 text-[14px] font-medium text-pine">
                <Check size={16} /> Traction Law ready: {car.tires} tires, tread measured at every handoff
              </p>
            )}
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="mb-3 font-display text-[20px] font-semibold">Specs</h2>
              <dl className="divide-y divide-line border-y border-line text-[15px]">
                {specs.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-2.5">
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="mb-3 font-display text-[20px] font-semibold">Why people pick it</h2>
              <ul className="space-y-2 text-[15px]">
                {car.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5"><Check size={16} className="mt-1 shrink-0 text-brand-ink" />{h}</li>
                ))}
              </ul>
              <h3 className="mb-2 mt-6 font-display text-[17px] font-semibold">Best for</h3>
              <p className="text-[15px] text-ink-soft">{car.bestFor.join(" · ")}</p>
            </div>
          </div>
          <div className="mt-10 rounded-lg border border-dashed border-line p-5 text-[15px] text-ink-soft">
            <h2 className="mb-1 font-display text-[18px] font-semibold text-ink">Reviews for this car</h2>
            Guest reviews appear here after their trips.
            {site.turo.profileUrl && (
              <> Meanwhile, see <a className="underline" href={site.turo.profileUrl} target="_blank" rel="noopener noreferrer">our reviews on Turo</a>.</>
            )}
          </div>
        </div>
        <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <QuoteWidget car={car} initial={{ start: s("start"), end: s("end"), zone: s("zone") }} bookingEngineUrl={site.bookingEngineUrl} />
        </aside>
      </section>
      <section className="wrap mt-20">
        <h2 className="mb-6 font-display text-[26px] font-semibold">Other cars</h2>
        <div className="grid max-w-4xl gap-5 sm:grid-cols-2">
          {cars.filter((c) => c.slug !== car.slug).slice(0, 3).map((c) => <CarCard key={c.slug} car={c} />)}
        </div>
      </section>
      <JsonLd data={carSchema(car)} />
      <JsonLd data={breadcrumbSchema([{ name: "Cars", path: "/cars" }, { name: car.name, path: `/cars/${car.slug}` }])} />
    </>
  );
}
