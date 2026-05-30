import { productBlockers, ROLE_TEAM, TEAM_META, ROLE_LABEL } from "@/lib/data";
import { Avatar } from "./ui";

export function BlockerBoard({ productId }: { productId: string }) {
  const items = productBlockers(productId);
  if (items.length === 0) return null;

  return (
    <div className="mt-5">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-base font-semibold text-ink">Who’s blocked & how to unblock</h2>
        <span className="text-sm text-subtle">· one card per team</span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((b) => {
          const meta = TEAM_META[ROLE_TEAM[b.role]];
          return (
            <div
              key={b.role}
              className={`flex flex-col rounded-xl border p-4 shadow-card backdrop-blur-md ${meta.card}`}
            >
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${meta.dot}`} />
                <h3 className="text-sm font-semibold text-ink">{ROLE_LABEL[b.role]}</h3>
              </div>

              <div className="mt-3 flex-1 space-y-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-ink/45">
                    Blocked
                  </p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <Avatar name={b.person} size="sm" />
                    <span className="text-[12.5px] font-medium text-ink">{b.person}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-ink/45">
                    Waiting for
                  </p>
                  <p className="mt-0.5 text-[12.5px] leading-snug text-ink/80">{b.waitingFor}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-ink/45">
                    Next best action
                  </p>
                  <p className="mt-0.5 text-[12.5px] leading-snug text-ink/80">{b.nextAction}</p>
                </div>
              </div>

              <button
                className={`mt-4 rounded-lg bg-white/80 py-2 text-xs font-semibold ring-1 ring-inset ring-black/5 transition-colors hover:bg-white ${meta.accent}`}
              >
                {b.actionLabel}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
