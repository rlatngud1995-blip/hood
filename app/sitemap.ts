import type { MetadataRoute } from "next";

import {
  regions,
  getAllDistricts,
} from "../lib/regions";

import { SITE } from "../lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    SITE.url.replace(/\/$/, "");

  /* =====================================
     메인 / 주요 페이지
  ===================================== */

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,

      changeFrequency:
        "weekly",

      priority:
        1,
    },

    {
      url:
        `${baseUrl}/area`,

      changeFrequency:
        "weekly",

      priority:
        0.95,
    },

    {
      url:
        `${baseUrl}/services/kitchen-hood`,

      changeFrequency:
        "monthly",

      priority:
        0.9,
    },

    {
      url:
        `${baseUrl}/services/island-hood`,

      changeFrequency:
        "monthly",

      priority:
        0.85,
    },

    {
      url:
        `${baseUrl}/services/chimney-hood`,

      changeFrequency:
        "monthly",

      priority:
        0.85,
    },
  ];

  /* =====================================
     시·도 상위 페이지

     예:
     /area/seoul
     /area/gyeonggi
     /area/incheon
     /area/chungnam
  ===================================== */

  const regionPages: MetadataRoute.Sitemap =
    regions.map(
      (region) => ({
        url:
          `${baseUrl}/area/${region.slug}`,

        changeFrequency:
          "monthly",

        priority:
          0.82,
      })
    );

  /* =====================================
     시·군·구 개별 페이지

     예:
     /area/seoul/gangnam
     /area/gyeonggi/pyeongtaek
     /area/chungnam/cheonan-seobuk
  ===================================== */

  const districtPages: MetadataRoute.Sitemap =
    getAllDistricts().map(
      (item) => ({
        url:
          `${baseUrl}/area/${item.regionSlug}/${item.districtSlug}`,

        changeFrequency:
          "monthly",

        priority:
          0.78,
      })
    );

  /* =====================================
     최종 Sitemap
  ===================================== */

  return [
    ...staticPages,
    ...regionPages,
    ...districtPages,
  ];
}
