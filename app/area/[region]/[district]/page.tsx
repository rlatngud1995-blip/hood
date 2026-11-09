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

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllDistricts().map((item) => ({
    region: item.regionSlug,
    district: item.districtSlug,
  }));
}

const CASE_IMAGE =
  "/ECAD3A3D-6C53-43BF-A443-01A321496AE2.png";

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
  const url = `${SITE.url}/area/${region}/${district}`;

  const title =
    `${name} 후드 교체 | 주방후드·렌지후드·후황 교체`;

  const description =
    `${name} 주방후드·렌지후드·후황·아일랜드후드·침니후드 교체 상담. ${SITE.phone}`;

  return {
    title: {
      absolute: title,
    },

    description,

    alternates: {
      canonical: url,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: "ko_KR",
      type: "website",
      images: [
        {
          url: `${SITE.url}${CASE_IMAGE}`,
          alt: `${location} 주방후드 교체 안내`,
        },
      ],
    },
  };
}

const hoodTypes = [
  {
    title: "주방후드 · 렌지후드 교체",
    description:
      "아파트, 빌라, 단독주택 등에 설치된 일반 주방후드와 렌지후드 교체 상담입니다. 기존 제품의 폭과 설치 공간, 배기 연결 상태를 확인합니다.",
  },
  {
    title: "후황 · 슬림후드 교체",
    description:
      "후황으로 불리는 기존 주방 환기후드와 슬림형 후드의 교체를 안내합니다. 상부장 내부 공간과 배기구 위치를 함께 확인합니다.",
  },
  {
    title: "빌트인후드 · 통후드 교체",
    description:
      "주방가구 내부에 매립된 빌트인후드와 통후드는 기존 제품 규격과 가구 내부 구조를 확인한 뒤 교체 방법을 검토합니다.",
  },
  {
    title: "허리케인후드 교체",
    description:
      "허리케인후드 역시 모델명, 제품 폭, 설치 형태를 확인한 뒤 호환 가능한 교체 제품과 작업 방법을 상담합니다.",
  },
  {
    title: "아일랜드후드 교체",
    description:
      "천장에 고정된 아일랜드후드는 천장 고정 상태와 전원, 배기덕트 위치 및 작업 공간 확인이 중요합니다.",
  },
  {
    title: "침니후드 · 데코후드 교체",
    description:
      "벽면형 침니후드와 데코후드는 설치 높이와 벽면 고정 상태, 배기 연결 방식을 확인해 교체 방법을 안내합니다.",
  },
];

const housingTypes = [
  {
    title: "아파트 후드 교체",
    description:
      "기존 상부장과 후드 폭을 확인하고 배기덕트 연결 상태를 점검해 교체 방법을 상담합니다.",
  },
  {
    title: "빌라 후드 교체",
    description:
      "주방가구 구조와 기존 환기후드 규격을 확인하여 철거 및 교체 범위를 안내합니다.",
  },
  {
    title: "단독주택 후드 교체",
    description:
      "벽면 또는 천장 배기 구조와 전원 위치를 확인하여 설치 가능한 후드 형태를 검토합니다.",
  },
];

const checks = [
  {
    title: "기존 후드 모델명",
    description:
      "제품 하단 또는 내부 라벨에서 모델명을 확인하면 교체 제품을 찾는 데 도움이 됩니다.",
  },
  {
    title: "후드 가로 폭",
    description:
      "기존 후드의 가로 폭과 설치 공간을 확인해야 제품 호환 여부를 판단하기 쉽습니다.",
  },
  {
    title: "배기덕트 위치",
    description:
      "배기구 위치와 덕트 연결 상태에 따라 교체 작업 범위가 달라질 수 있습니다.",
  },
  {
    title: "상부장·벽면 구조",
    description:
      "빌트인형, 슬림형, 침니형 등 후드 종류에 따라 고정 구조를 확인해야 합니다.",
  },
];

const process = [
  "기존 후드 사진과 모델명 확인",
  "설치 공간과 배기 구조 확인",
  "교체 가능 제품 및 작업 범위 상담",
  "비용과 방문 일정 협의",
];

const faqs = [
  {
    question: "강남구 오래된 주방후드도 교체할 수 있나요?",
    answer:
      "기존 제품의 규격과 설치 구조가 확인되면 교체 가능 여부를 검토할 수 있습니다. 모델명과 설치 사진을 함께 확인하면 상담이 더 정확합니다.",
  },
  {
    question: "렌지후드와 후황도 교체 가능한가요?",
    answer:
      "네. 렌지후드, 레인지후드, 후황 등으로 불리는 주방 환기후드도 설치 형태와 제품 규격을 확인해 교체 상담이 가능합니다.",
  },
  {
    question: "기존 제품과 다른 브랜드로 교체할 수 있나요?",
    answer:
      "가로 폭, 고정 방식, 배기 연결 규격이 적합하면 다른 브랜드 제품도 검토할 수 있습니다.",
  },
  {
    question: "후드 교체 비용은 어떻게 정해지나요?",
    answer:
      "제품 종류, 기존 후드 철거 난이도, 배기덕트 연결 및 추가 마감 작업 여부에 따라 비용이 달라집니다.",
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
    "repeat(auto-fit, minmax(min(100%, 270px), 1fr))",
  gap: 15,
};

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
  const pageUrl = `${SITE.url}/area/${region}/${district}`;

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

        primaryImageOfPage: {
          "@id": `${pageUrl}#image`,
        },

        breadcrumb: {
          "@id": `${pageUrl}#breadcrumb`,
        },

        mainEntity: {
          "@id": `${pageUrl}#service`,
        },
      },

      {
        "@type": "ImageObject",
        "@id": `${pageUrl}#image`,
        url: `${SITE.url}${CASE_IMAGE}`,
        contentUrl: `${SITE.url}${CASE_IMAGE}`,
        caption: "후드의정석 주방후드 교체 사례",
      },

      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,

        name: `${name} 후드 교체`,
        serviceType: "주방후드 교체",

        description:
          `${name} 주방후드, 렌지후드, 후황, 아일랜드후드, 침니후드 교체 상담`,

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
            name,
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
          borderBottom: "1px solid #eaeaea",
          padding: "17px 20px",
        }}
      >
        <div
          style={{
            ...container,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 15,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              color: "#171717",
              textDecoration: "none",
              fontWeight: 900,
              fontSize: 22,
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
          background: "#171717",
          color: "#fff",
          textAlign: "center",
          padding: "75px 20px",
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
              fontWeight: 800,
              letterSpacing: "2px",
              fontSize: 12,
              margin: "0 0 15px",
            }}
          >
            HOOD MASTER · LOCAL SERVICE
          </p>

          <h1
            style={{
              fontSize: "clamp(31px, 5vw, 46px)",
              fontWeight: 900,
              lineHeight: 1.35,
              margin: "0 0 18px",
            }}
          >
            {name} 후드 교체
          </h1>

          <p
            style={{
              color: "#d0d0d0",
              lineHeight: 1.9,
              fontSize: 16,
              margin: "0 0 25px",
            }}
          >
            {name} 주방후드 · 렌지후드 · 후황
            <br />
            아일랜드후드 · 침니후드 교체 상담
          </p>

          <a
            href={SITE.phoneHref}
            style={{
              display: "inline-block",
              background: "#a78047",
              color: "#fff",
              textDecoration: "none",
              borderRadius: 9,
              padding: "15px 25px",
              fontWeight: 900,
            }}
          >
            전화상담 {SITE.phone}
          </a>
        </div>
      </section>

      {/* CONTENT */}
      <section
        style={{
          ...container,
          paddingTop: 42,
          paddingBottom: 70,
        }}
      >
        <nav
          aria-label="현재 위치"
          style={{
            color: "#777",
            fontSize: 13,
            lineHeight: 2,
            marginBottom: 32,
          }}
        >
          <Link href="/" style={{ color: "inherit" }}>
            홈
          </Link>
          {" / "}

          <Link
            href="/area"
            style={{ color: "inherit" }}
          >
            전국 지역
          </Link>

          {" / "}

          <Link
            href={`/area/${region}`}
            style={{ color: "inherit" }}
          >
            {regionData.name}
          </Link>

          {" / "}

          {name}
        </nav>

        {/* INTRO */}
        <h2
          style={{
            fontSize: 28,
            letterSpacing: "-1px",
            margin: "0 0 20px",
          }}
        >
          {name} 주방후드·렌지후드 교체
        </h2>

        <p
          style={{
            color: "#555",
            fontSize: 15,
            lineHeight: 2,
            margin: "0 0 25px",
          }}
        >
          {location}에서 주방후드 교체를 알아보고 있다면
          기존 제품의 종류와 규격, 배기 연결 상태를 먼저
          확인하는 것이 좋습니다. 렌지후드와 후황은
          제품 폭과 상부장 구조에 따라 교체 방법이 달라질 수 있으며,
          아일랜드후드와 침니후드는 천장 또는 벽면 고정 구조까지
          함께 확인해야 합니다.
        </p>

        <p
          style={{
            color: "#555",
            fontSize: 15,
            lineHeight: 2,
            margin: "0 0 40px",
          }}
        >
          후드의정석은 기존 후드 사진과 모델명,
          설치 공간을 확인하여 교체 가능한 제품과
          필요한 작업 범위를 상담합니다.
          오래된 렌지후드와 빌트인후드,
          슬림후드, 허리케인후드 등 다양한 형태의
          주방 환기후드 교체를 안내합니다.
        </p>

        {/* IMAGE */}
        <article
          style={{
            background: "#fff",
            border: "1px solid #e7e3dc",
            borderRadius: 14,
            overflow: "hidden",
            marginBottom: 55,
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
              alt="후드의정석 주방후드 교체 시공 전후 사례"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1000px"
              style={{
                objectFit: "contain",
              }}
            />
          </div>

          <div
            style={{
              padding: "24px",
            }}
          >
            <p
              style={{
                color: "#a78047",
                fontWeight: 900,
                fontSize: 12,
                letterSpacing: "1px",
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
              후드의정석 주방후드 교체 사례
            </h2>

            <p
              style={{
                color: "#606060",
                fontSize: 14,
                lineHeight: 1.95,
                margin: 0,
              }}
            >
              기존 후드를 철거한 뒤 설치 공간과 제품 규격,
              배기덕트 및 전원 상태를 확인하여
              새로운 주방후드로 교체한 사례입니다.
              실제 작업 범위는 기존 제품과 현장 구조에 따라
              달라질 수 있습니다.
            </p>
          </div>
        </article>

        {/* HOUSING */}
        <h2
          style={{
            fontSize: 25,
            margin: "0 0 22px",
          }}
        >
          {name} 아파트·빌라·주택 후드 교체
        </h2>

        <div
          style={{
            ...cardGrid,
            marginBottom: 55,
          }}
        >
          {housingTypes.map((item) => (
            <article
              key={item.title}
              style={{
                background: "#fff",
                border: "1px solid #e7e3dc",
                borderRadius: 12,
                padding: 24,
              }}
            >
              <h3
                style={{
                  fontSize: 18,
                  margin: "0 0 12px",
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
          ))}
        </div>

        {/* TYPES */}
        <h2
          style={{
            fontSize: 25,
            margin: "0 0 22px",
          }}
        >
          {name} 후드 교체 종류
        </h2>

        <div
          style={{
            ...cardGrid,
            marginBottom: 55,
          }}
        >
          {hoodTypes.map((item) => (
            <article
              key={item.title}
              style={{
                background: "#fff",
                border: "1px solid #e7e3dc",
                borderRadius: 12,
                padding: 24,
              }}
            >
              <h3
                style={{
                  fontSize: 18,
                  margin: "0 0 12px",
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
          ))}
        </div>

        {/* CHECK */}
        <h2
          style={{
            fontSize: 25,
            margin: "0 0 22px",
          }}
        >
          {name}에서 후드 교체 전 확인할 사항
        </h2>

        <div
          style={{
            ...cardGrid,
            marginBottom: 55,
          }}
        >
          {checks.map((item, index) => (
            <article
              key={item.title}
              style={{
                background: "#f1ede5",
                borderRadius: 12,
                padding: 24,
              }}
            >
              <p
                style={{
                  color: "#96713e",
                  fontSize: 12,
                  fontWeight: 900,
                  margin: "0 0 10px",
                }}
              >
                CHECK {index + 1}
              </p>

              <h3
                style={{
                  fontSize: 18,
                  margin: "0 0 11px",
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
          ))}
        </div>

        {/* PROCESS */}
        <h2
          style={{
            fontSize: 25,
            margin: "0 0 22px",
          }}
        >
          {name} 후드 교체 상담 절차
        </h2>

        <div
          style={{
            ...cardGrid,
            marginBottom: 55,
          }}
        >
          {process.map((item, index) => (
            <div
              key={item}
              style={{
                background: "#171717",
                color: "#fff",
                borderRadius: 12,
                padding: 24,
              }}
            >
              <p
                style={{
                  color: "#d5b47b",
                  fontSize: 12,
                  fontWeight: 900,
                  margin: "0 0 10px",
                }}
              >
                STEP {index + 1}
              </p>

              <h3
                style={{
                  fontSize: 16,
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {item}
              </h3>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2
          style={{
            fontSize: 25,
            margin: "0 0 22px",
          }}
        >
          {name} 후드 교체 자주 묻는 질문
        </h2>

        <div
          style={{
            display: "grid",
            gap: 12,
            marginBottom: 55,
          }}
        >
          {faqs.map((faq) => (
            <details
              key={faq.question}
              style={{
                background: "#fff",
                border: "1px solid #e7e3dc",
                borderRadius: 10,
                padding: "20px 22px",
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
                  margin: "15px 0 0",
                }}
              >
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        {/* OTHER DISTRICTS */}
        <h2
          style={{
            fontSize: 24,
            margin: "0 0 20px",
          }}
        >
          {regionData.name} 다른 지역 후드 교체
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 9,
          }}
        >
          {regionData.districts
            .filter((item) => item.slug !== district)
            .map((item) => (
              <Link
                key={item.slug}
                href={`/area/${region}/${item.slug}`}
                style={{
                  background: "#fff",
                  border: "1px solid #e5e5e5",
                  padding: "10px 13px",
                  borderRadius: 7,
                  color: "#555",
                  fontSize: 13,
                  textDecoration: "none",
                }}
              >
                {item.name} 후드 교체
              </Link>
            ))}
        </div>

        <div style={{ marginTop: 30 }}>
          <Link
            href={`/area/${region}`}
            style={{
              color: "#96713e",
              fontWeight: 800,
              fontSize: 14,
            }}
          >
            ← {regionData.name} 전체 지역 보기
          </Link>
        </div>
      </section>

      {/* CONTACT */}
      <section
        style={{
          background: "#f0ece4",
          textAlign: "center",
          padding: "65px 20px",
        }}
      >
        <h2
          style={{
            fontSize: 27,
            margin: "0 0 15px",
          }}
        >
          {name} 후드 교체 상담
        </h2>

        <p
          style={{
            color: "#555",
            lineHeight: 1.9,
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
          background: "#171717",
          color: "#bcbcbc",
          padding: "30px 20px 110px",
          textAlign: "center",
          fontSize: 13,
          lineHeight: 1.9,
        }}
      >
        <strong style={{ color: "#fff" }}>
          후드의정석
        </strong>

        <div>전국 주방후드 교체 상담</div>
        <div>{SITE.phone}</div>

        <div>
          © {new Date().getFullYear()} 후드의정석
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
