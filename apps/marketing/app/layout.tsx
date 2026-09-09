import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkTester — Test affiliate & tracking links across platforms",
  description:
    "Paste an affiliate or tracking link, choose platform + country, and see the full redirect chain to the final destination (Play Store, App Store, or landing page).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-neutral-900">{children}</body>
    </html>
  );
}
