import { motion } from "framer-motion";
import { coursework } from "../../constants/portfolio";
import { staggerContainer, viewport } from "../../animations/variants";
import { SectionHeading } from "../shared/SectionHeading";

export function Coursework() {
  return (
    <section id="coursework" className="section-shell overflow-hidden">
      <div className="container">
        <SectionHeading
          eyebrow="Coursework"
          title="Core concepts behind the build."
          subtitle="A compact knowledge map covering databases, Java, Spring Boot, APIs, and modern frontend development."
        />

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport} className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3">
          {coursework.map((item, index) => (
            <motion.span
              key={item}
              variants={{
                hidden: { opacity: 0, y: 18, scale: 0.94 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 120, damping: 16, delay: index * 0.02 },
                },
              }}
              className="floating-pill rounded-full border border-white/10 bg-white/7 px-5 py-3 text-sm font-semibold text-white/74 shadow-neon-soft backdrop-blur-xl"
            >
              {item}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
