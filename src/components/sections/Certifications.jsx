import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { certifications } from "../../constants/portfolio";
import { scaleIn, staggerContainer, viewport } from "../../animations/variants";
import { SectionHeading } from "../shared/SectionHeading";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export function Certifications() {
  return (
    <section id="certifications" className="section-shell">
      <div className="container">
        <SectionHeading
          eyebrow="Certifications"
          title="Proof of continuous sharpening."
          subtitle="Credentials that support full-stack development, programming fundamentals, and professional communication."
        />

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4 md:grid-cols-3">
          {certifications.map((certificate) => (
            <motion.div key={certificate.title} variants={scaleIn}>
              <Card className="h-full overflow-hidden">
                <CardContent className="flex h-full flex-col">
                  <div className="mb-6 grid h-12 w-12 place-items-center rounded-full border border-fuchsia-300/25 bg-fuchsia-300/10 text-fuchsia-100 shadow-neon-soft">
                    <Award className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">{certificate.title}</h3>
                  <p className="mt-2 text-sm text-cyan-100/70">{certificate.issuer}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{certificate.year}</p>
                  {certificate.link ? (
                    <Button asChild variant="secondary" className="mt-6">
                      <a href={certificate.link} target="_blank" rel="noreferrer">
                        View Certificate <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  ) : null}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
