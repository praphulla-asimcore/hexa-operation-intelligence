import { HexRing } from "./HexRing";
import { PLATFORM_STATS } from "@/lib/apps";

export function Hero({ firstName }: { firstName: string }) {
  return (
    <section className="relative mx-auto flex max-w-5xl flex-col items-center px-5 pt-20 pb-16 text-center sm:pt-28">
      {/* Decorative spinning hex ring behind the title */}
      <div className="pointer-events-none absolute left-1/2 top-10 -z-[1] -translate-x-1/2 opacity-60">
        <HexRing className="h-[400px] w-[400px]" />
      </div>

      {/* Gradient greeting */}
      <p
        className="mb-4 text-base font-semibold sm:text-lg"
        style={{
          background: "linear-gradient(90deg, #E010C8, #8B18E8)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Welcome back, {firstName}
      </p>

      {/* 3-layer depth title */}
      <div className="relative">
        {/* Blurred bloom layer behind */}
        <h1
          aria-hidden
          className="pointer-events-none absolute inset-0 select-none text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl"
          style={{
            filter: "blur(28px)",
            opacity: 0.3,
            background: "linear-gradient(135deg, #E010C8, #8B18E8, #2020EE)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Hexa Operation Intelligence
        </h1>

        {/* Crisp foreground title */}
        <h1
          className="relative text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl"
          style={{
            background: "linear-gradient(160deg, #0a0a0f, #2d2040, #1a1a60)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Hexa Operation Intelligence
        </h1>
      </div>

      {/* Subtitle */}
      <p className="mt-6 max-w-2xl text-lg text-black/55 sm:text-xl">
        Your complete business intelligence &amp; automation platform.
      </p>

      {/* Stats row */}
      <dl className="mt-12 flex items-center gap-10 sm:gap-16">
        {PLATFORM_STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center">
            <dd
              className="text-3xl font-black sm:text-4xl"
              style={{
                background: "linear-gradient(135deg, #E010C8, #8B18E8, #2020EE)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {stat.value}
            </dd>
            <dt className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-black/45">
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
