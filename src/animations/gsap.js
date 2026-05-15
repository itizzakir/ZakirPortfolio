import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal(scopeRef) {
  useEffect(() => {
    if (!scopeRef.current) return undefined;

    const context = gsap.context(() => {
      gsap.utils.toArray(".gsap-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 36, filter: "blur(14px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
            },
          },
        );
      });
    }, scopeRef);

    return () => context.revert();
  }, [scopeRef]);
}
