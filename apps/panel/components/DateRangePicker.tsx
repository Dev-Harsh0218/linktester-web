"use client";
import { useState } from "react";

export function DateRangePicker({
  defaultStart,
  defaultEnd,
}: {
  defaultStart?: string;
  defaultEnd?: string;
}) {
  const [start, setStart] = useState(() => {
    if (defaultStart) return defaultStart;
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().slice(0, 10);
  });
  const [end, setEnd] = useState(
    () => defaultEnd ?? new Date().toISOString().slice(0, 10),
  );

  return (
    <div className="inline-flex items-center gap-2 text-sm">
      <label className="text-neutral-500 text-xs">From</label>
      <input
        type="date"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        className="rounded-md border border-neutral-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40"
      />
      <label className="text-neutral-500 text-xs">To</label>
      <input
        type="date"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        className="rounded-md border border-neutral-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40"
      />
    </div>
  );
}
