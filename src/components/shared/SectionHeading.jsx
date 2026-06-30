import { motion } from "framer-motion";
import { fadeUp, viewport } from "../../animations/variants";
import { cn } from "../../utils/cn";

export function SectionHeading({ eyebrow, title, subtitle, align = "center", className }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={cn(
        "gsap-reveal mx-auto mb-10 max-w-3xl",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1 text-xs font-semibold uppercase text-cyan-100/80">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
        {eyebrow}
      </div>
      <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">{subtitle}</p>
      ) : null}
    </motion.div>
  );
}
