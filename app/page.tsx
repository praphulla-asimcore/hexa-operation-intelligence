import { AmbientBackground } from "@/components/AmbientBackground";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { AppSection } from "@/components/AppSection";
import { APP_SECTIONS } from "@/lib/apps";
import { CURRENT_USER, firstName } from "@/lib/user";

export default function DashboardPage() {
  const year = new Date().getFullYear();

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-canvas text-ink">
      <AmbientBackground />

      <div className="relative z-10 flex flex-1 flex-col">
        <Nav user={CURRENT_USER} />

        <main className="flex-1">
          <Hero firstName={firstName(CURRENT_USER.name)} />

          <div className="flex flex-col gap-16 pb-24">
            {APP_SECTIONS.map((section) => (
              <AppSection key={section.id} section={section} />
            ))}
          </div>
        </main>

        <footer className="border-t border-black/[0.07] py-6">
          <p className="text-center text-sm text-black/45">
            Hexamatics Group © {year}
          </p>
        </footer>
      </div>
    </div>
  );
}
