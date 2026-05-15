import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "group relative inline-flex h-12 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full px-5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-cyan-300/40 bg-cyan-300/10 text-cyan-50 shadow-neon hover:border-cyan-200/70 hover:bg-cyan-200/20",
        secondary:
          "border border-white/12 bg-white/8 text-white/90 hover:border-violet-300/50 hover:bg-violet-300/12",
        ghost:
          "border border-transparent bg-transparent text-muted-foreground hover:bg-white/8 hover:text-white",
        destructive:
          "border border-rose-300/40 bg-rose-500/10 text-rose-100 hover:bg-rose-500/20",
      },
      size: {
        default: "h-12 px-5",
        sm: "h-9 px-3 text-xs",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
  );
});

Button.displayName = "Button";

export { Button };
