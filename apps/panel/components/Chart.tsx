"use client";
// Recharts wrappers. `format` is a string enum (not a function) so this component
// can be used from RSC pages — functions can't cross the server/client boundary.
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type ChartFormat = "number" | "compact" | "currency" | "percent";

function formatValue(v: number, format: ChartFormat): string {
  switch (format) {
    case "percent":
      return `${(v * 100).toFixed(1)}%`;
    case "currency":
      return `$${v.toLocaleString()}`;
    case "compact":
      return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(v);
    case "number":
    default:
      return v.toLocaleString();
  }
}

type Datum = Record<string, string | number>;

type LineChartProps = {
  data: Datum[];
  xKey: string;
  yKey: string;
  format?: ChartFormat;
  height?: number;
  color?: string;
};

export function LineChartCard({
  data,
  xKey,
  yKey,
  format = "number",
  height = 220,
  color = "#7c3aed",
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 11, fill: "#6b7280" }}
          axisLine={{ stroke: "#e5e7eb" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#6b7280" }}
          axisLine={{ stroke: "#e5e7eb" }}
          tickLine={false}
          tickFormatter={(v: number) => formatValue(v, format)}
        />
        <Tooltip
          formatter={(v: number) => formatValue(v, format)}
          contentStyle={{
            border: "1px solid #e5e7eb",
            borderRadius: 6,
            fontSize: 12,
            padding: "6px 10px",
          }}
        />
        <Line
          type="monotone"
          dataKey={yKey}
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

type BarChartProps = {
  data: Datum[];
  xKey: string;
  yKey: string;
  format?: ChartFormat;
  height?: number;
  color?: string;
};

export function BarChartCard({
  data,
  xKey,
  yKey,
  format = "number",
  height = 220,
  color = "#7c3aed",
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 11, fill: "#6b7280" }}
          axisLine={{ stroke: "#e5e7eb" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#6b7280" }}
          axisLine={{ stroke: "#e5e7eb" }}
          tickLine={false}
          tickFormatter={(v: number) => formatValue(v, format)}
        />
        <Tooltip
          formatter={(v: number) => formatValue(v, format)}
          contentStyle={{
            border: "1px solid #e5e7eb",
            borderRadius: 6,
            fontSize: 12,
            padding: "6px 10px",
          }}
        />
        <Bar dataKey={yKey} fill={color} radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
