"use client";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Upload, FileText, MoreHorizontal } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardHeader, CardTitle, CardSubtitle } from "@/components/Card";
import { Table, THead, TR, TH, TD } from "@/components/Table";
import type { BulkBatch } from "@/lib/mock-data";

export function BulkClient({ initialBatches }: { initialBatches: BulkBatch[] }) {
  const [batches, setBatches] = useState<BulkBatch[]>(initialBatches);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const f = files[0]!;
    setFileName(f.name);
    // Prepend as a new queued batch — mock UI only.
    setBatches((prev) => [
      {
        id: `bat_${Math.random().toString(36).slice(2, 7)}`,
        name: f.name,
        urlCount: Math.max(1, Math.round(f.size / 32)),
        submittedAt: new Date().toISOString(),
        status: "queued",
        progress: 0,
        completedCount: 0,
      },
      ...prev,
    ]);
  }

  return (
    <div className="space-y-6">
      <Card>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={
            "m-5 rounded-md border-2 border-dashed p-10 text-center transition " +
            (dragging
              ? "border-violet-400 bg-violet-50"
              : "border-neutral-300 bg-neutral-50 hover:border-neutral-400")
          }
        >
          <div className="mx-auto h-10 w-10 rounded-md bg-white border border-neutral-200 flex items-center justify-center text-violet-600 mb-3">
            <Upload size={18} />
          </div>
          <div className="text-sm font-medium text-neutral-900">
            Drag & drop a CSV of URLs
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            One URL per line, up to 10,000 rows per batch.
          </div>
          <label className="mt-4 inline-flex items-center gap-2 rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 transition cursor-pointer">
            <Upload size={14} />
            Upload CSV
            <input
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </label>
          {fileName && (
            <div className="mt-3 text-xs text-neutral-500 inline-flex items-center gap-1.5">
              <FileText size={12} />
              Uploaded <span className="font-medium text-neutral-700">{fileName}</span>
            </div>
          )}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent batches</CardTitle>
          <CardSubtitle>Latest CSV uploads and their processing status</CardSubtitle>
        </CardHeader>
        <Table>
          <THead>
            <TR>
              <TH>Name</TH>
              <TH className="text-right">URLs</TH>
              <TH>Submitted</TH>
              <TH>Status</TH>
              <TH>Progress</TH>
              <TH className="text-right">Actions</TH>
            </TR>
          </THead>
          <tbody>
            {batches.map((b) => (
              <TR key={b.id}>
                <TD>
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-neutral-400" />
                    <span className="font-medium">{b.name}</span>
                  </div>
                  <div className="text-xs text-neutral-500 mt-0.5 ml-6">{b.id}</div>
                </TD>
                <TD className="text-right tabular-nums">{b.urlCount.toLocaleString()}</TD>
                <TD className="text-neutral-500 text-xs">
                  {formatDistanceToNow(new Date(b.submittedAt), { addSuffix: true })}
                </TD>
                <TD>
                  <StatusBadge status={b.status} />
                </TD>
                <TD>
                  <div className="w-40">
                    <div className="h-1.5 rounded-full bg-neutral-200 overflow-hidden">
                      <div
                        className={
                          "h-full rounded-full " +
                          (b.status === "failed"
                            ? "bg-rose-500"
                            : b.status === "completed"
                              ? "bg-emerald-500"
                              : "bg-violet-500")
                        }
                        style={{ width: `${b.progress}%` }}
                      />
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-1 tabular-nums">
                      {b.completedCount}/{b.urlCount} · {b.progress}%
                    </div>
                  </div>
                </TD>
                <TD className="text-right">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-neutral-300 bg-white p-1.5 text-neutral-500 hover:bg-neutral-50"
                    aria-label="More"
                  >
                    <MoreHorizontal size={14} />
                  </button>
                </TD>
              </TR>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
