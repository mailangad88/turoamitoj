"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, CarFront, Inbox, LayoutDashboard, Tag } from "lucide-react";

const items = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: Inbox },
  { href: "/admin/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/admin/fleet", label: "Fleet", icon: CarFront },
  { href: "/admin/pricing", label: "Pricing", icon: Tag },
];

export function AdminNav() {
  const path = usePathname();
  return (
    <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-3 lg:pb-0">
      {items.map(({ href, label, icon: Icon }) => {
        const on = href === "/admin" ? path === "/admin" : path.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={on ? "page" : undefined}
            className={`flex shrink-0 items-center gap-2.5 rounded-md px-3 py-2 text-[14px] font-medium transition ${
              on ? "bg-brand text-ink" : "text-cream/75 hover:bg-white/10 hover:text-cream"
            }`}
          >
            <Icon size={17} strokeWidth={1.8} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
