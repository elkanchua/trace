export type FileType =
  | "notion"
  | "figma"
  | "github"
  | "slack"
  | "image"
  | "pinterest"
  | "pdf"
  | "link";

export type Team = "product" | "dev" | "design";

export type ProductStatus = "Discovery" | "In Progress" | "Shipped";

export type Role = "PM" | "Designer" | "Engineer" | "Legal" | "SRE";

export interface KbFile {
  name: string;
  type: FileType;
  owner: string;
  team: Team;
  updated: string;
  content?: string;
}

export interface Member {
  name: string;
  role: Role;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  status: ProductStatus;
  summary: string;
  myRole: Role;
  conflicts: number;
  members: Member[];
  files: KbFile[];
}

export const TEAM_META: Record<
  Team,
  { label: string; blurb: string; accent: string; dot: string }
> = {
  product: {
    label: "Product",
    blurb: "Briefs, specs & research",
    accent: "text-violet-700",
    dot: "bg-violet-500",
  },
  dev: {
    label: "Engineering",
    blurb: "Code, PRs & architecture",
    accent: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  design: {
    label: "Design",
    blurb: "Flows, mocks & inspiration",
    accent: "text-pink-700",
    dot: "bg-pink-500",
  },
};

export const TEAMS: Team[] = ["product", "dev", "design"];

export const currentUser = {
  name: "Elkan Chua",
  role: "PM" as Role,
  initials: "EC",
  email: "elkanchua@gmail.com",
};

// Real profile photos, keyed by collaborator name. Anyone not listed falls back
// to a colored initials avatar.
export const AVATARS: Record<string, string> = {
  "Elkan Chua": "/avatars/elkan.jpg",
  "Priya Natarajan": "/avatars/priya.jpg",
  "Devon Clarke": "/avatars/devon.jpg",
  "Marcus Liu": "/avatars/marcus.jpg",
  "Sofia Alvarez": "/avatars/sofia.jpg",
  "Raj Patel": "/avatars/raj.jpg",
  "Owen Bradley": "/avatars/owen.jpg",
  "Hannah Weiss": "/avatars/hannah.jpg",
  "Mei Tan": "/avatars/mei.jpg",
  "Lena Fischer": "/avatars/lena.jpg",
};

export const products: Product[] = [
  {
    id: "atlas-mobile",
    name: "Atlas Mobile — Offline Mode",
    status: "In Progress",
    summary:
      "Native mobile rework letting field users read, edit, and queue changes with no connectivity.",
    myRole: "PM",
    conflicts: 2,
    members: [
      { name: "Priya Natarajan", role: "PM", color: "bg-violet-500" },
      { name: "Devon Clarke", role: "Designer", color: "bg-pink-500" },
      { name: "Marcus Liu", role: "Engineer", color: "bg-emerald-500" },
      { name: "Sofia Alvarez", role: "Engineer", color: "bg-emerald-500" },
    ],
    files: [
      {
        name: "Offline Mode PRD",
        type: "notion",
        owner: "Priya Natarajan",
        team: "product",
        updated: "Updated 1h ago",
        content:
          "Atlas must be fully usable offline: read & write while disconnected, a durable write-ahead queue, conflict resolution on reconnect, a persistent sync-status banner, and iOS/Android parity at GA.",
      },
      {
        name: "Field Research — Warehouse Visit",
        type: "image",
        owner: "Priya Natarajan",
        team: "product",
        updated: "Updated 3d ago",
      },
      {
        name: "Offline KPIs & Success Metrics",
        type: "pdf",
        owner: "Hannah Weiss",
        team: "product",
        updated: "Updated 5d ago",
      },
      {
        name: "atlas-ios / OfflineQueue.swift",
        type: "github",
        owner: "Marcus Liu",
        team: "dev",
        updated: "Updated 6h ago",
        content:
          "Write-ahead queue persisted to disk, reachability-driven drain on reconnect, 7-day local read cache. Implements the PRD's offline requirements on iOS.",
      },
      {
        name: "atlas-android / JobRepository.kt",
        type: "github",
        owner: "Sofia Alvarez",
        team: "dev",
        updated: "Updated 2h ago",
        content:
          "Always hits the network; no local cache or write queue yet. Mirrors the existing online architecture — offline path not wired up this milestone.",
      },
      {
        name: "Offline Mode — Flows v4",
        type: "figma",
        owner: "Devon Clarke",
        team: "design",
        updated: "Updated 2h ago",
        content:
          "Job list, job detail, edit, and conflict-review sheet — all assuming a live connection. No offline banner or queued-changes state designed yet.",
      },
      {
        name: "Field-app Inspiration Board",
        type: "pinterest",
        owner: "Devon Clarke",
        team: "design",
        updated: "Updated 1w ago",
      },
    ],
  },
  {
    id: "billing-revamp",
    name: "Billing — Usage-Based Pricing",
    status: "Discovery",
    summary:
      "Move from flat seats to metered usage with spend caps, invoices, and a live cost estimator.",
    myRole: "PM",
    conflicts: 0,
    members: [
      { name: "Hannah Weiss", role: "PM", color: "bg-violet-500" },
      { name: "Raj Patel", role: "Engineer", color: "bg-emerald-500" },
      { name: "Mei Tan", role: "Designer", color: "bg-pink-500" },
    ],
    files: [
      {
        name: "Usage Pricing PRD",
        type: "notion",
        owner: "Hannah Weiss",
        team: "product",
        updated: "Updated 2d ago",
        content:
          "Meter API calls + storage per workspace, live cost estimator, hard spend caps, itemized PDF invoices. Open questions on proration and grace periods.",
      },
      {
        name: "Pricing Tiers Comparison",
        type: "pdf",
        owner: "Hannah Weiss",
        team: "product",
        updated: "Updated 4d ago",
      },
      {
        name: "metering-service / aggregator.ts",
        type: "github",
        owner: "Raj Patel",
        team: "dev",
        updated: "Updated 1d ago",
        content:
          "Design notes: Kafka ingest → hourly rollups → estimator + invoicer. Spend caps read latest rollup. Discovery only — not implemented.",
      },
      {
        name: "Billing Settings — Estimator",
        type: "figma",
        owner: "Mei Tan",
        team: "design",
        updated: "Updated 3d ago",
      },
      {
        name: "Pricing Page Moodboard",
        type: "pinterest",
        owner: "Mei Tan",
        team: "design",
        updated: "Updated 6d ago",
      },
    ],
  },
  {
    id: "smart-digest",
    name: "Smart Digest — Weekly Email",
    status: "Shipped",
    summary:
      "A personalized weekly summary email driven by per-user activity and an engagement model.",
    myRole: "PM",
    conflicts: 0,
    members: [
      { name: "Owen Bradley", role: "PM", color: "bg-violet-500" },
      { name: "Lena Fischer", role: "Engineer", color: "bg-emerald-500" },
      { name: "Devon Clarke", role: "Designer", color: "bg-pink-500" },
    ],
    files: [
      {
        name: "Smart Digest PRD",
        type: "notion",
        owner: "Owen Bradley",
        team: "product",
        updated: "Updated 3w ago",
        content:
          "Weekly curated email: per-user relevance ranking, Monday 8am local send, one-click unsubscribe, skip empty digests entirely.",
      },
      {
        name: "digest_builder.py",
        type: "github",
        owner: "Lena Fischer",
        team: "dev",
        updated: "Updated 2w ago",
        content:
          "Ranks candidates by model score, skips sends with no meaningful activity, schedules Monday 8am in the user's timezone. Live in production.",
      },
      {
        name: "Email v2 — Layouts",
        type: "figma",
        owner: "Devon Clarke",
        team: "design",
        updated: "Updated 3w ago",
      },
    ],
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export const STATUSES: ProductStatus[] = ["Discovery", "In Progress", "Shipped"];

// ---------- Conflicts (Conflict Detector) ----------
export interface Conflict {
  id: string;
  productId: string;
  title: string;
  severity: "High" | "Medium" | "Low";
  surfaces: string[];
  detail: string;
  impact: string;
}

export const conflicts: Conflict[] = [
  {
    id: "c1",
    productId: "atlas-mobile",
    title: "Offline mode missing on Android",
    severity: "High",
    surfaces: ["Notion: PRD", "GitHub: JobRepository.kt"],
    detail:
      "PRD requires iOS/Android parity for offline at GA. iOS ships a write-ahead queue + read cache; the Android repository still always hits the network with no local fallback.",
    impact: "Blocks GA · fragments support for the 50% of field users on Android",
  },
  {
    id: "c2",
    productId: "atlas-mobile",
    title: "Offline states not designed",
    severity: "Medium",
    surfaces: ["Figma: Flows v4", "Notion: PRD"],
    detail:
      "Every Figma frame assumes a live connection. The PRD's persistent sync-status banner and queued-changes states were never designed, so engineering is building offline UI from guesses.",
    impact: "Inconsistent offline UX · rework risk once design catches up",
  },
  {
    id: "c3",
    productId: "billing-revamp",
    title: "Grace period vs hard cap undecided",
    severity: "Low",
    surfaces: ["Notion: PRD", "Slack: #billing-revamp"],
    detail:
      "PRD lists both a hard stop at 100% and a grace period as open questions. Eng has scoped the hard stop only; the grace-period path isn't reflected anywhere in the design.",
    impact: "Scope ambiguity · Finance decision still pending",
  },
];

// ---------- Activity ----------
export interface ActivityItem {
  id: string;
  actor: string;
  color: string;
  tool: FileType;
  productId: string;
  title: string;
  summary: string;
  changes: string[];
  time: string;
}

export const activity: ActivityItem[] = [
  {
    id: "a1",
    actor: "Sofia Alvarez",
    color: "bg-emerald-500",
    tool: "github",
    productId: "atlas-mobile",
    title: "atlas-android / JobRepository.kt",
    summary: "Pushed 2 commits to main",
    changes: [
      "getJob() now returns Result<Job> with typed errors  (+42 −7)",
      "Removed unused OkHttp interceptor",
      "⚠ Still no local cache — offline read path left as TODO",
    ],
    time: "2h ago",
  },
  {
    id: "a2",
    actor: "Devon Clarke",
    color: "bg-pink-500",
    tool: "figma",
    productId: "atlas-mobile",
    title: "Offline Mode — Flows v4",
    summary: "Edited 4 frames",
    changes: [
      "Added frame “Conflict review sheet”",
      "Updated spacing on “Job Detail — editing”",
      "Renamed “Sync error” → “Upload failed”",
    ],
    time: "2h ago",
  },
  {
    id: "a3",
    actor: "Priya Natarajan",
    color: "bg-violet-500",
    tool: "notion",
    productId: "atlas-mobile",
    title: "Offline Mode PRD",
    summary: "Edited the document",
    changes: [
      "Added section “Conflict resolution”",
      "Marked requirement #5 (iOS/Android parity) as must-have",
      "Left a comment for @Sofia about Android scope",
    ],
    time: "4h ago",
  },
  {
    id: "a4",
    actor: "Marcus Liu",
    color: "bg-emerald-500",
    tool: "github",
    productId: "atlas-mobile",
    title: "atlas-ios · PR #128 “Write-ahead queue”",
    summary: "Opened a pull request",
    changes: [
      "+312 −0 across 4 files",
      "Adds reachability-driven queue drain on reconnect",
      "7-day local read cache for recently opened jobs",
    ],
    time: "6h ago",
  },
  {
    id: "a5",
    actor: "Sofia Alvarez",
    color: "bg-emerald-500",
    tool: "slack",
    productId: "atlas-mobile",
    title: "#atlas-mobile",
    summary: "Replied in a thread",
    changes: [
      "“Did we decide Android was doing offline this milestone too? Want to make sure before the GA cutoff.”",
    ],
    time: "6h ago",
  },
  {
    id: "a6",
    actor: "Devon Clarke",
    color: "bg-pink-500",
    tool: "pinterest",
    productId: "atlas-mobile",
    title: "Field-app Inspiration Board",
    summary: "Added 6 pins",
    changes: ["Offline empty-state patterns", "Sync-status indicators & banners"],
    time: "1d ago",
  },
  {
    id: "a7",
    actor: "Hannah Weiss",
    color: "bg-violet-500",
    tool: "notion",
    productId: "billing-revamp",
    title: "Usage Pricing PRD",
    summary: "Edited the document",
    changes: [
      "Added open question: grace period vs hard stop at 100%",
      "Linked Finance’s proration note",
    ],
    time: "1d ago",
  },
  {
    id: "a8",
    actor: "Mei Tan",
    color: "bg-pink-500",
    tool: "figma",
    productId: "billing-revamp",
    title: "Billing Settings — Estimator",
    summary: "Created 2 frames",
    changes: ["Live cost estimator", "“Spend cap reached” state"],
    time: "2d ago",
  },
];

// ---------- Integrations ----------
export interface Integration {
  name: string;
  type: FileType;
  team: Team;
  connected: boolean;
  detail: string;
}

export const integrations: Integration[] = [
  { name: "Notion", type: "notion", team: "product", connected: true, detail: "3 workspaces · 12 docs synced" },
  { name: "GitHub", type: "github", team: "dev", connected: true, detail: "4 repos · syncing PRs & commits" },
  { name: "Figma", type: "figma", team: "design", connected: true, detail: "2 projects · 9 files" },
  { name: "Slack", type: "slack", team: "product", connected: true, detail: "5 channels watched" },
  { name: "Pinterest", type: "pinterest", team: "design", connected: true, detail: "3 boards linked" },
  { name: "Google Drive", type: "pdf", team: "product", connected: false, detail: "Connect to sync briefs & PDFs" },
];

// ---------- Next steps (Action Center) ----------
export interface NextStep {
  id: string;
  role: Role;
  title: string;
  productId: string;
  due: string;
  priority: "High" | "Medium" | "Low";
}

export const nextSteps: NextStep[] = [
  {
    id: "n1",
    role: "PM",
    title: "Confirm Android is in scope for offline GA",
    productId: "atlas-mobile",
    due: "Due in 2h",
    priority: "High",
  },
  {
    id: "n2",
    role: "Designer",
    title: "Design offline banner & queued-changes states",
    productId: "atlas-mobile",
    due: "Due in 5h",
    priority: "High",
  },
  {
    id: "n3",
    role: "Engineer",
    title: "Wire a local cache in front of JobRepository",
    productId: "atlas-mobile",
    due: "Due tomorrow",
    priority: "Medium",
  },
  {
    id: "n4",
    role: "PM",
    title: "Get Finance decision on proration",
    productId: "billing-revamp",
    due: "Due in 3 days",
    priority: "Medium",
  },
  {
    id: "n5",
    role: "Engineer",
    title: "Spec exactly-once vs at-least-once ingest",
    productId: "billing-revamp",
    due: "Due in 4 days",
    priority: "Low",
  },
];

export const ROLE_PROGRESS: { role: Role; label: string; pct: number; state: string }[] = [
  { role: "PM", label: "PM", pct: 90, state: "On track" },
  { role: "Designer", label: "Design", pct: 55, state: "In progress" },
  { role: "Engineer", label: "Engineering", pct: 70, state: "In progress" },
  { role: "Legal", label: "Legal", pct: 40, state: "Review" },
  { role: "SRE", label: "SRE / DevOps", pct: 20, state: "Not started" },
];
