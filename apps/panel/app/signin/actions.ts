"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE, COOKIE_MAX_AGE, EMAIL_COOKIE } from "@/lib/config";

export async function signInAction(formData: FormData) {
  // Any email/password works — this is a mocked demo.
  const email = String(formData.get("email") ?? "").trim();
  if (!email) {
    return;
  }
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, "true", {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });
  cookieStore.set(EMAIL_COOKIE, email, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });
  redirect("/dashboard");
}
