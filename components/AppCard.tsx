"use client";

import { useRef, useState } from "react";
import type { AppEntry } from "@/lib/apps";
import { AppIcon } from "./AppIcon";

const MAX_TILT = 10; // degrees

export function AppCard({ app, index }: { app: AppEntry; index: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const isLive = app.status === "live";

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    setTilt({
      rx: (0.5 - py) * (MAX_TILT * 2),
      ry: (px - 0.5) * (MAX_TILT * 2),
    });
    setGlow({ x: px * 100, y: py * 100 });
  }

  function handleLeave() {
    setHovered(false);
    setTilt({ rx: 0, ry: 0 });
    setGlow({ x: 50, y: 50 });
  }

  return (
    <div
      style={{ perspective: "900px", animationDelay: `${index * 0.09}s` }}
      className="card-in"
    >
      <div
        ref={wrapRef}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative h-full rounded-[18px] p-px transition-[box-shadow,transform] duration-300 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(${
            hovered ? 12 : 0
          }px)`,
          // Gradient border wrapper (brightens on hover)
          background: `linear-gradient(135deg, ${app.accentFrom}, ${app.accentTo})`,
          opacity: 1,
          boxShadow: hovered
            ? `0 24px 50px -18px ${app.accentFrom}66, 0 8px 20px -12px ${app.accentTo}55`
            : "0 10px 30px -22px rgba(10,10,15,0.4)",
        }}
      >
        {/* brightness mask over the gradient border so it only pops on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[18px] bg-white transition-opacity duration-300"
          style={{ opacity: hovered ? 0.45 : 0.7 }}
        />

        {/* Inner white surface */}
        <div className="relative h-full overflow-hidden rounded-[17px] bg-white p-6">
          {/* radial top-edge accent tint */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-24"
            style={{
              background: `radial-gradient(120% 100% at 50% 0%, ${app.accentFrom}1f, transparent 70%)`,
            }}
          />

          {/* mouse-tracking inner glow */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: hovered ? 1 : 0,
              background: `radial-gradient(180px circle at ${glow.x}% ${glow.y}%, ${app.accentFrom}22, transparent 60%)`,
            }}
          />

          {/* diagonal sheen sweep on hover */}
          <div className="card-sheen" />

          {/* Card content */}
          <div className="relative flex h-full flex-col">
            <div className="flex items-start justify-between">
              {/* Gradient icon tile */}
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${app.accentFrom}1a, ${app.accentTo}1a)`,
                  borderColor: hovered ? `${app.accentFrom}99` : `${app.accentFrom}33`,
                  color: app.accentFrom,
                  boxShadow: hovered ? `0 0 18px -2px ${app.accentFrom}66` : "none",
                }}
              >
                <AppIcon name={app.icon} />
              </div>

              {/* status indicator */}
              {isLive ? (
                <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-600">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Live
                </span>
              ) : (
                <span className="rounded-full border border-black/10 bg-black/[0.03] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-black/45">
                  Soon
                </span>
              )}
            </div>

            <h3 className="mt-5 text-xl font-bold text-ink">{app.name}</h3>
            <p
              className="mt-1 text-sm font-semibold"
              style={{ color: app.accentFrom }}
            >
              {app.tagline}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-black/55">
              {app.description}
            </p>

            {/* feature chips */}
            <div className="mt-5 flex flex-wrap gap-2">
              {app.features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-full border px-2.5 py-1 text-[11px] font-medium"
                  style={{
                    borderColor: `${app.accentFrom}33`,
                    background: `${app.accentFrom}0d`,
                    color: app.accentTo,
                  }}
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-6 pt-1">
              {isLive ? (
                <a
                  href={app.href ?? "#"}
                  className="group/cta inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:gap-3"
                  style={{
                    background: `linear-gradient(135deg, ${app.accentFrom}, ${app.accentTo})`,
                    boxShadow: `0 8px 20px -10px ${app.accentFrom}99`,
                  }}
                >
                  Open {app.name}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              ) : (
                <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-black/10 bg-black/[0.03] px-4 py-2.5 text-sm font-semibold text-black/40">
                  Coming Soon
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
