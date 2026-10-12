import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { photos } from "@/data/photos";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Business, film crew and long-term rentals",
  description: "Corporate accounts, film and production crews, insurance replacement and relocation packages in Denver.",
  alternates: { canonical: "/business" },
};

const offers = [
  ["Corporate accounts", "Monthly invoicing, multiple drivers, delivery to your office or hotel."],
  ["Film and production", "Several matching vehicles, early-morning delivery, location moves."],
  ["Insurance replacement", "Direct billing with your adjuster where possible, for the length of the repair."],
  ["Relocation packages", "A car from the day you land until your own arrives, with a truck for moving day."],
];

export default function Page() {
  return (
    <>
      <PageHeader photo={photos.denverSkyline} eyebrow="Business and long-term" title="Rentals for teams, crews and long stays" lede="Tell us what you need and we'll send a quote, usually the same day." />
      <section className="wrap mt-10 grid gap-10 lg:grid-cols-2">
        <ul className="grid gap-4">
          {offers.map(([t, b]) => (
            <li key={t} className="card p-5"><h2 className="font-display text-[18px] font-semibold">{t}</h2><p className="mt-1 text-[15px] text-ink-soft">{b}</p></li>
          ))}
        </ul>
        <div className="card h-fit p-6">
          <h2 className="font-display text-[20px] font-semibold">Ask for a quote</h2>
          <p className="mt-2 text-[15px] text-ink-soft">Email us with dates, number of vehicles and where you need them.</p>
          <p className="mt-4 select-all font-mono text-[15px]">{site.email}</p>
          <p className="select-all font-mono text-[15px]">{site.phone}</p>
        </div>
      </section>
    </>
  );
}
