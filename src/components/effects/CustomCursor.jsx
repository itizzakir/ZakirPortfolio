import { motion, useSpring } from "framer-motion";
import { useMousePosition } from "../../hooks/useMousePosition";

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const springX = useSpring(x, { stiffness: 360, damping: 32, mass: 0.32 });
  const springY = useSpring(y, { stiffness: 360, damping: 32, mass: 0.32 });

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-3 w-3 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.85)] lg:block"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden h-10 w-10 rounded-full border border-cyan-200/30 bg-cyan-200/5 backdrop-blur-sm lg:block"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        aria-hidden="true"
      />
    </>
  );
}
