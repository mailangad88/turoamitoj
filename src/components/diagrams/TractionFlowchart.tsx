import { dd } from "./tokens";

// Flowchart (diagram-design type-flowchart): shape carries type, accent marks the happy path.
export function TractionFlowchart() {
  const label = { fontFamily: dd.sans, fontSize: 13, fontWeight: 600, fill: dd.ink, textAnchor: "middle" as const };
  const sub = { fontFamily: dd.mono, fontSize: 10, fill: dd.muted, textAnchor: "middle" as const };
  const tag = { fontFamily: dd.mono, fontSize: 9, letterSpacing: "0.12em", textAnchor: "middle" as const };
  const arrow = { stroke: dd.muted, strokeWidth: 1.2, markerEnd: "url(#tl-arrow)" };
  const hot = { stroke: dd.accent, strokeWidth: 1.6, markerEnd: "url(#tl-arrow-accent)" };

  return (
    <figure className="card overflow-hidden">
      <div className="overflow-x-auto">
        <svg viewBox="0 0 760 520" className="mx-auto block w-full min-w-[620px] max-w-[860px]" role="img" aria-labelledby="tl-title tl-desc">
          <title id="tl-title">Is your car legal on I-70 under the Traction Law?</title>
          <desc id="tl-desc">
            Rated tires with at least 3/16 inch of tread are compliant. Otherwise chains or traction socks are required; without them the fine is $50 plus a $17 surcharge.
          </desc>
          <defs>
            <pattern id="tl-dots" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.9" fill="rgba(20,34,58,0.10)" />
            </pattern>
            <marker id="tl-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={dd.muted} />
            </marker>
            <marker id="tl-arrow-accent" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={dd.accent} />
            </marker>
          </defs>
          <rect width="760" height="520" fill={dd.paper} />
          <rect width="760" height="520" fill="url(#tl-dots)" opacity="0.6" />

          {/* arrows */}
          <line x1="280" y1="84" x2="280" y2="112" {...arrow} />
          <line x1="280" y1="208" x2="280" y2="240" {...hot} />
          <line x1="280" y1="336" x2="280" y2="380" {...hot} />
          <path d="M380 160 L560 160 L560 236" fill="none" {...arrow} />
          <line x1="380" y1="288" x2="456" y2="288" {...arrow} />
          <line x1="560" y1="336" x2="560" y2="380" {...arrow} />
          <path d="M660 288 L700 288 L700 470 L640 470" fill="none" {...arrow} />

          {/* branch labels */}
          {[
            [296, 228, "YES", dd.accent],
            [296, 362, "YES", dd.accent],
            [470, 152, "NO", dd.muted],
            [420, 280, "NO", dd.muted],
            [576, 362, "YES", dd.muted],
            [680, 280, "NO", dd.muted],
          ].map(([x, y, t, c]) => (
            <g key={`${x}-${y}`}>
              <rect x={(x as number) - 16} y={(y as number) - 9} width="32" height="13" rx="2" fill={dd.paper} />
              <text x={x} y={y} {...tag} fill={c as string}>{t}</text>
            </g>
          ))}

          {/* start */}
          <rect x="180" y="36" width="200" height="48" rx="20" fill="rgba(20,34,58,0.03)" stroke="rgba(20,34,58,0.3)" />
          <text x="280" y="58" {...label}>Driving I-70</text>
          <text x="280" y="74" {...sub}>Sept 1 – May 31</text>

          {/* d1 */}
          <polygon points="280,112 380,160 280,208 180,160" fill={dd.node} stroke={dd.ink} />
          <text x="280" y="156" {...label}>Winter, all-weather</text>
          <text x="280" y="172" {...label}>or M+S tires?</text>

          {/* d2 */}
          <polygon points="280,240 380,288 280,336 180,288" fill={dd.node} stroke={dd.ink} />
          <text x="280" y="284" {...label}>Tread at least</text>
          <text x="280" y="300" {...label}>3/16 inch?</text>

          {/* d3 */}
          <polygon points="560,240 660,288 560,336 460,288" fill={dd.node} stroke={dd.ink} />
          <text x="560" y="284" {...label}>Chains or socks</text>
          <text x="560" y="300" {...label}>on drive tires?</text>

          {/* ends */}
          <rect x="180" y="380" width="200" height="56" rx="20" fill={dd.accentTint} stroke={dd.accent} />
          <text x="280" y="404" {...label}>Compliant</text>
          <text x="280" y="421" {...sub}>our standard, checked</text>

          <rect x="460" y="380" width="200" height="48" rx="20" fill="rgba(20,34,58,0.03)" stroke="rgba(20,34,58,0.3)" />
          <text x="560" y="402" {...label}>Compliant</text>
          <text x="560" y="418" {...sub}>while the device is fitted</text>

          <rect x="440" y="446" width="200" height="48" rx="20" fill="rgba(20,34,58,0.03)" stroke="rgba(20,34,58,0.3)" />
          <text x="540" y="468" {...label}>Not compliant</text>
          <text x="540" y="484" {...sub}>$50 fine + $17 surcharge</text>

          <text x="40" y="504" fontFamily={dd.mono} fontSize="9" letterSpacing="0.16em" fill={dd.soft}>
            AWD OR 4WD ALONE NO LONGER QUALIFIES · CDOT, NOV 2025
          </text>
        </svg>
      </div>
    </figure>
  );
}
