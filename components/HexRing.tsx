/**
 * Decorative counter-rotating hexagon ring that sits behind the hero title.
 * Two rings of small hexagons spin in opposite directions (20s / 28s) around a
 * static center hex. Purely decorative and very low opacity.
 */

function hexPath(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 30);
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join(" L")} Z`;
}

function ringHexes(cx: number, cy: number, radius: number, count: number, hexR: number) {
  return Array.from({ length: count }).map((_, i) => {
    const a = (Math.PI * 2 * i) / count;
    const x = cx + radius * Math.cos(a);
    const y = cy + radius * Math.sin(a);
    return <path key={i} d={hexPath(x, y, hexR)} />;
  });
}

export function HexRing({ className }: { className?: string }) {
  const c = 200;
  return (
    <svg
      className={className}
      width="400"
      height="400"
      viewBox="0 0 400 400"
      fill="none"
      stroke="#8B18E8"
      strokeWidth="1.2"
      aria-hidden
    >
      <g className="spin-slow" style={{ transformOrigin: "200px 200px", opacity: 0.5 }}>
        {ringHexes(c, c, 150, 12, 14)}
      </g>
      <g className="spin-slow-rev" style={{ transformOrigin: "200px 200px", opacity: 0.4 }}>
        {ringHexes(c, c, 95, 8, 12)}
      </g>
      <path d={hexPath(c, c, 34)} stroke="#E010C8" strokeWidth="1.5" style={{ opacity: 0.55 }} />
    </svg>
  );
}
