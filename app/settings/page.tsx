import { currentUser } from "@/lib/data";
import { PageHeader, Avatar } from "@/components/ui";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
    </div>
  );
}

function Toggle({ on = false }: { on?: boolean }) {
  return (
    <span
      className={`flex h-5 w-9 items-center rounded-full px-0.5 transition-colors ${
        on ? "bg-brand-600" : "bg-ink/15"
      }`}
    >
      <span className={`h-4 w-4 rounded-full bg-white shadow transition-transform ${on ? "translate-x-4" : ""}`} />
    </span>
  );
}

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-[760px] px-8 py-8">
      <PageHeader title="Settings" subtitle="Manage your profile, role, and notifications." />

      <div className="space-y-5">
        <section className="rounded-2xl border border-line bg-white shadow-card">
          <h2 className="border-b border-line px-5 py-3.5 text-sm font-semibold text-ink">Profile</h2>
          <div className="flex items-center gap-4 px-5 py-5">
            <Avatar name={currentUser.name} color="bg-brand-600" />
            <div>
              <div className="text-sm font-semibold text-ink">{currentUser.name}</div>
              <div className="text-xs text-subtle">{currentUser.email}</div>
            </div>
            <button className="ml-auto rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink hover:bg-canvas">
              Edit
            </button>
          </div>
          <div className="divide-y divide-line border-t border-line">
            <Row label="Primary role">
              <span className="rounded-lg border border-line bg-canvas px-3 py-1.5 text-sm font-medium text-ink">
                {currentUser.role}
              </span>
            </Row>
            <Row label="Default product view">
              <span className="text-sm text-subtle">Role-based</span>
            </Row>
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-white shadow-card">
          <h2 className="border-b border-line px-5 py-3.5 text-sm font-semibold text-ink">Notifications</h2>
          <div className="divide-y divide-line">
            <Row label="New conflict detected on my products"><Toggle on /></Row>
            <Row label="Decisions awaiting my input"><Toggle on /></Row>
            <Row label="Weekly context digest"><Toggle /></Row>
            <Row label="Someone @mentions me"><Toggle on /></Row>
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-white shadow-card">
          <h2 className="border-b border-line px-5 py-3.5 text-sm font-semibold text-ink">Workspace</h2>
          <div className="divide-y divide-line">
            <Row label="Team">
              <span className="text-sm text-subtle">Acme Product Org</span>
            </Row>
            <Row label="Members">
              <span className="text-sm text-subtle">12 people</span>
            </Row>
          </div>
        </section>
      </div>
    </div>
  );
}
