import { useCallback, useEffect, useState } from "react";

/**
 * Viewport gate for WebGL canvases. Attach `setRef` to the canvas container.
 * `mounted` flips true once it first approaches the viewport (so the canvas is
 * created lazily, then kept to avoid GL-context churn); drive the R3F frameloop
 * with `inView` to pause rendering whenever the canvas is off-screen.
 */
export function useCanvasGate({ rootMargin = "240px 0px" } = {}) {
  const [node, setNode] = useState(null);
  const [inView, setInView] = useState(false);
  const [mounted, setMounted] = useState(false);

  const setRef = useCallback((next) => setNode(next), []);

  useEffect(() => {
    if (!node || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        // Latch mounted on first approach so the canvas never tears down its GL
        // context once created. Set inside the observer callback (not the effect
        // body) so we never re-render synchronously from the effect.
        if (entry.isIntersecting) setMounted(true);
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, rootMargin]);

  return { setRef, inView, mounted };
}
