import type { ComponentType } from "react";
import TractionLaw, { meta as tractionMeta } from "./traction-law";
import DenverToBreck, { meta as breckMeta } from "./denver-to-breckenridge";
import Monthly, { meta as monthlyMeta } from "./monthly-car-rental-denver";

export type GuideMeta = {
  slug: string;
  title: string;
  description: string;
  cluster: "Ski season" | "Living here" | "Road trips" | "Events" | "Airport" | "Turo shoppers";
  updated: string;
  readMinutes: number;
};

export const guides: { meta: GuideMeta; Body: ComponentType }[] = [
  { meta: tractionMeta, Body: TractionLaw },
  { meta: breckMeta, Body: DenverToBreck },
  { meta: monthlyMeta, Body: Monthly },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.meta.slug === slug);
}
