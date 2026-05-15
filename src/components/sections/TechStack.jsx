import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Boxes, Code, Database, Hammer, Layers3 } from "lucide-react";
import { techGroups } from "../../constants/portfolio";
import { scaleIn, staggerContainer, viewport } from "../../animations/variants";
import { SectionHeading } from "../shared/SectionHeading";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

const icons = [Code, Layers3, Boxes, Database, Hammer];
const marqueeItems = techGroups.flatMap((group) => group.items);

export function TechStack() {
  return (
    <section id="stack" className="section-shell overflow-hidden">
      <div className="container">
        <SectionHeading
          eyebrow="Tech Stack"
          title="A stack built for secure, scalable products."
          subtitle="From Java backends and database layers to React frontends and deployment-ready tooling."
        />

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {techGroups.map((group, index) => {
            const Icon = icons[index] || Code;
            return (
              <motion.div key={group.title} variants={scaleIn}>
                <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} className="h-full">
                  <Card className="h-full overflow-hidden">
                    <CardContent>
                      <div className="mb-5 flex items-center gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-full border border-violet-300/25 bg-violet-300/10 text-violet-100 shadow-neon-soft">
                          <Icon className="h-5 w-5" />
                        </span>
                        <h3 className="font-display text-lg font-bold text-white">{group.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <Badge key={item}>{item}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Tilt>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-12 border-y border-white/10 bg-white/[0.025] py-4">
        <div className="flex min-w-max animate-marquee gap-3">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="inline-flex min-h-11 items-center rounded-full border border-white/10 bg-white/7 px-5 text-sm font-semibold text-white/70"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
