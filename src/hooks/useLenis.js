import { useEffect } from "react";
import Lenis from "lenis";

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);
}
