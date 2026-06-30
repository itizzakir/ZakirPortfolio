import { motion, useSpring } from "framer-motion";
import { pointerX, pointerY } from "../../hooks/usePointer";

export function CustomCursor() {
  // Springs track the module-level pointer MotionValues — no React state, so
  // the cursor follows the mouse without re-rendering any component.
  const dotX = useSpring(pointerX, { stiffness: 360, damping: 32, mass: 0.32 });
  const dotY = useSpring(pointerY, { stiffness: 360, damping: 32, mass: 0.32 });
  const ringX = useSpring(pointerX, { stiffness: 120, damping: 18, mass: 0.5 });
  const ringY = useSpring(pointerY, { stiffness: 120, damping: 18, mass: 0.5 });

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-3 w-3 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.85)] lg:block"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden h-10 w-10 rounded-full border border-cyan-200/30 bg-cyan-200/5 backdrop-blur-sm lg:block"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        aria-hidden="true"
      />
    </>
  );
}
