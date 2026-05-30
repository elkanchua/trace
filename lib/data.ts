export type FileType =
  | "notion"
  | "figma"
  | "github"
  | "slack"
  | "image"
  | "pinterest"
  | "pdf"
  | "link";

export type Team = "product" | "design" | "dev" | "legal";

export type ProductStatus = "Discovery" | "In Progress" | "Shipped";

export type Role = "PM" | "Designer" | "Engineer" | "Legal";

export type Phase = 1 | 2 | 3 | 4;

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
  phase: Phase;
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
  product: { label: "Product", blurb: "Briefs, specs & research", accent: "text-violet-700", dot: "bg-violet-500" },
  design: { label: "Design", blurb: "Flows, mocks & inspiration", accent: "text-pink-700", dot: "bg-pink-500" },
  dev: { label: "Engineering", blurb: "Code, PRs & architecture", accent: "text-emerald-700", dot: "bg-emerald-500" },
  legal: { label: "Legal", blurb: "Policy, compliance & review", accent: "text-amber-700", dot: "bg-amber-500" },
};

export const TEAMS: Team[] = ["product", "design", "dev", "legal"];

export const PHASE_META: Record<Phase, { label: string; teams: Team[] }> = {
  1: { label: "Phase 1 · Definition", teams: ["product"] },
  2: { label: "Phase 2 · Design", teams: ["product", "design"] },
  3: { label: "Phase 3 · Build", teams: ["product", "design", "dev"] },
  4: { label: "Phase 4 · Launch-ready", teams: ["product", "design", "dev", "legal"] },
};

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

const PM = "bg-violet-500";
const DES = "bg-pink-500";
const ENG = "bg-emerald-500";
const LEGAL = "bg-amber-500";

export const products: Product[] = [
  // ---------- Phase 1: Definition (product only) ----------
  {
    id: "ai-dubbing",
    name: "AI Auto-Dubbing",
    status: "Discovery",
    phase: 1,
    summary:
      "Automatically translate and dub a creator's video into other languages with voice cloning and lip-sync.",
    myRole: "PM",
    conflicts: 0,
    members: [
      { name: "Priya Natarajan", role: "PM", color: PM },
      { name: "Hannah Weiss", role: "PM", color: PM },
    ],
    files: [
      {
        name: "AI Auto-Dubbing PRD",
        type: "notion",
        owner: "Priya Natarajan",
        team: "product",
        updated: "Updated 3h ago",
        content:
          "Let creators reach global audiences: auto-translate captions, generate a cloned voice track in the target language, and lip-sync the speaker. Open questions on voice-consent and which 10 launch languages.",
      },
      {
        name: "Localization Market Research",
        type: "pdf",
        owner: "Hannah Weiss",
        team: "product",
        updated: "Updated 1d ago",
        content:
          "Ranks 12 priority markets by creator demand and watch-time lift. SE Asia and LatAm show the highest appetite for dubbed content.",
      },
    ],
  },

  // ---------- Phase 2: Design (product + design) ----------
  {
    id: "direct-messages",
    name: "Direct Messages 2.0",
    status: "Discovery",
    phase: 2,
    summary:
      "A rebuilt inbox with group chats, reactions, voice notes, and safer message requests.",
    myRole: "PM",
    conflicts: 1,
    members: [
      { name: "Priya Natarajan", role: "PM", color: PM },
      { name: "Devon Clarke", role: "Designer", color: DES },
      { name: "Mei Tan", role: "Designer", color: DES },
    ],
    files: [
      {
        name: "Direct Messages 2.0 PRD",
        type: "notion",
        owner: "Priya Natarajan",
        team: "product",
        updated: "Updated 5h ago",
        content:
          "Group chats up to 32 people, message reactions, voice notes, and a message-request gate so creators aren't flooded. Read receipts are opt-in.",
      },
      {
        name: "Messaging User Interviews",
        type: "image",
        owner: "Hannah Weiss",
        team: "product",
        updated: "Updated 4d ago",
      },
      {
        name: "DM 2.0 — Flows",
        type: "figma",
        owner: "Devon Clarke",
        team: "design",
        updated: "Updated 2h ago",
        content:
          "Group-chat creation, reactions long-press menu, and message-request states. Voice notes are not designed yet — flagged as a gap.",
      },
      {
        name: "Messaging UI Inspiration",
        type: "pinterest",
        owner: "Mei Tan",
        team: "design",
        updated: "Updated 1w ago",
      },
    ],
  },

  // ---------- Phase 3: Build (product + design + dev) ----------
  {
    id: "live-gifts",
    name: "Live Gifts & Streaming",
    status: "In Progress",
    phase: 3,
    summary:
      "Live streaming with virtual gifts, real-time gift animations, a top-gifter leaderboard, and creator payouts.",
    myRole: "PM",
    conflicts: 2,
    members: [
      { name: "Hannah Weiss", role: "PM", color: PM },
      { name: "Devon Clarke", role: "Designer", color: DES },
      { name: "Marcus Liu", role: "Engineer", color: ENG },
      { name: "Sofia Alvarez", role: "Engineer", color: ENG },
    ],
    files: [
      {
        name: "Live Gifts PRD",
        type: "notion",
        owner: "Hannah Weiss",
        team: "product",
        updated: "Updated 1d ago",
        content:
          "Viewers buy coins and send virtual gifts during a live. Requires real-time gift animations, a live top-gifter leaderboard, and a 50/50 creator payout split.",
      },
      {
        name: "Gifting Economy Model",
        type: "pdf",
        owner: "Hannah Weiss",
        team: "product",
        updated: "Updated 3d ago",
      },
      {
        name: "Live — Gifting UI",
        type: "figma",
        owner: "Devon Clarke",
        team: "design",
        updated: "Updated 6h ago",
        content:
          "Gift tray, combo/streak burst animations, and the top-gifter leaderboard overlay. Specifies escalating effects for high-value and combo gifts.",
      },
      {
        name: "Gift Animation References",
        type: "pinterest",
        owner: "Devon Clarke",
        team: "design",
        updated: "Updated 1w ago",
      },
      {
        name: "live-service / GiftStream.ts",
        type: "github",
        owner: "Marcus Liu",
        team: "dev",
        updated: "Updated 4h ago",
        content:
          "Streams gift events to viewers over WebSocket and credits the creator wallet. Does not yet emit the aggregated leaderboard events the PRD calls for.",
      },
      {
        name: "android-live / GiftRenderer.kt",
        type: "github",
        owner: "Sofia Alvarez",
        team: "dev",
        updated: "Updated 1h ago",
        content:
          "Renders single gift animations on Android. Combo and streak gifts fall back to a single icon — the escalating burst effects from design aren't implemented.",
      },
    ],
  },

  // ---------- Phase 4: Launch-ready (product + design + dev + legal) ----------
  {
    id: "shop",
    name: "Shop — In-App Commerce",
    status: "In Progress",
    phase: 4,
    summary:
      "In-app shopping with creator storefronts, checkout, affiliate links, and seller payouts.",
    myRole: "PM",
    conflicts: 2,
    members: [
      { name: "Owen Bradley", role: "PM", color: PM },
      { name: "Devon Clarke", role: "Designer", color: DES },
      { name: "Raj Patel", role: "Engineer", color: ENG },
      { name: "Lena Fischer", role: "Engineer", color: ENG },
      { name: "Nadia Rahman", role: "Legal", color: LEGAL },
    ],
    files: [
      {
        name: "TikTok Shop PRD",
        type: "notion",
        owner: "Owen Bradley",
        team: "product",
        updated: "Updated 1d ago",
        content:
          "Creator storefronts, in-feed product tags, native checkout, and affiliate commissions. Targeting launch in 3 markets this quarter.",
      },
      {
        name: "Shopper Journey Research",
        type: "image",
        owner: "Owen Bradley",
        team: "product",
        updated: "Updated 5d ago",
      },
      {
        name: "Checkout Flow",
        type: "figma",
        owner: "Devon Clarke",
        team: "design",
        updated: "Updated 5h ago",
        content:
          "Cart, address, and payment steps with an order-confirmation screen. Does not currently surface refund terms or an age gate.",
      },
      {
        name: "Storefront Moodboard",
        type: "pinterest",
        owner: "Devon Clarke",
        team: "design",
        updated: "Updated 1w ago",
      },
      {
        name: "checkout-service / PaymentIntent.ts",
        type: "github",
        owner: "Raj Patel",
        team: "dev",
        updated: "Updated 3h ago",
        content:
          "Creates a Stripe PaymentIntent with 3DS support and captures on fulfillment. No age-verification step before payment.",
      },
      {
        name: "shop-web / Cart.tsx",
        type: "github",
        owner: "Lena Fischer",
        team: "dev",
        updated: "Updated 7h ago",
        content:
          "Cart and line-item UI bound to the checkout service. Renders product, price, and quantity; no refund-policy disclosure.",
      },
      {
        name: "Age & Restricted Goods Review",
        type: "pdf",
        owner: "Nadia Rahman",
        team: "legal",
        updated: "Updated 2h ago",
        content:
          "Age-restricted categories (e.g. supplements, cosmetics with restrictions) require verified-age checkout. Under-18 accounts must be blocked from purchasing these items.",
      },
      {
        name: "Seller Compliance Checklist",
        type: "pdf",
        owner: "Nadia Rahman",
        team: "legal",
        updated: "Updated 4d ago",
        content:
          "Sellers must display refund and return terms before purchase, plus business identity. Checkout must surface refund policy prior to payment.",
      },
      {
        name: "Minors & Payments Policy",
        type: "notion",
        owner: "Nadia Rahman",
        team: "legal",
        updated: "Updated 6d ago",
      },
    ],
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

// Stable anchor id for a knowledge-base file, so conflicts can deep-link to it.
export function fileAnchor(name: string): string {
  return "file-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const STATUSES: ProductStatus[] = ["Discovery", "In Progress", "Shipped"];

// ---------- Conflicts (per product) ----------
export interface Conflict {
  id: string;
  productId: string;
  title: string;
  severity: "High" | "Medium" | "Low";
  surfaces: string[];
  detail: string;
  impact: string;
  affectedFiles: string[];
}

export const conflicts: Conflict[] = [
  {
    id: "dm1",
    productId: "direct-messages",
    title: "Voice notes specced but not designed",
    severity: "Low",
    surfaces: ["Notion: PRD", "Figma: DM 2.0 — Flows"],
    detail:
      "The PRD lists voice notes as a launch feature, but the Figma flows only cover text, reactions, and message requests. There's no record/playback UI yet.",
    impact: "Scope gap · design rework risk before build starts",
    affectedFiles: ["Direct Messages 2.0 PRD", "DM 2.0 — Flows"],
  },
  {
    id: "lg1",
    productId: "live-gifts",
    title: "Leaderboard events not emitted by backend",
    severity: "High",
    surfaces: ["Notion: PRD", "GitHub: GiftStream.ts"],
    detail:
      "The PRD requires a real-time top-gifter leaderboard and design built the overlay, but GiftStream.ts only streams individual gift events — it never aggregates or emits leaderboard updates.",
    impact: "Leaderboard can't ship · blocks the headline live feature",
    affectedFiles: ["Live Gifts PRD", "live-service / GiftStream.ts", "Live — Gifting UI"],
  },
  {
    id: "lg2",
    productId: "live-gifts",
    title: "Android drops combo gift animations",
    severity: "Medium",
    surfaces: ["Figma: Gifting UI", "GitHub: GiftRenderer.kt"],
    detail:
      "Design specifies escalating burst effects for combo/streak gifts. The Android GiftRenderer renders a single icon and ignores combos, so high-value gifts look identical to small ones.",
    impact: "Inconsistent gifter experience · hurts monetization on Android",
    affectedFiles: ["Live — Gifting UI", "android-live / GiftRenderer.kt"],
  },
  {
    id: "sh1",
    productId: "shop",
    title: "Checkout skips age verification for restricted goods",
    severity: "High",
    surfaces: ["Legal: Age Review", "GitHub: PaymentIntent.ts", "Figma: Checkout Flow"],
    detail:
      "Legal requires verified-age checkout for restricted categories and blocking under-18 accounts. Neither the checkout flow nor PaymentIntent.ts has any age gate before payment.",
    impact: "Compliance blocker · cannot launch restricted categories",
    affectedFiles: ["Age & Restricted Goods Review", "checkout-service / PaymentIntent.ts", "Checkout Flow"],
  },
  {
    id: "sh2",
    productId: "shop",
    title: "Refund terms not surfaced at checkout",
    severity: "Medium",
    surfaces: ["Legal: Seller Compliance", "Figma: Checkout Flow"],
    detail:
      "Seller-compliance rules require refund and return terms to be visible before purchase. The Figma checkout flow and the cart UI don't show them anywhere.",
    impact: "Consumer-protection risk · seller onboarding may be blocked",
    affectedFiles: ["Seller Compliance Checklist", "Checkout Flow", "shop-web / Cart.tsx"],
  },
];

// ---------- Activity (per product) ----------
export interface ActivityItem {
  id: string;
  productId: string;
  actor: string;
  color: string;
  tool: FileType;
  title: string;
  summary: string;
  changes: string[];
  time: string;
}

export const activity: ActivityItem[] = [
  // AI Dubbing (phase 1)
  {
    id: "ad1",
    productId: "ai-dubbing",
    actor: "Priya Natarajan",
    color: PM,
    tool: "notion",
    title: "AI Auto-Dubbing PRD",
    summary: "Created the document",
    changes: [
      "Drafted goal: dub creator videos into 10 languages",
      "Added open question: voice-cloning consent",
      "Noted this will need a legal review before build",
    ],
    time: "3h ago",
  },
  {
    id: "ad2",
    productId: "ai-dubbing",
    actor: "Hannah Weiss",
    color: PM,
    tool: "pdf",
    title: "Localization Market Research",
    summary: "Uploaded a file",
    changes: ["Ranked 12 priority markets", "SE Asia + LatAm show highest demand"],
    time: "1d ago",
  },

  // Direct Messages (phase 2)
  {
    id: "dm_a1",
    productId: "direct-messages",
    actor: "Devon Clarke",
    color: DES,
    tool: "figma",
    title: "DM 2.0 — Flows",
    summary: "Edited 5 frames",
    changes: [
      "Added group-chat creation flow",
      "Reactions long-press menu",
      "⚠ Voice notes still not designed",
    ],
    time: "2h ago",
  },
  {
    id: "dm_a2",
    productId: "direct-messages",
    actor: "Priya Natarajan",
    color: PM,
    tool: "notion",
    title: "Direct Messages 2.0 PRD",
    summary: "Edited the document",
    changes: ["Added voice-notes requirement", "Defined message-request gating"],
    time: "5h ago",
  },

  // Live Gifts (phase 3)
  {
    id: "lg_a1",
    productId: "live-gifts",
    actor: "Sofia Alvarez",
    color: ENG,
    tool: "github",
    title: "android-live / GiftRenderer.kt",
    summary: "Pushed 3 commits",
    changes: [
      "Renders single gift animations  (+88 −12)",
      "⚠ Combo / streak gifts not handled yet",
    ],
    time: "1h ago",
  },
  {
    id: "lg_a2",
    productId: "live-gifts",
    actor: "Marcus Liu",
    color: ENG,
    tool: "github",
    title: "live-service · PR #204 “Gift stream”",
    summary: "Opened a pull request",
    changes: [
      "Real-time gift events over WebSocket  (+540 −0)",
      "Credits creator wallet on each gift",
      "⚠ No leaderboard event emitted yet",
    ],
    time: "4h ago",
  },
  {
    id: "lg_a3",
    productId: "live-gifts",
    actor: "Devon Clarke",
    color: DES,
    tool: "figma",
    title: "Live — Gifting UI",
    summary: "Added 3 frames",
    changes: ["Combo gift burst animation", "Top-gifter leaderboard overlay"],
    time: "6h ago",
  },

  // Shop (phase 4)
  {
    id: "sh_a1",
    productId: "shop",
    actor: "Nadia Rahman",
    color: LEGAL,
    tool: "pdf",
    title: "Age & Restricted Goods Review",
    summary: "Uploaded a legal review",
    changes: [
      "Restricted categories require verified-age checkout",
      "Under-18 accounts must be blocked from these items",
    ],
    time: "2h ago",
  },
  {
    id: "sh_a2",
    productId: "shop",
    actor: "Raj Patel",
    color: ENG,
    tool: "github",
    title: "checkout-service / PaymentIntent.ts",
    summary: "Pushed 2 commits",
    changes: ["Stripe PaymentIntent with 3DS  (+120 −5)", "⚠ No age gate before payment"],
    time: "3h ago",
  },
  {
    id: "sh_a3",
    productId: "shop",
    actor: "Devon Clarke",
    color: DES,
    tool: "figma",
    title: "Checkout Flow",
    summary: "Edited 4 frames",
    changes: ["Added address + payment steps", "⚠ Refund terms not shown anywhere"],
    time: "5h ago",
  },
  {
    id: "sh_a4",
    productId: "shop",
    actor: "Owen Bradley",
    color: PM,
    tool: "notion",
    title: "TikTok Shop PRD",
    summary: "Edited the document",
    changes: ["Added creator storefronts", "Affiliate commission model"],
    time: "1d ago",
  },
];

export function productActivity(productId: string): ActivityItem[] {
  return activity.filter((a) => a.productId === productId);
}

// ---------- Integrations ----------
export interface Integration {
  name: string;
  type: FileType;
  team: Team;
  connected: boolean;
  detail: string;
}

export const integrations: Integration[] = [
  { name: "Notion", type: "notion", team: "product", connected: true, detail: "4 workspaces · 16 docs synced" },
  { name: "GitHub", type: "github", team: "dev", connected: true, detail: "6 repos · syncing PRs & commits" },
  { name: "Figma", type: "figma", team: "design", connected: true, detail: "3 projects · 14 files" },
  { name: "Slack", type: "slack", team: "product", connected: true, detail: "8 channels watched" },
  { name: "Pinterest", type: "pinterest", team: "design", connected: true, detail: "4 boards linked" },
  { name: "Google Drive", type: "pdf", team: "legal", connected: false, detail: "Connect to sync legal & research docs" },
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
  { id: "n1", role: "PM", title: "Resolve age-verification gap before Shop launch", productId: "shop", due: "Due in 2h", priority: "High" },
  { id: "n2", role: "Legal", title: "Sign off on restricted-goods age policy", productId: "shop", due: "Due in 4h", priority: "High" },
  { id: "n3", role: "Engineer", title: "Emit leaderboard events from GiftStream", productId: "live-gifts", due: "Due tomorrow", priority: "Medium" },
  { id: "n4", role: "Designer", title: "Design the voice-notes flow in DM 2.0", productId: "direct-messages", due: "Due in 2 days", priority: "Medium" },
  { id: "n5", role: "PM", title: "Finalize the AI-dubbing voice-consent model", productId: "ai-dubbing", due: "Due in 4 days", priority: "Low" },
];

export const ROLE_PROGRESS: { role: Role; label: string; pct: number; state: string }[] = [
  { role: "PM", label: "PM", pct: 85, state: "On track" },
  { role: "Designer", label: "Design", pct: 60, state: "In progress" },
  { role: "Engineer", label: "Engineering", pct: 70, state: "In progress" },
  { role: "Legal", label: "Legal", pct: 45, state: "Review" },
];
