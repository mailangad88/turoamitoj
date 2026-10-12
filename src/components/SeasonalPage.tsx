import type { Car } from "@/data/cars";
import { getFleet } from "@/lib/fleet";
import { CarCard } from "./CarCard";
import { CtaBand } from "./CtaBand";
import { FaqList } from "./FaqList";
import { JsonLd } from "./JsonLd";
import { PageHeader } from "./PageHeader";
import { TripSearchForm } from "./TripSearchForm";
import type { Photo } from "@/data/photos";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export type SeasonalProps = {
  path: string;
  eyebrow: string;
  title: string;
  lede: string;
  carFilter: (c: Car) => boolean;
  carsHeading: string;
  sections: { heading: string; body: React.ReactNode }[];
  faqs: { q: string; a: string }[];
  aside?: React.ReactNode;
  showSearch?: boolean;
  photo?: Photo;
};

export async function SeasonalPage(p: SeasonalProps) {
  const list = (await getFleet()).filter(p.carFilter);
  return (
    <>
      <PageHeader photo={p.photo} eyebrow={p.eyebrow} title={p.title} lede={p.lede}>
        {p.showSearch !== false && (
          <div className="card max-w-4xl p-4 sm:p-5">
            <TripSearchForm compact />
          </div>
        )}
      </PageHeader>
      <section className="wrap mt-14">
        <h2 className="mb-6 font-display text-[26px] font-semibold">{p.carsHeading}</h2>
        <div className="grid max-w-4xl gap-5 sm:grid-cols-2">
          {list.map((c) => (
            <CarCard key={c.slug} car={c} />
          ))}
        </div>
      </section>
      <section className="wrap mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="prose-site min-w-0">
          {p.sections.map((s) => (
            <div key={s.heading}>
              <h2>{s.heading}</h2>
              {s.body}
            </div>
          ))}
        </div>
        {p.aside && <aside className="min-w-0">{p.aside}</aside>}
      </section>
      {p.faqs.length > 0 && (
        <section className="wrap mt-16">
          <h2 className="mb-6 font-display text-[26px] font-semibold">Questions</h2>
          <FaqList items={p.faqs} />
          <JsonLd data={faqSchema(p.faqs)} />
        </section>
      )}
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: p.title, path: p.path }])} />
      <CtaBand />
    </>
  );
}
