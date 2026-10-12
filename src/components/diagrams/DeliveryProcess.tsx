import { dd } from "./tokens";

const steps = [
  { title: "Book online", sub: "dates · car · add-ons" },
  { title: "Verify license", sub: "photo + selfie check" },
  { title: "We deliver", sub: "door or hotel", focal: true },
  { title: "Drive", sub: "Traction Law ready" },
  { title: "We collect", sub: "deposit released" },
];

// Process strip (diagram-design style): one focal step in the accent, everything else in ink.
export function DeliveryProcess() {
  const w = 1000;
  const boxW = 160;
  const gap = (w - 80 - boxW * steps.length) / (steps.length - 1);
  return (
    <figure>
      <div className="hidden md:block">
        <svg viewBox={`0 0 ${w} 150`} className="block w-full" role="img" aria-labelledby="dp-title">
          <title id="dp-title">How delivery works: book online, verify your licence, we deliver, you drive, we collect.</title>
          <defs>
            <marker id="dp-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={dd.muted} />
            </marker>
          </defs>
          {steps.map((s, i) => {
            const x = 40 + i * (boxW + gap);
            return (
              <g key={s.title}>
                {i > 0 && (
                  <line x1={x - gap + 6} y1="75" x2={x - 6} y2="75" stroke={dd.muted} strokeWidth="1.2" markerEnd="url(#dp-arrow)" />
                )}
                <text x={x} y="30" fontFamily={dd.mono} fontSize="10" letterSpacing="0.16em" fill={s.focal ? dd.accent : dd.soft}>
                  {`0${i + 1}`}
                </text>
                <rect x={x} y="45" width={boxW} height="60" rx="6" fill={s.focal ? dd.accentTint : dd.node} stroke={s.focal ? dd.accent : dd.ink} />
                <text x={x + boxW / 2} y="72" textAnchor="middle" fontFamily={dd.sans} fontSize="15" fontWeight="600" fill={dd.ink}>
                  {s.title}
                </text>
                <text x={x + boxW / 2} y="91" textAnchor="middle" fontFamily={dd.mono} fontSize="11" fill={dd.muted}>
                  {s.sub}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <ol className="grid gap-2 md:hidden">
        {steps.map((s, i) => (
          <li key={s.title} className={`flex items-center gap-3 rounded-md border px-4 py-3 ${s.focal ? "border-gold-ink bg-gold-tint" : "border-line bg-panel"}`}>
            <span className={`font-mono text-[11px] tracking-[0.14em] ${s.focal ? "text-gold-ink" : "text-muted"}`}>0{i + 1}</span>
            <span className="font-semibold">{s.title}</span>
            <span className="ml-auto font-mono text-[11px] text-muted">{s.sub}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
