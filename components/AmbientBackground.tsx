/**
 * Fixed, non-interactive ambient layer behind everything: three drifting
 * blurred orbs plus a faint tiling hexagon grid. Pure CSS/SVG, no JS.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <svg className="absolute inset-0 h-full w-full" style={{ opacity: 0.04 }}>
        <defs>
          <pattern
            id="hex-grid"
            width="56"
            height="48.5"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1)"
          >
            <path
              d="M14 0 L42 0 L56 24.25 L42 48.5 L14 48.5 L0 24.25 Z"
              fill="none"
              stroke="#0a0a0f"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-grid)" />
      </svg>
    </div>
  );
}
