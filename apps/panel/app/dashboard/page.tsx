import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { AppShell } from "@/components/AppShell";
import { KPICard } from "@/components/KPICard";
import { Card, CardBody, CardHeader, CardSubtitle, CardTitle } from "@/components/Card";
import { LineChartCard } from "@/components/Chart";
import { StatusBadge } from "@/components/StatusBadge";
import { getDailyChecks, getKPIs, getRecentChecks } from "@/lib/mock-data";

export const metadata = { title: "Dashboard · LinkTester Panel" };

export default async function DashboardPage() {
  const kpis = getKPIs();
  const daily = getDailyChecks(30);
  const recent = getRecentChecks(5);
  const sparklineChecks = daily.slice(-14).map((d) => d.checks);

  return (
    <AppShell title="Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <KPICard
            label="Total checks"
            value={kpis.totalChecks.toLocaleString()}
            delta={kpis.deltas.totalChecks}
            deltaGoodDirection="up"
            sparkline={sparklineChecks}
          />
          <KPICard
            label="Success rate"
            value={`${(kpis.successRate * 100).toFixed(1)}%`}
            delta={kpis.deltas.successRate}
            deltaGoodDirection="up"
            sparkline={daily.slice(-14).map((d) => d.successRate * 100)}
          />
          <KPICard
            label="Avg hops"
            value={kpis.avgHops.toFixed(1)}
            delta={kpis.deltas.avgHops}
            deltaGoodDirection="down"
            sparkline={daily.slice(-14).map((d) => d.avgHops)}
          />
          <KPICard
            label="Peak queue"
            value={kpis.peakQueue.toString()}
            delta={kpis.deltas.peakQueue}
            deltaGoodDirection="up"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Daily checks · last 30 days</CardTitle>
              <CardSubtitle>URL checks submitted per day</CardSubtitle>
            </CardHeader>
            <CardBody>
              <LineChartCard
                data={daily.map((d) => ({ date: d.date.slice(5), value: d.checks }))}
                xKey="date"
                yKey="value"
                format="compact"
                height={240}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent checks</CardTitle>
                  <CardSubtitle>Latest 5 URL checks</CardSubtitle>
                </div>
                <Link
                  href="/history"
                  className="text-xs font-medium text-violet-600 hover:text-violet-800"
                >
                  View all →
                </Link>
              </div>
            </CardHeader>
            <ul className="divide-y divide-neutral-100">
              {recent.map((r) => (
                <li key={r.id} className="px-5 py-3 flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-neutral-900 truncate">{r.url}</div>
                    <div className="text-xs text-neutral-500 mt-0.5">
                      {r.hopCount} hops ·{" "}
                      {formatDistanceToNow(new Date(r.timestamp), { addSuffix: true })}
                    </div>
                  </div>
                  <StatusBadge status={r.status} />
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
