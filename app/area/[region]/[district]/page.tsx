
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

const hoodTypes = [
  {
    title: "주방후드 · 렌지후드 교체",
    description:
      "일반 주방후드와 렌지후드의 기존 규격, 가로 폭, 상부장 구조 및 배기 연결 상태를 확인합니다.",
  },
  {
    title: "후황 · 슬림후드 교체",
    description:
      "후황과 슬림형 후드는 상부장 내부 설치 공간, 제품 폭과 배기구 위치를 확인해야 합니다.",
  },
  {
    title: "빌트인후드 · 통후드 교체",
    description:
      "가구 내부에 설치되는 제품으로 기존 후드의 깊이와 폭, 고정 방식 및 내부 공간을 확인합니다.",
  },
  {
    title: "허리케인후드 교체",
    description:
      "기존 허리케인후드 모델명과 규격, 설치 형태를 확인하여 호환 가능한 제품을 검토합니다.",
  },
  {
    title: "아일랜드후드 교체",
    description:
      "천장 고정 구조와 설치 높이, 전원 및 배기덕트 연결 상태를 확인해야 합니다.",
  },
  {
    title: "침니후드 · 데코후드 교체",
    description:
      "벽면 고정 상태, 설치 높이, 배기구 위치와 마감 구조를 확인합니다.",
  },
];

const housingTypes = [
  {
    title: "아파트",
    description:
      "기존 상부장과 후드 규격을 확인하고 주방가구 변경 없이 교체할 수 있는지 검토합니다.",
  },
  {
    title: "빌라",
    description:
      "주방가구 내부 공간과 배기 연결 상태를 확인하고 기존 후드 철거 범위를 검토합니다.",
  },
  {
    title: "단독주택",
    description:
      "벽면 또는 천장 배기 구조와 전원 위치, 기존 후드 고정 상태를 확인합니다.",
  },
];

const checks = [
  {
    title: "모델명 확인",
    description:
      "기존 제품 하단 또는 필터 내부의 모델명 라벨을 확인해 주세요.",
  },
  {
    title: "제품 크기 측정",
    description:
      "후드의 가로 폭과 설치 공간을 측정해 주세요. 제품 자체 크기와 설치 공간은 구분해야 합니다.",
  },
  {
    title: "배기구 확인",
    description:
      "배기덕트 위치와 연결 상태를 확인하면 추가 작업 여부를 검토하는 데 도움이 됩니다.",
  },
  {
    title: "설치 사진 준비",
    description:
      "후드 전체 모습, 상부장 또는 벽면, 모델명 라벨 사진을 준비해 주세요.",
  },
];

const process = [
  {
    title: "사진 및 설치 지역 확인",
    description:
      "기존 후드 사진과 정확한 설치 지역을 확인합니다.",
  },
  {
    title: "모델명·규격 확인",
    description:
      "기존 후드의 종류와 제품 폭, 설치 조건을 검토합니다.",
  },
  {
    title: "교체 조건 상담",
    description:
      "제품 호환성과 배기 연결, 추가 마감 작업 필요 여부를 상담합니다.",
  },
  {
    title: "일정 및 작업 범위 안내",
    description:
      "작업 가능 여부와 일정, 예상 작업 범위를 안내합니다.",
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
    "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
  gap: 15,
};

const sectionTitle = {
  fontSize: 26,
  lineHeight: 1.45,
  letterSpacing: "-0.8px",
  margin: "0 0 20px",
};

const bodyText = {
  fontSize: 15,
  lineHeight: 1.95,
  color: "#555",
};

function getFaqs(name: string) {
  return [
    {
      question: `${name}에서 오래된 주방후드 교체 상담이 가능한가요?`,
      answer:
        "기존 제품의 모델명과 설치 구조를 확인하여 교체 가능 여부를 상담할 수 있습니다. 오래된 제품은 동일 모델이 단종되었을 수 있어 규격이 맞는 대체 제품을 검토해야 합니다.",
    },
    {
      question: "다른 브랜드 후드로 교체할 수 있나요?",
      answer:
        "기존 제품과 새 제품의 크기, 고정 방식, 배기 연결 규격이 맞는지 확인해야 합니다. 브랜드가 다르더라도 설치 조건이 맞으면 검토할 수 있습니다.",
    },
    {
      question: "후드 교체 시 상부장도 철거해야 하나요?",
      answer:
        "기존 후드와 교체 제품의 규격 및 설치 방식에 따라 달라집니다. 일부 제품은 상부장 가공이나 별도 마감이 필요할 수 있습니다.",
    },
    {
      question: "아일랜드후드와 침니후드도 교체할 수 있나요?",
      answer:
        "아일랜드후드와 침니후드도 상담할 수 있습니다. 천장 또는 벽면 고정 상태와 배기 연결 구조를 먼저 확인해야 합니다.",
    },
    {
      question: `${name} 후드 교체 비용은 어떻게 확인하나요?`,
      answer:
        "제품 종류, 기존 후드 철거 난이도, 배기덕트 연결, 설치 구조 및 추가 작업 여부에 따라 달라집니다. 사진과 모델명을 확인한 후 상담을 진행합니다.",
    },
    {
      question: "상담 전에 어떤 정보를 준비해야 하나요?",
      answer:
        "설치 지역, 기존 후드 전체 사진, 모델명, 제품 가로 폭을 알려주시면 좋습니다. 배기구와 설치 공간 사진도 도움이 됩니다.",
    },
  ];
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

  const location =
    `${regionData.name} ${districtData.name}`;

  const canonical =
    `${SITE.url}/area/${region}/${district}`;

  const title =
    `${location} 후드 교체 | 주방후드·렌지후드·후황 교체`;

  const description =
    `${location} 주방후드, 렌지후드, 후황, ` +
    `빌트인후드, 아일랜드후드, 침니후드 교체 상담. ` +
    `기존 제품 규격과 설치 조건 확인. ${SITE.phone}`;

  return {
    title: { absolute: title },
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
          alt: "주방후드 교체 참고 사진",
        },
      ],
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

  const faqs = getFaqs(name);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${location} 후드 교체`,
        description:
          `${location} 주방후드 교체 및 설치 조건 안내`,
        inLanguage: "ko-KR",
        breadcrumb: {
          "@id": `${pageUrl}#breadcrumb`,
        },
        primaryImageOfPage: {
          "@id": `${pageUrl}#image`,
        },
        mainEntity: {
          "@id": `${pageUrl}#service`,
        },
      },
      {
        "@type": "ImageObject",
        "@id": `${pageUrl}#image`,
        contentUrl: `${SITE.url}${CASE_IMAGE}`,
        caption: "주방후드 교체 공통 참고 사례",
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: `${location} 주방후드 교체 상담`,
        serviceType: "주방후드 교체",
        description:
          "주방후드, 렌지후드, 후황, 빌트인후드, " +
          "아일랜드후드 및 침니후드 교체 상담",
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
          "'Pretendard','Noto Sans KR',Arial,sans-serif",
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
          borderBottom: "1px solid #e9e5de",
          padding: "17px 20px",
        }}
      >
        <div
          style={{
            ...container,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 14,
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
          background:
            "linear-gradient(145deg,#121212,#211e1a)",
          color: "#fff",
          textAlign: "center",
          padding: "78px 20px",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
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
              fontSize: "clamp(32px,6vw,48px)",
              fontWeight: 900,
              lineHeight: 1.3,
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
            {regionData.name} {name}
            <br />
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
            }}
          >
            후드 교체 전화상담
          </a>
        </div>
      </section>

      <div style={{ ...container, paddingTop: 40 }}>
        {/* BREADCRUMB */}
        <nav
          aria-label="현재 위치"
          style={{
            color: "#797979",
            fontSize: 13,
            marginBottom: 35,
          }}
        >
          <Link href="/">홈</Link>
          {" / "}
          <Link href="/area">전국 지역</Link>
          {" / "}
          <Link href={`/area/${region}`}>
            {regionData.name}
          </Link>
          {" / "}
          {name}
        </nav>

        {/* INTRO */}
        <section style={{ marginBottom: 55 }}>
          <h2 style={sectionTitle}>
            {location} 주방후드·렌지후드 교체
          </h2>

          <p style={bodyText}>
            {location}에서 주방후드 교체를 알아보고
            계신다면 기존 후드의 종류와 설치 구조를
            먼저 확인하는 것이 좋습니다. 제품 폭,
            주방가구 내부 공간, 배기덕트 위치와
            고정 방식에 따라 교체 가능한 제품이
            달라질 수 있습니다.
          </p>

          <p style={bodyText}>
            후드의정석에서는 일반 주방후드,
            렌지후드, 후황, 슬림후드, 빌트인후드,
            통후드, 허리케인후드, 아일랜드후드,
            침니후드 등의 교체를 상담합니다.
            실제 작업 가능 여부는 설치 조건과
            지역별 일정에 따라 확인합니다.
          </p>

          <p style={bodyText}>
            {name}의 아파트, 빌라, 단독주택 등
            주거공간에서 후드를 교체할 때에는
            건물 유형보다 실제 설치된 제품과
            주방 구조를 기준으로 판단하는 것이
            중요합니다.
          </p>
        </section>

        {/* CASE IMAGE */}
        <figure
          style={{
            background: "#fff",
            border: "1px solid #e7e3dc",
            borderRadius: 14,
            overflow: "hidden",
            margin: "0 0 55px",
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
              alt="후드의정석 주방후드 교체 공통 참고 사진"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1000px"
              style={{ objectFit: "contain" }}
            />
          </div>

          <figcaption style={{ padding: "25px 24px" }}>
            <p
              style={{
                color: "#a78047",
                fontWeight: 900,
                fontSize: 11,
                letterSpacing: "1.5px",
              }}
            >
              HOOD REPLACEMENT REFERENCE
            </p>

            <h2 style={{ fontSize: 23 }}>
              주방후드 교체 참고 사례
            </h2>

            <p style={bodyText}>
              기존 주방후드 철거 및 새 제품 교체
              과정을 살펴볼 수 있는 공통 참고
              이미지입니다. 이 사진은 {name}에서
              진행한 시공 사례라는 의미가 아닙니다.
              실제 교체 방법은 현장 구조에 따라
              달라질 수 있습니다.
            </p>
          </figcaption>
        </figure>

        {/* HOUSING */}
        <section style={{ marginBottom: 55 }}>
          <h2 style={sectionTitle}>
            {name} 아파트·빌라·주택 후드 교체
          </h2>

          <p style={bodyText}>
            주거 형태에 따라 주방가구와 배기 구조가
            다를 수 있으므로 기존 설치 상태를
            기준으로 확인해야 합니다.
          </p>

          <div style={grid}>
            {housingTypes.map((item) => (
              <article
                key={item.title}
                style={{
                  background: "#fff",
                  border: "1px solid #e7e3dc",
                  borderRadius: 12,
                  padding: 23,
                }}
              >
                <h3 style={{ fontSize: 18 }}>
                  {name} {item.title} 후드 교체
                </h3>
                <p style={bodyText}>
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* HOOD TYPES */}
        <section style={{ marginBottom: 55 }}>
          <h2 style={sectionTitle}>
            {name} 후드 교체 상담 유형
          </h2>

          <div style={grid}>
            {hoodTypes.map((item) => (
              <article
                key={item.title}
                style={{
                  background: "#fff",
                  border: "1px solid #e7e3dc",
                  borderRadius: 12,
                  padding: 23,
                }}
              >
                <h3 style={{ fontSize: 18 }}>
                  {item.title}
                </h3>
                <p style={bodyText}>
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* CHECKS */}
        <section style={{ marginBottom: 55 }}>
          <h2 style={sectionTitle}>
            {name} 후드 교체 전 확인사항
          </h2>

          <div style={grid}>
            {checks.map((item, index) => (
              <article
                key={item.title}
                style={{
                  background: "#f1ece3",
                  borderRadius: 12,
                  padding: 23,
                }}
              >
                <p
                  style={{
                    color: "#96713e",
                    fontSize: 12,
                    fontWeight: 900,
                  }}
                >
                  CHECK {String(index + 1).padStart(2, "0")}
                </p>
                <h3 style={{ fontSize: 18 }}>
                  {item.title}
                </h3>
                <p style={bodyText}>
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section style={{ marginBottom: 55 }}>
          <h2 style={sectionTitle}>
            {name} 후드 교체 상담 절차
          </h2>

          <div style={grid}>
            {process.map((item, index) => (
              <article
                key={item.title}
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
                  }}
                >
                  STEP {String(index + 1).padStart(2, "0")}
                </p>
                <h3 style={{ fontSize: 17 }}>
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "#ccc",
                    fontSize: 13,
                    lineHeight: 1.8,
                  }}
                >
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 55 }}>
          <h2 style={sectionTitle}>
            {name} 후드 교체 자주 묻는 질문
          </h2>

          <div style={{ display: "grid", gap: 12 }}>
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
                <p style={bodyText}>
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* INTERNAL LINKS */}
        <section style={{ marginBottom: 65 }}>
          <h2 style={sectionTitle}>
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

          <div style={{ marginTop: 28 }}>
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
      </div>

      {/* CONTACT */}
      <section
        style={{
          background: "#f0ece4",
          textAlign: "center",
          padding: "65px 20px",
        }}
      >
        <h2 style={{ fontSize: 28 }}>
          {name} 후드 교체 상담
        </h2>

        <p style={bodyText}>
          기존 후드 사진과 모델명,
          설치 지역을 알려주시면
          상담에 도움이 됩니다.
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

      {/* MOBILE CALL */}
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
