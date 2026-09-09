import { cookies } from "next/headers";
import { EMAIL_COOKIE, MARKETING_URL, DEMO_EMAIL } from "@/lib/config";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export async function AppShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get(EMAIL_COOKIE)?.value ?? DEMO_EMAIL;

  return (
    <div className="min-h-screen flex bg-neutral-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title={title}
          marketingUrl={MARKETING_URL}
          userEmail={userEmail}
        />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
