import { AmbientBackground } from "./AmbientBackground";
import { Logo } from "./Logo";

/** Centered card layout shared by the sign-in and accept-invite pages. */
export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-canvas px-5 text-ink">
      <AmbientBackground />

      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo height={30} />
        </div>

        <div className="rounded-[20px] border border-black/[0.07] bg-white/80 p-7 shadow-[0_20px_60px_-30px_rgba(10,10,15,0.4)] backdrop-blur-xl">
          <h1 className="text-xl font-bold text-ink">{title}</h1>
          {subtitle && (
            <p className="mt-1 mb-5 text-sm text-black/55">{subtitle}</p>
          )}
          <div className={subtitle ? "" : "mt-5"}>{children}</div>
        </div>

        <p className="mt-6 text-center text-xs text-black/40">
          Hexamatics Group
        </p>
      </div>
    </div>
  );
}
