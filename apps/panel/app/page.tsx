export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-md text-center px-6">
        <div className="text-xs font-medium text-violet-600 mb-4">LinkTester · Panel</div>
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-900">Coming soon.</h1>
        <p className="mt-4 text-neutral-600 leading-relaxed">
          Authenticated dashboard for bulk link testing, live queue status, past-check history,
          and analytics. Building this next.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <a
            href="https://linktester-marketing.vercel.app"
            className="inline-flex items-center rounded-md border border-neutral-300 text-neutral-900 text-sm font-medium px-5 py-2.5 hover:bg-neutral-50 transition"
          >
            ← Back to main site
          </a>
          <a
            href="https://github.com/Dev-Harsh0218/linktester-web"
            className="inline-flex items-center rounded-md bg-violet-600 text-white text-sm font-medium px-5 py-2.5 hover:bg-violet-700 transition"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </main>
  );
}
