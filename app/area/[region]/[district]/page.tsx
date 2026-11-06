
import type { Metadata } from "next";
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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { region, district } = await params;

  const regionData = getRegion(region);
  const districtData = getDistrict(region, district);

  if (!regionData || !districtData) {
    return {
      title: "페이지를 찾을 수 없습니다",
      robots: { index: false, follow: false },
    };
  }

  const location =
    `${regionData.name} ${districtData.name}`;

  const title =
    `${location} 후드 교체 | 렌지후드·후황·주방후드`;

  const description =
    `${location} 후드 교체 상담. ` +
    "주방후드, 렌지후드, 레인지후드, 후황, " +
    "빌트인후드, 슬림후드, 통후드, 허리케인후드, " +
    "아일랜드후드, 침니후드 교체 안내. " +
    `문의 ${SITE.phone}.`;

  const url =
    `${SITE.url}/area/${region}/${district}`;

  return {
    title: { absolute: title },
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
    },
  };
}

const hoodTypes = [
  {
    name: "주방후드 · 렌지후드 교체",
    description:
      "일반 가정집과 아파트 주방에 설치된 " +
      "렌지후드, 레인지후드, 주방후드의 " +
      "교체 방법을 안내합니다. " +
      "기존 제품의 폭과 설치 구조를 확인합니다.",
  },
  {
    name: "후황 · 슬림후드 교체",
    description:
      "후황으로 불리는 주방 환기후드와 " +
      "슬림형 후드의 교체 상담입니다. " +
      "상부장 내부 공간과 배기구 위치를 확인합니다.",
  },
  {
    name: "빌트인후드 · 통후드 교체",
    description:
      "주방 가구 내부에 설치된 빌트인후드와 " +
      "통후드의 규격, 고정 방식, 배기 연결을 " +
      "확인하여 교체 가능 여부를 검토합니다.",
  },
  {
    name: "허리케인후드 교체",
    description:
      "허리케인후드로 검색하는 제품도 " +
      "실제 제품 형태와 모델명을 확인하여 " +
      "호환 가능한 교체 방법을 검토합니다.",
  },
  {
    name: "아일랜드후드 교체",
    description:
      "천장에 고정된 아일랜드형 주방후드는 " +
      "천장 고정 구조, 배기덕트 연결 상태와 " +
      "작업 공간을 확인해야 합니다.",
  },
  {
    name: "침니후드 · 데코후드 교체",
    description:
      "벽면에 설치된 침니형, 굴뚝형, " +
      "데코형 주방후드의 설치 높이와 " +
      "벽면 고정 방식 등을 확인합니다.",
  },
];

const checkItems = [
  {
    title: "기존 제품 규격",
    text:
      "후드의 가로 폭과 깊이, 모델명 및 " +
      "제품 라벨을 확인합니다.",
  },
  {
    title: "배기덕트 상태",
    text:
      "배기구 위치, 덕트 직경, " +
      "연결 방식과 손상 여부를 확인합니다.",
  },
  {
    title: "설치 공간",
    text:
      "상부장, 벽면, 천장 등 " +
      "후드가 고정되는 구조를 확인합니다.",
  },
  {
    title: "추가 작업 여부",
    text:
      "기존 후드 철거, 전원 연결, " +
      "배기 연결 및 마감 작업을 검토합니다.",
  },
];

const steps = [
  "기존 후드 사진 및 모델명 확인",
  "설치 공간과 배기 구조 상담",
  "교체 제품과 작업 범위 안내",
  "비용 및 작업 일정 협의",
];

const faqs = [
  {
    question: "오래된 주방후드도 교체할 수 있나요?",
    answer:
      "기존 제품의 크기와 설치 공간이 적합하면 " +
      "교체를 검토할 수 있습니다. " +
      "제품 모델명과 설치 사진을 확인해야 합니다.",
  },
  {
    question: "기존 후드와 다른 브랜드로 교체할 수 있나요?",
    answer:
      "제품 폭, 고정 방식, 배기 연결 규격이 " +
      "적합하다면 다른 브랜드 제품으로 " +
      "교체하는 방법도 검토할 수 있습니다.",
  },
  {
    question: "후드 교체 비용은 어떻게 결정되나요?",
    answer:
      "제품 종류, 기존 후드 철거 난이도, " +
      "배기덕트 연결과 추가 마감 작업에 " +
      "따라 비용이 달라질 수 있습니다.",
  },
  {
    question: "후황과 렌지후드도 교체 상담이 가능한가요?",
    answer:
      "후황, 렌지후드, 레인지후드 등으로 " +
      "불리는 주방 환기후드도 " +
      "제품 형태와 설치 조건을 확인해 상담합니다.",
  },
  {
    question: "아일랜드후드와 침니후드도 교체할 수 있나요?",
    answer:
      "두 제품 모두 교체 상담 대상입니다. " +
      "천장 또는 벽면 고정 구조와 " +
      "배기 연결 상태를 먼저 확인해야 합니다.",
  },
];

const container = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "0 20px",
};

const grid = {
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

  const pageUrl =
    `${SITE.url}/area/${region}/${district}`;

  const breadcrumbs = [
    { name: "홈", url: SITE.url },
    {
      name: "전국 지역",
      url: `${SITE.url}/area`,
    },
    {
      name: regionData.name,
      url: `${SITE.url}/area/${region}`,
    },
    {
      name,
      url: pageUrl,
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        name: `${location} 후드 교체`,
        url: pageUrl,
        inLanguage: "ko-KR",
        description:
          `${location} 주방후드, 렌지후드, ` +
          "후황, 아일랜드후드, 침니후드 교체 안내",
        breadcrumb: {
          "@id": `${pageUrl}#breadcrumb`,
        },
        mainEntity: {
          "@id": `${pageUrl}#service`,
        },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: `${location} 후드 교체 상담`,
        serviceType: "주방후드 교체",
        description:
          "주방후드, 렌지후드, 후황, " +
          "아일랜드후드, 침니후드 교체 상담",
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
        itemListElement: breadcrumbs.map(
          (item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
          })
        ),
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
          __html: JSON.stringify(
            structuredData
          ).replace(/</g, "\\u003c"),
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
              fontSize: "clamp(30px, 5vw, 46px)",
              fontWeight: 900,
              letterSpacing: "-1.5px",
              lineHeight: 1.35,
              margin: "0 0 20px",
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
            {location}
            <br />
            렌지후드 · 후황 · 주방후드
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
              fontWeight: 800,
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
          paddingTop: 45,
          paddingBottom: 65,
        }}
      >
        <nav
          aria-label="현재 위치"
          style={{
            color: "#777",
            fontSize: 13,
            lineHeight: 2,
            marginBottom: 35,
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

        <h2
          style={{
            fontSize: 27,
            margin: "0 0 20px",
            letterSpacing: "-1px",
          }}
        >
          {location} 후드 교체 안내
        </h2>

        <p
          style={{
            color: "#555",
            fontSize: 15,
            lineHeight: 2,
            margin: "0 0 30px",
          }}
        >
          {location}에서 주방후드 교체를
          알아보고 있다면 기존 후드의 종류와
          설치 규격을 먼저 확인하는 것이 좋습니다.
          주방후드는 조리 시 발생하는 냄새와
          수증기 등을 배출하는 설비로,
          제품 형태와 배기 연결 구조에 따라
          교체 방법이 달라집니다.
          후드의정석은 기존 제품의 모델명,
          설치 폭, 배기덕트 및 고정 구조를
          확인하는 교체 상담을 안내합니다.
        </p>

        {/* TYPES */}
        <h2
          style={{
            fontSize: 25,
            margin: "0 0 23px",
          }}
        >
          {name} 후드 교체 종류
        </h2>

        <div
          style={{
            ...grid,
            marginBottom: 55,
          }}
        >
          {hoodTypes.map((item) => (
            <article
              key={item.name}
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
                  margin: "0 0 13px",
                }}
              >
                {item.name}
              </h3>

              <p
                style={{
                  fontSize: 14,
                  color: "#666",
                  lineHeight: 1.9,
                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>

        {/* CHECKS */}
        <h2
          style={{
            fontSize: 25,
            margin: "0 0 23px",
          }}
        >
          후드 교체 전 확인사항
        </h2>

        <div
          style={{
            ...grid,
            marginBottom: 55,
          }}
        >
          {checkItems.map((item, index) => (
            <div
              key={item.title}
              style={{
                background: "#fff",
                border: "1px solid #e7e3dc",
                borderRadius: 12,
                padding: 24,
              }}
            >
              <p
                style={{
                  color: "#a78047",
                  fontWeight: 900,
                  fontSize: 13,
                  margin: "0 0 12px",
                }}
              >
                CHECK {index + 1}
              </p>

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
                  fontSize: 14,
                  color: "#666",
                  lineHeight: 1.9,
                  margin: 0,
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* PROCESS */}
        <h2
          style={{
            fontSize: 25,
            margin: "0 0 23px",
          }}
        >
          {name} 후드 교체 상담 절차
        </h2>

        <div
          style={{
            ...grid,
            marginBottom: 55,
          }}
        >
          {steps.map((step, index) => (
            <div
              key={step}
              style={{
                background: "#f0ece4",
                borderRadius: 12,
                padding: 24,
              }}
            >
              <p
                style={{
                  color: "#96713e",
                  fontWeight: 900,
                  fontSize: 13,
                  margin: "0 0 12px",
                }}
              >
                STEP {index + 1}
              </p>

              <h3
                style={{
                  fontSize: 16,
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                {step}
              </h3>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2
          style={{
            fontSize: 25,
            margin: "0 0 23px",
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
                  fontSize: 15,
                  fontWeight: 800,
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

        {/* NEARBY DISTRICTS */}
        <h2
          style={{
            fontSize: 24,
            margin: "0 0 20px",
          }}
        >
          {regionData.name} 다른 지역
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
            fontWeight: 800,
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
          padding: "30px 20px 100px",
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

      {/* FIXED PHONE */}
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
