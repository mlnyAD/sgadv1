

import { env } from "@/lib/env";

export function getSiteUrl() {
  if (env.SITE_URL) return env.SITE_URL.replace(/\/$/, "");

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}