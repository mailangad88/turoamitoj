import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { TractionChecker } from "@/components/tools/TractionChecker";
import { TractionFlowchart } from "@/components/diagrams/TractionFlowchart";

export const metadata: Metadata = {
  title: "Colorado Traction Law checker",
  description: "Check if a car meets Colorado's Traction Law on I-70: tire type, 3/16 inch tread, chains and traction socks. Updated for CDOT's 2025 rules.",
  alternates: { canonical: "/tools/traction-law-checker" },
};

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Tool" title="Is this car legal on I-70?" lede="Updated for CDOT's November 2025 rules. AWD or 4WD alone no longer qualifies; the tires decide." />
      <section className="wrap mt-10"><TractionChecker /></section>
      <section className="wrap mt-12">
        <h2 className="mb-5 font-display text-[24px] font-semibold">The rule, step by step</h2>
        <TractionFlowchart />
        <p className="mt-4 text-[15px] text-ink-soft">More detail in the <Link href="/guides/colorado-traction-law-rental-car" className="underline">Traction Law guide</Link>. This tool is a guide, not legal advice.</p>
      </section>
    </>
  );
}
