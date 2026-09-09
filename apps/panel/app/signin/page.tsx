import Link from "next/link";
import { Zap, Info, ArrowRight } from "lucide-react";
import { DEMO_EMAIL, DEMO_PASSWORD, MARKETING_URL } from "@/lib/config";
import { signInAction } from "./actions";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <header className="border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/signin" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-violet-600 flex items-center justify-center text-white">
              <Zap size={14} />
            </div>
            <div className="font-semibold tracking-tight">LinkTester</div>
          </Link>
          <a
            href={MARKETING_URL}
            className="text-sm font-medium text-violet-600 hover:text-violet-800"
          >
            ← Back to LinkTester
          </a>
        </div>
      </header>

      <section className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Sign in to the panel
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Access bulk testing, queue status, and analytics.
            </p>
          </div>

          <div className="rounded-md border border-violet-200 bg-violet-50 p-3 mb-6 flex gap-2 text-xs text-violet-800">
            <Info size={14} className="shrink-0 mt-0.5" />
            <div>
              <div className="font-medium">Demo mode</div>
              <div className="text-violet-700 mt-0.5">
                Any email/password works — data is mocked. Pre-filled with the demo credentials.
              </div>
            </div>
          </div>

          <form action={signInAction} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                defaultValue={DEMO_EMAIL}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                defaultValue={DEMO_PASSWORD}
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition"
            >
              Sign in
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-neutral-500">
            No account? Any email works in demo mode.
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 py-4 text-xs text-neutral-500 flex flex-wrap items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} LinkTester</div>
          <a href={MARKETING_URL} className="hover:text-neutral-900">
            linktester-web.vercel.app
          </a>
        </div>
      </footer>
    </main>
  );
}
