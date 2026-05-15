import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Code2, Database, LockKeyhole, MonitorSmartphone } from "lucide-react";
import { useEffect, useRef } from "react";
import { metrics, personal } from "../../constants/portfolio";
import { fadeUp, scaleIn, staggerContainer, viewport } from "../../animations/variants";
import { SectionHeading } from "../shared/SectionHeading";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 80, damping: 18 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = `${Math.round(latest)}${suffix}`;
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const strengths = [
  { icon: Code2, title: "Clean full-stack systems", copy: "React interfaces wired to robust Spring Boot APIs." },
  { icon: LockKeyhole, title: "Secure architecture", copy: "JWT authentication, RBAC, and role-aware API design." },
  { icon: Database, title: "Data discipline", copy: "MySQL schemas, Hibernate ORM, and pragmatic persistence." },
  { icon: MonitorSmartphone, title: "Responsive delivery", copy: "Interfaces that feel sharp across laptop, tablet, and mobile." },
];

export function About() {
  return (
    <section id="about" className="section-shell">
      <div className="container">
        <SectionHeading
          eyebrow="About"
          title="Engineering with precision, polish, and motion."
          subtitle={personal.summary}
        />

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <motion.div key={metric.label} variants={scaleIn}>
              <Card className="h-full overflow-hidden">
                <CardContent>
                  <div className="text-4xl font-bold text-white">
                    <Counter value={metric.value} suffix={metric.suffix} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{metric.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
            <Card className="h-full overflow-hidden">
              <CardContent className="space-y-5">
                <h3 className="font-display text-2xl font-bold text-white">Developer DNA</h3>
                <p className="leading-8 text-muted-foreground">
                  I build end-to-end products with an eye for secure APIs, maintainable Java code, smooth React flows, and user interfaces that feel intentionally crafted.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["REST API Design", "JWT", "RBAC", "Spring Security", "React.js", "MySQL", "Clean Code", "Responsive UI"].map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 sm:grid-cols-2">
            {strengths.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} variants={scaleIn}>
                  <Tilt tiltMaxAngleX={7} tiltMaxAngleY={7} glareEnable glareMaxOpacity={0.12} className="h-full">
                    <Card className="h-full overflow-hidden">
                      <CardContent>
                        <div className="mb-5 grid h-12 w-12 place-items-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-cyan-100 shadow-neon-soft">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-display text-lg font-bold text-white">{item.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.copy}</p>
                      </CardContent>
                    </Card>
                  </Tilt>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
