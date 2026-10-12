"use client";

import dynamic from "next/dynamic";
import { ROUTE_H, ROUTE_W } from "@/remotion/RouteToMountains";

// Loads the Remotion player only in the browser, after the page, so it never slows the first paint.
const RoutePlayer = dynamic(() => import("./RoutePlayer").then((m) => m.RoutePlayer), {
  ssr: false,
  loading: () => <div className="rounded-xl bg-ink" style={{ aspectRatio: `${ROUTE_W} / ${ROUTE_H}` }} />,
});

export function RouteMotion() {
  return <RoutePlayer />;
}
