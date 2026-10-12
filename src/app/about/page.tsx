import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { photos } from "@/data/photos";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a small Denver car rental business focused on mountain-ready cars, delivered.`,
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <>
      <PageHeader photo={photos.holyCross} eyebrow="About" title="A small Denver fleet, run by the person who answers the phone" />
      <section className="wrap mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="prose-site">
          {/* PLACEHOLDER: replace with the owner's own story. */}
          <p>
            {site.name} started as a handful of cars on Turo. Guests kept asking the same things: will this car make it up I-70
            in a storm, can you bring it to my hotel, and can I book you directly next time. This site is the answer to all three.
          </p>
          <h2>How we look after the cars</h2>
          <ul>
            <li>Tread measured and logged at every handoff.</li>
            <li>Oil, brakes and fluids on a fixed schedule, not when something breaks.</li>
            <li>Cleaned inside and out between every trip.</li>
          </ul>
        </div>
        <aside className="card h-fit p-5 text-[15px]">
          <h2 className="font-display text-[18px] font-semibold">Contact</h2>
          <p className="mt-3 select-all font-mono">{site.phone}</p>
          <p className="select-all font-mono">{site.email}</p>
          <p className="mt-3 text-navy-soft">{site.hours}</p>
        </aside>
      </section>
    </>
  );
}
