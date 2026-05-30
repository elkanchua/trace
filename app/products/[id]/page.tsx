import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, conflicts, TEAMS, TEAM_META } from "@/lib/data";
import { StatusBadge, Avatar, SeverityBadge } from "@/components/ui";
import { FileTile } from "@/components/FileTile";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);
  if (!product) notFound();

  const productConflicts = conflicts.filter((c) => c.productId === product.id);

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

      {/* Conflict strip */}
      {productConflicts.length > 0 && (
        <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50/60 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-rose-700">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-600">!</span>
            {productConflicts.length} cross-surface conflict
            {productConflicts.length > 1 ? "s" : ""} detected
          </div>
          <div className="mt-3 space-y-2">
            {productConflicts.map((c) => (
              <div key={c.id} className="rounded-lg bg-white px-3.5 py-3">
                <div className="flex items-start gap-3">
                  <SeverityBadge level={c.severity} />
                  <span className="flex-1 text-[13px] font-semibold text-ink">{c.title}</span>
                  <span className="hidden flex-shrink-0 text-xs text-subtle sm:block">
                    {c.surfaces.join("  ·  ")}
                  </span>
                </div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink/70">{c.detail}</p>
                <p className="mt-1.5 text-[11px] text-subtle">
                  <span className="font-medium text-ink/60">Impact:</span> {c.impact}
                </p>
              </div>
            ))}
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
          return (
            <section key={team} className="rounded-2xl border border-line bg-canvas/60 p-4">
              <div className="mb-3 flex items-center gap-2.5 px-1">
                <span className={`h-2.5 w-2.5 rounded-full ${meta.dot}`} />
                <h3 className="text-sm font-semibold text-ink">{meta.label} team</h3>
                <span className="text-xs text-subtle">· {meta.blurb}</span>
                <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-subtle ring-1 ring-inset ring-line">
                  {files.length} file{files.length > 1 ? "s" : ""}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {files.map((f) => (
                  <FileTile key={f.name} file={f} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
