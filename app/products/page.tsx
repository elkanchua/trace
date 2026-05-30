import Link from "next/link";
import { products, TEAM_META, TEAMS, PHASE_META, ROLE_LABEL } from "@/lib/data";
import { PageHeader, StatusBadge, Avatar } from "@/components/ui";

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-8 py-8">
      <PageHeader
        title="Products"
        subtitle="Products you're part of, across every team and tool."
        action={
          <Link
            href="/products/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-ink/90"
          >
            <span className="text-base leading-none">+</span> New Product
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className="group flex flex-col rounded-2xl border border-white/60 bg-white/70 p-5 shadow-card backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white/80 hover:shadow-lift"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold leading-snug text-ink">{p.name}</h3>
              <div className="flex flex-shrink-0 items-center gap-1.5">
                <span className="rounded-full bg-ink/[0.05] px-2 py-0.5 text-[11px] font-semibold text-ink/70">
                  P{p.phase}
                </span>
                <StatusBadge status={p.status} />
              </div>
            </div>

            <p className="mt-2 text-[13px] leading-relaxed text-subtle">{p.summary}</p>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex -space-x-1.5">
                {p.members.map((m) => (
                  <Avatar key={m.name} name={m.name} color={m.color} size="sm" />
                ))}
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2 py-0.5 font-medium text-brand-700">
                  Your role · {ROLE_LABEL[p.myRole]}
                </span>
                {p.conflicts > 0 ? (
                  <span className="inline-flex items-center gap-1.5 font-medium text-[#b23a1c]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d94e2b]" />
                    {p.conflicts} conflict{p.conflicts > 1 ? "s" : ""}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    in sync
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 border-t border-line pt-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
                {PHASE_META[p.phase].label}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                {TEAMS.map((t) => {
                  const active = PHASE_META[p.phase].teams.includes(t);
                  return (
                    <span
                      key={t}
                      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium ${
                        active
                          ? "bg-canvas text-ink ring-1 ring-inset ring-line"
                          : "text-subtle/40"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${active ? TEAM_META[t].dot : "bg-subtle/20"}`}
                      />
                      {TEAM_META[t].label}
                    </span>
                  );
                })}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
