
import type { MetadataRoute } from "next";

import { SITE } from "../lib/services";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE.url.replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "Yeti",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],

    sitemap: `${baseUrl}/sitemap.xml`,

    host: baseUrl,
  };
}
