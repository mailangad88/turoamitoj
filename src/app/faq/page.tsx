import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { faq } from "@/data/faq";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about renting a car from us in Denver: age, deposits, Traction Law, fees, tolls, mileage, cancellation and insurance.",
  alternates: { canonical: "/faq" },
};

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="FAQ" title="Questions people ask before they book" />
      <section className="wrap mt-10">
        <FaqList items={faq} />
        <JsonLd data={faqSchema(faq)} />
      </section>
    </>
  );
}
