import { Logo } from "./Logo";
import type { CurrentUser } from "@/lib/user";

interface NavProps {
  user: CurrentUser;
}

export function Nav({ user }: NavProps) {
  const isAdmin = user.role === "Administrator";

  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.07] bg-white/70 backdrop-blur-2xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo height={26} />

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden text-right leading-tight sm:block">
            <div className="text-sm font-semibold text-ink">{user.name}</div>
            <div className="text-[11px] font-medium uppercase tracking-wide text-black/45">
              {user.role}
            </div>
          </div>

          {isAdmin && (
            <button
              type="button"
              className="rounded-full border border-black/10 bg-white/60 px-3.5 py-1.5 text-xs font-semibold text-ink/80 transition-colors hover:border-black/20 hover:text-ink"
            >
              Users
            </button>
          )}
          <button
            type="button"
            className="rounded-full border border-black/10 bg-white/60 px-3.5 py-1.5 text-xs font-semibold text-ink/80 transition-colors hover:border-black/20 hover:text-ink"
          >
            Sign out
          </button>
        </div>
      </nav>
    </header>
  );
}
