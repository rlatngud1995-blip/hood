import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getAllDistricts,
  getDistrict,
  getRegion,
} from "../../../../lib/regions";

import { SITE } from "../../../../lib/services";

type PageProps = {
  params: Promise<{
    region: string;
    district: string;
  }>;
};

type LocalProfile = {
  shortIntro: string;
  detailIntro: string;
  housingText: string;
  consultationText: string;
  neighborhoods: string[];
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllDistricts().map((item) => ({
    region: item.regionSlug,
    district: item.districtSlug,
  }));
}

const CASE_IMAGE =
  "/ECAD3A3D-6C53-43BF-A443-01A321496AE2.png";

/*
  실제 확인 가능한 지역 정보만 별도로 넣습니다.

  검색 노출을 위해 존재하지 않는 지역 특성,
  시공 실적, 고객 수, 경력, 후기 등을
  자동 생성하지 않습니다.
*/
const LOCAL_PROFILES: Record<string, LocalProfile> = {
  "seoul/gangnam": {
    shortIntro:
      "강남구의 아파트·빌라·주택 주방에 설치된 렌지후드와 주방후드는 제품 규격뿐 아니라 상부장 구조, 배기덕트 위치와 기존 고정 방식을 함께 확인하는 것이 중요합니다.",

    detailIntro:
      "강남구에서 주방후드 교체를 알아볼 때는 기존 제품의 모델명과 가로 폭을 먼저 확인하는 것이 좋습니다. 같은 600mm급 후드라도 설치 방식과 상부장 내부 구조, 배기덕트 위치가 다를 수 있으며 아일랜드후드와 침니후드는 천장 또는 벽면 고정 상태까지 확인해야 합니다.",

    housingText:
      "강남구에는 공동주택과 주거용 건물이 다양하게 분포해 있어 주방 형태 역시 서로 다릅니다. 후드 교체 전에는 건물 유형만으로 제품을 결정하기보다 현재 설치된 후드 사진, 모델명, 가로 폭과 배기 연결 상태를 기준으로 교체 가능 여부를 확인하는 것이 안전합니다.",

    consultationText:
      "상담 시 강남구 내 설치 지역의 동명과 기존 후드 사진을 함께 알려주면 제품 형태와 예상 작업 범위를 확인하는 데 도움이 됩니다.",

    neighborhoods: [
      "신사동",
      "논현1동",
      "논현2동",
      "압구정동",
      "청담동",
      "삼성1동",
      "삼성2동",
      "대치1동",
      "대치2동",
      "대치4동",
      "역삼1동",
      "역삼2동",
      "도곡1동",
      "도곡2동",
      "개포1동",
      "개포2동",
      "개포3동",
      "개포4동",
      "일원본동",
      "일원1동",
      "수서동",
      "세곡동",
    ],
  },
};

const hoodTypes = [
  {
    title: "주방후드 · 렌지후드 교체",
    description:
      "아파트, 빌라, 단독주택 등에 설치된 일반 주방후드와 렌지후드 교체 상담입니다. 기존 제품의 가로 폭, 설치 공간, 고정 방식과 배기 연결 상태를 확인합니다.",
  },
  {
    title: "후황 · 슬림후드 교체",
    description:
      "후황으로 불리는 기존 주방 환기후드와 슬림형 후드의 교체를 안내합니다. 상부장 내부 공간과 기존 배기구 위치를 함께 확인해야 합니다.",
  },
  {
    title: "빌트인후드 · 통후드 교체",
    description:
      "주방가구 내부에 설치된 빌트인후드와 통후드는 기존 제품 규격, 가구 내부 공간과 배기 연결 상태를 확인하여 교체 방법을 검토합니다.",
  },
  {
    title: "허리케인후드 교체",
    description:
      "허리케인후드는 기존 제품의 모델명과 설치 폭, 고정 형태를 확인한 뒤 호환 가능한 제품과 필요한 작업 범위를 상담합니다.",
  },
  {
    title: "아일랜드후드 교체",
    description:
      "천장에 고정된 아일랜드후드는 천장 고정 구조, 전원 위치, 배기덕트와 설치 높이 등을 함께 확인하는 것이 중요합니다.",
  },
  {
    title: "침니후드 · 데코후드 교체",
    description:
      "벽면에 설치되는 침니형·데코형 후드는 설치 높이, 벽면 고정 방식과 배기덕트 연결 상태를 확인한 뒤 교체 방법을 안내합니다.",
  },
];

const housingTypes = [
  {
    title: "아파트 주방후드 교체",
    description:
      "상부장 내부에 설치된 슬림형·빌트인형 후드부터 벽면형 후드까지 기존 후드의 폭과 배기 구조를 먼저 확인합니다.",
  },
  {
    title: "빌라 주방후드 교체",
    description:
      "주방가구 구조와 기존 후드 규격, 배기덕트의 위치를 확인하여 제품 호환 여부와 철거 범위를 검토합니다.",
  },
  {
    title: "단독주택 주방후드 교체",
    description:
      "벽면 또는 천장 배기 구조와 전원 위치, 후드 고정 상태를 확인하여 설치 가능한 제품 형태를 검토합니다.",
  },
];

const checks = [
  {
    number: "01",
    title: "기존 후드 모델명",
    description:
      "후드 하단이나 필터 내부 라벨의 모델명을 확인하면 기존 규격과 교체 제품을 확인하는 데 도움이 됩니다.",
  },
  {
    number: "02",
    title: "후드 가로 폭",
    description:
      "기존 제품의 가로 폭과 주방가구 사이의 실제 설치 공간을 확인해야 제품 호환 여부를 판단하기 쉽습니다.",
  },
  {
    number: "03",
    title: "배기덕트 위치",
    description:
      "배기구 위치와 덕트 직경, 연결 상태에 따라 교체 작업 방법과 추가 작업 여부가 달라질 수 있습니다.",
  },
  {
    number: "04",
    title: "상부장·벽면·천장 구조",
    description:
      "슬림형과 빌트인형은 상부장을, 침니형은 벽면을, 아일랜드형은 천장 고정 상태까지 확인해야 합니다.",
  },
];

const process = [
  {
    number: "01",
    title: "기존 후드 사진 확인",
    description:
      "제품 전체 모습과 주방가구가 함께 보이는 사진을 확인합니다.",
  },
  {
    number: "02",
    title: "모델명·규격 확인",
    description:
      "기존 모델명과 제품 폭을 확인해 교체 가능한 형태를 검토합니다.",
  },
  {
    number: "03",
    title: "설치 조건 확인",
    description:
      "배기덕트, 상부장, 벽면 또는 천장 구조를 확인합니다.",
  },
  {
    number: "04",
    title: "작업 범위 상담",
    description:
      "제품과 현장 조건을 기준으로 작업 범위와 일정을 상담합니다.",
  },
];

const faqs = [
  {
    question: "오래된 주방후드도 교체할 수 있나요?",
    answer:
      "기존 제품의 규격과 설치 구조를 확인하면 교체 가능 여부를 검토할 수 있습니다. 모델명과 설치 사진을 함께 확인하면 제품 호환 여부를 판단하는 데 도움이 됩니다.",
  },
  {
    question: "렌지후드와 후황도 교체할 수 있나요?",
    answer:
      "네. 렌지후드, 레인지후드, 후황 등으로 불리는 주방 환기후드도 제품 형태와 설치 규격을 확인하여 교체 방법을 상담할 수 있습니다.",
  },
  {
    question: "기존 후드와 다른 브랜드로 교체할 수 있나요?",
    answer:
      "제품 폭, 설치 공간, 고정 방식과 배기 연결 규격이 맞는다면 다른 브랜드 제품도 검토할 수 있습니다.",
  },
  {
    question: "후드 교체 비용은 어떻게 결정되나요?",
    answer:
      "제품 종류, 기존 후드 철거 난이도, 설치 구조, 배기덕트 연결과 추가 마감 필요 여부 등에 따라 작업 범위가 달라질 수 있습니다.",
  },
  {
    question: "상담할 때 어떤 사진을 보내면 좋나요?",
    answer:
      "후드 전체 모습, 상부장 또는 벽면이 함께 보이는 사진, 제품 모델명 라벨 사진을 준비하면 상담에 도움이 됩니다.",
  },
];

const container = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "0 20px",
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
  gap: 15,
};

function getLocalProfile(
  region: string,
  district: string
): LocalProfile | null {
  return LOCAL_PROFILES[`${region}/${district}`] ?? null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { region, district } = await params;

  const regionData = getRegion(region);
  const districtData = getDistrict(region, district);

  if (!regionData || !districtData) {
    return {
      title: "페이지를 찾을 수 없습니다",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const name = districtData.name;
  const location = `${regionData.name} ${name}`;

  const canonical =
    `${SITE.url}/area/${region}/${district}`;

  /*
    제목을 지나치게 길게 만들지 않습니다.
    H1과 title의 핵심 주제를 일치시킵니다.
  */
  const title =
    `${name} 후드 교체 | 주방후드·렌지후드 교체`;

  /*
    네이버 진단에서 과도하게 긴 설명문이
    다시 발생하지 않도록 짧게 유지합니다.
  */
  const description =
    `${name} 주방후드·렌지후드·후황·아일랜드후드·침니후드 교체 상담. ${SITE.phone}`;

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
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: SITE.name,

      title,
      description,

      url: canonical,

      images: [
        {
          url: `${SITE.url}${CASE_IMAGE}`,
          alt: `주방후드 교체 참고 사례`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE.url}${CASE_IMAGE}`],
    },
  };
}

export default async function DistrictPage({
  params,
}: PageProps) {
  const { region, district } = await params;

  const regionData = getRegion(region);
  const districtData = getDistrict(region, district);

  if (!regionData || !districtData) {
    notFound();
  }

  const name = districtData.name;
  const location = `${regionData.name} ${name}`;

  const pageUrl =
    `${SITE.url}/area/${region}/${district}`;

  const localProfile =
    getLocalProfile(region, district);

  const intro =
    localProfile?.shortIntro ??
    `${location}에서 주방후드 교체를 알아보고 있다면 기존 후드의 모델명과 제품 폭, 설치 공간, 배기 연결 상태를 먼저 확인하는 것이 좋습니다.`;

  const detailIntro =
    localProfile?.detailIntro ??
    `후드 종류와 설치 구조에 따라 필요한 작업이 달라질 수 있으므로 기존 제품 사진과 모델명을 기준으로 교체 가능한 제품과 작업 범위를 확인하는 것이 좋습니다.`;

  const schema = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,

        url: pageUrl,

        name: `${name} 후드 교체`,

        description:
          `${name} 주방후드, 렌지후드, 후황, 아일랜드후드, 침니후드 교체 안내`,

        inLanguage: "ko-KR",

        breadcrumb: {
          "@id": `${pageUrl}#breadcrumb`,
        },

        mainEntity: {
          "@id": `${pageUrl}#service`,
        },

        primaryImageOfPage: {
          "@id": `${pageUrl}#primaryimage`,
        },
      },

      {
        "@type": "ImageObject",
        "@id": `${pageUrl}#primaryimage`,

        url: `${SITE.url}${CASE_IMAGE}`,

        contentUrl: `${SITE.url}${CASE_IMAGE}`,

        caption:
          "후드의정석 주방후드 교체 참고 사례",
      },

      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,

        name: `${name} 주방후드 교체 상담`,

        serviceType:
          "주방후드 및 렌지후드 교체",

        description:
          `${location} 주방후드, 렌지후드, 후황, 아일랜드후드 및 침니후드 교체 상담`,

        provider: {
          "@type": "Organization",

          name: SITE.name,

          url: SITE.url,

          telephone: SITE.phone,
        },

        areaServed: {
          "@type": "AdministrativeArea",
          name: location,
        },

        url: pageUrl,
      },

      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,

        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "홈",
            item: SITE.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "전국 지역",
            item: `${SITE.url}/area`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: regionData.name,
            item: `${SITE.url}/area/${region}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: `${name} 후드 교체`,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#faf9f6",
        color: "#171717",
        fontFamily:
          "'Pretendard', 'Noto Sans KR', Arial, sans-serif",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      {/* HEADER */}
      <header
        style={{
          background: "#fff",
          borderBottom:
            "1px solid #e9e5de",
          padding: "17px 20px",
        }}
      >
        <div
          style={{
            ...container,

            display: "flex",

            justifyContent:
              "space-between",

            alignItems: "center",

            gap: 14,

            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            aria-label="후드의정석 홈"
            style={{
              color: "#171717",

              textDecoration: "none",

              fontWeight: 900,

              fontSize: 22,

              letterSpacing: "-1px",
            }}
          >
            후드의정석
          </Link>

          <a
            href={SITE.phoneHref}
            style={{
              background: "#171717",

              color: "#fff",

              textDecoration: "none",

              borderRadius: 8,

              padding: "12px 16px",

              fontWeight: 800,

              fontSize: 13,
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
            "linear-gradient(145deg, #121212 0%, #1f1d1a 100%)",

          color: "#fff",

          textAlign: "center",

          padding: "78px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 900,

            margin: "0 auto",
          }}
        >
          <p
            style={{
              color: "#d7b67a",

              fontWeight: 900,

              letterSpacing: "2.5px",

              fontSize: 11,

              margin: "0 0 15px",
            }}
          >
            HOOD MASTER · LOCAL SERVICE
          </p>

          <h1
            style={{
              fontSize:
                "clamp(32px, 6vw, 48px)",

              fontWeight: 900,

              lineHeight: 1.28,

              letterSpacing: "-1.5px",

              margin: "0 0 18px",
            }}
          >
            {name} 후드 교체
          </h1>

          <p
            style={{
              color: "#ddd",

              fontSize: 16,

              lineHeight: 1.95,

              margin: "0 0 28px",
            }}
          >
            주방후드 · 렌지후드 · 후황
            <br />
            빌트인 · 아일랜드 · 침니후드
          </p>

          <a
            href={SITE.phoneHref}
            style={{
              display: "inline-block",

              background: "#ab8247",

              color: "#fff",

              textDecoration: "none",

              borderRadius: 10,

              padding: "16px 27px",

              fontWeight: 900,

              fontSize: 15,
            }}
          >
            후드 교체 전화상담
          </a>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section
        style={{
          ...container,

          paddingTop: 40,

          paddingBottom: 70,
        }}
      >
        {/* BREADCRUMB */}
        <nav
          aria-label="현재 위치"
          style={{
            color: "#797979",

            fontSize: 13,

            lineHeight: 2,

            marginBottom: 32,
          }}
        >
          <Link
            href="/"
            style={{
              color: "inherit",
            }}
          >
            홈
          </Link>

          {" / "}

          <Link
            href="/area"
            style={{
              color: "inherit",
            }}
          >
            전국 지역
          </Link>

          {" / "}

          <Link
            href={`/area/${region}`}
            style={{
              color: "inherit",
            }}
          >
            {regionData.name}
          </Link>

          {" / "}

          {name}
        </nav>

        {/* INTRO */}
        <article>
          <p
            style={{
              color: "#a78047",

              fontWeight: 900,

              fontSize: 12,

              letterSpacing: "1.4px",

              margin: "0 0 10px",
            }}
          >
            {name.toUpperCase()} HOOD SERVICE
          </p>

          <h2
            style={{
              fontSize: 29,

              lineHeight: 1.4,

              letterSpacing: "-1px",

              margin: "0 0 20px",
            }}
          >
            {name} 주방후드·렌지후드 교체
          </h2>

          <p
            style={{
              color: "#515151",

              fontSize: 15,

              lineHeight: 2,

              margin: "0 0 22px",
            }}
          >
            {intro}
          </p>

          <p
            style={{
              color: "#515151",

              fontSize: 15,

              lineHeight: 2,

              margin: "0 0 45px",
            }}
          >
            {detailIntro}
          </p>
        </article>

        {/* LOCAL UNIQUE SECTION */}
        {localProfile && (
          <section
            style={{
              background: "#f1ece3",

              borderRadius: 14,

              padding: "28px 24px",

              marginBottom: 48,
            }}
          >
            <h2
              style={{
                fontSize: 24,

                margin: "0 0 15px",

                letterSpacing: "-0.7px",
              }}
            >
              {name} 지역 후드 교체 상담 안내
            </h2>

            <p
              style={{
                color: "#595959",

                fontSize: 14,

                lineHeight: 1.95,

                margin: "0 0 20px",
              }}
            >
              {localProfile.consultationText}
            </p>

            <p
              style={{
                color: "#777",

                fontSize: 12,

                lineHeight: 1.8,

                margin: "0 0 12px",
              }}
            >
              {name} 행정동
            </p>

            <div
              style={{
                display: "flex",

                flexWrap: "wrap",

                gap: 7,
              }}
            >
              {localProfile.neighborhoods.map(
                (neighborhood) => (
                  <span
                    key={neighborhood}
                    style={{
                      background: "#fff",

                      border:
                        "1px solid #ded6ca",

                      borderRadius: 999,

                      padding: "8px 11px",

                      fontSize: 12,

                      color: "#555",
                    }}
                  >
                    {neighborhood}
                  </span>
                )
              )}
            </div>
          </section>
        )}

        {/* CASE IMAGE */}
        <figure
          style={{
            background: "#fff",

            border:
              "1px solid #e7e3dc",

            borderRadius: 14,

            overflow: "hidden",

            margin:
              "0 0 55px 0",
          }}
        >
          <div
            style={{
              position: "relative",

              width: "100%",

              aspectRatio: "4 / 3",

              background: "#ececec",
            }}
          >
            <Image
              src={CASE_IMAGE}
              alt="기존 주방후드를 철거하고 새 후드로 교체한 전후 참고 사진"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1000px"
              style={{
                objectFit: "contain",
              }}
            />
          </div>

          <figcaption
            style={{
              padding:
                "25px 24px 27px",
            }}
          >
            <p
              style={{
                color: "#a78047",

                fontWeight: 900,

                fontSize: 11,

                letterSpacing: "1.5px",

                margin: "0 0 8px",
              }}
            >
              HOOD REPLACEMENT CASE
            </p>

            <h2
              style={{
                fontSize: 23,

                margin: "0 0 13px",
              }}
            >
              주방후드 교체 참고 사례
            </h2>

            <p
              style={{
                color: "#606060",

                fontSize: 14,

                lineHeight: 1.95,

                margin: 0,
              }}
            >
              기존 주방후드를 철거하고
              설치 공간과 제품 규격,
              배기덕트 및 전원 상태를
              확인한 뒤 새로운 후드로
              교체한 참고 사례입니다.
              실제 작업 방법과 필요한
              부자재는 현장 구조와 제품에
              따라 달라질 수 있습니다.
            </p>
          </figcaption>
        </figure>

        {/* HOUSING */}
        <section
          style={{
            marginBottom: 55,
          }}
        >
          <h2
            style={{
              fontSize: 26,

              margin: "0 0 15px",
            }}
          >
            {name} 아파트·빌라·주택
            후드 교체
          </h2>

          {localProfile && (
            <p
              style={{
                color: "#606060",

                fontSize: 14,

                lineHeight: 1.95,

                margin: "0 0 23px",
              }}
            >
              {localProfile.housingText}
            </p>
          )}

          <div style={cardGrid}>
            {housingTypes.map(
              (item) => (
                <article
                  key={item.title}
                  style={{
                    background: "#fff",

                    border:
                      "1px solid #e7e3dc",

                    borderRadius: 12,

                    padding: 23,
                  }}
                >
                  <h3
                    style={{
                      fontSize: 18,

                      lineHeight: 1.5,

                      margin:
                        "0 0 11px",
                    }}
                  >
                    {name} {item.title}
                  </h3>

                  <p
                    style={{
                      color: "#666",

                      fontSize: 14,

                      lineHeight: 1.9,

                      margin: 0,
                    }}
                  >
                    {item.description}
                  </p>
                </article>
              )
            )}
          </div>
        </section>

        {/* HOOD TYPES */}
        <section
          style={{
            marginBottom: 55,
          }}
        >
          <h2
            style={{
              fontSize: 26,

              margin: "0 0 22px",
            }}
          >
            {name} 후드 교체 가능 유형
          </h2>

          <div style={cardGrid}>
            {hoodTypes.map(
              (item) => (
                <article
                  key={item.title}
                  style={{
                    background: "#fff",

                    border:
                      "1px solid #e7e3dc",

                    borderRadius: 12,

                    padding: 23,
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
                      color: "#666",

                      fontSize: 14,

                      lineHeight: 1.9,

                      margin: 0,
                    }}
                  >
                    {item.description}
                  </p>
                </article>
              )
            )}
          </div>
        </section>

        {/* CHECKS */}
        <section
          style={{
            marginBottom: 55,
          }}
        >
          <h2
            style={{
              fontSize: 26,

              margin: "0 0 22px",
            }}
          >
            {name} 후드 교체 전
            확인사항
          </h2>

          <div style={cardGrid}>
            {checks.map((item) => (
              <article
                key={item.number}
                style={{
                  background:
                    "#f1ece3",

                  borderRadius: 12,

                  padding: 23,
                }}
              >
                <p
                  style={{
                    color: "#96713e",

                    fontSize: 12,

                    fontWeight: 900,

                    margin:
                      "0 0 10px",
                  }}
                >
                  CHECK {item.number}
                </p>

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
                    color: "#626262",

                    fontSize: 14,

                    lineHeight: 1.9,

                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section
          style={{
            marginBottom: 55,
          }}
        >
          <h2
            style={{
              fontSize: 26,

              margin: "0 0 22px",
            }}
          >
            {name} 후드 교체 상담 절차
          </h2>

          <div style={cardGrid}>
            {process.map((item) => (
              <article
                key={item.number}
                style={{
                  background: "#171717",

                  color: "#fff",

                  borderRadius: 12,

                  padding: 23,
                }}
              >
                <p
                  style={{
                    color: "#d7b67a",

                    fontSize: 12,

                    fontWeight: 900,

                    margin:
                      "0 0 10px",
                  }}
                >
                  STEP {item.number}
                </p>

                <h3
                  style={{
                    fontSize: 17,

                    margin:
                      "0 0 10px",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    color: "#ccc",

                    fontSize: 13,

                    lineHeight: 1.8,

                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* IMPORTANT NOTE */}
        <aside
          style={{
            border:
              "1px solid #ded6ca",

            background: "#fff",

            borderRadius: 12,

            padding: "23px",

            marginBottom: 55,
          }}
        >
          <h2
            style={{
              fontSize: 21,

              margin: "0 0 13px",
            }}
          >
            후드 교체 전에 사진을
            준비해 주세요
          </h2>

          <p
            style={{
              color: "#606060",

              fontSize: 14,

              lineHeight: 1.95,

              margin: 0,
            }}
          >
            후드 전체가 보이는 사진,
            주방가구와 후드가 함께 보이는
            사진, 제품 모델명이 적힌
            라벨 사진을 준비하면 기존
            제품의 형태와 설치 조건을
            확인하는 데 도움이 됩니다.
          </p>
        </aside>

        {/* FAQ */}
        <section
          style={{
            marginBottom: 55,
          }}
        >
          <h2
            style={{
              fontSize: 26,

              margin: "0 0 22px",
            }}
          >
            {name} 후드 교체
            자주 묻는 질문
          </h2>

          <div
            style={{
              display: "grid",

              gap: 12,
            }}
          >
            {faqs.map((faq) => (
              <details
                key={faq.question}
                style={{
                  background: "#fff",

                  border:
                    "1px solid #e7e3dc",

                  borderRadius: 10,

                  padding:
                    "20px 22px",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",

                    fontWeight: 800,

                    fontSize: 15,

                    lineHeight: 1.8,
                  }}
                >
                  {faq.question}
                </summary>

                <p
                  style={{
                    color: "#666",

                    fontSize: 14,

                    lineHeight: 1.9,

                    margin:
                      "15px 0 0",
                  }}
                >
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* INTERNAL LINKS */}
        <section>
          <h2
            style={{
              fontSize: 24,

              margin: "0 0 12px",
            }}
          >
            {regionData.name} 다른 지역
            후드 교체
          </h2>

          <p
            style={{
              color: "#707070",

              fontSize: 13,

              lineHeight: 1.8,

              margin: "0 0 18px",
            }}
          >
            인접한 다른 지역의
            후드 교체 안내도 확인할 수
            있습니다.
          </p>

          <div
            style={{
              display: "flex",

              flexWrap: "wrap",

              gap: 9,
            }}
          >
            {regionData.districts
              .filter(
                (item) =>
                  item.slug !== district
              )
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/area/${region}/${item.slug}`}
                  style={{
                    background: "#fff",

                    border:
                      "1px solid #e5e5e5",

                    padding:
                      "10px 13px",

                    borderRadius: 7,

                    color: "#555",

                    fontSize: 13,

                    textDecoration:
                      "none",
                  }}
                >
                  {item.name} 후드 교체
                </Link>
              ))}
          </div>

          <div
            style={{
              marginTop: 28,
            }}
          >
            <Link
              href={`/area/${region}`}
              style={{
                color: "#96713e",

                fontWeight: 900,

                fontSize: 14,
              }}
            >
              ← {regionData.name} 전체 지역 보기
            </Link>
          </div>
        </section>
      </section>

      {/* CONTACT */}
      <section
        style={{
          background: "#f0ece4",

          textAlign: "center",

          padding: "65px 20px",
        }}
      >
        <p
          style={{
            color: "#96713e",

            fontSize: 12,

            fontWeight: 900,

            letterSpacing: "1.5px",

            margin: "0 0 10px",
          }}
        >
          CONTACT
        </p>

        <h2
          style={{
            fontSize: 28,

            margin: "0 0 15px",
          }}
        >
          {name} 후드 교체 상담
        </h2>

        <p
          style={{
            color: "#555",

            lineHeight: 1.9,

            fontSize: 14,

            margin: "0 0 25px",
          }}
        >
          기존 후드 사진과 모델명,
          설치 지역을 알려주시면
          교체 상담에 도움이 됩니다.
        </p>

        <a
          href={SITE.phoneHref}
          style={{
            display: "inline-block",

            background: "#171717",

            color: "#fff",

            padding: "17px 30px",

            borderRadius: 9,

            fontWeight: 900,

            textDecoration: "none",
          }}
        >
          전화상담 {SITE.phone}
        </a>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#151515",

          color: "#bcbcbc",

          padding:
            "30px 20px 110px",

          textAlign: "center",

          fontSize: 13,

          lineHeight: 1.9,
        }}
      >
        <strong
          style={{
            color: "#fff",
          }}
        >
          후드의정석
        </strong>

        <div>
          전국 주방후드 교체 상담
        </div>

        <div>{SITE.phone}</div>

        <div>
          © {new Date().getFullYear()}{" "}
          후드의정석
        </div>
      </footer>

      {/* FIXED CALL */}
      <a
        href={SITE.phoneHref}
        aria-label={`${name} 후드 교체 전화상담`}
        style={{
          position: "fixed",

          left: 16,

          right: 16,

          bottom: 14,

          zIndex: 50,

          background: "#a78047",

          color: "#fff",

          textAlign: "center",

          padding: "17px 20px",

          borderRadius: 12,

          fontWeight: 900,

          fontSize: 16,

          textDecoration: "none",

          boxShadow:
            "0 6px 25px rgba(0,0,0,0.18)",
        }}
      >
        전화상담 바로가기 · {SITE.phone}
      </a>
    </main>
  );
}
