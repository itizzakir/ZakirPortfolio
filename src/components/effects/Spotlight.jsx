import { useMousePosition } from "../../hooks/useMousePosition";

export function Spotlight() {
  const { x, y } = useMousePosition();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2] hidden mix-blend-screen lg:block"
      style={{
        background: `radial-gradient(520px circle at ${x}px ${y}px, rgba(34, 211, 238, 0.13), rgba(139, 92, 246, 0.08) 34%, transparent 68%)`,
      }}
      aria-hidden="true"
    />
  );
}
