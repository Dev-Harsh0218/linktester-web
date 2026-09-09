import clsx from "clsx";
import { ArrowDown, ArrowUp } from "lucide-react";

type KPICardProps = {
  label: string;
  value: string;
  delta?: number; // percentage change, positive/negative
  deltaGoodDirection?: "up" | "down"; // some metrics (avg hops) improve when down
  sparkline?: number[];
};

export function KPICard({
  label,
  value,
  delta,
  deltaGoodDirection = "up",
  sparkline,
}: KPICardProps) {
  const isPositive = typeof delta === "number" && delta > 0;
  const isGood =
    typeof delta === "number" &&
    ((deltaGoodDirection === "up" && delta > 0) ||
      (deltaGoodDirection === "down" && delta < 0));

  return (
    <div className="rounded-md border border-neutral-200 bg-white p-5">
      <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">
        {label}
      </div>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div className="text-2xl font-semibold tracking-tight text-neutral-900">
          {value}
        </div>
        {sparkline && sparkline.length > 1 && (
          <Sparkline data={sparkline} positive={isGood} />
        )}
      </div>
      {typeof delta === "number" && (
        <div
          className={clsx(
            "mt-2 inline-flex items-center gap-1 text-xs font-medium",
            isGood ? "text-emerald-600" : "text-rose-600",
          )}
        >
          {isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          {Math.abs(delta).toFixed(1)}%
          <span className="text-neutral-400 font-normal">vs last week</span>
        </div>
      )}
    </div>
  );
}

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const w = 80;
  const h = 28;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const points = data
    .map((v, i) => {
      const x = i * step;
      const y = h - ((v - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "#10b981" : "#f43f5e"}
        strokeWidth="1.5"
      />
    </svg>
  );
}
