import type { AppIconName } from "@/lib/apps";

interface AppIconProps {
  name: AppIconName;
  className?: string;
}

/**
 * Per-app line icons. Stroke uses currentColor so the parent tile can tint it
 * with the app's accent color.
 */
export function AppIcon({ name, className }: AppIconProps) {
  const common = {
    className,
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "ledger":
      return (
        <svg {...common}>
          <path d="M5 3h11l3 3v15H5z" />
          <path d="M9 8h6M9 12h6M9 16h4" />
        </svg>
      );
    case "pulse":
      return (
        <svg {...common}>
          <path d="M3 12h4l2 6 4-14 2 8h6" />
        </svg>
      );
    case "workflow":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="6" height="6" rx="1.5" />
          <rect x="15" y="15" width="6" height="6" rx="1.5" />
          <path d="M9 6h4a3 3 0 0 1 3 3v6" />
        </svg>
      );
    case "insight":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.2-3.2" />
          <path d="M8.5 11.5 11 9l2 2 2.5-3" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
          <path d="M12 8.5 13.4 11l2.6 1-2.6 1L12 15.5 10.6 13 8 12l2.6-1z" />
        </svg>
      );
    default:
      return null;
  }
}
