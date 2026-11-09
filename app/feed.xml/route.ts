import { NextResponse } from "next/server";
import { SITE } from "../../lib/services";
import { getAllDistricts } from "../../lib/regions";

export async function GET() {
  const baseUrl = SITE.url.replace(/\/+$/, "");

  // 1. 기본/서비스 페이지 목록 정의
  const staticItems = [
    {
      url: baseUrl,
      title: "후드의정석 | 전국 주방후드·렌지후드 교체",
      description: "전국 주방후드, 렌지후드, 후황, 아일랜드후드 교체 상담",
      date: new Date().toUTCString(),
    },
    {
      url: `${baseUrl}/services/kitchen-hood`,
      title: "주방후드 교체 | 후드의정석",
      description: "가정집 주방후드, 렌지후드, 후황, 슬림후드 교체 상담",
      date: new Date().toUTCString(),
    },
    {
      url: `${baseUrl}/services/island-hood`,
      title: "아일랜드후드 교체 | 후드의정석",
      description: "천장형 아일랜드 주방후드 교체 및 배기덕트 확인 상담",
      date: new Date().toUTCString(),
    },
    {
      url: `${baseUrl}/services/chimney-hood`,
      title: "침니후드 교체 | 후드의정석",
      description: "벽면형 침니후드, 데코후드 교체 및 설치 조건 상담",
      date: new Date().toUTCString(),
    },
    {
      url: `${baseUrl}/area`,
      title: "전국 지역별 후드 교체 | 후드의정석",
      description: "서울, 경기, 인천 및 전국 지역별 주방후드 교체 상담 안내",
      date: new Date().toUTCString(),
    },
  ];

  // 2. 전국 시·군·구 지역별 상세 페이지 동적 추가
  const districtItems = getAllDistricts().map((item) => ({
    url: `${baseUrl}/area/${item.regionSlug}/${item.districtSlug}`,
    title: `${item.name} 후드 교체 | 후드의정석`,
    description: `${item.name} 주방후드, 렌지후드, 후황 교체 상담 안내`,
    date: new Date().toUTCString(),
  }));

  const allItems = [...staticItems, ...districtItems];

  // 3. XML 형식의 RSS 피드 문자열 생성
  const rssItemsXml = allItems
    .map(
      (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.url}</link>
      <guid>${item.url}</guid>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.date}</pubDate>
    </item>
  `
    )
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${SITE.name}]]></title>
    <link>${baseUrl}</link>
    <description><![CDATA[전국 주방후드·렌지후드 교체 전문 상담 후드의정석 RSS 피드]]></description>
    <language>ko</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${rssItemsXml}
  </channel>
</rss>`;

  // 4. XML 응답 반환
  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
