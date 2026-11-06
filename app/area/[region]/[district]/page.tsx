
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getAllDistricts,
  getRegion,
  getDistrict,
} from "../../../../lib/regions";

import {
  SITE,
  services,
} from "../../../../lib/services";

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
  const { region: regionSlug, district: districtSlug } =
    await params;

  const region = getRegion(regionSlug);
  const district = getDistrict(
    regionSlug,
    districtSlug
  );

  if (!region || !district) {
    return {
      title: "지역을 찾을 수 없습니다 | 후드의정석",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const locationName =
    `${region.name} ${district.name}`;

  const title =
    `${district.name} 후드 교체·렌지후드 교체 | 후드의정석`;

  const description =
    `${locationName} 주방후드 교체 상담. ` +
    `렌지후드, 후황, 빌트인후드, ` +
    `아일랜드후드, 침니후드 교체 방법과 ` +
    `제품 규격 확인 안내. 전화 ${SITE.phone}.`;

  const url =
    `${SITE.url}/area/${region.slug}/${district.slug}`;

  return {
    title,
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

export default async function DistrictPage({
  params,
}: PageProps) {
  const { region: regionSlug, district: districtSlug } =
    await params;

  const region = getRegion(regionSlug);
  const district = getDistrict(
    regionSlug,
    districtSlug
  );

  if (!region || !district) {
    notFound();
  }

  const locationName =
    `${region.name} ${district.name}`;

  const pageUrl =
    `${SITE.url}/area/${region.slug}/${district.slug}`;

  const breadcrumbs = [
    { name: "홈", url: SITE.url },
    {
      name: "전국 지역",
      url: `${SITE.url}/area`,
    },
    {
      name: region.name,
      url: `${SITE.url}/area/${region.slug}`,
    },
    {
      name: district.name,
      url: pageUrl,
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${locationName} 후드 교체 안내`,
      url: pageUrl,
      description:
        `${locationName} 주방후드, 아일랜드후드, ` +
        "침니후드 교체 서비스 선택 안내",
      inLanguage: "ko-KR",
      isPartOf: {
        "@type": "WebSite",
        name: SITE.name,
        url: SITE.url,
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: services.map(
          (service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: `${district.name} ${service.name}`,
            url:
              `${pageUrl}/${service.slug}`,
          })
        ),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map(
        (item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })
      ),
    },
  ];

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
          padding: "70px 20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: 850,
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
            HOOD MASTER · LOCAL SERVICE
          </p>

          <h1
            style={{
              fontSize: "clamp(29px, 5vw, 44px)",
              fontWeight: 900,
              lineHeight: 1.4,
              letterSpacing: "-1.5px",
              margin: "0 0 20px",
            }}
          >
            {district.name} 후드 교체
          </h1>

          <p
            style={{
              fontSize: 16,
              color: "#d0d0d0",
              lineHeight: 1.9,
              margin: 0,
            }}
          >
            {locationName}
            <br />
            주방후드 · 아일랜드후드 · 침니후드
            교체 상담
          </p>
        </div>
      </section>

      {/* 서비스 선택 */}
      <section
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "55px 20px 70px",
        }}
      >
        <nav
          aria-label="현재 위치"
          style={{
            fontSize: 13,
            color: "#777",
            marginBottom: 30,
            lineHeight: 1.8,
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
            href={`/area/${region.slug}`}
            style={{ color: "inherit" }}
          >
            {region.name}
          </Link>
          {" / "}
          {district.name}
        </nav>

        <h2
          style={{
            fontSize: 27,
            letterSpacing: "-1px",
            margin: "0 0 12px",
          }}
        >
          {district.name} 후드 교체 종류 선택
        </h2>

        <p
          style={{
            color: "#666",
            lineHeight: 1.9,
            margin: "0 0 30px",
          }}
        >
          기존 주방후드의 형태에 맞는
          교체 서비스를 선택하세요.
          <br />
          제품 규격과 설치 구조에 따라
          작업 방법 및 비용이 달라질 수 있습니다.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 290px), 1fr))",
            gap: 18,
          }}
        >
          {services.map((service, index) => (
            <Link
              key={service.slug}
              href={
                `/area/${region.slug}/${district.slug}/${service.slug}`
              }
              style={{
                display: "block",
                background: "#fff",
                border: "1px solid #e6e2da",
                borderRadius: 14,
                padding: 27,
                color: "#171717",
                textDecoration: "none",
                boxShadow:
                  "0 4px 15px rgba(0,0,0,0.025)",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: "#a78047",
                  fontWeight: 800,
                  marginBottom: 15,
                }}
              >
                SERVICE 0{index + 1}
              </div>

              <h3
                style={{
                  fontSize: 22,
                  margin: "0 0 15px",
                  letterSpacing: "-0.7px",
                }}
              >
                {district.name} {service.name}
              </h3>

              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: "#666",
                  margin: "0 0 22px",
                }}
              >
                {service.description}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 7,
                  marginBottom: 24,
                }}
              >
                {service.types
                  .slice(0, 4)
                  .map((type) => (
                    <span
                      key={type}
                      style={{
                        background: "#faf9f6",
                        border: "1px solid #eee",
                        padding: "7px 9px",
                        borderRadius: 6,
                        fontSize: 12,
                        color: "#666",
                      }}
                    >
                      {type}
                    </span>
                  ))}
              </div>

              <div
                style={{
                  borderTop: "1px solid #eee",
                  paddingTop: 17,
                  fontSize: 14,
                  color: "#96713e",
                  fontWeight: 800,
                }}
              >
                상세 안내 보기 →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 상담 준비 안내 */}
      <section
        style={{
          background: "#fff",
          padding: "60px 20px",
          borderTop: "1px solid #eee",
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: 26,
              margin: "0 0 25px",
              letterSpacing: "-1px",
            }}
          >
            후드 교체 상담 전 확인사항
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gap: 14,
            }}
          >
            {[
              {
                title: "기존 후드 사진",
                text: "후드 전체와 설치 공간을 확인할 수 있는 사진",
              },
              {
                title: "제품 규격",
                text: "기존 후드의 가로 폭과 모델명 또는 제품 라벨",
              },
              {
                title: "배기 연결 상태",
                text: "확인 가능한 경우 상부 덕트 및 연결 부분",
              },
              {
                title: "설치 지역",
                text: `${locationName} 내 설치 위치와 희망 일정`,
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  padding: 23,
                  background: "#faf9f6",
                  border: "1px solid #eee",
                  borderRadius: 11,
                }}
              >
                <h3
                  style={{
                    fontSize: 17,
                    margin: "0 0 12px",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "#666",
                    lineHeight: 1.8,
                    fontSize: 14,
                    margin: 0,
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 지역 이동 */}
      <section
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "55px 20px",
        }}
      >
        <h2
          style={{
            fontSize: 24,
            margin: "0 0 20px",
          }}
        >
          {region.name} 다른 지역 보기
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 9,
          }}
        >
          {region.districts
            .filter(
              (item) =>
                item.slug !== district.slug
            )
            .map((item) => (
              <Link
                key={item.slug}
                href={
                  `/area/${region.slug}/${item.slug}`
                }
                style={{
                  background: "#fff",
                  border: "1px solid #e5e5e5",
                  padding: "10px 13px",
                  borderRadius: 7,
                  textDecoration: "none",
                  color: "#555",
                  fontSize: 13,
                }}
              >
                {item.name}
              </Link>
            ))}
        </div>
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
          {district.name} 후드 교체 상담
        </h2>

        <p
          style={{
            color: "#555",
            lineHeight: 1.9,
            margin: "0 0 25px",
          }}
        >
          주방후드, 아일랜드후드,
          침니후드 교체 문의
          <br />
          기존 제품 사진과 설치 정보를
          준비하면 상담에 도움이 됩니다.
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

      {/* 하단 전화 버튼 */}
      <a
        href={SITE.phoneHref}
        aria-label={`${district.name} 후드 교체 전화상담`}
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
