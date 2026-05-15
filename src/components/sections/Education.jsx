import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { education } from "../../constants/portfolio";
import { fadeUp, viewport } from "../../animations/variants";
import { SectionHeading } from "../shared/SectionHeading";

export function Education() {
  return (
    <section id="education" className="section-shell">
      <div className="container">
        <SectionHeading
          eyebrow="Education"
          title="Academic timeline"
          subtitle="A focused computer science foundation with the engineering discipline to ship full-stack systems."
        />

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-cyan-300 via-violet-400 to-transparent sm:left-1/2" aria-hidden="true" />
          <div className="space-y-8">
            {education.map((item, index) => (
              <motion.div
                key={item.school}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className={`relative grid gap-5 sm:grid-cols-2 ${index % 2 ? "" : "sm:text-right"}`}
              >
                <div className={`pl-12 sm:pl-0 ${index % 2 ? "sm:col-start-2 sm:pl-10" : "sm:pr-10"}`}>
                  <div className="glass-panel rounded-[8px] border border-white/10 p-5 shadow-neon-soft">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1 text-xs font-semibold text-cyan-100">
                      <GraduationCap className="h-3.5 w-3.5" />
                      {item.period}
                    </div>
                    <h3 className="font-display text-xl font-bold text-white">{item.school}</h3>
                    <p className="mt-2 text-sm font-semibold text-white/70">{item.degree}</p>
                    <p className="mt-3 text-sm text-cyan-100/80">{item.score}</p>
                    <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {item.location}
                    </p>
                  </div>
                </div>
                <span className="absolute left-4 top-8 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border border-cyan-200/45 bg-[#07101f] shadow-neon sm:left-1/2">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-200" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
