import { CarSilhouette } from "./CarSilhouette";

// Hero illustration: layered Front Range ridgelines. Swap for a real photo of the fleet when available.
export function RidgelineArt({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-navy ${className}`}>
      <svg viewBox="0 0 600 440" className="h-full w-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of an SUV below the Front Range">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#14223a" />
            <stop offset="1" stopColor="#2a3d5c" />
          </linearGradient>
        </defs>
        <rect width="600" height="440" fill="url(#sky)" />
        <circle cx="430" cy="120" r="42" fill="#d6a032" opacity="0.9" />
        <path d="M0 250 L70 190 L120 220 L190 140 L240 185 L300 120 L360 175 L420 130 L490 190 L540 160 L600 200 L600 440 L0 440 Z" fill="#3b4f70" />
        <path d="M190 140 L205 157 L195 160 L182 150 Z M300 120 L318 140 L304 142 L290 132 Z M420 130 L436 147 L424 149 L410 140 Z" fill="#f6f1e7" opacity="0.85" />
        <path d="M0 300 L90 245 L160 280 L250 220 L330 265 L410 225 L500 270 L600 240 L600 440 L0 440 Z" fill="#2c3f5e" />
        <path d="M0 350 L120 310 L230 335 L340 300 L450 330 L600 305 L600 440 L0 440 Z" fill="#1d2d48" />
        <path d="M0 395 Q300 360 600 392 L600 440 L0 440 Z" fill="#14223a" />
        <path d="M60 412 Q300 382 560 410" fill="none" stroke="#d6a032" strokeWidth="1.5" strokeDasharray="10 9" opacity="0.6" />
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={i} x1="0" x2="600" y1={30 + i * 9} y2={30 + i * 9} stroke="#f6f1e7" strokeOpacity="0.025" />
        ))}
      </svg>
      <CarSilhouette body="suv" className="absolute bottom-[9%] left-[32%] w-[38%] text-[#0b1424]" />
      <div className="absolute left-4 top-4 rounded-full bg-cream/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-cream/80 backdrop-blur">
        I-70 · Eisenhower Tunnel · 11,158 ft
      </div>
    </div>
  );
}
