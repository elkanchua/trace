import Link from "next/link";
import { activity, getProduct } from "@/lib/data";
import { PageHeader, Avatar } from "@/components/ui";
import { FileTypeIcon, TYPE_META } from "@/components/icons";

export default function ActivityPage() {
  return (
    <div className="mx-auto max-w-[760px] px-8 py-8">
      <PageHeader
        title="Activity"
        subtitle="Every change across your products — exactly what moved, in which tool."
      />

      <div className="space-y-3">
        {activity.map((a) => {
          const product = getProduct(a.productId);
          return (
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

                  <div className="mt-0.5 flex items-center gap-1.5 text-xs text-subtle">
                    <span className="font-medium text-ink/80">{a.title}</span>
                    <span>·</span>
                    <span>{TYPE_META[a.tool].label}</span>
                  </div>

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

                  <div className="mt-2.5">
                    <Link
                      href={`/products/${a.productId}`}
                      className="text-[11px] font-medium text-subtle hover:text-ink"
                    >
                      {product?.name.split(" — ")[0]} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
