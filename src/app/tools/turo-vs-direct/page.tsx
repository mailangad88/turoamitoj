import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { TuroVsDirect } from "@/components/tools/TuroVsDirect";

export const metadata: Metadata = {
  title: "Turo vs booking direct: savings calculator",
  description: "Compare the Turo checkout total with our all-in direct price for the same car and dates.",
  alternates: { canonical: "/tools/turo-vs-direct" },
};

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Tool" title="Turo or direct: which is cheaper?" lede="Our direct price already includes Colorado fees and tax. Paste the Turo total for the same dates and compare." />
      <section className="wrap mt-10"><TuroVsDirect /></section>
    </>
  );
}
