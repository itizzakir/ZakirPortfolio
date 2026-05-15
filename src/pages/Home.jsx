import { useRef } from "react";
import { useGsapReveal } from "../animations/gsap";
import { About } from "../components/sections/About";
import { Certifications } from "../components/sections/Certifications";
import { Contact } from "../components/sections/Contact";
import { Coursework } from "../components/sections/Coursework";
import { Education } from "../components/sections/Education";
import { Experience } from "../components/sections/Experience";
import { Hero } from "../components/sections/Hero";
import { Projects } from "../components/sections/Projects";
import { TechStack } from "../components/sections/TechStack";

export function Home() {
  const scopeRef = useRef(null);
  useGsapReveal(scopeRef);

  return (
    <main ref={scopeRef}>
      <Hero />
      <About />
      <Education />
      <TechStack />
      <Experience />
      <Projects />
      <Certifications />
      <Coursework />
      <Contact />
    </main>
  );
}
