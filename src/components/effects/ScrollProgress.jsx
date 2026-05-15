import { useScrollProgress } from "../../hooks/useScrollProgress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed left-0 top-0 z-[90] h-1 w-full bg-transparent" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-300 shadow-[0_0_20px_rgba(34,211,238,0.75)] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
