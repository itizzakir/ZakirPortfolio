import { motion } from "framer-motion";
import { Award, CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { experience } from "../../constants/portfolio";
import { fadeUp, viewport } from "../../animations/variants";
import { SectionHeading } from "../shared/SectionHeading";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export function Experience() {
  return (
    <section id="experience" className="section-shell">
      <div className="container">
        <SectionHeading
          eyebrow="Internship"
          title="Hands-on full-stack Java experience."
          subtitle="A premium timeline card for practical engineering work across React, Java, Spring Boot, REST APIs, and MySQL."
        />

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="mx-auto max-w-5xl">
          <Card className="relative overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-300 via-violet-400 to-fuchsia-300" />
            <CardContent className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1 text-xs font-semibold text-cyan-100">
                  <Award className="h-3.5 w-3.5" />
                  {experience.company}
                </div>
                <h3 className="font-display text-3xl font-bold text-white">{experience.role}</h3>
                <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-cyan-100" />
                    {experience.duration}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-cyan-100" />
                    {experience.location}
                  </p>
                </div>
                <Button asChild variant="secondary" className="mt-6">
                  <a href={experience.certificate} target="_blank" rel="noreferrer">
                    View Certificate <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <div className="grid gap-3">
                {experience.responsibilities.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="rounded-[8px] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/72"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
