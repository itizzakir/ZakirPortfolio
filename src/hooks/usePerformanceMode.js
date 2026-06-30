import { useEffect, useState } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOBILE_QUERY = "(max-width: 1023px)";
const COARSE_QUERY = "(pointer: coarse)";

function detect() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return { reducedMotion: false, isTouch: false, isMobile: false, lowPower: false };
  }

  const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
  const isTouch = window.matchMedia(COARSE_QUERY).matches || "ontouchstart" in window;
  const isMobile = window.matchMedia(MOBILE_QUERY).matches;
  const cores = navigator.hardwareConcurrency || 8;
  const memory = navigator.deviceMemory || 8;
  const lowPower = cores <= 4 || memory <= 4;

  return { reducedMotion, isTouch, isMobile, lowPower };
}

function derive(base) {
  const tier = base.reducedMotion
    ? "minimal"
    : base.isMobile || base.lowPower
      ? "low"
      : "high";

  return {
    ...base,
    tier,
    // High-cost WebGL detail / second canvas only on capable desktops.
    enableHeavyFx: tier === "high",
    // Ambient particle/constellation layer: on everywhere except reduced-motion.
    enableParticles: tier !== "minimal",
    // Custom cursor + spotlight: pointer-precise, non-touch, motion allowed.
    enableCursor: !base.isTouch && !base.reducedMotion,
    // Full-screen blended overlays (noise/spotlight): desktop, motion allowed.
    enableAmbientOverlays: !base.isMobile && !base.reducedMotion,
  };
}

/**
 * Central capability gate. Components read its flags to skip or simplify heavy
 * effects on touch / low-power / small-screen / reduced-motion environments.
 * Re-evaluates when any of the underlying media queries change.
 */
export function usePerformanceMode() {
  const [mode, setMode] = useState(() => derive(detect()));

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }

    const queries = [REDUCED_MOTION_QUERY, MOBILE_QUERY, COARSE_QUERY].map((query) =>
      window.matchMedia(query),
    );
    const update = () => setMode(derive(detect()));

    queries.forEach((mq) => mq.addEventListener("change", update));
    return () => queries.forEach((mq) => mq.removeEventListener("change", update));
  }, []);

  return mode;
}
