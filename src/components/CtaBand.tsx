import Link from "next/link";

export function CtaBand({ title = "Your car's ready for the mountains.", href = "/cars", label = "Book a car" }: { title?: string; href?: string; label?: string }) {
  return (
    <section className="wrap mt-20">
      <div className="flex flex-col items-start gap-5 rounded-xl bg-ink px-6 py-10 text-cream sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <h2 className="font-display text-[26px] font-semibold leading-tight sm:text-[32px]">{title}</h2>
        <Link href={href} className="btn-brand shrink-0">
          {label}
        </Link>
      </div>
    </section>
  );
}
