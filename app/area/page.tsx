
import type { Metadata } from "next";
import Link from "next/link";

import { regions } from "../../lib/regions";
import { SITE, services } from "../../lib/services";

const BASE_URL = SITE.url.replace(/\/+$/, "");
const PAGE_URL = `${BASE_URL}/area`;

export const metadata: Metadata = {
  title: {
    absolute: "전국 주방후드 교체 지역 안내 | 후드의정석",
  },

  description:
    "전국 17개 시·도별 주방후드, 렌지후드, 후황, 아일랜드후드, 침니후드 교체 상담 지역과 설치 전 확인 사항 안내.",

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    title: "전국 주방후드 교체 지역 안내 | 후드의정석",
    description:
      "서울·경기·인천·부산 등 전국 시·군·구별 주방후드 교체 정보를 확인하세요.",
    url: PAGE_URL,
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
  seoul:
    "서울 25개 자치구의 주방후드 교체 안내",
  gyeonggi:
    "수원·성남·고양·용인 등 경기도 지역별 후드 교체 안내",
  incheon:
    "제물포·영종·서해·검단 등 인천 지역별 후드 교체 안내",
  busan:
    "해운대·부산진·동래 등 부산 지역별 후드 교체 안내",
  daegu:
    "수성·달서·동구 등 대구 지역별 후드 교체 안내",
  daejeon:
    "유성·서구·대덕 등 대전 지역별 후드 교체 안내",
  gwangju:
    "광산·북구·서구 등 광주 지역별 후드 교체 안내",
  ulsan:
    "남구·중구·동구·북구·울주군 후드 교체 안내",
  sejong:
    "세종특별자치시 주방후드 교체 상담 안내",
  gangwon:
    "춘천·원주·강릉 등 강원 지역별 후드 교체 안내",
  chungbuk:
    "청주·충주·제천 등 충북 지역별 후드 교체 안내",
  chungnam:
    "천안·아산·공주 등 충남 지역별 후드 교체 안내",
  jeonbuk:
    "전주·군산·익산 등 전북 지역별 후드 교체 안내",
  jeonnam:
    "목포·여수·순천 등 전남 지역별 후드 교체 안내",
  gyeongbuk:
    "포항·경주·구미 등 경북 지역별 후드 교체 안내",
  gyeongnam:
    "창원·김해·진주 등 경남 지역별 후드 교체 안내",
  jeju:
    "제주시·서귀포시 주방후드 교체 안내",
};

const serviceLinks: Record<string, string> = {
  "kitchen-hood": "/services/kitchen-hood",
  "island-hood": "/services/island-hood",
  "chimney-hood": "/services/chimney-hood",
};

const preparationItems = [
  {
    title: "기존 후드 사진",
    description:
      "후드 전체 모습과 주변 싱크대 또는 상부장 구조가 보이도록 촬영하면 상담에 도움이 됩니다.",
  },
  {
    title: "제품 모델명과 크기",
    description:
      "제품 라벨의 모델명과 후드 가로 폭을 확인하면 교체 가능한 제품을 검토하기 편리합니다.",
  },
  {
    title: "설치 지역",
    description:
      "시·군·구와 상세 설치 환경을 알려주시면 해당 지역의 상담 가능 여부를 확인할 수 있습니다.",
  },
];

const faqs = [
  {
    question: "전국 어느 지역에서나 후드 교체 상담이 가능한가요?",
    answer:
      "전국 지역별 상담 정보를 제공하고 있습니다. 실제 방문 및 시공 가능 여부와 일정은 지역과 작업 조건에 따라 별도 확인이 필요합니다.",
  },
  {
    question: "기존 후드 모델명을 모르면 상담이 어려운가요?",
    answer:
      "모델명을 모르더라도 후드 전체 사진과 설치 공간의 크기를 확인하면 상담에 도움이 됩니다. 정확한 규격은 추가 확인이 필요할 수 있습니다.",
  },
  {
    question: "아일랜드후드와 침니후드도 교체할 수 있나요?",
    answer:
      "천장 또는 벽면의 고정 구조, 배기덕트 연결 방식, 제품 규격을 확인한 뒤 교체 가능 여부를 검토합니다.",
  },
  {
    question: "후드 교체 비용은 어떻게 결정되나요?",
    answer:
      "제품 종류와 크기, 기존 후드 철거 난이도, 배기덕트 및 추가 마감 작업 여부에 따라 비용이 달라집니다.",
  },
];

export default function AreaPage() {
  const regionCount = regions.length;

  const districtCount = regions.reduce(
    (total, region) => total + region.districts.length,
    0
  );

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${PAGE_URL}#webpage`,
        name: "전국 주방후드 교체 지역 안내",
        description:
          "전국 시·군·구별 주방후드 교체 상담 지역과 설치 전 확인 사항",
        url: PAGE_URL,
        inLanguage: "ko-KR",

        isPartOf: {
          "@id": `${BASE_URL}/#website`,
        },

        mainEntity: {
          "@id": `${PAGE_URL}#regions`,
        },
      },

      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#regions`,
        name: "전국 후드 교체 지역 목록",

        numberOfItems: regionCount,

        itemListElement: regions.map(
          (region, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: region.name,
            url: `${BASE_URL}/area/${region.slug}`,
          })
        ),
      },

      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,

        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "홈",
            item: BASE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "전국 지역 안내",
            item: PAGE_URL,
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

      {/* HERO */}
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
            주방후드부터 아일랜드후드,
            침니후드 교체까지.
            <br />
            지역을 선택해 설치 조건과
            상담 정보를 확인하세요.
          </p>
        </div>
      </section>

      {/* REGION LIST */}
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
          <Link
            href="/"
            style={{ color: "inherit" }}
          >
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
            전국 {regionCount}개 시·도,
            {" "}{districtCount}개 지역 안내 페이지를
            확인할 수 있습니다.
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
                boxShadow:
                  "0 3px 12px rgba(0,0,0,0.025)",
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
                  `${region.name} 주방후드 교체 안내`}
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

      {/* SERVICES */}
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
            설치 형태에 따라 필요한 교체 작업이
            달라질 수 있습니다.
            서비스별 상세 안내도 함께 확인하세요.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 270px), 1fr))",
              gap: 16,
            }}
          >
            {services.map((service) => {
              const href =
                serviceLinks[service.slug];

              return (
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
                      margin: "0 0 20px",
                    }}
                  >
                    {service.description}
                  </p>

                  {href ? (
                    <Link
                      href={href}
                      style={{
                        display: "inline-block",
                        padding: "11px 17px",
                        background: "#171717",
                        color: "#fff",
                        borderRadius: 8,
                        textDecoration: "none",
                        fontWeight: 800,
                        fontSize: 13,
                      }}
                    >
                      {service.name} 자세히 보기
                    </Link>
                  ) : (
                    <p
                      style={{
                        color: "#96713e",
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
                      지역별 상담 안내를 확인하세요.
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PREPARATION */}
      <section
        style={{
          padding: "65px 20px",
          background: "#faf9f6",
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
            }}
          >
            후드 교체 상담 전 준비하면 좋은 정보
          </h2>

          <p
            style={{
              color: "#666",
              lineHeight: 1.9,
              margin: "0 0 28px",
              fontSize: 14,
            }}
          >
            설치 환경을 미리 확인하면
            교체 가능 여부와 예상 작업 범위를
            상담하기 수월합니다.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: 16,
            }}
          >
            {preparationItems.map((item, index) => (
              <article
                key={item.title}
                style={{
                  padding: 25,
                  borderRadius: 12,
                  border: "1px solid #e7e3dc",
                  background: "#fff",
                }}
              >
                <div
                  style={{
                    color: "#a78047",
                    fontWeight: 900,
                    fontSize: 13,
                    marginBottom: 12,
                  }}
                >
                  CHECK {index + 1}
                </div>

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
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{
          padding: "65px 20px",
          background: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: 850,
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: 27,
              margin: "0 0 28px",
              textAlign: "center",
            }}
          >
            전국 후드 교체 자주 묻는 질문
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
                  padding: "19px 22px",
                  border: "1px solid #e5e5e5",
                  borderRadius: 10,
                }}
              >
                <summary
                  style={{
                    fontWeight: 800,
                    cursor: "pointer",
                    lineHeight: 1.8,
                  }}
                >
                  {faq.question}
                </summary>

                <p
                  style={{
                    fontSize: 14,
                    color: "#666",
                    lineHeight: 1.9,
                    margin: "15px 0 0",
                  }}
                >
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
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

      {/* FIXED CALL BUTTON */}
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
          boxShadow:
            "0 6px 25px rgba(0,0,0,0.18)",
        }}
      >
        전화상담 바로가기 · {SITE.phone}
      </a>
    </main>
  );
}
