"use client";
import { ArrowLeft, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function Header({
  title,
  marketingUrl,
  userEmail,
}: {
  title: string;
  marketingUrl: string;
  userEmail: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleSignOut() {
    await fetch("/api/signout", { method: "POST" });
    startTransition(() => {
      router.push("/signin");
      router.refresh();
    });
  }

  return (
    <header className="h-14 border-b border-neutral-200 bg-white px-6 flex items-center justify-between gap-4">
      <div className="text-sm font-semibold text-neutral-900 tracking-tight">
        {title}
      </div>
      <a
        href={marketingUrl}
        className="hidden sm:inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-violet-700 transition"
      >
        <ArrowLeft size={12} />
        Back to LinkTester
      </a>
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline text-xs text-neutral-500">
          {userEmail}
        </span>
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isPending}
          className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition disabled:opacity-60"
        >
          <LogOut size={12} />
          {isPending ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </header>
  );
}
