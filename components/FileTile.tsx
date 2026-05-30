import { fileAnchor, type KbFile } from "@/lib/data";
import { FileTypeIcon, TYPE_META } from "./icons";
import { Avatar } from "./ui";

export function FileTile({ file }: { file: KbFile }) {
  return (
    <div
      id={fileAnchor(file.name)}
      className="group flex scroll-mt-24 flex-col rounded-xl border border-line bg-white p-3.5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift target:ring-2 target:ring-brand-400"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-line bg-white">
          <FileTypeIcon type={file.type} className="h-5 w-5 text-ink" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-sm font-semibold text-ink">{file.name}</h4>
          <p className="mt-0.5 text-xs text-subtle">{TYPE_META[file.type].label}</p>
        </div>
      </div>

      {file.content && (
        <p className="mt-2.5 line-clamp-2 text-[12.5px] leading-relaxed text-subtle">
          {file.content}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-line pt-2.5">
        <div className="flex min-w-0 items-center gap-1.5">
          <Avatar name={file.owner} size="sm" />
          <span className="truncate text-xs text-subtle">{file.owner}</span>
        </div>
        <span className="flex-shrink-0 text-[11px] text-subtle/80">{file.updated}</span>
      </div>
    </div>
  );
}
