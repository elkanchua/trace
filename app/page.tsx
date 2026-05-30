import Link from "next/link";
import {
  currentUser,
  nextSteps,
  activity,
  products,
  conflicts,
  ROLE_PROGRESS,
  getProduct,
} from "@/lib/data";
import { SeverityBadge, Avatar } from "@/components/ui";
import { FileTypeIcon } from "@/components/icons";

const PROGRESS_COLOR = (pct: number) =>
  pct >= 80 ? "bg-emerald-500" : pct >= 50 ? "bg-brand-500" : pct >= 30 ? "bg-amber-500" : "bg-slate-300";

export default function MyRolePage() {
  const highSeverity = conflicts.filter((c) => c.severity === "High").length;

  return (
    <div className="mx-auto max-w-[1100px] px-8 py-8">
      <header className="mb-7">
        <p className="text-sm text-subtle">Welcome back, {currentUser.name.split(" ")[0]}</p>
        <h1 className="mt-0.5 text-2xl font-semibold tracking-tight text-ink">
          Here’s what needs you, as <span className="text-brand-600">{currentUser.role}</span>
        </h1>
      </header>

      {/* Stat row */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "Active products", value: String(products.length), tone: "text-ink" },
          { label: "Open conflicts", value: String(conflicts.length), tone: "text-rose-600" },
          { label: "High severity", value: String(highSeverity), tone: "text-amber-600" },
          { label: "Your next steps", value: String(nextSteps.filter((n) => n.role === currentUser.role).length), tone: "text-brand-600" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-line bg-white p-4 shadow-card">
            <div className={`text-2xl font-semibold ${s.tone}`}>{s.value}</div>
            <div className="mt-0.5 text-xs text-subtle">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Next steps (Action Center) */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-line bg-white shadow-card">
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
              <h2 className="text-sm font-semibold text-ink">Next steps</h2>
              <span className="text-xs text-subtle">Prioritized for you & your team</span>
            </div>
            <ul className="divide-y divide-line">
              {nextSteps.map((n) => {
                const prod = getProduct(n.productId);
                const mine = n.role === currentUser.role;
                return (
                  <li key={n.id} className="flex items-center gap-3 px-5 py-3.5">
                    <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${mine ? "bg-brand-50 text-brand-700" : "bg-ink/[0.05] text-subtle"}`}>
                      {n.role}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">{n.title}</p>
                      <p className="truncate text-xs text-subtle">
                        {prod?.name.split(" — ")[0]} · {n.due}
                      </p>
                    </div>
                    <SeverityBadge level={n.priority} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Right column: role progress + activity */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <h2 className="text-sm font-semibold text-ink">Role progress</h2>
            <p className="text-xs text-subtle">Shop — In-App Commerce</p>
            <div className="mt-4 space-y-3">
              {ROLE_PROGRESS.map((r) => (
                <div key={r.role}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-ink">{r.label}</span>
                    <span className="text-subtle">{r.state}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-ink/[0.06]">
                    <div className={`h-full rounded-full ${PROGRESS_COLOR(r.pct)}`} style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white shadow-card">
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
              <h2 className="text-sm font-semibold text-ink">Recent activity</h2>
              <span className="text-xs text-subtle">across all products</span>
            </div>
            <ul className="px-5 py-1">
              {activity.slice(0, 5).map((a) => (
                <li key={a.id} className="flex items-start gap-2.5 py-2.5">
                  <div className="relative flex-shrink-0">
                    <Avatar name={a.actor} color={a.color} size="sm" />
                    <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-line bg-white">
                      <FileTypeIcon type={a.tool} className="h-2 w-2 text-ink" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 text-[13px] leading-snug">
                    <span className="font-medium text-ink">{a.actor}</span>{" "}
                    <span className="text-subtle">{a.summary.toLowerCase()}</span>
                    <div className="truncate text-[11px] text-subtle/80">
                      {a.title} · {a.time}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
