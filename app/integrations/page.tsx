import { integrations, TEAM_META } from "@/lib/data";
import { PageHeader } from "@/components/ui";
import { FileTypeIcon } from "@/components/icons";

export default function IntegrationsPage() {
  return (
    <div className="mx-auto max-w-[900px] px-8 py-8">
      <PageHeader
        title="Integrations"
        subtitle="The tools your teams already use — connected so context flows in automatically."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {integrations.map((i) => (
          <div key={i.name} className="flex items-center gap-3.5 rounded-2xl border border-white/60 bg-white/70 p-4 shadow-card backdrop-blur-md">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-line bg-white">
              {i.name === "Google Drive" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/google-drive.png" alt="Google Drive" className="h-6 w-6 object-contain" />
              ) : (
                <FileTypeIcon type={i.type} className="h-6 w-6 text-ink" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-ink">{i.name}</h3>
                <span className={`text-[11px] font-medium ${TEAM_META[i.team].accent}`}>
                  {TEAM_META[i.team].label}
                </span>
              </div>
              <p className="truncate text-xs text-subtle">{i.detail}</p>
            </div>
            {i.connected ? (
              <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Connected
              </span>
            ) : (
              <button className="flex-shrink-0 rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-ink/90">
                Connect
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
