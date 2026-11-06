
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getRegion, regions } from "../../../lib/regions";
import { SITE, services } from "../../../lib/services";

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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { region: regionSlug } = await params;
  const region = getRegion(regionSlug);

  if (!region) {
    return {
      title: "지역을 찾을 수 없습니다 | 후드의정석",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${region.name} 후드 교체 지역 안내 | 후드의정석`;

  const description =
    `${region.name} 주방후드 교체, 렌지후드 교체, ` +
    `아일랜드 후드교체, 침니 후드교체 상담. ` +
    `${region.name} 시·군·구별 지역 안내 및 ` +
    `후드 교체 문의 ${SITE.phone}.`;

  const url = `${SITE.url}/area/${region.slug}`;

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

export default async function RegionPage({
  params,
}: PageProps) {
  const { region: regionSlug } = await params;
  const region = getRegion(regionSlug);

  if (!region) {
    notFound();
  }

  const pageUrl = `${SITE.url}/area/${region.slug}`;

  const breadcrumbs = [
    {
      name: "홈",
      url: SITE.url,
    },
    {
      name: "전국 지역 안내",
      url: `${SITE.url}/area`,
    },
    {
      name: region.name,
      url: pageUrl,
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${region.name} 후드 교체 지역 안내`,
      url: pageUrl,
      description:
        `${region.name} 시·군·구별 주방후드, ` +
        "아일랜드후드, 침니후드 교체 상담 지역 안내",
      inLanguage: "ko-KR",
      isPartOf: {
        "@type": "WebSite",
        name: SITE.name,
        url: SITE.url,
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: region.districts.map(
          (district, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: district.name,
            url:
              `${pageUrl}/${district.slug}`,
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

  const sectionStyle = {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "55px 20px",
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

      {/* 상단 메뉴 */}
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

      {/* 지역 메인 */}
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
              fontSize: "clamp(29px, 5vw, 46px)",
              fontWeight: 900,
              lineHeight: 1.35,
              letterSpacing: "-1.5px",
              margin: "0 0 20px",
            }}
          >
            {region.name} 후드 교체
          </h1>

          <p
            style={{
              fontSize: 16,
              color: "#d0d0d0",
              lineHeight: 1.9,
              margin: 0,
            }}
          >
            주방후드 · 아일랜드후드 · 침니후드
            <br />
            {region.name} 지역별 교체 상담 안내
          </p>
        </div>
      </section>

      {/* 시군구 선택 */}
      <section style={sectionStyle}>
        <nav
          aria-label="현재 위치"
          style={{
            fontSize: 13,
            color: "#777",
            marginBottom: 30,
          }}
        >
          <Link
            href="/"
            style={{ color: "inherit" }}
          >
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
          {region.name}
        </nav>

        <div style={{ marginBottom: 30 }}>
          <h2
            style={{
              fontSize: 27,
              letterSpacing: "-1px",
              margin: "0 0 12px",
            }}
          >
            {region.name} 시·군·구 선택
          </h2>

          <p
            style={{
              color: "#666",
              lineHeight: 1.9,
              margin: 0,
            }}
          >
            {region.name}의{" "}
            {region.districts.length}개 지역을
            확인할 수 있습니다.
            <br />
            해당 지역을 선택하면 후드 종류별
            교체 안내 페이지로 이동합니다.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
            gap: 14,
          }}
        >
          {region.districts.map((district) => (
            <Link
              key={district.slug}
              href={
                `/area/${region.slug}/${district.slug}`
              }
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                background: "#fff",
                border: "1px solid #e6e2da",
                borderRadius: 12,
                padding: "23px 20px",
                color: "#171717",
                textDecoration: "none",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    marginBottom: 7,
                  }}
                >
                  {district.name}
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: "#777",
                  }}
                >
                  후드 교체 서비스 3종
                </div>
              </div>

              <span
                aria-hidden="true"
                style={{
                  color: "#a78047",
                  fontSize: 21,
                  fontWeight: 700,
                }}
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 서비스 소개 */}
      <section
        style={{
          background: "#fff",
          borderTop: "1px solid #eee",
          padding: "60px 20px",
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
              fontSize: 27,
              margin: "0 0 12px",
              letterSpacing: "-1px",
            }}
          >
            {region.name} 후드 교체 서비스
          </h2>

          <p
            style={{
              color: "#666",
              lineHeight: 1.9,
              margin: "0 0 28px",
            }}
          >
            후드 종류와 설치 구조에 따라
            교체 방법이 달라집니다.
            기존 제품 사진과 규격을 확인한 뒤
            상담을 진행할 수 있습니다.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 270px), 1fr))",
              gap: 16,
            }}
          >
            {services.map((service) => (
              <article
                key={service.slug}
                style={{
                  background: "#faf9f6",
                  border: "1px solid #eaeaea",
                  borderRadius: 12,
                  padding: 25,
                }}
              >
                <h3
                  style={{
                    fontSize: 19,
                    margin: "0 0 14px",
                  }}
                >
                  {service.name}
                </h3>

                <p
                  style={{
                    fontSize: 14,
                    color: "#666",
                    lineHeight: 1.9,
                    margin: "0 0 18px",
                  }}
                >
                  {service.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 7,
                  }}
                >
                  {service.types
                    .slice(0, 3)
                    .map((type) => (
                      <span
                        key={type}
                        style={{
                          background: "#fff",
                          border: "1px solid #e7e2da",
                          borderRadius: 6,
                          padding: "7px 9px",
                          color: "#666",
                          fontSize: 12,
                        }}
                      >
                        {type}
                      </span>
                    ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 다른 시도 이동 */}
      <section style={sectionStyle}>
        <h2
          style={{
            fontSize: 25,
            margin: "0 0 22px",
            letterSpacing: "-1px",
          }}
        >
          다른 지역 찾아보기
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 9,
          }}
        >
          {regions
            .filter(
              (item) =>
                item.slug !== region.slug
            )
            .map((item) => (
              <Link
                key={item.slug}
                href={`/area/${item.slug}`}
                style={{
                  background: "#fff",
                  border: "1px solid #e5e5e5",
                  padding: "10px 14px",
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

      {/* 전화상담 */}
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
          {region.name} 후드 교체 상담
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
          기존 제품 사진과 설치 지역을
          알려주시면 상담에 도움이 됩니다.
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

      {/* 하단 */}
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
        <div>
          전국 주방후드 교체 상담
        </div>
        <div>{SITE.phone}</div>
        <div>
          © {new Date().getFullYear()} 후드의정석
        </div>
      </footer>

      {/* 모바일 전화 버튼 */}
      <a
        href={SITE.phoneHref}
        aria-label={`${region.name} 후드 교체 전화상담`}
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
