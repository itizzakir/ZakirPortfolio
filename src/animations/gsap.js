import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Scroll-reveal for elements tagged `.gsap-reveal`. Sections below the fold are
 * lazy-loaded, so reveal targets enter the DOM after this hook first runs — a
 * MutationObserver wires up newly-mounted elements as they appear, and each one
 * is marked `data-revealed` so it is only ever animated once.
 */
export function useGsapReveal(scopeRef) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return undefined;

    // Reduced motion: reveal everything immediately, now and as sections mount.
    if (prefersReducedMotion()) {
      const revealAll = () =>
        gsap.set(scope.querySelectorAll(".gsap-reveal"), { autoAlpha: 1, y: 0, filter: "none" });
      revealAll();
      const observer = new MutationObserver(revealAll);
      observer.observe(scope, { childList: true, subtree: true });
      return () => observer.disconnect();
    }

    const tweens = [];

    const register = () => {
      const targets = scope.querySelectorAll(".gsap-reveal:not([data-revealed])");
      if (!targets.length) return;
      targets.forEach((element) => {
        element.setAttribute("data-revealed", "");
        tweens.push(
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 36, filter: "blur(14px)" },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 82%" },
            },
          ),
        );
      });
      ScrollTrigger.refresh();
    };

    register();
    const observer = new MutationObserver(register);
    observer.observe(scope, { childList: true, subtree: true });
    window.addEventListener("load", register);

    return () => {
      observer.disconnect();
      window.removeEventListener("load", register);
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, [scopeRef]);
}
