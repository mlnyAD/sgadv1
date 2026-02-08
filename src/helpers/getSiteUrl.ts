

export function getSiteUrl() {

  // 1) URL explicite (recommandée)
  const explicit = process.env.SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  // 2) Sur Vercel (preview/prod), VERCEL_URL est souvent défini (sans schéma)
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  // 3) Local fallback
  return "http://localhost:3000";

}