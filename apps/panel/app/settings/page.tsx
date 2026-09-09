import { cookies } from "next/headers";
import { AppShell } from "@/components/AppShell";
import { DEMO_EMAIL, EMAIL_COOKIE } from "@/lib/config";
import { SettingsClient } from "./SettingsClient";

export const metadata = { title: "Settings · LinkTester Panel" };

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const email = cookieStore.get(EMAIL_COOKIE)?.value ?? DEMO_EMAIL;

  return (
    <AppShell title="Settings">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">Settings</h2>
          <p className="text-sm text-neutral-500">
            Manage your account, API access, and webhook subscriptions.
          </p>
        </div>
        <SettingsClient initialEmail={email} />
      </div>
    </AppShell>
  );
}
