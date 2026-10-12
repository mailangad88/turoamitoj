import Link from "next/link";
import { site } from "@/config/site";
import { Logo } from "./Logo";

const cols = [
  {
    title: "Rent",
    links: [
      ["/cars", "All cars"],
      ["/ski-rental-denver", "Ski trip rentals"],
      ["/monthly-car-rental-denver", "Monthly rentals"],
      ["/red-rocks", "Red Rocks nights"],
      ["/rmnp", "Rocky Mountain National Park"],
      ["/business", "Business and long-term"],
    ],
  },
  {
    title: "Plan",
    links: [
      ["/guides", "Guides"],
      ["/tools/traction-law-checker", "Traction Law checker"],
      ["/tools/ski-trip-estimator", "Ski trip estimator"],
      ["/tools/turo-vs-direct", "Turo vs direct"],
    ],
  },
  {
    title: "Company",
    links: [
      ["/about", "About"],
      ["/reviews", "Reviews"],
      ["/delivery-areas", "Delivery areas"],
      ["/pricing-and-policies", "Pricing and policies"],
      ["/faq", "FAQ"],
      ["/credits", "Photo credits"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-navy text-cream/80">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="space-y-3">
          <Logo className="text-cream" />
          <p className="max-w-xs text-[14px] leading-relaxed">{site.tagline}</p>
          <p className="font-mono text-[13px]">
            {site.phone}
            <br />
            {site.email}
          </p>
          <p className="text-[13px]">{site.hours}</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h2 className="eyebrow mb-3 text-cream/60">{c.title}</h2>
            <ul className="space-y-2 text-[14px]">
              {c.links.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-cream">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-cream/10">
        <div className="wrap flex flex-col gap-2 py-5 text-[12px] text-cream/60 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name}. Denver, Colorado.</span>
          <span>Prices include Colorado rental fees at checkout. Rentals over 30 days are exempt.</span>
        </div>
      </div>
    </footer>
  );
}
