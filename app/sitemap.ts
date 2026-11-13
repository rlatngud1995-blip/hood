import type { MetadataRoute } from "next";

import {
  regions,
  getAllDistricts,
} from "../lib/regions";

import { SITE } from "../lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url.replace(/\/$/, "");

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/area`,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/kitchen-hood`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/island-hood`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/chimney-hood`,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  const regionPages: MetadataRoute.Sitemap =
    regions.map((region) => ({
      url: `${baseUrl}/area/${region.slug}`,
      changeFrequency: "monthly",
      priority: 0.82,
    }));

  const districtPages: MetadataRoute.Sitemap =
    getAllDistricts().map((item) => ({
      url: `${baseUrl}/area/${item.regionSlug}/${item.districtSlug}`,
      changeFrequency: "monthly",
      priority: 0.78,
    }));

  return [
    ...staticPages,
    ...regionPages,
    ...districtPages,
  ];
}
