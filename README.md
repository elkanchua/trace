# Trace — Product Context Platform

A single place where a product's artifacts across every tool — Notion PRDs, GitHub code,
Figma designs, Slack threads, Pinterest boards — stay connected, so intent and
implementation don't drift apart.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS**.

## Features

- **My Role** — a role-first dashboard: prioritized next steps, role progress, and a
  detailed activity feed.
- **Products** — the products you're part of, with team, role, status, and members.
  The sidebar entry is expandable into the per-product breakdown.
- **Knowledge Base** — each product's artifacts grouped into team rows:
  - **Product** → Notion, research photos, PDFs
  - **Engineering** → GitHub
  - **Design** → Figma, Pinterest
- **Conflicts** — cross-surface mismatches surfaced inside each product (e.g. a PRD
  requirement implemented on iOS but missing on Android and undesigned in Figma).
- **Activity** — a granular feed of exactly what changed in each tool.
- **Integrations** & **Settings**.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Optional: context agent

`/api/analyze` can orchestrate an analysis of a product's artifacts via ByteDance's
open-source [Trae Agent](https://github.com/bytedance/trae-agent). It needs a model
backend; see `lib/trae/`. The UI works fully without it.
