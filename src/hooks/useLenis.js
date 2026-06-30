import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth scroll driven by a SINGLE animation loop shared with GSAP. Lenis is
 * advanced from gsap.ticker (not its own rAF), and ScrollTrigger updates on
 * every Lenis scroll event, so reveals stay in sync with the smooth scroll.
 * Skipped entirely under prefers-reduced-motion (native scroll instead).
 */
export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    });

    window.lenis = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      lenis.destroy();
      if (window.lenis === lenis) delete window.lenis;
    };
  }, [enabled]);
}
