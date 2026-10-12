import Link from "next/link";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export const nav = [
  { href: "/cars", label: "Cars" },
  { href: "/ski-rental-denver", label: "Ski trips" },
  { href: "/monthly-car-rental-denver", label: "Monthly" },
  { href: "/delivery-areas", label: "Delivery" },
  { href: "/guides", label: "Guides" },
  { href: "/tools", label: "Tools" },
];

export function Header() {
  return (
    <>
      <div className="bg-navy text-[13px] text-cream">
        <div className="wrap flex items-center justify-center gap-2 py-2 text-center">
          <span>Ski season: free roof box on trips of 5 days or more.</span>
          <Link href="/ski-rental-denver" className="font-semibold text-gold underline-offset-4 hover:underline">
            See ski cars →
          </Link>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur">
        <div className="wrap flex h-16 items-center justify-between gap-6">
          <Link href="/" aria-label="Home" className="text-navy">
            <Logo />
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-6 text-[15px] font-medium text-navy-soft lg:flex">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="hover:text-navy">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/cars" className="btn-gold hidden px-4 py-2 sm:inline-flex">
              Book a car
            </Link>
            <MobileNav items={nav} />
          </div>
        </div>
      </header>
    </>
  );
}
