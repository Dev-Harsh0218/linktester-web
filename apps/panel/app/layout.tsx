import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkTester · Panel",
  description: "Authenticated LinkTester dashboard — bulk testing, queue status, analytics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-neutral-900">{children}</body>
    </html>
  );
}
