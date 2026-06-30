import React from "react";
import { cn } from "../../utils/cn";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "glass-panel rounded-[8px] border border-white/10 bg-card/70 text-card-foreground shadow-neon-soft",
      "transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-cyan-200/25",
      className,
    )}
    {...props}
  />
));

Card.displayName = "Card";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-5 sm:p-6", className)} {...props} />
));

CardContent.displayName = "CardContent";

export { Card, CardContent };
