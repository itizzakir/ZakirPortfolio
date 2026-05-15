import { cn } from "../../utils/cn";

export function Badge({ className, children }) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center rounded-full border border-white/10 bg-white/7 px-3 text-xs font-semibold text-cyan-50/85 shadow-neon-soft backdrop-blur",
        className,
      )}
    >
      {children}
    </span>
  );
}
