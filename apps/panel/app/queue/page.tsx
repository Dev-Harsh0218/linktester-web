import { formatDistanceToNow } from "date-fns";
import { AppShell } from "@/components/AppShell";
import { Card, CardHeader, CardTitle, CardSubtitle } from "@/components/Card";
import { StatusBadge } from "@/components/StatusBadge";
import { Table, THead, TR, TH, TD } from "@/components/Table";
import { getQueueItems } from "@/lib/mock-data";

export const metadata = { title: "Queue · LinkTester Panel" };

export default function QueuePage() {
  const items = getQueueItems();
  const counts = {
    queued: items.filter((i) => i.status === "queued").length,
    processing: items.filter((i) => i.status === "processing").length,
    completed: items.filter((i) => i.status === "completed").length,
    failed: items.filter((i) => i.status === "failed").length,
  };

  return (
    <AppShell title="Queue">
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">Live queue</h2>
            <p className="text-sm text-neutral-500">
              Individual URLs currently in-flight across workers.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live updating
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <QueueStat label="Queued" value={counts.queued} tone="neutral" />
          <QueueStat label="Processing" value={counts.processing} tone="violet" />
          <QueueStat label="Completed" value={counts.completed} tone="emerald" />
          <QueueStat label="Failed" value={counts.failed} tone="rose" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>In-flight jobs</CardTitle>
            <CardSubtitle>{items.length} rows</CardSubtitle>
          </CardHeader>
          <Table>
            <THead>
              <TR>
                <TH>URL</TH>
                <TH>Batch</TH>
                <TH>Submitted</TH>
                <TH>Worker</TH>
                <TH>Status</TH>
              </TR>
            </THead>
            <tbody>
              {items.map((item) => (
                <TR key={item.id}>
                  <TD>
                    <div className="font-mono text-xs text-neutral-800 truncate max-w-md">
                      {item.url}
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">{item.id}</div>
                  </TD>
                  <TD className="text-xs">{item.batchName}</TD>
                  <TD className="text-xs text-neutral-500">
                    {formatDistanceToNow(new Date(item.submittedAt), { addSuffix: true })}
                  </TD>
                  <TD>
                    <span className="font-mono text-xs text-neutral-600">
                      {item.workerId}
                    </span>
                  </TD>
                  <TD>
                    <StatusBadge status={item.status} />
                  </TD>
                </TR>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>
    </AppShell>
  );
}

function QueueStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "neutral" | "violet" | "emerald" | "rose";
}) {
  const toneMap: Record<typeof tone, string> = {
    neutral: "text-neutral-900",
    violet: "text-violet-700",
    emerald: "text-emerald-700",
    rose: "text-rose-700",
  };
  return (
    <div className="rounded-md border border-neutral-200 bg-white p-4">
      <div className="text-xs uppercase tracking-wide text-neutral-500 font-medium">
        {label}
      </div>
      <div className={"text-2xl font-semibold mt-1 " + toneMap[tone]}>{value}</div>
    </div>
  );
}
