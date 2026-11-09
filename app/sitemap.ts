
import type { MetadataRoute } from "next";

import {
  regions,
  getAllDistricts,
} from "../lib/regions";

import { SITE } from "../lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url.replace(/\/+$/, "");

  /*
   * 실제로 존재하는 서비스 페이지 주소만
   * 이 배열에 유지해야 합니다.
   */
  const servicePaths = [
    "/services/kitchen-hood",
    "/services/island-hood",
    "/services/chimney-hood",
  ];

  // 메인 및 공통 페이지
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/area`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // 서비스 상세 페이지
  const servicePages: MetadataRoute.Sitemap =
    servicePaths.map((path) => ({
      url: `${baseUrl}${path}`,
      changeFrequency: "monthly",
      priority: 0.85,
    }));

  // 전국 17개 시·도 페이지
  const regionPages: MetadataRoute.Sitemap =
    regions.map((region) => ({
      url: `${baseUrl}/area/${region.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  // 시·군·구 개별 상세 페이지
  const districtPages: MetadataRoute.Sitemap =
    getAllDistricts().map((item) => ({
      url:
        `${baseUrl}/area/${item.regionSlug}/${item.districtSlug}`,
      changeFrequency: "monthly",
      priority: 0.75,
    }));

  // 모든 주소 합치기
  const allPages: MetadataRoute.Sitemap = [
    ...staticPages,
    ...servicePages,
    ...regionPages,
    ...districtPages,
  ];

  // 중복 URL 제거
  const uniquePages = new Map<
    string,
    MetadataRoute.Sitemap[number]
  >();

  for (const page of allPages) {
    const normalizedUrl =
      page.url.replace(/\/+$/, "");

    if (!uniquePages.has(normalizedUrl)) {
      uniquePages.set(normalizedUrl, {
        ...page,
        url: normalizedUrl,
      });
    }
  }

  return Array.from(uniquePages.values());
}
