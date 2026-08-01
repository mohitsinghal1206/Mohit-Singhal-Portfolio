export function AnimatedGrid() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 grid-background animated-grid opacity-30" />
      {/* Vignette effect to fade out the grid at the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-background)_80%)]" />
    </div>
  );
}
