import Link from "next/link";
import { products, TEAM_META } from "@/lib/data";
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
            className="group flex flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold leading-snug text-ink">{p.name}</h3>
              <StatusBadge status={p.status} />
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
                  Your role · {p.myRole}
                </span>
                {p.conflicts > 0 ? (
                  <span className="inline-flex items-center gap-1.5 font-medium text-rose-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
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

            <div className="mt-4 flex items-center gap-2 border-t border-line pt-3 text-[11px] text-subtle">
              {(["product", "dev", "design"] as const).map((t) => {
                const count = p.files.filter((f) => f.team === t).length;
                return (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${TEAM_META[t].dot}`} />
                    {TEAM_META[t].label} {count}
                  </span>
                );
              })}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
