import { Children, cloneElement, useRef, useState } from "react";
import { Button } from "../ui/button";

export function MagneticButton({ children, className, asChild = false, ...props }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({ transform: "translate3d(0,0,0)" });

  const onPointerMove = (event) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
    setStyle({ transform: `translate3d(${x}px, ${y}px, 0)` });
  };

  const content = (
    <>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10 inline-flex items-center gap-2">
        {asChild ? Children.only(children).props.children : children}
      </span>
    </>
  );

  const slottedChild = asChild ? cloneElement(Children.only(children), undefined, content) : null;

  return (
    <Button
      ref={ref}
      asChild={asChild}
      className={className}
      style={style}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setStyle({ transform: "translate3d(0,0,0)" })}
      {...props}
    >
      {asChild ? slottedChild : content}
    </Button>
  );
}
