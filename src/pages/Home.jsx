import { lazy, Suspense, useRef } from "react";
import { useGsapReveal } from "../animations/gsap";
import { Hero } from "../components/sections/Hero";

// Hero paints immediately; everything below the fold is split into its own
// chunk and streamed in as the user scrolls, keeping the initial bundle lean.
const About = lazy(() => import("../components/sections/About").then((m) => ({ default: m.About })));
const Education = lazy(() => import("../components/sections/Education").then((m) => ({ default: m.Education })));
const TechStack = lazy(() => import("../components/sections/TechStack").then((m) => ({ default: m.TechStack })));
const Experience = lazy(() => import("../components/sections/Experience").then((m) => ({ default: m.Experience })));
const Projects = lazy(() => import("../components/sections/Projects").then((m) => ({ default: m.Projects })));
const Certifications = lazy(() => import("../components/sections/Certifications").then((m) => ({ default: m.Certifications })));
const Coursework = lazy(() => import("../components/sections/Coursework").then((m) => ({ default: m.Coursework })));
const Contact = lazy(() => import("../components/sections/Contact").then((m) => ({ default: m.Contact })));

// Reserve vertical space so lazy sections don't cause layout shift / scroll jump.
const sectionFallback = <div className="min-h-[60vh]" aria-hidden="true" />;

export function Home() {
  const scopeRef = useRef(null);
  useGsapReveal(scopeRef);

  return (
    <main ref={scopeRef}>
      <Hero />
      <Suspense fallback={sectionFallback}>
        <About />
        <Education />
        <TechStack />
        <Experience />
        <Projects />
        <Certifications />
        <Coursework />
        <Contact />
      </Suspense>
    </main>
  );
}
