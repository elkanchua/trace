import type { KbFile } from "@/lib/data";
import { FileTypeIcon, TYPE_META } from "./icons";

export function FileTile({ file }: { file: KbFile }) {
  return (
    <div className="group flex cursor-pointer flex-col rounded-xl border border-line bg-white p-3.5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-line bg-white">
          <FileTypeIcon type={file.type} className="h-5 w-5 text-ink" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-sm font-semibold text-ink">{file.name}</h4>
          <p className="mt-0.5 truncate text-xs text-subtle">
            {TYPE_META[file.type].label} · {file.owner}
          </p>
        </div>
      </div>

      {file.content && (
        <p className="mt-2.5 line-clamp-2 text-[12.5px] leading-relaxed text-subtle">
          {file.content}
        </p>
      )}

      <div className="mt-2.5 flex items-center justify-between text-[11px] text-subtle/80">
        <span>{file.updated}</span>
        <span className="opacity-0 transition-opacity group-hover:opacity-100">Open →</span>
      </div>
    </div>
  );
}
