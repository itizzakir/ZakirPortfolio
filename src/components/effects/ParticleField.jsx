import { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export function ParticleField() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: 72, density: { enable: true, area: 900 } },
        color: { value: ["#22d3ee", "#8b5cf6", "#f472b6", "#a7f3d0"] },
        shape: { type: "circle" },
        opacity: {
          value: { min: 0.18, max: 0.58 },
          animation: { enable: true, speed: 0.75, minimumValue: 0.12, sync: false },
        },
        size: {
          value: { min: 0.8, max: 2.8 },
          animation: { enable: true, speed: 1.2, minimumValue: 0.5, sync: false },
        },
        links: {
          enable: true,
          distance: 145,
          color: "#67e8f9",
          opacity: 0.16,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.72,
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "out" },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 180, links: { opacity: 0.35 } },
          push: { quantity: 2 },
        },
      },
    }),
    [],
  );

  return (
    <Particles
      id="portfolio-particles"
      init={particlesInit}
      options={options}
      className="pointer-events-none absolute inset-0 z-[1]"
    />
  );
}
