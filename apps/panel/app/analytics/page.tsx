import { AppShell } from "@/components/AppShell";
import { BarChartCard, LineChartCard } from "@/components/Chart";
import { Card, CardBody, CardHeader, CardSubtitle, CardTitle } from "@/components/Card";
import { DateRangePicker } from "@/components/DateRangePicker";
import { Table, THead, TR, TH, TD } from "@/components/Table";
import { getDailyChecks, getTopDomains } from "@/lib/mock-data";

export const metadata = { title: "Analytics · LinkTester Panel" };

export default function AnalyticsPage() {
  const daily = getDailyChecks(30);
  const topDomains = getTopDomains();

  const checksData = daily.map((d) => ({ date: d.date.slice(5), value: d.checks }));
  const successData = daily.map((d) => ({
    date: d.date.slice(5),
    value: d.successRate,
  }));
  const hopsData = daily.map((d) => ({
    date: d.date.slice(5),
    value: Number(d.avgHops.toFixed(2)),
  }));

  return (
    <AppShell title="Analytics">
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">Analytics</h2>
            <p className="text-sm text-neutral-500">
              Trends across daily checks, success, hop counts, and top destinations.
            </p>
          </div>
          <DateRangePicker />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily checks</CardTitle>
              <CardSubtitle>Volume per day (last 30d)</CardSubtitle>
            </CardHeader>
            <CardBody>
              <BarChartCard data={checksData} xKey="date" yKey="value" format="compact" />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Success rate over time</CardTitle>
              <CardSubtitle>Share of checks that reached a final destination</CardSubtitle>
            </CardHeader>
            <CardBody>
              <LineChartCard
                data={successData}
                xKey="date"
                yKey="value"
                format="percent"
                color="#10b981"
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Avg hop count by day</CardTitle>
              <CardSubtitle>Redirects per successful check</CardSubtitle>
            </CardHeader>
            <CardBody>
              <LineChartCard data={hopsData} xKey="date" yKey="value" format="number" />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top 5 destination domains</CardTitle>
              <CardSubtitle>Sorted by check volume</CardSubtitle>
            </CardHeader>
            <Table>
              <THead>
                <TR>
                  <TH>Domain</TH>
                  <TH className="text-right">Checks</TH>
                  <TH className="text-right">Success</TH>
                  <TH className="text-right">Avg hops</TH>
                </TR>
              </THead>
              <tbody>
                {topDomains.map((d) => (
                  <TR key={d.domain}>
                    <TD className="font-mono text-xs">{d.domain}</TD>
                    <TD className="text-right tabular-nums">
                      {d.checkCount.toLocaleString()}
                    </TD>
                    <TD className="text-right tabular-nums text-emerald-700">
                      {(d.successRate * 100).toFixed(1)}%
                    </TD>
                    <TD className="text-right tabular-nums">{d.avgHops.toFixed(1)}</TD>
                  </TR>
                ))}
              </tbody>
            </Table>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
