import { AppShell } from "@/components/AppShell";
import { CheckForm } from "./CheckForm";

export const metadata = { title: "Quick Check · LinkTester Panel" };

export default function CheckPage() {
  return (
    <AppShell title="Quick Check">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            Test a single URL
          </h2>
          <p className="text-sm text-neutral-500">
            Trace one link end-to-end. Result is saved to your local history.
          </p>
        </div>
        <CheckForm />
      </div>
    </AppShell>
  );
}
