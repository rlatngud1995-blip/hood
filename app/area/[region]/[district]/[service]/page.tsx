
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getAllDistricts,
  getDistrict,
  getRegion,
} from "../../../../../lib/regions";

import {
  SITE,
  services,
  getService,
  getServicePageUrl,
} from "../../../../../lib/services";

type PageProps = {
  params: Promise<{
    region: string;
    district: string;
    service: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllDistricts().flatMap((district) =>
    services.map((service) => ({
      region: district.regionSlug,
      district: district.districtSlug,
      service: service.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {
    region: regionSlug,
    district: districtSlug,
    service: serviceSlug,
  } = await params;

  const region = getRegion(regionSlug);
  const district = getDistrict(regionSlug, districtSlug);
  const service = getService(serviceSlug);

  if (!region || !district || !service) {
    return {
      title: "페이지를 찾을 수 없습니다 | 후드의정석",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const location = `${region.name} ${district.name}`;
  const title =
    `${district.name} ${service.name} | 후드의정석`;

  const description =
    `${location} ${service.name} 상담. ` +
    `${service.description} ` +
    `제품 규격과 설치 환경 확인 및 교체 문의 ` +
    `${SITE.phone}.`;

  const url = getServicePageUrl(
    regionSlug,
    districtSlug,
    serviceSlug
  );

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
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: PageProps) {
  const {
    region: regionSlug,
    district: districtSlug,
    service: serviceSlug,
  } = await params;

  const region = getRegion(regionSlug);
  const district = getDistrict(regionSlug, districtSlug);
  const service = getService(serviceSlug);

  if (!region || !district || !service) {
    notFound();
  }

  const location = `${region.name} ${district.name}`;
  const pageUrl = getServicePageUrl(
    regionSlug,
    districtSlug,
    serviceSlug
  );

  const districtUrl =
    `${SITE.url}/area/${regionSlug}/${districtSlug}`;

  const breadcrumbs = [
    {
      name: "홈",
      url: SITE.url,
    },
    {
      name: "전국 지역",
      url: `${SITE.url}/area`,
    },
    {
      name: region.name,
      url: `${SITE.url}/area/${regionSlug}`,
    },
    {
      name: district.name,
      url: districtUrl,
    },
    {
      name: service.name,
      url: pageUrl,
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${district.name} ${service.name}`,
        description: service.description,
        inLanguage: "ko-KR",
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
        name: `${service.name} 상담`,
        serviceType: service.name,
        description: service.description,
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

  const relatedServices = services.filter(
    (item) => item.slug !== service.slug
  );

  const commonBox = {
    background: "#fff",
    border: "1px solid #e8e5df",
    borderRadius: 12,
    padding: 23,
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

      {/* 상단 */}
      <header
        style={{
          background: "#fff",
          borderBottom: "1px solid #eaeaea",
          padding: "18px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "#171717",
              textDecoration: "none",
              letterSpacing: "-1px",
            }}
          >
            후드의정석
          </Link>

          <a
            href={SITE.phoneHref}
            style={{
              padding: "11px 17px",
              borderRadius: 8,
              background: "#171717",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            전화상담 {SITE.phone}
          </a>
        </div>
      </header>

      {/* 메인 */}
      <section
        style={{
          background: "#171717",
          color: "#fff",
          padding: "75px 20px",
          textAlign: "center",
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
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "2px",
              marginBottom: 15,
            }}
          >
            HOOD MASTER · HOOD REPLACEMENT
          </p>

          <h1
            style={{
              fontSize: "clamp(29px, 5vw, 45px)",
              fontWeight: 900,
              lineHeight: 1.4,
              letterSpacing: "-1.5px",
              margin: "0 0 20px",
            }}
          >
            {district.name}
            <br />
            {service.name}
          </h1>

          <p
            style={{
              fontSize: 16,
              color: "#d0d0d0",
              lineHeight: 1.9,
              margin: "0 0 27px",
            }}
          >
            {location}
            <br />
            기존 제품 규격부터 설치 환경까지
            확인하는 후드 교체 상담
          </p>

          <a
            href={SITE.phoneHref}
            style={{
              display: "inline-block",
              background: "#a78047",
              color: "#fff",
              borderRadius: 9,
              padding: "15px 25px",
              fontWeight: 800,
              textDecoration: "none",
            }}
          >
            전화상담 {SITE.phone}
          </a>
        </div>
      </section>

      {/* 본문 */}
      <section
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "45px 20px 65px",
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
            href={`/area/${regionSlug}`}
            style={{ color: "inherit" }}
          >
            {region.name}
          </Link>
          {" / "}
          <Link
            href={`/area/${regionSlug}/${districtSlug}`}
            style={{ color: "inherit" }}
          >
            {district.name}
          </Link>
          {" / "}
          {service.name}
        </nav>

        <h2
          style={{
            fontSize: 27,
            margin: "0 0 17px",
            letterSpacing: "-1px",
          }}
        >
          {location} {service.name} 안내
        </h2>

        <p
          style={{
            fontSize: 16,
            color: "#555",
            lineHeight: 2,
            margin: "0 0 35px",
          }}
        >
          {service.description}
          {" "}
          {district.name}에서 후드 교체를
          알아보고 있다면 기존 제품의 모델명,
          설치 폭, 배기덕트 연결 상태를 먼저
          확인하는 것이 좋습니다.
          제품과 설치 환경에 따라
          교체 가능 여부 및 추가 작업 범위가
          달라질 수 있습니다.
        </p>

        {/* 교체 가능한 제품 형태 */}
        <h2
          style={{
            fontSize: 25,
            margin: "0 0 22px",
          }}
        >
          교체 상담 가능한 후드 종류
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
            gap: 13,
            marginBottom: 55,
          }}
        >
          {service.types.map((type) => (
            <div
              key={type}
              style={commonBox}
            >
              <h3
                style={{
                  fontSize: 17,
                  margin: "0 0 10px",
                }}
              >
                {type}
              </h3>

              <p
                style={{
                  fontSize: 13,
                  color: "#666",
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                기존 제품의 크기와
                설치 구조를 확인한 후
                교체 가능 여부를 안내합니다.
              </p>
            </div>
          ))}
        </div>

        {/* 점검 항목 */}
        <h2
          style={{
            fontSize: 25,
            margin: "0 0 22px",
          }}
        >
          {service.name} 전 확인사항
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 290px), 1fr))",
            gap: 13,
            marginBottom: 55,
          }}
        >
          {service.features.map(
            (feature, index) => (
              <div
                key={feature}
                style={{
                  ...commonBox,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 13,
                }}
              >
                <span
                  style={{
                    color: "#a78047",
                    fontWeight: 900,
                    fontSize: 15,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p
                  style={{
                    color: "#444",
                    fontSize: 14,
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  {feature}
                </p>
              </div>
            )
          )}
        </div>

        {/* 진행 절차 */}
        <h2
          style={{
            fontSize: 25,
            margin: "0 0 22px",
          }}
        >
          후드 교체 상담 및 진행 절차
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 190px), 1fr))",
            gap: 12,
            marginBottom: 55,
          }}
        >
          {service.process.map(
            (step, index) => (
              <div
                key={step}
                style={{
                  ...commonBox,
                  background: "#f3f0e9",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: "#96713e",
                    fontWeight: 800,
                    marginBottom: 12,
                  }}
                >
                  STEP {index + 1}
                </div>

                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  {step}
                </p>
              </div>
            )
          )}
        </div>

        {/* 상담 준비 */}
        <div
          style={{
            background: "#171717",
            color: "#fff",
            borderRadius: 15,
            padding: "35px 25px",
            marginBottom: 55,
          }}
        >
          <h2
            style={{
              fontSize: 24,
              margin: "0 0 16px",
            }}
          >
            상담 전 준비하면 좋은 정보
          </h2>

          <p
            style={{
              color: "#d1d1d1",
              lineHeight: 2,
              margin: "0 0 20px",
            }}
          >
            기존 후드 전체 사진, 제품 라벨,
            설치 공간 크기, 배기 연결 상태,
            설치 지역을 알려주시면
            교체 방법을 상담하는 데 도움이 됩니다.
          </p>

          <a
            href={SITE.phoneHref}
            style={{
              display: "inline-block",
              background: "#a78047",
              color: "#fff",
              borderRadius: 8,
              padding: "13px 22px",
              fontWeight: 800,
              textDecoration: "none",
            }}
          >
            {SITE.phone} 전화상담
          </a>
        </div>

        {/* FAQ */}
        <h2
          style={{
            fontSize: 25,
            margin: "0 0 22px",
          }}
        >
          {district.name} {service.name} FAQ
        </h2>

        <div
          style={{
            display: "grid",
            gap: 12,
            marginBottom: 55,
          }}
        >
          {service.faqs.map((faq, index) => (
            <details
              key={index}
              style={{
                background: "#fff",
                border: "1px solid #e8e5df",
                borderRadius: 10,
                padding: "19px 21px",
              }}
            >
              <summary
                style={{
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: "pointer",
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

        {/* 다른 후드 서비스 */}
        <h2
          style={{
            fontSize: 25,
            margin: "0 0 20px",
          }}
        >
          {district.name} 다른 후드 교체 서비스
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
            gap: 13,
            marginBottom: 45,
          }}
        >
          {relatedServices.map((item) => (
            <Link
              key={item.slug}
              href={
                `/area/${regionSlug}/${districtSlug}/${item.slug}`
              }
              style={{
                ...commonBox,
                display: "block",
                textDecoration: "none",
                color: "#171717",
              }}
            >
              <h3
                style={{
                  fontSize: 18,
                  margin: "0 0 10px",
                }}
              >
                {district.name} {item.name}
              </h3>

              <p
                style={{
                  color: "#666",
                  fontSize: 13,
                  lineHeight: 1.8,
                  margin: "0 0 15px",
                }}
              >
                {item.description}
              </p>

              <span
                style={{
                  color: "#96713e",
                  fontSize: 13,
                  fontWeight: 800,
                }}
              >
                상세 안내 보기 →
              </span>
            </Link>
          ))}
        </div>

        <Link
          href={`/area/${regionSlug}/${districtSlug}`}
          style={{
            color: "#96713e",
            fontSize: 14,
            fontWeight: 800,
          }}
        >
          ← {district.name} 전체 서비스 보기
        </Link>
      </section>

      {/* 상담 */}
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
          {district.name} {service.name} 상담
        </h2>

        <p
          style={{
            color: "#555",
            lineHeight: 1.9,
            margin: "0 0 25px",
          }}
        >
          기존 제품과 설치 환경을 확인한 뒤
          교체 방법 및 비용을 상담할 수 있습니다.
        </p>

        <a
          href={SITE.phoneHref}
          style={{
            display: "inline-block",
            padding: "17px 30px",
            background: "#171717",
            color: "#fff",
            borderRadius: 9,
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          전화상담 {SITE.phone}
        </a>
      </section>

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

      {/* 모바일 전화 버튼 */}
      <a
        href={SITE.phoneHref}
        aria-label={`${district.name} ${service.name} 전화상담`}
        style={{
          position: "fixed",
          left: 16,
          right: 16,
          bottom: 14,
          zIndex: 50,
          padding: "17px 20px",
          textAlign: "center",
          background: "#a78047",
          color: "#fff",
          borderRadius: 12,
          fontSize: 16,
          fontWeight: 900,
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
