import type { AppSectionData } from "@/lib/apps";
import { AppCard } from "./AppCard";

export function AppSection({ section }: { section: AppSectionData }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 sm:px-8">
      {/* Section header: gradient pill label + horizontal divider */}
      <div className="mb-7 flex items-center gap-4">
        <span
          className="whitespace-nowrap rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-white"
          style={{ background: "linear-gradient(90deg, #E010C8, #8B18E8)" }}
        >
          {section.label}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-black/10 to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {section.apps.map((app, i) => (
          <AppCard key={app.id} app={app} index={i} />
        ))}
      </div>
    </section>
  );
}
