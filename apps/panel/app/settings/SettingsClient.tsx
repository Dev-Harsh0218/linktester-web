"use client";
import { useState } from "react";
import { KeyRound, RefreshCw, Trash2, Plus, Save } from "lucide-react";
import { Card, CardHeader, CardBody, CardTitle, CardSubtitle } from "@/components/Card";
import { CopyButton } from "@/components/CopyButton";

const EVENT_TYPES = [
  "check.completed",
  "check.failed",
  "bulk.completed",
  "bulk.failed",
  "queue.stalled",
];

type ApiKey = { id: string; label: string; value: string; createdAt: string };
type Webhook = { id: string; url: string; events: string[] };

export function SettingsClient({ initialEmail }: { initialEmail: string }) {
  const [name, setName] = useState("Harsh Bhardwaj");
  const [email, setEmail] = useState(initialEmail);
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [saved, setSaved] = useState(false);

  const [keys, setKeys] = useState<ApiKey[]>(() => [
    {
      id: "key_prod_1",
      label: "Production",
      value: "lt_live_9f22c4a1b8e04d5c9a3e7b2f6d1c88ee",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60_000).toISOString(),
    },
  ]);

  const [webhooks, setWebhooks] = useState<Webhook[]>([
    {
      id: "wh_1",
      url: "https://hooks.example.com/linktester",
      events: ["check.completed", "bulk.completed"],
    },
  ]);
  const [newWebhookUrl, setNewWebhookUrl] = useState("");
  const [newWebhookEvents, setNewWebhookEvents] = useState<string[]>([]);

  function handleSaveAccount(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  function generateKey() {
    const rand = Array.from({ length: 32 })
      .map(() => "0123456789abcdef"[Math.floor(Math.random() * 16)])
      .join("");
    setKeys((prev) => [
      {
        id: `key_${Math.random().toString(36).slice(2, 6)}`,
        label: "New key",
        value: `lt_live_${rand}`,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  }

  function rotateKey(id: string) {
    const rand = Array.from({ length: 32 })
      .map(() => "0123456789abcdef"[Math.floor(Math.random() * 16)])
      .join("");
    setKeys((prev) =>
      prev.map((k) =>
        k.id === id
          ? { ...k, value: `lt_live_${rand}`, createdAt: new Date().toISOString() }
          : k,
      ),
    );
  }

  function deleteKey(id: string) {
    setKeys((prev) => prev.filter((k) => k.id !== id));
  }

  function toggleEvent(evt: string) {
    setNewWebhookEvents((prev) =>
      prev.includes(evt) ? prev.filter((e) => e !== evt) : [...prev, evt],
    );
  }

  function addWebhook(e: React.FormEvent) {
    e.preventDefault();
    if (!newWebhookUrl.trim()) return;
    setWebhooks((prev) => [
      ...prev,
      {
        id: `wh_${Math.random().toString(36).slice(2, 6)}`,
        url: newWebhookUrl,
        events: newWebhookEvents.length ? newWebhookEvents : ["check.completed"],
      },
    ]);
    setNewWebhookUrl("");
    setNewWebhookEvents([]);
  }

  function removeWebhook(id: string) {
    setWebhooks((prev) => prev.filter((w) => w.id !== id));
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardSubtitle>Personal details and display preferences</CardSubtitle>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSaveAccount} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500"
              >
                <option value="UTC">UTC</option>
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="America/New_York">America/New_York (ET)</option>
                <option value="America/Los_Angeles">America/Los_Angeles (PT)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="Europe/Berlin">Europe/Berlin (CET)</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 transition"
              >
                <Save size={14} />
                Save changes
              </button>
              {saved && (
                <span className="text-xs text-emerald-600">Saved (mock only).</span>
              )}
            </div>
          </form>
        </CardBody>
      </Card>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>API keys</CardTitle>
              <CardSubtitle>Programmatic access for the LinkTester REST API</CardSubtitle>
            </div>
            <button
              type="button"
              onClick={generateKey}
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition"
            >
              <Plus size={12} /> Generate key
            </button>
          </div>
        </CardHeader>
        <ul className="divide-y divide-neutral-100">
          {keys.map((k) => (
            <li key={k.id} className="px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-neutral-900 flex items-center gap-2">
                    <KeyRound size={14} className="text-neutral-400" />
                    {k.label}
                    <span className="text-[11px] text-neutral-400 font-normal">
                      created {new Date(k.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-1.5 font-mono text-xs text-neutral-700 bg-neutral-50 rounded-md px-2.5 py-1.5 border border-neutral-200 truncate">
                    {k.value}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <CopyButton value={k.value} />
                  <button
                    type="button"
                    onClick={() => rotateKey(k.id)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
                  >
                    <RefreshCw size={12} /> Rotate
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteKey(k.id)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-rose-200 bg-white px-2.5 py-1 text-xs font-medium text-rose-700 hover:bg-rose-50"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </li>
          ))}
          {keys.length === 0 && (
            <li className="px-5 py-6 text-xs text-neutral-500 text-center">
              No API keys. Generate one to get started.
            </li>
          )}
        </ul>
      </Card>

      {/* Webhooks */}
      <Card>
        <CardHeader>
          <CardTitle>Webhooks</CardTitle>
          <CardSubtitle>
            Notify an HTTPS endpoint when specific events fire
          </CardSubtitle>
        </CardHeader>
        <CardBody className="space-y-5">
          <ul className="space-y-2">
            {webhooks.map((w) => (
              <li
                key={w.id}
                className="flex items-start justify-between gap-3 rounded-md border border-neutral-200 p-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-xs text-neutral-800 truncate">
                    {w.url}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {w.events.map((e) => (
                      <span
                        key={e}
                        className="text-[11px] rounded-full bg-violet-50 text-violet-700 border border-violet-200 px-2 py-0.5"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeWebhook(w.id)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-rose-200 bg-white px-2.5 py-1 text-xs font-medium text-rose-700 hover:bg-rose-50"
                >
                  <Trash2 size={12} />
                </button>
              </li>
            ))}
            {webhooks.length === 0 && (
              <li className="text-xs text-neutral-500 text-center py-4">
                No webhooks yet.
              </li>
            )}
          </ul>

          <form onSubmit={addWebhook} className="space-y-3 pt-3 border-t border-neutral-100">
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                New webhook URL
              </label>
              <input
                type="url"
                value={newWebhookUrl}
                onChange={(e) => setNewWebhookUrl(e.target.value)}
                placeholder="https://your-app.example.com/webhooks/linktester"
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500"
              />
            </div>
            <div>
              <div className="text-xs font-medium text-neutral-700 mb-2">
                Event types
              </div>
              <div className="flex flex-wrap gap-3">
                {EVENT_TYPES.map((evt) => (
                  <label
                    key={evt}
                    className="inline-flex items-center gap-1.5 text-xs cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={newWebhookEvents.includes(evt)}
                      onChange={() => toggleEvent(evt)}
                      className="accent-violet-600"
                    />
                    <span className="font-mono text-neutral-700">{evt}</span>
                  </label>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 transition"
            >
              <Plus size={14} /> Add webhook
            </button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
