import { useEffect } from "react";
import { motionValue } from "framer-motion";

const initialX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
const initialY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;

// Module-level singletons: pointer state lives outside React, so moving the
// mouse never triggers a re-render. Consumers read these MotionValues (cursor)
// or the --mx/--my CSS custom properties (spotlight) directly.
export const pointerX = motionValue(initialX);
export const pointerY = motionValue(initialY);

let listeners = 0;
let rafId = 0;
let pending = false;
let lastX = initialX;
let lastY = initialY;

function flush() {
  pending = false;
  pointerX.set(lastX);
  pointerY.set(lastY);
  const root = document.documentElement;
  root.style.setProperty("--mx", `${lastX}px`);
  root.style.setProperty("--my", `${lastY}px`);
}

function onPointerMove(event) {
  lastX = event.clientX;
  lastY = event.clientY;
  if (!pending) {
    pending = true;
    rafId = requestAnimationFrame(flush);
  }
}

/**
 * Installs a single, rAF-throttled pointermove listener (ref-counted across all
 * consumers). Enable only when a pointer-driven effect is actually active.
 */
export function usePointerTracking(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;

    listeners += 1;
    if (listeners === 1) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    return () => {
      listeners -= 1;
      if (listeners === 0) {
        window.removeEventListener("pointermove", onPointerMove);
        if (rafId) cancelAnimationFrame(rafId);
        pending = false;
      }
    };
  }, [enabled]);
}
