interface LogoProps {
  className?: string;
  /** Height in px; width scales with the wordmark aspect ratio. */
  height?: number;
}

/**
 * The HEXA wordmark, recreated as an inline gradient SVG so it stays crisp at
 * any size and needs no external asset. Bold geometric letters on a left→right
 * magenta→blue gradient, matching the brand logo.
 */
export function Logo({ className, height = 32 }: LogoProps) {
  return (
    <svg
      className={className}
      height={height}
      viewBox="0 0 220 64"
      role="img"
      aria-label="HEXA"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hexa-wordmark" x1="0" y1="0" x2="220" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E010C8" />
          <stop offset="45%" stopColor="#8B18E8" />
          <stop offset="100%" stopColor="#1414F0" />
        </linearGradient>
      </defs>
      <text
        x="0"
        y="50"
        fontFamily="var(--font-inter), system-ui, sans-serif"
        fontSize="58"
        fontWeight="900"
        letterSpacing="-1"
        fill="url(#hexa-wordmark)"
      >
        HEXA
      </text>
      <text
        x="196"
        y="20"
        fontFamily="var(--font-inter), system-ui, sans-serif"
        fontSize="12"
        fontWeight="700"
        fill="url(#hexa-wordmark)"
      >
        ™
      </text>
    </svg>
  );
}
