# linktester-web

Client monorepo for [LinkTester](https://github.com/Dev-Harsh0218/linktester). Two Next.js apps managed with Turborepo:

- **`apps/marketing`** — public site. AffiliTest-inspired homepage: paste a URL, pick platform + country, get the full redirect chain. No auth.
- **`apps/panel`** — authenticated user dashboard. Bulk URL testing, live queue status, past-check history, per-domain analytics. Auth required.

Backend (Python services — Django API + worker + autoscaler) lives at [`Dev-Harsh0218/linktester`](https://github.com/Dev-Harsh0218/linktester). This repo just consumes its REST API.

## Layout

```
linktester-web/
├── apps/
│   ├── marketing/          @linktester/marketing   Next.js 16 · public
│   └── panel/              @linktester/panel       Next.js 16 · authenticated
├── packages/               (planned) shared UI / api-client
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## Quick start

```bash
pnpm install                                          # install everything
pnpm --filter=@linktester/marketing dev               # marketing on :3100
pnpm --filter=@linktester/panel dev                   # panel on :3101
pnpm dev                                              # both in parallel via Turborepo
```

## Apps

### `apps/marketing` — the AffiliTest-inspired public site

**Route: `/`**

- Big centered URL input
- Platform selector (Android / iOS / Desktop) + Country selector
- **Tabs:** Tracking Link | HTML Tag
- **Advanced** collapsible options (max hops, user-agent override, follow meta-refresh)
- **Result-as:** Redirections table | Screenshot toggle
- On submit → show live-updating hop chain (each hop with status code, latency, method) + final destination badge (PlayStore / AppStore / Landing)
- Trusted-by strip + footer with GitHub links

Currently uses **mocked data** — a fake hop chain with realistic redirects. Once the backend's `POST /api/links` endpoint ships (Slice 3 of the backend), `mockHopChain` gets replaced with a real `fetch()`.

### `apps/panel` — authenticated user panel (in progress)

Coming-soon placeholder for now. Planned routes:

- `/signin` — email + password (stubbed to start)
- `/dashboard` — KPIs (this week's checks, avg hops, error rate) + recent activity
- `/bulk` — upload CSV of URLs, submit all to queue, watch progress
- `/queue` — live list of in-flight jobs (SSE-driven when backend supports it)
- `/history` — paginated table of past checks, click any row for its hop chain
- `/analytics` — per-domain success rate, avg hop count, avg latency, geo-based charts
- `/settings` — account, API keys, webhook URLs

## Design language

Purple accent (`violet-600`) matching the AffiliTest reference the design was based on. Neutral whites, thin borders, no shadows/gradients on cards, `rounded-md` throughout. Component style deliberately compact so table-heavy dashboards don't feel bloated.

## Deployment

Each app becomes a separate Vercel project pointing at this monorepo, with `Root Directory` set to `apps/marketing` and `apps/panel` respectively. Marketing on a public subdomain, panel behind auth.

## Related repos

- [`Dev-Harsh0218/linktester`](https://github.com/Dev-Harsh0218/linktester) — backend (Django API + Python worker + Boto3 autoscaler)
