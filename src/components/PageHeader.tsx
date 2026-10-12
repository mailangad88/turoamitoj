export function PageHeader({ eyebrow, title, lede, children }: { eyebrow: string; title: string; lede?: string; children?: React.ReactNode }) {
  return (
    <section className="border-b border-line">
      <div className="wrap py-12 sm:py-16">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h1 className="max-w-3xl font-display text-[34px] font-semibold leading-[1.08] tracking-tight sm:text-[48px]">{title}</h1>
        {lede && <p className="mt-4 max-w-2xl text-[18px] leading-relaxed text-navy-soft">{lede}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
