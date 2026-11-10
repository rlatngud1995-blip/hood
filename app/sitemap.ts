import type { MetadataRoute } from "next";
import { regions, getAllDistricts } from "../lib/regions";
import { SITE, services } from "../lib/services";

/** Only canonical, publicly rendered 200-status pages belong in this sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/+$/, "");
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/area`, changeFrequency: "monthly", priority: 0.8 },
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...regions.map((r) => ({
      url: `${base}/area/${r.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getAllDistricts().map((d) => ({
      url: `${base}/area/${d.regionSlug}/${d.districtSlug}`,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
}
