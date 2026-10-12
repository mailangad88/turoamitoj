import { site } from "@/config/site";

// Real numbers only. Each item hides itself until its value is filled in src/config/site.ts.
export function TrustRow() {
  const items: { value: string; label: string; href?: string | null }[] = [];
  if (site.turo.rating && site.turo.trips)
    items.push({ value: `${site.turo.rating.toFixed(1)}★`, label: `${site.turo.trips} trips on Turo`, href: site.turo.profileUrl });
  if (site.google.rating && site.google.reviews)
    items.push({ value: `${site.google.rating.toFixed(1)}★`, label: `${site.google.reviews} Google reviews`, href: site.google.profileUrl });
  items.push({ value: "3/16 in", label: "minimum tread, checked every handoff" });
  items.push({ value: "$0", label: "platform fees when you book direct" });
  items.push({ value: "6am–10pm", label: "handoffs every day" });

  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((i) => (
        <li key={i.label}>
          <div className="font-display text-[22px] font-semibold tabular-nums text-ink">{i.value}</div>
          <div className="text-[13px] leading-snug text-muted">
            {i.href ? (
              <a href={i.href} className="underline decoration-line underline-offset-4" target="_blank" rel="noopener noreferrer">
                {i.label}
              </a>
            ) : (
              i.label
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
