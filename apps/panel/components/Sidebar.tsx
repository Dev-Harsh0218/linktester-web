"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  BarChart3,
  History,
  LayoutDashboard,
  ListChecks,
  Settings,
  Upload,
  Zap,
} from "lucide-react";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/check", label: "Quick Check", icon: Zap },
  { href: "/bulk", label: "Bulk", icon: Upload },
  { href: "/queue", label: "Queue", icon: ListChecks },
  { href: "/history", label: "History", icon: History },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-neutral-200 bg-white">
      <div className="h-14 px-4 border-b border-neutral-200 flex items-center gap-2">
        <div className="h-7 w-7 rounded-md bg-violet-600 flex items-center justify-center text-white">
          <Zap size={14} />
        </div>
        <div className="text-sm font-semibold tracking-tight">
          LinkTester
          <span className="text-neutral-400 font-normal"> · Panel</span>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {NAV.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition",
                active
                  ? "bg-violet-50 text-violet-700"
                  : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900",
              )}
            >
              <Icon size={16} className={active ? "text-violet-600" : "text-neutral-500"} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-neutral-200 text-xs text-neutral-400">
        v0.1.0 · demo mode
      </div>
    </aside>
  );
}
