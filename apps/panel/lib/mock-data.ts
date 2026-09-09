// Mock data helpers for the LinkTester panel — no backend calls, all in-memory TypeScript.
// Values are deterministic (seeded by index) so the UI stays stable across renders.

export type CheckStatus = "queued" | "processing" | "completed" | "failed";

export type HistoricalCheck = {
  id: string;
  url: string;
  timestamp: string; // ISO
  hopCount: number;
  status: CheckStatus;
  statusCode: number;
  finalDestination: string;
  latencyMs: number;
  platform: "android" | "ios" | "desktop";
  country: string;
};

export type BulkBatch = {
  id: string;
  name: string;
  urlCount: number;
  submittedAt: string; // ISO
  status: CheckStatus;
  progress: number; // 0-100
  completedCount: number;
};

export type QueueItem = {
  id: string;
  url: string;
  batchName: string;
  submittedAt: string; // ISO
  workerId: string;
  status: CheckStatus;
};

export type DomainStat = {
  domain: string;
  checkCount: number;
  successRate: number; // 0-1
  avgHops: number;
};

export type SeriesPoint = {
  date: string; // YYYY-MM-DD
  checks: number;
  successRate: number; // 0-1
  avgHops: number;
};

// ---- source URLs / destinations to sample from ----

const SAMPLE_URLS = [
  "https://bit.ly/3xY9aQz",
  "https://bnc.lt/abcdef",
  "https://tinyurl.com/mux4tw2p",
  "https://t.co/xJ8kQwErTy",
  "https://ow.ly/z4Wq50Pxdef",
  "https://rebrand.ly/ltx-promo",
  "https://s.click.aliexpress.com/e/_DdRqK4B",
  "https://amzn.to/3ZaBcDe",
  "https://linktr.ee/creator42/promo",
  "https://go.skimresources.com/?id=114235&url=example.com",
  "https://track.affiliate.example.com/click?cid=8821&gid=1",
  "https://prf.hn/click/camref:1101abc/pubref:homepage",
  "https://tracker.impact.com/click/aff-4421",
  "https://cj.dotomi.com/click-100234-1234321",
  "https://smartlink.example.io/redirect?campaign=summer24",
];

const DESTINATIONS = [
  "https://play.google.com/store/apps/details?id=com.example.app",
  "https://apps.apple.com/us/app/example-app/id123456789",
  "https://play.google.com/store/apps/details?id=com.spotify.music",
  "https://apps.apple.com/us/app/tiktok/id835599320",
  "https://www.amazon.com/dp/B0CHX3QBCH",
  "https://www.example-store.com/product/widget-pro",
  "https://landing.example.com/offer?utm_source=aff",
];

const PLATFORMS: HistoricalCheck["platform"][] = ["android", "ios", "desktop"];
const COUNTRIES = ["US", "IN", "GB", "DE", "BR", "JP", "CA", "AU"];
const STATUS_CODES = [200, 200, 200, 200, 301, 302, 307, 404];
const WORKER_IDS = ["worker-a1", "worker-b2", "worker-c3", "worker-d4", "worker-e5"];

// Simple deterministic pseudo-random based on index — avoids Math.random for SSR consistency
function pick<T>(arr: T[], i: number, salt = 0): T {
  return arr[(i * 7 + salt) % arr.length]!;
}
function pickInt(i: number, salt: number, min: number, max: number): number {
  const range = max - min + 1;
  return min + ((i * 31 + salt * 13) % range);
}

// ---- KPI values ----

export type KPI = {
  totalChecks: number;
  successRate: number; // 0-1
  avgHops: number;
  peakQueue: number;
  deltas: {
    totalChecks: number; // % change
    successRate: number;
    avgHops: number;
    peakQueue: number;
  };
};

export function getKPIs(): KPI {
  return {
    totalChecks: 12482,
    successRate: 0.968,
    avgHops: 4.3,
    peakQueue: 87,
    deltas: {
      totalChecks: 12.4,
      successRate: 0.6,
      avgHops: -3.1,
      peakQueue: 18.2,
    },
  };
}

// ---- Time-series generator ----

export function getDailyChecks(days = 30): SeriesPoint[] {
  const now = new Date();
  const out: SeriesPoint[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    const baseline = 300 + pickInt(i, 1, -80, 220);
    const dayOfWeek = d.getDay();
    const weekendDip = dayOfWeek === 0 || dayOfWeek === 6 ? -100 : 0;
    const checks = Math.max(60, baseline + weekendDip);
    out.push({
      date: iso,
      checks,
      successRate: 0.9 + (pickInt(i, 2, 0, 90) / 1000),
      avgHops: 3.4 + (pickInt(i, 3, 0, 22) / 10),
    });
  }
  return out;
}

// ---- Historical checks ----

const HISTORICAL_CACHE: HistoricalCheck[] = (() => {
  const out: HistoricalCheck[] = [];
  const now = Date.now();
  for (let i = 0; i < 40; i++) {
    const url = pick(SAMPLE_URLS, i);
    const dest = pick(DESTINATIONS, i, 3);
    const status = pick<CheckStatus>(["completed", "completed", "completed", "completed", "failed"], i, 1);
    const statusCode = status === "failed" ? 404 : pick(STATUS_CODES.slice(0, 6), i, 2);
    const hopCount = status === "failed" ? pickInt(i, 5, 1, 3) : pickInt(i, 5, 2, 10);
    const latency = pickInt(i, 7, 100, 1500);
    // Spread over ~14 days
    const ageMinutes = i * 42 + pickInt(i, 9, 0, 60);
    const ts = new Date(now - ageMinutes * 60 * 1000).toISOString();
    out.push({
      id: `chk_${(1000 + i).toString(36)}`,
      url,
      timestamp: ts,
      hopCount,
      status,
      statusCode,
      finalDestination: dest,
      latencyMs: latency,
      platform: pick(PLATFORMS, i, 11),
      country: pick(COUNTRIES, i, 13),
    });
  }
  return out;
})();

export function getHistoricalChecks(): HistoricalCheck[] {
  return HISTORICAL_CACHE;
}

export function getRecentChecks(limit = 5): HistoricalCheck[] {
  return HISTORICAL_CACHE.slice(0, limit);
}

// ---- Bulk batches ----

const BULK_CACHE: BulkBatch[] = [
  {
    id: "bat_9f22c",
    name: "Q1-affiliate-audit.csv",
    urlCount: 248,
    submittedAt: new Date(Date.now() - 5 * 60_000).toISOString(),
    status: "processing",
    progress: 62,
    completedCount: 154,
  },
  {
    id: "bat_7a08d",
    name: "creator-links-batch-04.csv",
    urlCount: 80,
    submittedAt: new Date(Date.now() - 90 * 60_000).toISOString(),
    status: "queued",
    progress: 0,
    completedCount: 0,
  },
  {
    id: "bat_5e112",
    name: "smartlink-nightly.csv",
    urlCount: 1024,
    submittedAt: new Date(Date.now() - 26 * 60 * 60_000).toISOString(),
    status: "completed",
    progress: 100,
    completedCount: 1024,
  },
  {
    id: "bat_3b904",
    name: "manual-spot-check.csv",
    urlCount: 32,
    submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60_000).toISOString(),
    status: "completed",
    progress: 100,
    completedCount: 32,
  },
];

export function getBulkBatches(): BulkBatch[] {
  return BULK_CACHE;
}

// ---- Live queue items ----

const QUEUE_CACHE: QueueItem[] = (() => {
  const out: QueueItem[] = [];
  const now = Date.now();
  const statuses: CheckStatus[] = [
    "processing", "processing", "processing", "processing", "processing",
    "queued", "queued", "queued", "queued", "queued",
    "completed", "completed", "completed",
    "failed", "processing",
  ];
  for (let i = 0; i < statuses.length; i++) {
    out.push({
      id: `q_${(2000 + i).toString(36)}`,
      url: pick(SAMPLE_URLS, i, 4),
      batchName: pick(["Q1-affiliate-audit.csv", "creator-links-batch-04.csv", "smartlink-nightly.csv"], i, 6),
      submittedAt: new Date(now - i * 12_000 - 5000).toISOString(),
      workerId: pick(WORKER_IDS, i, 8),
      status: statuses[i]!,
    });
  }
  return out;
})();

export function getQueueItems(): QueueItem[] {
  return QUEUE_CACHE;
}

// ---- Top domains ----

export function getTopDomains(): DomainStat[] {
  return [
    { domain: "play.google.com", checkCount: 4218, successRate: 0.982, avgHops: 4.1 },
    { domain: "apps.apple.com", checkCount: 3654, successRate: 0.975, avgHops: 3.8 },
    { domain: "amazon.com", checkCount: 1877, successRate: 0.968, avgHops: 5.2 },
    { domain: "example-store.com", checkCount: 1204, successRate: 0.941, avgHops: 6.0 },
    { domain: "landing.example.com", checkCount: 892, successRate: 0.912, avgHops: 4.7 },
  ];
}

// ---- Single URL check mock (used by /check page) ----

export type MockHop = { url: string; status: number; ms: number; method: string };
export type MockChain = {
  hops: MockHop[];
  destination: { url: string; type: "PlayStore" | "AppStore" | "Landing" };
  totalMs: number;
};

export function mockHopChain(url: string, platform: string, country: string): MockChain {
  const isAndroid = platform === "android";
  const dest = isAndroid
    ? {
        url: "https://play.google.com/store/apps/details?id=com.example.app",
        type: "PlayStore" as const,
      }
    : platform === "ios"
    ? {
        url: "https://apps.apple.com/us/app/example-app/id123456789",
        type: "AppStore" as const,
      }
    : {
        url: "https://landing.example.com/offer?utm_source=aff",
        type: "Landing" as const,
      };
  return {
    hops: [
      { url, status: 302, ms: 145, method: "GET" },
      { url: "https://affiliate.example.net/track?click_id=abc123", status: 302, ms: 82, method: "GET" },
      {
        url: `https://tracker.example.com/r?geo=${country}&os=${platform}`,
        status: 301,
        ms: 110,
        method: "GET",
      },
      { url: "https://cdn.deeplink.example/redirect", status: 302, ms: 68, method: "GET" },
      { url: dest.url, status: 200, ms: 220, method: "GET" },
    ],
    destination: dest,
    totalMs: 625,
  };
}
