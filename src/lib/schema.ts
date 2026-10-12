import { site } from "@/config/site";
import type { Car } from "@/data/cars";

export const abs = (path: string) => new URL(path, site.url).toString();

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    areaServed: ["Denver", "Aurora", "Lakewood", "Boulder", "Golden"].map((name) => ({ "@type": "City", name })),
    address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.region, addressCountry: "US" },
    openingHours: "Mo-Su 06:00-22:00",
  };
}

export function carSchema(car: Car) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${car.year} ${car.name} rental in Denver`,
    description: car.summary,
    url: abs(`/cars/${car.slug}`),
    brand: { "@type": "Brand", name: car.name.split(" ")[0] },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: car.dailyRate,
      priceSpecification: { "@type": "UnitPriceSpecification", price: car.dailyRate, priceCurrency: "USD", unitText: "DAY" },
      availability: "https://schema.org/InStock",
      seller: { "@type": "AutoRental", name: site.name },
    },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((i, n) => ({ "@type": "ListItem", position: n + 1, name: i.name, item: abs(i.path) })),
  };
}
