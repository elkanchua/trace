"use client";

import { useState } from "react";
import { TEAMS, TEAM_META, type Product, type Team } from "@/lib/data";
import { FileTile } from "./FileTile";
import { Avatar } from "./ui";

export function KnowledgeBase({
  product,
  highlightedFiles,
}: {
  product: Product;
  highlightedFiles?: Set<string>;
}) {
  const teamsWithFiles = TEAMS.filter((t) => product.files.some((f) => f.team === t));
  const [active, setActive] = useState<Team>(teamsWithFiles[0] ?? "product");

  const files = product.files.filter((f) => f.team === active);
  const meta = TEAM_META[active];
  const owners = Array.from(new Set(files.map((f) => f.owner)));

  return (
    <div>
      <div className="mt-8 mb-4 flex items-center gap-2">
        <h2 className="text-base font-semibold text-ink">Knowledge Base</h2>
        <span className="text-sm text-subtle">· the shared source of truth, by team</span>
      </div>

      {/* Team toggles + add content */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {teamsWithFiles.map((t) => {
            const m = TEAM_META[t];
            const isActive = t === active;
            const count = product.files.filter((f) => f.team === t).length;
            return (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  isActive
                    ? `${m.card} text-ink`
                    : "border-line bg-white/50 text-subtle hover:text-ink"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />
                {m.label}
                <span className="text-ink/40">{count}</span>
              </button>
            );
          })}
        </div>
        <button className="inline-flex items-center gap-1 rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-ink/90">
          <span className="text-sm leading-none">+</span> Add content
        </button>
      </div>

      {/* Active team's knowledge base */}
      <section className={`rounded-2xl border p-4 shadow-card backdrop-blur-md ${meta.card}`}>
        <div className="mb-3 flex items-center gap-2.5 px-1">
          <span className={`h-2.5 w-2.5 rounded-full ${meta.dot}`} />
          <h3 className="text-sm font-semibold text-ink">{meta.label} team</h3>
          <span className="text-xs text-ink/50">· {meta.blurb}</span>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex -space-x-1.5">
              {owners.map((o) => (
                <Avatar key={o} name={o} size="sm" />
              ))}
            </div>
            <span className="rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-medium text-ink/70 ring-1 ring-inset ring-black/5">
              {files.length} file{files.length > 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {files.map((f) => (
            <FileTile key={f.name} file={f} highlighted={highlightedFiles?.has(f.name)} />
          ))}
        </div>
      </section>
    </div>
  );
}
