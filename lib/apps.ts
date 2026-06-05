export type AppStatus = "live" | "soon";

export interface AppEntry {
  /** Unique key used for React lists and entrance stagger. */
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  status: AppStatus;
  /** Destination when the card CTA is clicked (live apps only). */
  href?: string;
  /** Accent gradient endpoints — drive every gradient/glow on the card. */
  accentFrom: string;
  accentTo: string;
  /** Identifier mapped to a per-app line icon in <AppIcon />. */
  icon: AppIconName;
}

export interface AppSectionData {
  id: string;
  label: string;
  apps: AppEntry[];
}

export type AppIconName =
  | "ledger"
  | "pulse"
  | "workflow"
  | "insight"
  | "shield"
  | "spark";

/**
 * Placeholder operations apps. Swap these out for the real entries later —
 * the card structure and two-section layout stay the same.
 */
export const APP_SECTIONS: AppSectionData[] = [
  {
    id: "core-operations",
    label: "Core Operations",
    apps: [
      {
        id: "smartledger",
        name: "SmartLedger",
        tagline: "Finance, automated end to end",
        description:
          "Reconcile, post, and report without the spreadsheet sprawl. A single source of truth for every transaction.",
        features: ["Auto-reconcile", "Live reporting", "Audit trail"],
        status: "live",
        href: "#",
        accentFrom: "#E010C8",
        accentTo: "#8B18E8",
        icon: "ledger",
      },
      {
        id: "opspulse",
        name: "OpsPulse",
        tagline: "Real-time operational signals",
        description:
          "Watch the metrics that matter across every team. Anomaly alerts before small issues become big ones.",
        features: ["Live metrics", "Smart alerts", "Trend view"],
        status: "live",
        href: "#",
        accentFrom: "#2020EE",
        accentTo: "#17B8A5",
        icon: "pulse",
      },
      {
        id: "flowforge",
        name: "FlowForge",
        tagline: "Build automations visually",
        description:
          "Design, test, and ship process automations with a drag-and-drop canvas. No code required.",
        features: ["No-code", "Templates", "Webhooks"],
        status: "soon",
        accentFrom: "#8B18E8",
        accentTo: "#2020EE",
        icon: "workflow",
      },
    ],
  },
  {
    id: "intelligence",
    label: "Intelligence & Insight",
    apps: [
      {
        id: "insightlab",
        name: "InsightLab",
        tagline: "Ask your data anything",
        description:
          "Natural-language analytics across every connected system. Dashboards that build themselves.",
        features: ["NL queries", "Auto-charts", "Exports"],
        status: "live",
        href: "#",
        accentFrom: "#E010C8",
        accentTo: "#2020EE",
        icon: "insight",
      },
      {
        id: "guardrail",
        name: "Guardrail",
        tagline: "Compliance on autopilot",
        description:
          "Continuous policy checks across your stack with a clear, exportable evidence trail for every control.",
        features: ["Policy checks", "Evidence", "Reports"],
        status: "soon",
        accentFrom: "#17B8A5",
        accentTo: "#2020EE",
        icon: "shield",
      },
      {
        id: "sparkdesk",
        name: "SparkDesk",
        tagline: "AI copilot for every team",
        description:
          "An assistant that knows your operations, drafts the work, and routes it to the right place automatically.",
        features: ["AI drafts", "Routing", "Knowledge"],
        status: "soon",
        accentFrom: "#8B18E8",
        accentTo: "#E010C8",
        icon: "spark",
      },
    ],
  },
];

export const PLATFORM_STATS: { label: string; value: string }[] = [
  { label: "Apps Live", value: "3" },
  { label: "Entities", value: "12.4k" },
  { label: "Uptime", value: "99.98%" },
];
