"use client";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, Eye, Search } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { Table, THead, TR, TH, TD } from "@/components/Table";
import type { HistoricalCheck } from "@/lib/mock-data";

const PAGE_SIZE = 10;

export function HistoryTable({ rows }: { rows: HistoricalCheck[] }) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.toLowerCase();
    return rows.filter(
      (r) =>
        r.url.toLowerCase().includes(q) ||
        r.finalDestination.toLowerCase().includes(q),
    );
  }, [rows, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="rounded-md border border-neutral-200 bg-white">
      <div className="px-5 py-3 border-b border-neutral-100 flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-neutral-900">All checks</div>
          <div className="text-xs text-neutral-500 mt-0.5">
            {filtered.length} total · showing page {page} of {totalPages}
          </div>
        </div>
        <div className="relative">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Filter by URL…"
            className="rounded-md border border-neutral-300 pl-8 pr-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500"
          />
        </div>
      </div>

      <Table>
        <THead>
          <TR>
            <TH>URL</TH>
            <TH>Timestamp</TH>
            <TH className="text-right">Hops</TH>
            <TH>Status</TH>
            <TH>Final destination</TH>
            <TH className="text-right">Actions</TH>
          </TR>
        </THead>
        <tbody>
          {visible.length === 0 && (
            <TR>
              <TD className="text-center text-neutral-500 py-8">
                No checks match that filter.
              </TD>
              <TD>{""}</TD>
              <TD>{""}</TD>
              <TD>{""}</TD>
              <TD>{""}</TD>
              <TD>{""}</TD>
            </TR>
          )}
          {visible.map((r) => (
            <TR key={r.id}>
              <TD>
                <div className="font-mono text-xs truncate max-w-xs">{r.url}</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">
                  {r.platform.toUpperCase()} · {r.country} · {r.latencyMs}ms
                </div>
              </TD>
              <TD className="text-xs text-neutral-500">
                {format(new Date(r.timestamp), "MMM d, HH:mm")}
              </TD>
              <TD className="text-right tabular-nums text-sm">{r.hopCount}</TD>
              <TD>
                <StatusBadge status={r.status} />
              </TD>
              <TD>
                <div className="font-mono text-xs text-neutral-700 truncate max-w-xs">
                  {r.finalDestination}
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">
                  HTTP {r.statusCode}
                </div>
              </TD>
              <TD className="text-right">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  <Eye size={12} /> View
                </button>
              </TD>
            </TR>
          ))}
        </tbody>
      </Table>

      <div className="px-5 py-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
        <div>
          Page {page} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="inline-flex items-center gap-1 rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={12} /> Prev
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="inline-flex items-center gap-1 rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
