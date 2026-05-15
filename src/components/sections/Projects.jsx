import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ExternalLink, RadioTower } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "../../constants/portfolio";
import { fadeUp, viewport } from "../../animations/variants";
import { SectionHeading } from "../shared/SectionHeading";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

function ProjectCard({ project }) {
  const onPointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--card-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--card-y", `${event.clientY - rect.top}px`);
  };

  return (
    <Tilt tiltMaxAngleX={7} tiltMaxAngleY={7} glareEnable glareMaxOpacity={0.1} className="h-full">
      <article
        onPointerMove={onPointerMove}
        className="project-card group relative flex min-h-[540px] flex-col overflow-hidden rounded-[8px] border border-white/10 bg-[#07101f]/78 p-5 shadow-neon-soft backdrop-blur-xl sm:p-6"
      >
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.accent}`} />
        <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(500px circle at var(--card-x, 50%) var(--card-y, 0%), rgba(34,211,238,0.16), transparent 45%)" }} />
        <div className="relative">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase text-cyan-100/70">{project.name}</p>
              <h3 className="mt-2 font-display text-3xl font-bold text-white">{project.title}</h3>
            </div>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-cyan-100 shadow-neon-soft">
              <RadioTower className="h-5 w-5" />
            </span>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          <div className="space-y-3">
            {project.description.map((item) => (
              <p key={item} className="rounded-[8px] border border-white/8 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-white/68">
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="relative mt-auto pt-7">
          <div className="mb-5 h-28 overflow-hidden rounded-[8px] border border-white/10 bg-black/30">
            <div className={`h-full bg-gradient-to-br ${project.accent} opacity-70`}>
              <div className="h-full bg-[linear-gradient(135deg,rgba(255,255,255,0.24)_0_1px,transparent_1px_18px)] opacity-50" />
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1">
              <a href={project.live} target="_blank" rel="noreferrer">
                Live Demo <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="secondary" className="flex-1">
              <a href={project.github} target="_blank" rel="noreferrer">
                GitHub <FaGithub className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </article>
    </Tilt>
  );
}

export function Projects() {
  const shouldLoop = projects.length > 3;

  return (
    <section id="projects" className="section-shell overflow-hidden">
      <div className="container">
        <SectionHeading
          eyebrow="Projects"
          title="Interactive products with secure backend logic."
          subtitle="Ultra-premium project cards with live links, technology context, and glassmorphism interaction."
        />

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
          <Swiper
            modules={[Autoplay, EffectCoverflow, Pagination]}
            effect="coverflow"
            centeredSlides
            grabCursor
            loop={shouldLoop}
            rewind={!shouldLoop}
            autoplay={{ delay: 4200, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            coverflowEffect={{ rotate: 0, stretch: 0, depth: 140, modifier: 1.3, slideShadows: false }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 18 },
              900: { slidesPerView: 2, spaceBetween: 24 },
              1280: { slidesPerView: 3, spaceBetween: 28 },
            }}
            className="!overflow-visible pb-14"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.name} className="!h-auto">
                <ProjectCard project={project} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
