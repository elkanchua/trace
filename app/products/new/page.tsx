import Link from "next/link";
import { PageHeader } from "@/components/ui";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-2xl px-8 py-8">
      <Link
        href="/products"
        className="inline-flex items-center gap-1 text-xs font-medium text-subtle hover:text-ink"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
          <path d="m14 7-5 5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Products
      </Link>

      <div className="mt-3">
        <PageHeader
          title="Create a new product"
          subtitle="Upload or paste a product brief, README, or meeting notes to get started. LoopIn pulls in the rest from your connected tools."
        />
      </div>

      <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
        <label className="text-sm font-medium text-ink">Product name</label>
        <input
          placeholder="e.g. Atlas Mobile — Offline Mode"
          className="mt-1.5 w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm outline-none placeholder:text-subtle/60 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />

        <div className="mt-5 flex gap-1 rounded-lg bg-canvas p-1 text-sm font-medium">
          <button className="flex-1 rounded-md bg-white py-1.5 text-ink shadow-card">Upload file</button>
          <button className="flex-1 rounded-md py-1.5 text-subtle">Paste text</button>
        </div>

        <div className="mt-3 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-line bg-canvas/60 px-6 py-10 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path d="M12 16V4m0 0L7 9m5-5 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </div>
          <p className="mt-3 text-sm font-medium text-ink">Drag and drop files here</p>
          <p className="text-xs text-brand-600">or click to browse</p>
          <p className="mt-2 text-[11px] text-subtle">Supports Markdown, PDF, DOCX, TXT</p>
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-subtle">Pull from connected tools</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {["Notion", "GitHub", "Figma", "Slack"].map((t) => (
              <span key={t} className="rounded-lg border border-line bg-canvas px-3 py-1.5 text-xs font-medium text-ink">
                + {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Link href="/products" className="rounded-lg px-4 py-2 text-sm font-medium text-subtle hover:text-ink">
            Cancel
          </Link>
          <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            Create product
          </button>
        </div>
      </div>
    </div>
  );
}
