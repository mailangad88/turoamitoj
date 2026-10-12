"use client";

import { Player } from "@remotion/player";
import { useEffect, useState } from "react";
import { ROUTE_FPS, ROUTE_FRAMES, ROUTE_H, ROUTE_W, RouteToMountains } from "@/remotion/RouteToMountains";

// Plays the Remotion composition in the page. People who ask for reduced motion get the finished map, still.
export function RoutePlayer() {
  const [still, setStill] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStill(mq.matches);
  }, []);

  return (
    <div
      role="img"
      aria-label="Animated map: the drive from Denver past Morrison and the Eisenhower Tunnel to Breckenridge, about 80 miles on I-70"
      className="overflow-hidden rounded-xl bg-navy"
      style={{ aspectRatio: `${ROUTE_W} / ${ROUTE_H}` }}
    >
      {still !== null && (
        <Player
          component={RouteToMountains}
          durationInFrames={ROUTE_FRAMES}
          fps={ROUTE_FPS}
          compositionWidth={ROUTE_W}
          compositionHeight={ROUTE_H}
          style={{ width: "100%", height: "100%" }}
          autoPlay={!still}
          loop={!still}
          initialFrame={still ? 280 : 0}
          controls={false}
          clickToPlay={false}
          doubleClickToFullscreen={false}
          acknowledgeRemotionLicense
        />
      )}
    </div>
  );
}
