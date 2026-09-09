import clsx from "clsx";
import type { CheckStatus } from "@/lib/mock-data";

const STYLES: Record<CheckStatus, string> = {
  queued: "bg-neutral-100 text-neutral-700 border-neutral-200",
  processing: "bg-violet-50 text-violet-700 border-violet-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  failed: "bg-rose-50 text-rose-700 border-rose-200",
};

const LABELS: Record<CheckStatus, string> = {
  queued: "Queued",
  processing: "Processing",
  completed: "Completed",
  failed: "Failed",
};

export function StatusBadge({ status }: { status: CheckStatus }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium",
        STYLES[status],
      )}
    >
      {status === "processing" && (
        <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
      )}
      {LABELS[status]}
    </span>
  );
}
