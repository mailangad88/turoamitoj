export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <ol className="divide-y divide-line border-y border-line">
      {items.map((f, i) => (
        <li key={f.q}>
          <details className="group py-5">
            <summary className="flex cursor-pointer list-none items-baseline gap-4 [&::-webkit-details-marker]:hidden">
              <span className="font-mono text-[12px] text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 font-display text-[18px] font-semibold">{f.q}</span>
              <span className="text-muted transition group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p className="mt-3 max-w-prose pl-9 text-[16px] leading-relaxed text-navy-soft">{f.a}</p>
          </details>
        </li>
      ))}
    </ol>
  );
}
