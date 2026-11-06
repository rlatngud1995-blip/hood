
import type { Metadata } from "next";
import Link from "next/link";
import { regions } from "../../lib/regions";
import { SITE, services } from "../../lib/services";

export const metadata: Metadata = {
  title: "전국 후드 교체 지역 안내 | 후드의정석",
  description:
    "서울, 경기, 인천, 부산, 대구, 대전, 광주, 울산, 세종, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주 주방후드 교체 지역 안내. 아일랜드후드, 침니후드 교체 상담.",
  alternates: {
    canonical: `${SITE.url}/area`,
  },
  openGraph: {
    title: "전국 후드 교체 지역 안내 | 후드의정석",
    description:
      "전국 시·군·구별 주방후드, 아일랜드후드, 침니후드 교체 상담 지역을 확인하세요.",
    url: `${SITE.url}/area`,
    siteName: SITE.name,
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const regionDescriptions: Record<string, string> = {
  seoul: "서울 전 지역 주방후드 교체 상담",
  gyeonggi: "경기도 시·군·구별 후드 교체 안내",
  incheon: "인천 구·군별 주방후드 교체 상담",
  busan: "부산 전 지역 후드 교체 안내",
  daegu: "대구 구·군별 후드 교체 안내",
  daejeon: "대전 전 지역 후드 교체 상담",
  gwangju: "광주 전 지역 주방후드 교체 안내",
  ulsan: "울산 구·군별 후드 교체 상담",
  sejong: "세종시 주방후드 교체 상담",
  gangwon: "강원 시·군별 후드 교체 안내",
  chungbuk: "충북 시·군·구별 후드 교체 안내",
  chungnam: "충남 시·군·구별 후드 교체 안내",
  jeonbuk: "전북 시·군·구별 후드 교체 안내",
  jeonnam: "전남 시·군별 후드 교체 안내",
  gyeongbuk: "경북 시·군·구별 후드 교체 안내",
  gyeongnam: "경남 시·군·구별 후드 교체 안내",
  jeju: "제주 전 지역 주방후드 교체 안내",
};

export default function AreaPage() {
  const regionCount = regions.length;
  const districtCount = regions.reduce(
    (total, region) => total + region.districts.length,
    0
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "전국 후드 교체 지역 안내",
    description:
      "전국 시·군·구별 주방후드, 아일랜드후드, 침니후드 교체 지역 안내",
    url: `${SITE.url}/area`,
    inLanguage: "ko-KR",
    isPartOf: {
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: regions.map((region, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: region.name,
        url: `${SITE.url}/area/${region.slug}`,
      })),
    },
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
          __html: JSON.stringify(structuredData).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

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

      <section
        style={{
          background: "#171717",
          color: "#fff",
          padding: "70px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 850, margin: "0 auto" }}>
          <p
            style={{
              color: "#d7b67a",
              fontWeight: 700,
              letterSpacing: "2px",
              fontSize: 13,
              marginBottom: 15,
            }}
          >
            HOOD MASTER · SERVICE AREA
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
            전국 후드 교체 지역 안내
          </h1>

          <p
            style={{
              fontSize: 16,
              color: "#d0d0d0",
              lineHeight: 1.9,
              margin: 0,
            }}
          >
            주방후드 교체부터 아일랜드후드,
            침니후드 교체까지.
            <br />
            지역을 선택하고 교체 상담 정보를 확인하세요.
          </p>
        </div>
      </section>

      <section
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "55px 20px 75px",
        }}
      >
        <nav
          aria-label="현재 위치"
          style={{
            fontSize: 13,
            color: "#777",
            marginBottom: 30,
          }}
        >
          <Link href="/" style={{ color: "inherit" }}>
            홈
          </Link>
          {" / 전국 지역 안내"}
        </nav>

        <div style={{ marginBottom: 28 }}>
          <h2
            style={{
              fontSize: 27,
              letterSpacing: "-1px",
              margin: "0 0 10px",
            }}
          >
            시·도 선택
          </h2>
          <p
            style={{
              color: "#666",
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            전국 {regionCount}개 시·도, {districtCount}개
            지역 단위로 후드 교체 정보를 제공합니다.
            원하는 지역을 선택하세요.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
            gap: 16,
          }}
        >
          {regions.map((region) => (
            <Link
              key={region.slug}
              href={`/area/${region.slug}`}
              style={{
                display: "block",
                padding: "27px 23px",
                background: "#fff",
                border: "1px solid #e6e2da",
                borderRadius: 13,
                color: "#171717",
                textDecoration: "none",
                boxShadow: "0 3px 12px rgba(0,0,0,0.025)",
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  marginBottom: 9,
                }}
              >
                {region.name}
              </div>

              <p
                style={{
                  fontSize: 13,
                  color: "#777",
                  lineHeight: 1.7,
                  margin: "0 0 20px",
                }}
              >
                {regionDescriptions[region.slug] ??
                  `${region.name} 후드 교체 안내`}
              </p>

              <div
                style={{
                  borderTop: "1px solid #eee",
                  paddingTop: 14,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    color: "#666",
                  }}
                >
                  {region.districts.length}개 지역
                </span>
                <span
                  style={{
                    color: "#96713e",
                    fontSize: 13,
                    fontWeight: 800,
                  }}
                >
                  지역 보기 →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        style={{
          background: "#fff",
          borderTop: "1px solid #eee",
          padding: "65px 20px",
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
            후드 교체 서비스
          </h2>

          <p
            style={{
              color: "#666",
              lineHeight: 1.8,
              marginBottom: 28,
            }}
          >
            기존 후드의 종류와 설치 환경에 따라
            교체 방법이 달라질 수 있습니다.
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
                  padding: 26,
                  border: "1px solid #eaeaea",
                  borderRadius: 12,
                  background: "#faf9f6",
                }}
              >
                <h3
                  style={{
                    fontSize: 19,
                    margin: "0 0 13px",
                  }}
                >
                  {service.name}
                </h3>

                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.9,
                    color: "#666",
                    margin: "0 0 16px",
                  }}
                >
                  {service.description}
                </p>

                <p
                  style={{
                    fontSize: 13,
                    color: "#96713e",
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  지역을 선택하면 상세 안내를
                  확인할 수 있습니다.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          background: "#f0ece4",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: 27,
            margin: "0 0 15px",
          }}
        >
          후드 교체 상담
        </h2>

        <p
          style={{
            color: "#555",
            lineHeight: 1.9,
            margin: "0 0 25px",
          }}
        >
          기존 후드 사진과 제품 규격,
          설치 지역을 알려주시면
          교체 가능 여부를 상담할 수 있습니다.
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
        <div>© {new Date().getFullYear()} 후드의정석</div>
      </footer>

      <a
        href={SITE.phoneHref}
        aria-label={`후드의정석 전화상담 ${SITE.phone}`}
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
          boxShadow: "0 6px 25px rgba(0,0,0,0.18)",
        }}
      >
        전화상담 바로가기 · {SITE.phone}
      </a>
    </main>
  );
}
