"use client";
import { useState } from "react";
import clsx from "clsx";
import { ArrowRight, Save } from "lucide-react";
import { mockHopChain, type MockChain } from "@/lib/mock-data";

type Tab = "tracking" | "html";
type SavedItem = { url: string; platform: string; country: string; ts: string };

export function CheckForm() {
  const [tab, setTab] = useState<Tab>("tracking");
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("android");
  const [country, setCountry] = useState("US");
  const [advanced, setAdvanced] = useState(false);
  const [maxHops, setMaxHops] = useState(20);
  const [resultAs, setResultAs] = useState<"redirects" | "screenshot">("redirects");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MockChain | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<SavedItem[]>(() => {
    const now = Date.now();
    return [
      {
        url: "https://bit.ly/3xY9aQz",
        platform: "android",
        country: "US",
        ts: new Date(now - 45 * 60_000).toISOString(),
      },
      {
        url: "https://apps.apple.com/us/app/tiktok/id835599320",
        platform: "ios",
        country: "GB",
        ts: new Date(now - 5 * 60 * 60_000).toISOString(),
      },
    ];
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!url.trim()) {
      setError("Enter a URL to test.");
      return;
    }
    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 900));
    setResult(mockHopChain(url, platform, country));
    setLoading(false);
    setSaved((prev) =>
      [{ url, platform, country, ts: new Date().toISOString() }, ...prev].slice(0, 8),
    );
  }

  function loadSaved(item: SavedItem) {
    setUrl(item.url);
    setPlatform(item.platform);
    setCountry(item.country);
    setResult(null);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
      <div className="space-y-6">
        <form
          onSubmit={handleSubmit}
          className="rounded-md border border-neutral-200 bg-white p-5 space-y-4"
        >
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

        {(loading || result) && (
          <div className="rounded-md border border-neutral-200 bg-white">
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
                  <div className="text-xs text-neutral-400 tabular-nums pt-0.5 w-6">
                    {i + 1}.
                  </div>
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
        )}
      </div>

      <aside className="rounded-md border border-neutral-200 bg-white h-fit">
        <div className="px-4 py-3 border-b border-neutral-100 flex items-center gap-2">
          <Save size={14} className="text-neutral-500" />
          <div className="text-sm font-semibold text-neutral-900">Saved history</div>
        </div>
        <ul className="divide-y divide-neutral-100">
          {saved.length === 0 && (
            <li className="px-4 py-6 text-xs text-neutral-500 text-center">
              No saved checks yet.
            </li>
          )}
          {saved.map((item, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => loadSaved(item)}
                className="w-full text-left px-4 py-3 hover:bg-neutral-50 transition"
              >
                <div className="text-xs font-medium text-neutral-900 truncate">
                  {item.url}
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5">
                  {item.platform.toUpperCase()} · {item.country}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
