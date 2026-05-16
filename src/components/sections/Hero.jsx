import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { ArrowDown, Download, Mail, Rocket, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { personal, typingRoles } from "../../constants/portfolio";
import { useTypewriter } from "../../hooks/useTypewriter";
import { fadeUp, staggerContainer } from "../../animations/variants";
import { MagneticButton } from "../shared/MagneticButton";
import { ParticleField } from "../effects/ParticleField";

const HeroScene = lazy(() => import("../three/HeroScene"));

function scrollToProjects() {
  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scrollToContact() {
  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  const typedRole = useTypewriter(typingRoles);

  return (
    <section id="home" className="relative isolate flex min-h-screen overflow-hidden pt-28">
      <div className="absolute inset-0 bg-cyber-grid bg-[length:64px_64px] opacity-[0.16] [mask-image:linear-gradient(to_bottom,transparent,black_16%,black_76%,transparent)]" />
      <div className="absolute inset-0 aurora-field" aria-hidden="true" />
      <ParticleField />
      <div className="hero-scene-layer absolute inset-0 z-0">
        <Suspense fallback={<div className="h-full w-full" />}>
          <HeroScene />
        </Suspense>
      </div>

      <img
        src={personal.profileImage}
        alt=""
        className="hero-profile-ghost pointer-events-none absolute bottom-0 right-0 z-[1] hidden h-[78vh] max-h-[760px] w-auto translate-x-[18%] object-contain mix-blend-screen saturate-150 lg:block"
        aria-hidden="true"
      />

      <div className="container relative z-10 grid min-h-[calc(100vh-7rem)] items-center gap-12 pb-16 lg:grid-cols-[1.12fr_0.88fr]">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-4xl">
          <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1.5 text-xs font-semibold uppercase text-cyan-100/80">
            <Rocket className="h-3.5 w-3.5" />
            Available for full-stack opportunities
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-display text-5xl font-bold leading-[1.03] text-white sm:text-6xl lg:text-7xl">
            Hi, I&apos;m <span className="neon-text">Md Zakir Hussain</span>
          </motion.h1>
          <motion.div variants={fadeUp} className="mt-5 min-h-12 font-display text-2xl font-semibold text-cyan-100 sm:text-3xl">
            {personal.role} <span className="text-white/35">|</span>{" "}
            <span className="text-fuchsia-200">{typedRole}</span>
            <span className="ml-1 inline-block h-7 w-px translate-y-1 animate-pulse bg-cyan-200" />
          </motion.div>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Building scalable and futuristic web experiences using Java, Spring Boot, React, and modern technologies.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton type="button" onClick={scrollToProjects}>
              View Projects <ArrowDown className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton asChild variant="secondary">
              <a href={personal.resumeUrl} download>
                Download Resume <Download className="h-4 w-4" />
              </a>
            </MagneticButton>
            <MagneticButton type="button" variant="secondary" onClick={scrollToContact}>
              Contact Me <Send className="h-4 w-4" />
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            {[
              { label: "GitHub", href: personal.github, icon: FaGithub },
              { label: "LinkedIn", href: personal.linkedin, icon: FaLinkedin },
              { label: "Email", href: `mailto:${personal.email}`, icon: Mail },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 text-sm font-medium text-white/70 transition hover:border-cyan-200/45 hover:text-white hover:shadow-neon-soft"
                >
                  <Icon className="h-4 w-4 transition group-hover:scale-110" />
                  {item.label}
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[430px]"
        >
          <Tilt tiltMaxAngleX={9} tiltMaxAngleY={9} perspective={900} transitionSpeed={1600} gyroscope>
            <div className="profile-shell relative mx-auto aspect-square max-w-[390px] rounded-full p-[2px]">
              <div className="absolute -inset-10 rounded-full bg-[conic-gradient(from_180deg,rgba(34,211,238,0.24),rgba(139,92,246,0.3),rgba(244,114,182,0.22),rgba(34,211,238,0.24))] blur-3xl" />
              <div className="absolute inset-0 rounded-full border border-cyan-200/25 shadow-[0_0_64px_rgba(34,211,238,0.3)]" />
              <div className="relative h-full overflow-hidden rounded-full border border-white/15 bg-[#07101f]">
                <img
                  src={personal.profileImage}
                  alt="Md Zakir Hussain"
                  className="h-full w-full object-cover saturate-125"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-300/18 via-transparent to-fuchsia-300/18 mix-blend-screen" />
              </div>
              <div className="absolute -bottom-4 left-1/2 flex w-[82%] -translate-x-1/2 items-center justify-center rounded-full border border-white/12 bg-[#07101f]/80 px-4 py-3 text-center text-sm font-semibold text-white/80 shadow-neon-soft backdrop-blur-xl">
                Java | Spring Boot | React | MySQL
              </div>
            </div>
          </Tilt>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase text-white/45 transition hover:text-cyan-100 md:flex"
      >
        <span>Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-white/15">
          <span className="absolute left-0 top-0 h-4 w-px animate-[shimmer_1.4s_linear_infinite] bg-cyan-200" />
        </span>
      </button>
    </section>
  );
}
