import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame, useVideoConfig } from "remotion";

// Denver to Breckenridge on I-70, drawn west-to-the-left like a map. Coordinates are stylized, not to scale.
// Rendered live in the browser with @remotion/player (see components/motion/RoutePlayer.tsx).

export const ROUTE_W = 1200;
export const ROUTE_H = 520;
export const ROUTE_FPS = 30;
export const ROUTE_FRAMES = 330;

type Stop = { x: number; y: number; name: string; note: string; ft: number };

const stops: Stop[] = [
  { x: 1060, y: 400, name: "Denver", note: "Delivered to your door", ft: 5280 },
  { x: 800, y: 372, name: "Morrison", note: "Traction Law corridor begins", ft: 5800 },
  { x: 470, y: 250, name: "Eisenhower Tunnel", note: "Highest point on I-70", ft: 11158 },
  { x: 175, y: 330, name: "Breckenridge", note: "About 80 miles from Denver", ft: 9600 },
];

// Points along the road between stops, so the line bends like a mountain highway.
const road: [number, number][] = [
  [1060, 400], [960, 392], [870, 380], [800, 372], [740, 345], [690, 330], [640, 300],
  [590, 292], [540, 268], [470, 250], [410, 262], [350, 290], [300, 300], [240, 318], [175, 330],
];

const segLens = road.slice(1).map(([x, y], i) => Math.hypot(x - road[i][0], y - road[i][1]));
const total = segLens.reduce((a, b) => a + b, 0);
const stopAt = stops.map((s) => {
  let acc = 0;
  for (let i = 0; i < road.length; i++) {
    if (road[i][0] === s.x && road[i][1] === s.y) return acc / total;
    acc += segLens[i] ?? 0;
  }
  return 1;
});

function pointAt(t: number): [number, number] {
  let d = t * total;
  for (let i = 0; i < segLens.length; i++) {
    if (d <= segLens[i]) {
      const k = d / segLens[i];
      return [road[i][0] + (road[i + 1][0] - road[i][0]) * k, road[i][1] + (road[i + 1][1] - road[i][1]) * k];
    }
    d -= segLens[i];
  }
  return road[road.length - 1];
}

const roadPath = road.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");

const C = { ink: "#111111", ink2: "#1f1f22", ridge1: "#3a3a42", ridge2: "#2b2b31", ridge3: "#1c1c20", cream: "#f7f6f3", brand: "#ff7a00" };

export function RouteToMountains() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Drive from 0.8s to 8.5s, hold, then fade before the loop restarts.
  const t = interpolate(frame, [24, 255], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const fadeOut = interpolate(frame, [ROUTE_FRAMES - 20, ROUTE_FRAMES], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const [cx, cy] = pointAt(t);

  // Elevation readout follows the stops the car has passed.
  let ft = stops[0].ft;
  for (let i = 1; i < stops.length; i++) {
    const a = stopAt[i - 1];
    const b = stopAt[i];
    if (t >= a) ft = Math.round(interpolate(t, [a, b], [stops[i - 1].ft, stops[i].ft], { extrapolateRight: "clamp" }));
  }
  const miles = Math.round(t * 80);
  const drift = Math.sin(frame / fps / 2) * 6;

  return (
    <AbsoluteFill style={{ background: C.ink, opacity: fadeIn * fadeOut, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
      <svg viewBox={`0 0 ${ROUTE_W} ${ROUTE_H}`} width="100%" height="100%">
        <defs>
          <linearGradient id="rtm-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={C.ink} />
            <stop offset="1" stopColor="#2a2a30" />
          </linearGradient>
        </defs>
        <rect width={ROUTE_W} height={ROUTE_H} fill="url(#rtm-sky)" />
        <circle cx={980} cy={110 + drift} r={46} fill={C.brand} opacity={0.85} />

        {/* Snow: deterministic so every loop matches */}
        {Array.from({ length: 50 }).map((_, i) => {
          const x = random(`x${i}`) * ROUTE_W;
          const speed = 0.4 + random(`s${i}`) * 0.9;
          const y = (random(`y${i}`) * ROUTE_H + frame * speed) % ROUTE_H;
          return <circle key={i} cx={x + Math.sin((frame + i * 20) / 30) * 4} cy={y} r={1 + random(`r${i}`) * 1.4} fill={C.cream} opacity={0.35} />;
        })}

        <path d="M0 300 L120 190 L220 240 L330 150 L420 210 L470 130 L540 200 L640 160 L740 240 L830 260 L950 300 L1200 320 L1200 520 L0 520 Z" fill={C.ridge1} />
        <path d="M318 162 L330 150 L345 168 L333 170 Z M458 143 L470 130 L486 150 L472 152 Z M628 170 L640 160 L656 176 L642 178 Z M110 200 L120 190 L134 206 L121 208 Z" fill={C.cream} opacity={0.85} />
        <path d="M0 380 L160 300 L300 345 L430 290 L560 340 L700 300 L820 380 L1200 400 L1200 520 L0 520 Z" fill={C.ridge2} />
        <path d="M0 450 L200 410 L420 440 L640 405 L900 440 L1200 430 L1200 520 L0 520 Z" fill={C.ridge3} />

        {/* Road: faint full route, then the driven part in orange */}
        <path d={roadPath} fill="none" stroke={C.cream} strokeOpacity={0.18} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 10" />
        <path
          d={roadPath}
          fill="none"
          stroke={C.brand}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1 1"
          strokeDashoffset={1 - t}
        />

        {stops.map((s, i) => {
          const reached = t >= stopAt[i] - 0.001;
          const pop = interpolate(t, [Math.min(stopAt[i], 0.96) - 0.02, Math.min(stopAt[i], 0.96) + 0.04], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const above = i === 2;
          const ly = above ? s.y - 52 : s.y + 46;
          const anchor = i === 0 ? "end" : i === stops.length - 1 ? "start" : "middle";
          const lx = i === 0 ? s.x + 10 : i === stops.length - 1 ? s.x - 20 : s.x;
          return (
            <g key={s.name}>
              <circle cx={s.x} cy={s.y} r={reached ? 9 : 6} fill={reached ? C.brand : C.ink2} stroke={C.cream} strokeOpacity={0.7} strokeWidth={2} />
              <g opacity={i === 0 ? 1 : pop} transform={`translate(0 ${(1 - (i === 0 ? 1 : pop)) * 8})`}>
                <text x={lx} y={ly} textAnchor={anchor} fill={C.cream} fontSize={28} fontWeight={600}>
                  {s.name}
                </text>
                <text x={lx} y={ly + 26} textAnchor={anchor} fill={C.cream} fillOpacity={0.75} fontSize={18}>
                  {s.note}
                </text>
              </g>
            </g>
          );
        })}

        {/* The car */}
        <circle cx={cx} cy={cy} r={16} fill={C.brand} opacity={0.25} />
        <circle cx={cx} cy={cy} r={7} fill={C.cream} />
      </svg>

      <div style={{ position: "absolute", left: 28, top: 24, display: "flex", gap: 12 }}>
        <Readout label="Elevation" value={`${ft.toLocaleString("en-US")} ft`} />
        <Readout label="Miles" value={`${miles}`} />
      </div>
    </AbsoluteFill>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: "rgba(246,241,231,0.08)", border: "1px solid rgba(246,241,231,0.18)", borderRadius: 8, padding: "10px 16px", color: C.cream }}>
      <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.7 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 600, fontVariantNumeric: "tabular-nums", marginTop: 2 }}>{value}</div>
    </div>
  );
}
