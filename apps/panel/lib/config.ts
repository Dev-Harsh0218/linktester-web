// Shared client/server constants for the panel.

export const MARKETING_URL =
  process.env.NEXT_PUBLIC_MARKETING_URL || "https://linktester-web.vercel.app";

export const AUTH_COOKIE = "linktester_signed_in";
export const EMAIL_COOKIE = "linktester_email";

export const DEMO_EMAIL = "demo@linktester.dev";
export const DEMO_PASSWORD = "demo123";

// One week
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
