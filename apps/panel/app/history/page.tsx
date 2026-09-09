import { AppShell } from "@/components/AppShell";
import { getHistoricalChecks } from "@/lib/mock-data";
import { HistoryTable } from "./HistoryTable";

export const metadata = { title: "History · LinkTester Panel" };

export default function HistoryPage() {
  const rows = getHistoricalChecks();
  return (
    <AppShell title="History">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">Past checks</h2>
          <p className="text-sm text-neutral-500">
            Full history of URL checks across all sources.
          </p>
        </div>
        <HistoryTable rows={rows} />
      </div>
    </AppShell>
  );
}
