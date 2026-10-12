"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function MobileNav({ items }: { items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
        <span className="sr-only">Menu</span>
      </button>
      {open && (
        <nav id="mobile-nav" className="absolute inset-x-0 top-16 border-b border-line bg-cream px-4 pb-5 pt-2 shadow-sm">
          <ul className="flex flex-col">
            {items.map((i) => (
              <li key={i.href}>
                <Link href={i.href} onClick={() => setOpen(false)} className="block border-b border-line py-3 text-[17px] font-medium text-ink">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/cars" onClick={() => setOpen(false)} className="btn-brand mt-4 w-full">
            Book a car
          </Link>
        </nav>
      )}
    </div>
  );
}
