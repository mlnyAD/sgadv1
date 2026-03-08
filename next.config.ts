// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Désactive les sourcemaps côté navigateur pour alléger la prod
  productionBrowserSourceMaps: false,
  
  // Active strict mode React (optionnel mais recommandé)
  reactStrictMode: true,

  // Rien d'autre n'est nécessaire pour un projet App Router + Supabase
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xfaitxgzmoqcqogjbdcy.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};


export default nextConfig;
