"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getProduct,
  conflicts,
  fileAnchor,
  createGeneratedProduct,
  productActivity,
  TEAMS,
  TEAM_META,
  PHASE_META,
} from "@/lib/data";

import { StatusBadge, Avatar, SeverityBadge } from "@/components/ui";
import { FileTile } from "@/components/FileTile";
import { FileTypeIcon } from "@/components/icons";

const shortName = (name: string) => (name.includes(" / ") ? name.split(" / ").pop()! : name);

function getSearchValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default function ProductDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { name?: string | string[]; notion?: string | string[] };
}) {
  const generated = params.id === "generated-product";
  const product =
    getProduct(params.id) ??
    (generated
      ? createGeneratedProduct(
          getSearchValue(searchParams?.name),
          getSearchValue(searchParams?.notion),
        )
      : undefined);

  if (!product) notFound();


  const productConflicts = generated ? [] : conflicts.filter((c) => c.productId === product.id);
  const acts = productActivity(product.id);
  const phaseTeams = PHASE_META[product.phase].teams;

  const [highlightedFiles, setHighlightedFiles] = useState<Set<string>>(new Set());
  const [conflictsRevealed, setConflictsRevealed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFindConflicts = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setConflictsRevealed(true);
      const affected = new Set<string>();
      productConflicts.forEach((c) => c.affectedFiles.forEach((f) => affected.add(f)));
      setHighlightedFiles(affected);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-[1100px] px-8 py-8">
      <Link
        href="/products"
        className="inline-flex items-center gap-1 text-xs font-medium text-subtle hover:text-ink"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
          <path d="m14 7-5 5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Products
      </Link>

      {/* Product header */}
      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-ink">{product.name}</h1>
            <StatusBadge status={product.status} />
          </div>
          <p className="mt-1.5 max-w-2xl text-sm text-subtle">{product.summary}</p>
        </div>
        <div className="flex flex-shrink-0 flex-col items-end gap-2">
          <div className="flex -space-x-1.5">
            {product.members.map((m) => (
              <Avatar key={m.name} name={m.name} color={m.color} size="sm" />
            ))}
          </div>
          <span className="text-xs text-subtle">Your role · {product.myRole}</span>
        </div>
      </div>

      {/* Phase tracker */}
      <div className="mt-5 flex flex-wrap items-center gap-2.5 rounded-xl border border-line bg-white p-3 shadow-card">
        <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-white">
          {PHASE_META[product.phase].label}
        </span>
        <div className="flex items-center gap-1.5">
          {TEAMS.map((t, i) => {
            const active = phaseTeams.includes(t);
            return (
              <div key={t} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-subtle/30">›</span>}
                <span
                  className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium ${
                    active ? "bg-canvas text-ink ring-1 ring-inset ring-line" : "text-subtle/40"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${active ? TEAM_META[t].dot : "bg-subtle/20"}`} />
                  {TEAM_META[t].label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Find Conflicts button */}
      {productConflicts.length > 0 && !conflictsRevealed && !loading && (
        <div className="mt-5">
          <button
            onClick={handleFindConflicts}
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Find Conflicts
          </button>
        </div>
      )}

      {/* Loading shimmer */}
      {loading && (
        <div className="mt-5 rounded-xl border border-line bg-white p-4 shadow-card">
          <div className="space-y-3">
            <div className="shimmer h-4 w-48 rounded bg-slate-200" />
            <div className="shimmer h-20 w-full rounded-lg bg-slate-100" />
            <div className="shimmer h-20 w-full rounded-lg bg-slate-100" />
          </div>
        </div>
      )}

      {/* Conflict strip — only shown after Find Conflicts completes */}
      {conflictsRevealed && productConflicts.length > 0 && (
        <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50/60 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-rose-700">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-600">!</span>
            {productConflicts.length} cross-surface conflict
            {productConflicts.length > 1 ? "s" : ""} detected
          </div>
          <div className="mt-3 space-y-2">
            {productConflicts.map((c) => {
              const affected = c.affectedFiles
                .map((name) => product.files.find((f) => f.name === name))
                .filter((f): f is NonNullable<typeof f> => Boolean(f));
              return (
                <div key={c.id} className="rounded-lg bg-white px-3.5 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <SeverityBadge level={c.severity} />
                      <span className="text-[13px] font-semibold text-ink">{c.title}</span>
                    </div>
                    {/* Buttons that jump straight to the affected files */}
                    <div className="flex flex-shrink-0 flex-wrap justify-end gap-1.5">
                      {affected.map((f) => (
                        <a
                          key={f.name}
                          href={`#${fileAnchor(f.name)}`}
                          title={`Go to ${f.name}`}
                          className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-2 py-1 text-[11px] font-medium text-ink transition-colors hover:border-brand-300 hover:bg-brand-50/60"
                        >
                          <FileTypeIcon type={f.type} className="h-3.5 w-3.5 text-ink" />
                          <span className="max-w-[140px] truncate">{shortName(f.name)}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink/70">{c.detail}</p>
                  <p className="mt-1.5 text-[11px] text-subtle">
                    <span className="font-medium text-ink/60">Impact:</span> {c.impact}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Knowledge Base */}
      <div className="mt-8 mb-4 flex items-center gap-2">
        <h2 className="text-base font-semibold text-ink">Knowledge Base</h2>
        <span className="text-sm text-subtle">· the shared source of truth, by team</span>
      </div>

      <div className="space-y-5">
        {TEAMS.map((team) => {
          const files = product.files.filter((f) => f.team === team);
          if (files.length === 0) return null;
          const meta = TEAM_META[team];
          const owners = Array.from(new Set(files.map((f) => f.owner)));
          return (
            <section key={team} className="rounded-2xl border border-line bg-white p-4 shadow-card">
              <div className="mb-3 flex items-center gap-2.5 px-1">
                <span className={`h-2.5 w-2.5 rounded-full ${meta.dot}`} />
                <h3 className="text-sm font-semibold text-ink">{meta.label} team</h3>
                <span className="text-xs text-subtle">· {meta.blurb}</span>
                <div className="ml-auto flex items-center gap-3">
                  <div className="flex -space-x-1.5">
                    {owners.map((o) => (
                      <Avatar key={o} name={o} size="sm" />
                    ))}
                  </div>
                  <span className="rounded-full bg-canvas px-2 py-0.5 text-[11px] font-medium text-subtle ring-1 ring-inset ring-line">
                    {files.length} file{files.length > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {files.map((f) => (
                  <FileTile key={f.name} file={f} highlighted={highlightedFiles.has(f.name)} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Activity (per product) */}
      <div className="mt-8 mb-4 flex items-center gap-2">
        <h2 className="text-base font-semibold text-ink">Activity</h2>
        <span className="text-sm text-subtle">· what changed across this product's surfaces</span>
      </div>

      {acts.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line bg-white px-5 py-8 text-center text-sm text-subtle/70">
          No activity yet.
        </p>
      ) : (
        <div className="space-y-3">
          {acts.map((a) => (
            <div key={a.id} className="rounded-2xl border border-line bg-white p-4 shadow-card">
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <Avatar name={a.actor} color={a.color} size="md" />
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-line bg-white">
                    <FileTypeIcon type={a.tool} className="h-2.5 w-2.5 text-ink" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-sm leading-snug">
                      <span className="font-semibold text-ink">{a.actor}</span>{" "}
                      <span className="text-subtle">{a.summary.toLowerCase()}</span>
                    </p>
                    <span className="flex-shrink-0 text-xs text-subtle">{a.time}</span>
                  </div>
                  <p className="mt-0.5 text-xs font-medium text-ink/80">{a.title}</p>
                  <ul className="mt-2.5 space-y-1.5 border-l-2 border-line pl-3">
                    {a.changes.map((c, i) => (
                      <li
                        key={i}
                        className={`text-[12.5px] leading-relaxed ${
                          c.startsWith("⚠") ? "font-medium text-amber-700" : "text-ink/75"
                        }`}
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
