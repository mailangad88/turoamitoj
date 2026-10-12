import type { MetadataRoute } from "next";
import { cars } from "@/data/cars";
import { guides } from "@/content/guides";
import { abs } from "@/lib/schema";

const staticPaths = [
  "/", "/cars", "/ski-rental-denver", "/monthly-car-rental-denver", "/red-rocks", "/rmnp", "/dia-car-delivery",
  "/delivery-areas", "/pricing-and-policies", "/reviews", "/guides", "/tools", "/tools/traction-law-checker",
  "/tools/ski-trip-estimator", "/tools/turo-vs-direct", "/business", "/about", "/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPaths.map((p) => ({ url: abs(p), changeFrequency: "weekly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...cars.map((c) => ({ url: abs(`/cars/${c.slug}`), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...guides.map((g) => ({ url: abs(`/guides/${g.meta.slug}`), lastModified: g.meta.updated, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
