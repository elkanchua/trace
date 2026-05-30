"use client";

import { useState } from "react";
import Link from "next/link";
import {
  products,
  nextSteps,
  currentUser,
  getProduct,
  fileAnchor,
  PHASE_META,
  ROLE_LABEL,
  ROLE_TEAM,
  ROLE_PERSON,
  ROLES,
  TEAM_META,
  type FileType,
  type Role,
} from "@/lib/data";
import { SeverityBadge, StatusBadge, Avatar } from "@/components/ui";
import { FileTypeIcon } from "@/components/icons";

const RANK = { High: 0, Medium: 1, Low: 2 } as const;

function openLabel(type: FileType): string {
  switch (type) {
    case "figma": return "Open in Figma";
    case "github": return "Open in GitHub";
    case "notion": return "Open in Notion";
    case "slack": return "Open in Slack";
    case "pinterest": return "Open in Pinterest";
    case "pdf": return "Open document";
    case "image": return "Open image";
    case "link": return "Open link";
  }
}

export default function MyRolePage() {
  const [role, setRole] = useState<Role>(currentUser.role);
  const isYou = role === currentUser.role;
  const label = ROLE_LABEL[role];
  const person = ROLE_PERSON[role];
  const firstName = person.split(" ")[0];
  const teamCard = TEAM_META[ROLE_TEAM[role]].card;

  const groups = products
    .map((product) => ({
      product,
      steps: nextSteps
        .filter((s) => s.productId === product.id && s.role === role)
        .sort((a, b) => RANK[a.priority] - RANK[b.priority]),
    }))
    .filter((g) => g.steps.length > 0)
    .sort((a, b) => RANK[a.steps[0].priority] - RANK[b.steps[0].priority]);

  const total = nextSteps.filter((s) => s.role === role).length;

  return (
    <div className="mx-auto max-w-[860px] px-8 py-8">
      <header className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar name={person} size="md" />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-ink">
              {isYou ? "Your tasks today" : `${firstName}’s tasks today`}
            </h1>
            <p className="mt-0.5 text-sm text-subtle">
              <span className="text-brand-600">{label}</span> · {total} task
              {total === 1 ? "" : "s"} across {groups.length} product
              {groups.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        {/* Role switcher */}
        <div className="flex flex-col items-end gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-subtle/70">
            View person
          </span>
          <div className="flex gap-0.5 rounded-xl border border-line bg-canvas p-0.5">
            {ROLES.map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                title={ROLE_PERSON[r]}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  r === role ? "bg-white text-ink shadow-card" : "text-subtle hover:text-ink"
                }`}
              >
                {ROLE_LABEL[r]}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className={`space-y-4 rounded-3xl border p-3 shadow-card backdrop-blur-md transition-colors sm:p-4 ${teamCard}`}>
        {groups.map(({ product, steps }) => (
          <section
            key={product.id}
            className="overflow-hidden rounded-2xl border border-white/60 bg-white/85 shadow-card backdrop-blur-md"
          >
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <h2 className="truncate text-sm font-semibold text-ink">{product.name}</h2>
                <span className="flex-shrink-0 rounded-full bg-ink/[0.05] px-2 py-0.5 text-[11px] font-semibold text-ink/70">
                  P{product.phase}
                </span>
                <StatusBadge status={product.status} />
              </div>
              <Link
                href={`/products/${product.id}`}
                className="inline-flex flex-shrink-0 items-center gap-1 rounded-lg border border-line bg-white/70 px-2.5 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-brand-300 hover:bg-brand-50/60"
              >
                Manage product
                <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                  <path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <ul className="divide-y divide-line">
              {steps.map((s) => {
                const files = s.files
                  .map((name) => getProduct(s.productId)?.files.find((f) => f.name === name))
                  .filter((f): f is NonNullable<typeof f> => Boolean(f));
                return (
                  <li key={s.id} className="px-5 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-semibold text-ink">{s.title}</h3>
                      <SeverityBadge level={s.priority} />
                    </div>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink/70">{s.detail}</p>

                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-md bg-canvas px-2 py-1 text-[11px] font-medium text-subtle ring-1 ring-inset ring-line">
                        <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
                          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
                          <path d="M12 8v4l2.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                        {s.due}
                      </span>

                      {files.map((f) => (
                        <Link
                          key={f.name}
                          href={`/products/${s.productId}#${fileAnchor(f.name)}`}
                          title={f.name}
                          className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-2 py-1 text-[11px] font-medium text-ink transition-colors hover:border-brand-300 hover:bg-brand-50/60"
                        >
                          <FileTypeIcon type={f.type} className="h-3.5 w-3.5 text-ink" />
                          {openLabel(f.type)}
                        </Link>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="bg-canvas/40 px-5 py-2 text-[11px] text-subtle">
              {PHASE_META[product.phase].label}
            </div>
          </section>
        ))}

        {groups.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/60 bg-white/70 px-5 py-12 text-center text-sm text-subtle/70">
            Nothing assigned to {firstName} right now.
          </div>
        )}
      </div>
    </div>
  );
}
