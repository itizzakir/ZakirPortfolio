// Cursor spotlight. Position is driven entirely by the --mx/--my CSS custom
// properties (updated outside React in usePointer), and the glow itself is a
// fixed-size element moved with a GPU-composited transform — so following the
// cursor costs no React renders and no full-screen repaints.
export function Spotlight() {
  return <div className="spotlight-layer" aria-hidden="true" />;
}
