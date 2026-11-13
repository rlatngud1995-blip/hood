import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getRegion,
  regions,
} from "../../../lib/regions";

import { SITE } from "../../../lib/services";

type PageProps = {
  params: Promise<{
    region: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return regions.map((region) => ({
    region: region.slug,
  }));
}

/* =========================================================
   공통 유틸
========================================================= */

function hashString(value: string) {
  let hash = 0;

  for (let i = 0; i < value.length; i += 1) {
    hash =
      (hash * 31 + value.charCodeAt(i)) >>> 0;
  }

  return hash;
}

function pick<T>(
  items: readonly T[],
  seed: number,
  offset = 0
): T {
  return items[
    (seed + offset) % items.length
  ];
}

function rotate<T>(
  items: readonly T[],
  amount: number
): T[] {
  if (items.length === 0) return [];

  const index =
    amount % items.length;

  return [
    ...items.slice(index),
    ...items.slice(0, index),
  ];
}

/* =========================================================
   메타 타이틀
========================================================= */

const titleTemplates = [
  (regionName: string) =>
    `${regionName} 후드 교체 | 주방후드·렌지후드`,

  (regionName: string) =>
    `${regionName} 주방후드 교체 | 렌지후드·후황`,

  (regionName: string) =>
    `${regionName} 렌지후드 교체 | 후드의정석`,

  (regionName: string) =>
    `${regionName} 주방 후드 교체 안내`,

  (regionName: string) =>
    `${regionName} 후드교체 | 빌트인·침니·아일랜드`,
];

/* =========================================================
   메타 설명
========================================================= */

const descriptionTemplates = [
  (regionName: string) =>
    `${regionName} 주방후드·렌지후드·후황 교체 상담. 지역별 페이지에서 설치 조건과 교체 안내를 확인하세요.`,

  (regionName: string) =>
    `${regionName} 주방후드 교체 안내. 렌지후드·빌트인·슬림·침니·아일랜드후드 상담 가능.`,

  (regionName: string) =>
    `${regionName} 후드 교체 상담. 시·군·구별 주방후드 및 렌지후드 교체 안내를 확인하세요.`,

  (regionName: string) =>
    `${regionName} 주방 환기후드 교체 안내. 기존 제품 규격과 설치 구조를 확인해 상담합니다.`,

  (regionName: string) =>
    `${regionName} 렌지후드·주방후드 교체가 필요하다면 가까운 지역 페이지에서 상세 내용을 확인하세요.`,
];

/* =========================================================
   지역 소개
========================================================= */

const introTemplates = [
  (regionName: string) =>
    `${regionName}에서 주방후드 교체를 알아보고 있다면 먼저 거주 지역을 선택해 주세요. 각 시·군·구 페이지에서 렌지후드, 후황, 빌트인후드, 침니후드 등 제품 형태와 교체 전 확인사항을 안내하고 있습니다.`,

  (regionName: string) =>
    `${regionName} 주방후드 교체 상담은 지역별 페이지를 기준으로 확인할 수 있습니다. 기존 후드의 모델명과 가로 폭, 설치 공간과 배기덕트 상태를 확인하면 교체 제품을 검토하는 데 도움이 됩니다.`,

  (regionName: string) =>
    `${regionName}의 아파트·빌라·주택에서 렌지후드 교체가 필요하다면 현재 설치된 제품 형태를 먼저 확인하는 것이 좋습니다. 시·군·구별 안내 페이지에서 후드 종류와 상담 준비사항을 확인할 수 있습니다.`,

  (regionName: string) =>
    `${regionName} 후드 교체는 단순히 제품만 바꾸는 것이 아니라 기존 주방가구와 배기 연결 구조를 함께 확인해야 합니다. 아래 지역을 선택하면 해당 지역의 주방후드 교체 안내를 확인할 수 있습니다.`,

  (regionName: string) =>
    `${regionName}에서 오래된 주방후드나 렌지후드를 교체하려는 경우 제품 규격과 설치 구조 확인이 중요합니다. 지역별 상세 페이지를 통해 교체 전 확인사항과 상담 방법을 확인해 주세요.`,
];

/* =========================================================
   두 번째 설명
========================================================= */

const detailTemplates = [
  (regionName: string) =>
    `${regionName} 지역의 주방 형태는 아파트, 빌라, 단독주택 등 건물 유형과 주방가구 구조에 따라 다를 수 있습니다. 동일한 후드라도 설치 폭과 배기 연결 방식이 다를 수 있어 현재 제품 사진과 모델명 확인이 중요합니다.`,

  (regionName: string) =>
    `${regionName}에서 렌지후드나 후황을 교체할 때는 기존 제품의 크기와 설치 공간을 함께 확인해야 합니다. 특히 빌트인형과 슬림형 후드는 상부장 내부 공간을, 침니형과 아일랜드형은 벽면 또는 천장 구조를 확인하는 것이 좋습니다.`,

  (regionName: string) =>
    `${regionName} 주방후드 교체는 제품 형태에 따라 확인해야 할 조건이 달라집니다. 기존 후드 전체 사진과 라벨 사진, 가로 폭을 준비하면 상담이 훨씬 수월합니다.`,

  (regionName: string) =>
    `${regionName} 후드 교체 상담 시에는 기존 주방후드 브랜드보다 실제 설치 규격이 더 중요할 수 있습니다. 다른 브랜드 제품이라도 설치 공간과 배기 연결 규격이 맞으면 검토할 수 있습니다.`,

  (regionName: string) =>
    `${regionName}의 각 시·군·구별 페이지는 해당 지역명을 기준으로 주방후드 교체 정보를 확인할 수 있도록 구성되어 있습니다. 실제 작업 방식은 제품 종류와 현장 구조에 따라 달라질 수 있습니다.`,
];

/* =========================================================
   지역 선택 제목
========================================================= */

const districtTitleTemplates = [
  (regionName: string) =>
    `${regionName} 지역 선택`,

  (regionName: string) =>
    `${regionName} 시·군·구별 후드 교체`,

  (regionName: string) =>
    `${regionName} 주방후드 교체 지역`,

  (regionName: string) =>
    `${regionName} 지역별 렌지후드 교체 안내`,
];

/* =========================================================
   후드 종류
========================================================= */

const hoodTypes = [
  {
    title: "주방후드 · 렌지후드",
    description:
      "일반 가정집 주방에 설치된 후드로 기존 제품 폭과 설치 공간, 배기 연결 상태를 확인합니다.",
  },
  {
    title: "후황 · 슬림후드",
    description:
      "상부장 하단 또는 내부에 설치된 형태로 주방가구 공간과 배기구 위치 확인이 중요합니다.",
  },
  {
    title: "빌트인후드",
    description:
      "주방가구 내부에 들어가는 제품으로 기존 제품 규격과 가구 내부 치수를 확인합니다.",
  },
  {
    title: "통후드",
    description:
      "기존 후드의 가로 폭과 상부장 구조, 배기 연결 방향을 확인해 교체 가능 여부를 검토합니다.",
  },
  {
    title: "침니후드",
    description:
      "벽면 고정형 제품으로 설치 높이와 벽면 고정 상태, 배기덕트 위치를 확인합니다.",
  },
  {
    title: "아일랜드후드",
    description:
      "천장 고정형 제품으로 천장 고정 구조와 배기 연결, 전원 위치 확인이 중요합니다.",
  },
];

/* =========================================================
   확인사항
========================================================= */

const checkItems = [
  {
    title: "기존 제품 모델명",
    description:
      "후드 라벨에 적힌 모델명을 확인하면 기존 제품 규격을 파악하는 데 도움이 됩니다.",
  },
  {
    title: "후드 가로 폭",
    description:
      "설치 공간과 새 제품 호환 여부를 확인하기 위해 기존 후드 폭을 확인하는 것이 좋습니다.",
  },
  {
    title: "주방가구 구조",
    description:
      "슬림형과 빌트인형 후드는 상부장 내부 구조와 공간 확인이 중요합니다.",
  },
  {
    title: "배기덕트 위치",
    description:
      "배기구 위치와 덕트 연결 상태는 실제 설치 방법에 영향을 줄 수 있습니다.",
  },
  {
    title: "벽면·천장 구조",
    description:
      "침니형과 아일랜드형 후드는 벽면 또는 천장 고정 구조 확인이 필요합니다.",
  },
  {
    title: "제품 전체 사진",
    description:
      "후드 전체와 주변 주방가구가 함께 보이는 사진을 준비하면 상담에 도움이 됩니다.",
  },
];

/* =========================================================
   상담 절차
========================================================= */

const processItems = [
  {
    title: "지역 선택",
    description:
      "현재 거주하거나 설치를 원하는 시·군·구를 선택합니다.",
  },
  {
    title: "제품 사진 확인",
    description:
      "기존 후드와 주변 주방가구가 보이는 사진을 확인합니다.",
  },
  {
    title: "모델·규격 확인",
    description:
      "기존 제품 모델명과 가로 폭, 설치 공간을 확인합니다.",
  },
  {
    title: "교체 방식 상담",
    description:
      "제품 형태와 설치 조건에 맞는 교체 방향을 상담합니다.",
  },
];

/* =========================================================
   FAQ
========================================================= */

const faqBank = [
  {
    question:
      "지역별로 후드 교체 방법이 다른가요?",
    answer:
      "지역 자체보다 기존 제품 종류와 주방가구 구조, 배기 연결 방식에 따라 작업 방법이 달라집니다. 지역별 페이지는 가까운 지역을 찾기 위한 안내 역할을 합니다.",
  },
  {
    question:
      "주방후드와 렌지후드는 같은 건가요?",
    answer:
      "일반적으로 주방 조리공간의 연기와 냄새를 배출하는 환기 장치를 주방후드, 렌지후드, 레인지후드 등 여러 표현으로 부릅니다.",
  },
  {
    question:
      "후황도 교체할 수 있나요?",
    answer:
      "후황이라고 부르는 주방 환기후드도 기존 제품 규격과 설치 구조를 확인한 뒤 교체 가능 여부를 검토할 수 있습니다.",
  },
  {
    question:
      "기존 제품과 다른 브랜드로 교체할 수 있나요?",
    answer:
      "설치 폭과 공간, 고정 방식, 배기 연결 규격이 맞으면 다른 브랜드 제품도 검토할 수 있습니다.",
  },
  {
    question:
      "상담 전에 무엇을 준비하면 좋나요?",
    answer:
      "후드 전체 사진, 모델명 라벨 사진, 제품 가로 폭과 설치 지역을 준비하면 상담에 도움이 됩니다.",
  },
  {
    question:
      "빌트인후드도 교체 가능한가요?",
    answer:
      "빌트인후드는 상부장 내부 공간과 기존 제품 규격을 확인한 뒤 교체 가능 여부를 검토합니다.",
  },
  {
    question:
      "아일랜드후드는 어떤 부분을 확인해야 하나요?",
    answer:
      "아일랜드형은 천장 고정 구조와 배기덕트, 전원 위치와 설치 높이를 함께 확인하는 것이 중요합니다.",
  },
  {
    question:
      "침니후드 교체 시 벽면 확인이 필요한가요?",
    answer:
      "침니후드는 벽면에 고정되는 경우가 많아 벽면 고정 상태와 배기 연결 위치를 함께 확인합니다.",
  },
];

/* =========================================================
   SECTION TITLES
========================================================= */

const hoodTitleTemplates = [
  (regionName: string) =>
    `${regionName}에서 교체 가능한 후드 종류`,

  (regionName: string) =>
    `${regionName} 주방후드 유형 안내`,

  (regionName: string) =>
    `${regionName} 렌지후드·주방후드 종류`,

  (regionName: string) =>
    `${regionName} 후드 종류별 교체 안내`,
];

const checkTitleTemplates = [
  (regionName: string) =>
    `${regionName} 후드 교체 전 확인사항`,

  (regionName: string) =>
    `${regionName} 주방후드 상담 전 체크사항`,

  (regionName: string) =>
    `후드 교체 전에 확인해 주세요`,

  (regionName: string) =>
    `${regionName} 렌지후드 교체 준비사항`,
];

const processTitleTemplates = [
  (regionName: string) =>
    `${regionName} 후드 교체 상담 절차`,

  (regionName: string) =>
    `후드 교체 상담은 이렇게 진행됩니다`,

  (regionName: string) =>
    `${regionName} 주방후드 상담 과정`,

  (regionName: string) =>
    `${regionName} 렌지후드 교체 상담 순서`,
];

const faqTitleTemplates = [
  (regionName: string) =>
    `${regionName} 후드 교체 자주 묻는 질문`,

  (regionName: string) =>
    `${regionName} 주방후드 교체 FAQ`,

  (regionName: string) =>
    `주방후드 교체 Q&A`,

  (regionName: string) =>
    `${regionName} 렌지후드 상담 FAQ`,
];

/* =========================================================
   STYLE
========================================================= */

const container = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "0 20px",
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
  gap: 15,
};

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { region } = await params;

  const regionData =
    getRegion(region);

  if (!regionData) {
    return {
      title:
        "페이지를 찾을 수 없습니다",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const regionName =
    regionData.name;

  const seed =
    hashString(region);

  const title =
    pick(
      titleTemplates,
      seed
    )(regionName);

  const description =
    pick(
      descriptionTemplates,
      seed,
      3
    )(regionName);

  const canonical =
    `${SITE.url}/area/${region}`;

  return {
    title: {
      absolute: title,
    },

    description,

    alternates: {
      canonical,
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,
        "max-image-preview":
          "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE.name,
      locale: "ko_KR",
      type: "website",
    },
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function RegionPage({
  params,
}: PageProps) {
  const { region } =
    await params;

  const regionData =
    getRegion(region);

  if (!regionData) {
    notFound();
  }

  const regionName =
    regionData.name;

  const pageUrl =
    `${SITE.url}/area/${region}`;

  const seed =
    hashString(
      `${region}-${regionName}`
    );

  const intro =
    pick(
      introTemplates,
      seed
    )(regionName);

  const detail =
    pick(
      detailTemplates,
      seed,
      2
    )(regionName);

  const districtTitle =
    pick(
      districtTitleTemplates,
      seed,
      3
    )(regionName);

  const hoodTitle =
    pick(
      hoodTitleTemplates,
      seed,
      4
    )(regionName);

  const checkTitle =
    pick(
      checkTitleTemplates,
      seed,
      5
    )(regionName);

  const processTitle =
    pick(
      processTitleTemplates,
      seed,
      6
    )(regionName);

  const faqTitle =
    pick(
      faqTitleTemplates,
      seed,
      7
    )(regionName);

  const rotatedDistricts =
    rotate(
      regionData.districts,
      seed %
        Math.max(
          regionData.districts.length,
          1
        )
    );

  const pageHoodTypes =
    rotate(
      hoodTypes,
      seed % hoodTypes.length
    );

  const pageChecks =
    rotate(
      checkItems,
      seed % checkItems.length
    ).slice(0, 4);

  const pageProcess =
    rotate(
      processItems,
      seed % processItems.length
    );

  const pageFaqs =
    rotate(
      faqBank,
      seed % faqBank.length
    ).slice(0, 5);

  const layoutVariant =
    seed % 3;

  const schema = {
    "@context":
      "https://schema.org",

    "@graph": [
      {
        "@type":
          "CollectionPage",

        "@id":
          `${pageUrl}#webpage`,

        url:
          pageUrl,

        name:
          `${regionName} 후드 교체`,

        description:
          `${regionName} 주방후드 및 렌지후드 교체 지역 안내`,

        inLanguage:
          "ko-KR",

        breadcrumb: {
          "@id":
            `${pageUrl}#breadcrumb`,
        },

        mainEntity: {
          "@id":
            `${pageUrl}#service`,
        },
      },

      {
        "@type":
          "Service",

        "@id":
          `${pageUrl}#service`,

        name:
          `${regionName} 주방후드 교체 안내`,

        serviceType:
          "주방후드 교체",

        provider: {
          "@type":
            "Organization",

          name:
            SITE.name,

          url:
            SITE.url,

          telephone:
            SITE.phone,
        },

        areaServed: {
          "@type":
            "AdministrativeArea",

          name:
            regionName,
        },

        url:
          pageUrl,
      },

      {
        "@type":
          "BreadcrumbList",

        "@id":
          `${pageUrl}#breadcrumb`,

        itemListElement: [
          {
            "@type":
              "ListItem",

            position: 1,

            name:
              "홈",

            item:
              SITE.url,
          },
          {
            "@type":
              "ListItem",

            position: 2,

            name:
              "전국 지역",

            item:
              `${SITE.url}/area`,
          },
          {
            "@type":
              "ListItem",

            position: 3,

            name:
              regionName,

            item:
              pageUrl,
          },
        ],
      },
    ],
  };

  const DistrictSection = (
    <section
      style={{
        marginBottom: 55,
      }}
    >
      <h2
        style={{
          fontSize: 27,
          margin: "0 0 18px",
        }}
      >
        {districtTitle}
      </h2>

      <p
        style={{
          color: "#666",
          fontSize: 14,
          lineHeight: 1.9,
          margin: "0 0 23px",
        }}
      >
        아래 지역을 선택하면 해당 시·군·구의
        주방후드·렌지후드 교체 안내 페이지로
        이동합니다.
      </p>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",

          gap: 11,
        }}
      >
        {rotatedDistricts.map(
          (district) => (
            <Link
              key={
                district.slug
              }
              href={`/area/${region}/${district.slug}`}
              style={{
                background:
                  "#fff",

                border:
                  "1px solid #e6e0d7",

                borderRadius:
                  10,

                padding:
                  "17px 15px",

                color:
                  "#222",

                textDecoration:
                  "none",

                fontWeight:
                  800,

                fontSize:
                  14,

                lineHeight:
                  1.6,
              }}
            >
              {district.name}
              <div
                style={{
                  color:
                    "#8d7652",

                  fontSize:
                    12,

                  marginTop:
                    4,

                  fontWeight:
                    700,
                }}
              >
                후드 교체 안내 →
              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );

  const HoodSection = (
    <section
      style={{
        marginBottom: 55,
      }}
    >
      <h2
        style={{
          fontSize: 27,
          margin: "0 0 21px",
        }}
      >
        {hoodTitle}
      </h2>

      <div style={grid}>
        {pageHoodTypes.map(
          (item) => (
            <article
              key={
                item.title
              }
              style={{
                background:
                  "#fff",

                border:
                  "1px solid #e7e3dc",

                borderRadius:
                  12,

                padding:
                  23,
              }}
            >
              <h3
                style={{
                  fontSize: 18,
                  margin:
                    "0 0 11px",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color:
                    "#666",

                  fontSize:
                    14,

                  lineHeight:
                    1.9,

                  margin: 0,
                }}
              >
                {
                  item.description
                }
              </p>
            </article>
          )
        )}
      </div>
    </section>
  );

  const CheckSection = (
    <section
      style={{
        marginBottom: 55,
      }}
    >
      <h2
        style={{
          fontSize: 27,
          margin: "0 0 21px",
        }}
      >
        {checkTitle}
      </h2>

      <div style={grid}>
        {pageChecks.map(
          (item, index) => (
            <article
              key={
                item.title
              }
              style={{
                background:
                  "#f2ede5",

                borderRadius:
                  12,

                padding:
                  23,
              }}
            >
              <p
                style={{
                  color:
                    "#987342",

                  fontSize:
                    12,

                  fontWeight:
                    900,

                  margin:
                    "0 0 10px",
                }}
              >
                CHECK {index + 1}
              </p>

              <h3
                style={{
                  fontSize:
                    18,

                  margin:
                    "0 0 11px",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color:
                    "#666",

                  fontSize:
                    14,

                  lineHeight:
                    1.9,

                  margin:
                    0,
                }}
              >
                {
                  item.description
                }
              </p>
            </article>
          )
        )}
      </div>
    </section>
  );

  return (
    <main
      style={{
        minHeight:
          "100vh",

        background:
          "#faf9f6",

        color:
          "#171717",

        fontFamily:
          "'Pretendard', 'Noto Sans KR', Arial, sans-serif",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              schema
            ).replace(
              /</g,
              "\\u003c"
            ),
        }}
      />

      {/* HEADER */}

      <header
        style={{
          background:
            "#fff",

          borderBottom:
            "1px solid #e9e5de",

          padding:
            "17px 20px",
        }}
      >
        <div
          style={{
            ...container,

            display:
              "flex",

            justifyContent:
              "space-between",

            alignItems:
              "center",

            gap:
              14,

            flexWrap:
              "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              color:
                "#171717",

              textDecoration:
                "none",

              fontWeight:
                900,

              fontSize:
                22,
            }}
          >
            후드의정석
          </Link>

          <a
            href={
              SITE.phoneHref
            }
            style={{
              background:
                "#171717",

              color:
                "#fff",

              textDecoration:
                "none",

              borderRadius:
                8,

              padding:
                "12px 16px",

              fontWeight:
                800,

              fontSize:
                13,
            }}
          >
            전화상담 {SITE.phone}
          </a>
        </div>
      </header>

      {/* HERO */}

      <section
        style={{
          background:
            "linear-gradient(145deg,#111,#211d18)",

          color:
            "#fff",

          textAlign:
            "center",

          padding:
            "82px 20px",
        }}
      >
        <div
          style={{
            maxWidth:
              900,

            margin:
              "0 auto",
          }}
        >
          <p
            style={{
              color:
                "#d7b67a",

              fontWeight:
                900,

              letterSpacing:
                "2.5px",

              fontSize:
                11,

              margin:
                "0 0 15px",
            }}
          >
            HOOD MASTER · AREA GUIDE
          </p>

          <h1
            style={{
              fontSize:
                "clamp(34px,6vw,50px)",

              lineHeight:
                1.25,

              letterSpacing:
                "-1.5px",

              fontWeight:
                900,

              margin:
                "0 0 18px",
            }}
          >
            {regionName} 후드 교체
          </h1>

          <p
            style={{
              color:
                "#ddd",

              fontSize:
                16,

              lineHeight:
                1.9,

              margin:
                "0 0 28px",
            }}
          >
            주방후드 · 렌지후드 · 후황
            <br />
            빌트인 · 침니 · 아일랜드후드
          </p>

          <a
            href={
              SITE.phoneHref
            }
            style={{
              display:
                "inline-block",

              background:
                "#a78047",

              color:
                "#fff",

              textDecoration:
                "none",

              padding:
                "16px 28px",

              borderRadius:
                10,

              fontWeight:
                900,
            }}
          >
            후드 교체 전화상담
          </a>
        </div>
      </section>

      {/* CONTENT */}

      <section
        style={{
          ...container,

          paddingTop:
            40,

          paddingBottom:
            70,
        }}
      >
        {/* BREADCRUMB */}

        <nav
          aria-label="현재 위치"
          style={{
            color:
              "#777",

            fontSize:
              13,

            lineHeight:
              2,

            marginBottom:
              30,
          }}
        >
          <Link
            href="/"
            style={{
              color:
                "inherit",
            }}
          >
            홈
          </Link>

          {" / "}

          <Link
            href="/area"
            style={{
              color:
                "inherit",
            }}
          >
            전국 지역
          </Link>

          {" / "}

          {regionName}
        </nav>

        {/* INTRO */}

        <h2
          style={{
            fontSize:
              29,

            lineHeight:
              1.4,

            margin:
              "0 0 20px",
          }}
        >
          {regionName} 주방후드·렌지후드 교체 안내
        </h2>

        <p
          style={{
            color:
              "#515151",

            fontSize:
              15,

            lineHeight:
              2,

            margin:
              "0 0 22px",
          }}
        >
          {intro}
        </p>

        <p
          style={{
            color:
              "#515151",

            fontSize:
              15,

            lineHeight:
              2,

            margin:
              "0 0 50px",
          }}
        >
          {detail}
        </p>

        {/* 지역마다 섹션 순서 변형 */}

        {layoutVariant === 0 && (
          <>
            {DistrictSection}
            {HoodSection}
            {CheckSection}
          </>
        )}

        {layoutVariant === 1 && (
          <>
            {HoodSection}
            {DistrictSection}
            {CheckSection}
          </>
        )}

        {layoutVariant === 2 && (
          <>
            {CheckSection}
            {DistrictSection}
            {HoodSection}
          </>
        )}

        {/* PROCESS */}

        <section
          style={{
            marginBottom:
              55,
          }}
        >
          <h2
            style={{
              fontSize:
                27,

              margin:
                "0 0 21px",
            }}
          >
            {processTitle}
          </h2>

          <div style={grid}>
            {pageProcess.map(
              (item, index) => (
                <article
                  key={
                    item.title
                  }
                  style={{
                    background:
                      "#171717",

                    color:
                      "#fff",

                    borderRadius:
                      12,

                    padding:
                      23,
                  }}
                >
                  <p
                    style={{
                      color:
                        "#d7b67a",

                      fontWeight:
                        900,

                      fontSize:
                        12,

                      margin:
                        "0 0 10px",
                    }}
                  >
                    STEP {index + 1}
                  </p>

                  <h3
                    style={{
                      fontSize:
                        17,

                      margin:
                        "0 0 10px",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      color:
                        "#ccc",

                      fontSize:
                        13,

                      lineHeight:
                        1.8,

                      margin:
                        0,
                    }}
                  >
                    {
                      item.description
                    }
                  </p>
                </article>
              )
            )}
          </div>
        </section>

        {/* FAQ */}

        <section
          style={{
            marginBottom:
              55,
          }}
        >
          <h2
            style={{
              fontSize:
                27,

              margin:
                "0 0 21px",
            }}
          >
            {faqTitle}
          </h2>

          <div
            style={{
              display:
                "grid",

              gap:
                12,
            }}
          >
            {pageFaqs.map(
              (faq) => (
                <details
                  key={
                    faq.question
                  }
                  style={{
                    background:
                      "#fff",

                    border:
                      "1px solid #e7e3dc",

                    borderRadius:
                      10,

                    padding:
                      "20px 22px",
                  }}
                >
                  <summary
                    style={{
                      cursor:
                        "pointer",

                      fontWeight:
                        800,

                      fontSize:
                        15,

                      lineHeight:
                        1.8,
                    }}
                  >
                    {faq.question}
                  </summary>

                  <p
                    style={{
                      color:
                        "#666",

                      fontSize:
                        14,

                      lineHeight:
                        1.9,

                      margin:
                        "15px 0 0",
                    }}
                  >
                    {faq.answer}
                  </p>
                </details>
              )
            )}
          </div>
        </section>

        {/* 전체 지역 돌아가기 */}

        <section
          style={{
            background:
              "#fff",

            border:
              "1px solid #e7e3dc",

            borderRadius:
              12,

            padding:
              24,
          }}
        >
          <h2
            style={{
              fontSize:
                21,

              margin:
                "0 0 11px",
            }}
          >
            다른 시·도 후드 교체 안내
          </h2>

          <p
            style={{
              color:
                "#666",

              fontSize:
                14,

              lineHeight:
                1.9,

              margin:
                "0 0 17px",
            }}
          >
            전국 다른 지역의 주방후드 교체 안내도
            지역 선택 페이지에서 확인할 수 있습니다.
          </p>

          <Link
            href="/area"
            style={{
              display:
                "inline-block",

              color:
                "#96713e",

              fontWeight:
                900,

              textDecoration:
                "none",
            }}
          >
            전국 지역 선택 →
          </Link>
        </section>
      </section>

      {/* CONTACT */}

      <section
        style={{
          background:
            "#efe9df",

          textAlign:
            "center",

          padding:
            "65px 20px",
        }}
      >
        <h2
          style={{
            fontSize:
              28,

            margin:
              "0 0 15px",
          }}
        >
          {regionName} 후드 교체 상담
        </h2>

        <p
          style={{
            color:
              "#555",

            fontSize:
              14,

            lineHeight:
              1.9,

            margin:
              "0 0 25px",
          }}
        >
          기존 후드 전체 사진과 모델명,
          설치 지역을 알려주시면 상담에 도움이 됩니다.
        </p>

        <a
          href={
            SITE.phoneHref
          }
          style={{
            display:
              "inline-block",

            background:
              "#171717",

            color:
              "#fff",

            padding:
              "17px 30px",

            borderRadius:
              9,

            textDecoration:
              "none",

            fontWeight:
              900,
          }}
        >
          전화상담 {SITE.phone}
        </a>
      </section>

      {/* FOOTER */}

      <footer
        style={{
          background:
            "#151515",

          color:
            "#bcbcbc",

          textAlign:
            "center",

          padding:
            "30px 20px 110px",

          fontSize:
            13,

          lineHeight:
            1.9,
        }}
      >
        <strong
          style={{
            color:
              "#fff",
          }}
        >
          후드의정석
        </strong>

        <div>
          전국 주방후드 교체 상담
        </div>

        <div>
          {SITE.phone}
        </div>

        <div>
          © {new Date().getFullYear()} 후드의정석
        </div>
      </footer>

      {/* MOBILE FIXED CALL */}

      <a
        href={
          SITE.phoneHref
        }
        aria-label={`${regionName} 후드 교체 전화상담`}
        style={{
          position:
            "fixed",

          left:
            16,

          right:
            16,

          bottom:
            14,

          zIndex:
            50,

          background:
            "#a78047",

          color:
            "#fff",

          textAlign:
            "center",

          padding:
            "17px 20px",

          borderRadius:
            12,

          fontWeight:
            900,

          fontSize:
            16,

          textDecoration:
            "none",

          boxShadow:
            "0 6px 25px rgba(0,0,0,0.18)",
        }}
      >
        전화상담 바로가기 · {SITE.phone}
      </a>
    </main>
  );
}
