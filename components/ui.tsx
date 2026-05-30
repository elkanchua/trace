import { AVATARS, type ProductStatus } from "@/lib/data";

export function Avatar({
  name,
  color = "bg-ink",
  size = "md",
}: {
  name: string;
  color?: string;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-6 w-6" : "h-7 w-7";
  const src = AVATARS[name];

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        title={name}
        className={`inline-block ${dim} flex-shrink-0 rounded-full object-cover ring-2 ring-white`}
      />
    );
  }

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      className={`inline-flex ${dim} ${size === "sm" ? "text-[10px]" : "text-[11px]"} flex-shrink-0 items-center justify-center rounded-full font-semibold text-white ring-2 ring-white ${color}`}
      title={name}
    >
      {initials}
    </span>
  );
}

const STATUS_CHIP: Record<ProductStatus, string> = {
  Discovery: "bg-slate-100 text-slate-600 ring-slate-200",
  "In Progress": "bg-brand-50 text-brand-700 ring-brand-200",
  Shipped: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

export function StatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${STATUS_CHIP[status]}`}
    >
      {status}
    </span>
  );
}

const SEV: Record<string, { chip: string; dot: string }> = {
  High: { chip: "bg-rose-50 text-rose-700 ring-rose-200", dot: "bg-rose-500" },
  Medium: { chip: "bg-amber-50 text-amber-700 ring-amber-200", dot: "bg-amber-500" },
  Low: { chip: "bg-slate-100 text-slate-600 ring-slate-200", dot: "bg-slate-400" },
};

export function SeverityBadge({ level }: { level: "High" | "Medium" | "Low" }) {
  const s = SEV[level] ?? SEV.Low;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${s.chip}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {level}
    </span>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="mb-7 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-subtle">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}
