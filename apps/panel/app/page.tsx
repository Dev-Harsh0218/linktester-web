import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@/lib/config";

export default async function Root() {
  const cookieStore = await cookies();
  const signedIn = cookieStore.get(AUTH_COOKIE)?.value === "true";
  redirect(signedIn ? "/dashboard" : "/signin");
}
