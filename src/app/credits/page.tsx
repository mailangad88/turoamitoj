import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { photos } from "@/data/photos";

export const metadata: Metadata = {
  title: "Photo credits",
  description: "The photographers whose work appears on this site.",
  alternates: { canonical: "/credits" },
};

export default function CreditsPage() {
  return (
    <>
      <PageHeader eyebrow="Credits" title="Photo credits" lede="Scenery photos are from Unsplash, used under the Unsplash License. Thank you to these photographers." />
      <section className="wrap mt-10">
        <ul className="grid max-w-3xl gap-3">
          {Object.values(photos).map((p) => (
            <li key={p.src} className="card flex flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-[15px] text-navy-soft">{p.alt}</span>
              <a href={`${p.page}?utm_source=direct_site&utm_medium=referral`} target="_blank" rel="noopener noreferrer" className="shrink-0 font-semibold underline decoration-gold decoration-2 underline-offset-4">
                {p.credit}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-[14px] text-muted">The Jeeps in stock photos are not our cars.</p>
      </section>
    </>
  );
}
