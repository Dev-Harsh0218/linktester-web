import { AppShell } from "@/components/AppShell";
import { getBulkBatches } from "@/lib/mock-data";
import { BulkClient } from "./BulkClient";

export const metadata = { title: "Bulk · LinkTester Panel" };

export default function BulkPage() {
  const batches = getBulkBatches();
  return (
    <AppShell title="Bulk">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            Bulk URL testing
          </h2>
          <p className="text-sm text-neutral-500">
            Upload a CSV of links and track batch progress.
          </p>
        </div>
        <BulkClient initialBatches={batches} />
      </div>
    </AppShell>
  );
}
