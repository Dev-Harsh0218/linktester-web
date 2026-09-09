"use client";
import { useState } from "react";
import { ArrowRight, Zap, Github } from "lucide-react";
import clsx from "clsx";

type Tab = "tracking" | "html";

export default function Home() {
  const [tab, setTab] = useState<Tab>("tracking");
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("android");
  const [country, setCountry] = useState("US");
  const [advanced, setAdvanced] = useState(false);
  const [maxHops, setMaxHops] = useState(20);
  const [resultAs, setResultAs] = useState<"redirects" | "screenshot">("redirects");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | HopChain>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!url.trim()) {
      setError("Enter a URL to test.");
      return;
    }
    setLoading(true);
    setResult(null);
    // MOCK: backend not deployed yet — simulate a delay + fake hop chain.
    // Once linktester backend Slice 3 ships, replace with:
    //   const res = await fetch(`${API_URL}/api/links`, { method: "POST", body: ... });
    await new Promise((r) => setTimeout(r, 1200));
    setResult(mockHopChain(url, platform, country));
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-violet-600 flex items-center justify-center text-white">
              <Zap size={14} />
            </div>
            <div className="font-semibold tracking-tight">LinkTester</div>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-violet-600">
            <a href="/signin" className="hover:text-violet-800">Login</a>
            <span className="text-neutral-300">|</span>
            <a href="/signin" className="hover:text-violet-800">Register</a>
            <span className="text-neutral-300">|</span>
            <a href="#about" className="hover:text-violet-800">About</a>
          </nav>
        </div>
      </header>

      {/* Hero form */}
      <section className="max-w-4xl mx-auto w-full px-6 pt-16 pb-12">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 mb-2 text-center">
          Trace any affiliate or tracking link
        </h1>
        <p className="text-neutral-500 text-center mb-8">
          Follow every hop through headers and body until the final destination.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tabs */}
          <div className="flex border-b border-neutral-200">
            <button
              type="button"
              onClick={() => setTab("tracking")}
              className={clsx(
                "px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition",
                tab === "tracking"
                  ? "text-neutral-900 border-neutral-900"
                  : "text-violet-600 border-transparent hover:text-violet-800",
              )}
            >
              Tracking Link
            </button>
            <button
              type="button"
              onClick={() => setTab("html")}
              className={clsx(
                "px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition",
                tab === "html"
                  ? "text-neutral-900 border-neutral-900"
                  : "text-violet-600 border-transparent hover:text-violet-800",
              )}
            >
              HTML Tag
            </button>
          </div>

          {/* Input */}
          {tab === "tracking" ? (
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your affiliate/tracking link"
              className="w-full rounded-md border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500"
            />
          ) : (
            <textarea
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder='<a href="https://example.com/aff?id=123">Click here</a>'
              rows={4}
              className="w-full rounded-md border border-neutral-300 px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500"
            />
          )}

          {/* Selects + submit */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3">
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="rounded-md border border-neutral-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            >
              <option value="android">Android</option>
              <option value="ios">iOS</option>
              <option value="desktop">Desktop</option>
            </select>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="rounded-md border border-neutral-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            >
              <option value="US">United States</option>
              <option value="IN">India</option>
              <option value="GB">United Kingdom</option>
              <option value="DE">Germany</option>
              <option value="BR">Brazil</option>
              <option value="JP">Japan</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition disabled:opacity-60"
            >
              {loading ? "TESTING…" : "SUBMIT"}
            </button>
          </div>

          {/* Advanced + Result-as */}
          <div className="flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => setAdvanced((s) => !s)}
              className="text-neutral-600 hover:text-neutral-900 flex items-center gap-1"
            >
              <ArrowRight size={12} className={clsx("transition", advanced && "rotate-90")} />
              Advanced
            </button>
            <div className="flex items-center gap-4 text-neutral-500">
              <span>Show result as:</span>
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  checked={resultAs === "redirects"}
                  onChange={() => setResultAs("redirects")}
                  className="accent-violet-600"
                />
                <span>Redirections</span>
              </label>
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  checked={resultAs === "screenshot"}
                  onChange={() => setResultAs("screenshot")}
                  className="accent-violet-600"
                />
                <span>Screenshot</span>
              </label>
            </div>
          </div>

          {advanced && (
            <div className="rounded-md border border-neutral-200 bg-neutral-50 p-4 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <label className="text-neutral-600 w-32">Max hops</label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={maxHops}
                  onChange={(e) => setMaxHops(Number(e.target.value))}
                  className="w-20 rounded border border-neutral-300 px-2 py-1"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-neutral-600 w-32">User-Agent</label>
                <input
                  type="text"
                  defaultValue="Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36"
                  className="flex-1 rounded border border-neutral-300 px-2 py-1 text-xs font-mono"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-neutral-600 w-32">Follow meta refresh</label>
                <input type="checkbox" defaultChecked className="accent-violet-600" />
              </div>
            </div>
          )}

          {error && <div className="text-sm text-rose-600">{error}</div>}
        </form>
      </section>

      {/* Result */}
      {(loading || result) && (
        <section className="max-w-4xl mx-auto w-full px-6 pb-16">
          <div className="rounded-lg border border-neutral-200 bg-white">
            <div className="border-b border-neutral-100 px-5 py-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-neutral-900">Redirect chain</div>
                <div className="text-xs text-neutral-500">
                  {loading
                    ? "Following hops…"
                    : `${result?.hops.length ?? 0} hops · finished in ${result?.totalMs}ms`}
                </div>
              </div>
              {result?.destination && (
                <div className="text-xs text-violet-700 bg-violet-50 border border-violet-200 rounded-full px-2.5 py-1">
                  {result.destination.type}
                </div>
              )}
            </div>
            <ol className="divide-y divide-neutral-100">
              {loading && (
                <li className="px-5 py-4 text-sm text-neutral-500 flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
                  Fetching…
                </li>
              )}
              {result?.hops.map((h, i) => (
                <li key={i} className="px-5 py-3 flex items-start gap-3">
                  <div className="text-xs text-neutral-400 tabular-nums pt-0.5 w-6">{i + 1}.</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-neutral-900 truncate">{h.url}</div>
                    <div className="text-xs text-neutral-500 mt-0.5">
                      HTTP {h.status} · {h.ms}ms · {h.method}
                    </div>
                  </div>
                  <div
                    className={clsx(
                      "text-xs font-medium rounded-full border px-2 py-0.5",
                      h.status >= 300 && h.status < 400
                        ? "bg-violet-50 text-violet-700 border-violet-200"
                        : h.status >= 200 && h.status < 300
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-rose-50 text-rose-700 border-rose-200",
                    )}
                  >
                    {h.status}
                  </div>
                </li>
              ))}
            </ol>
            {result?.destination && (
              <div className="border-t border-neutral-100 bg-neutral-50 px-5 py-3">
                <div className="text-xs text-neutral-500 mb-0.5">Final destination</div>
                <div className="text-sm font-mono text-neutral-900 truncate">
                  {result.destination.url}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Trusted-by strip (placeholder) */}
      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-semibold">
          <span className="text-neutral-400 text-xs">TRUSTED BY</span>
          <span className="text-neutral-400 opacity-70">Adatha</span>
          <span className="text-neutral-400 opacity-70">ClicksMob</span>
          <span className="text-neutral-400 opacity-70">Amonetize</span>
          <span className="text-neutral-400 opacity-70">Surikate</span>
          <span className="text-neutral-400 opacity-70">Appthis</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-100 mt-auto">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} LinkTester. Built by{" "}
            <a className="underline hover:text-neutral-900" href="https://github.com/Dev-Harsh0218">
              Harsh Bhardwaj
            </a>
            .
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Dev-Harsh0218/linktester"
              className="inline-flex items-center gap-1.5 hover:text-neutral-900"
            >
              <Github size={12} /> Backend
            </a>
            <a
              href="https://github.com/Dev-Harsh0218/linktester-web"
              className="inline-flex items-center gap-1.5 hover:text-neutral-900"
            >
              <Github size={12} /> Frontend
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

// ---- mock types + data (replaced by real API call once backend Slice 3 ships) ----

type Hop = { url: string; status: number; ms: number; method: string };
type Destination = { url: string; type: "PlayStore" | "AppStore" | "Landing" };
type HopChain = { hops: Hop[]; destination: Destination; totalMs: number };

function mockHopChain(url: string, platform: string, country: string): HopChain {
  const isAndroid = platform === "android";
  const dest = isAndroid
    ? {
        url: "https://play.google.com/store/apps/details?id=com.example.app",
        type: "PlayStore" as const,
      }
    : {
        url: "https://apps.apple.com/us/app/example-app/id123456789",
        type: "AppStore" as const,
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
