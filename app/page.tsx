
import type { Metadata } from "next";
import Link from "next/link";
import { regions } from "../lib/regions";
import { SITE, services } from "../lib/services";

export const metadata: Metadata = {
  title: {
    absolute:
      "후드의정석 | 전국 주방후드·렌지후드·아일랜드후드 교체",
  },
  description:
    "전국 주방후드 교체 상담 후드의정석. 렌지후드, 후황, 빌트인후드, 슬림후드, 허리케인후드, 아일랜드후드, 침니후드 교체 안내. 전화 010-9413-4686.",
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title:
      "후드의정석 | 전국 주방후드 교체 상담",
    description:
      "주방후드·아일랜드후드·침니후드 교체 상담. 전국 지역별 안내.",
    url: SITE.url,
    siteName: SITE.name,
    locale: "ko_KR",
    type: "website",
  },
};

const serviceDetails = [
  {
    slug: "kitchen-hood",
    number: "01",
    title: "주방후드 교체",
    subtitle: "KITCHEN HOOD",
    description:
      "아파트, 빌라, 단독주택의 일반 주방후드 교체 상담. 기존 제품 규격과 배기 구조에 맞는 교체 방법을 안내합니다.",
    keywords: [
      "렌지후드 교체",
      "후황 교체",
      "빌트인후드",
      "슬림후드",
      "통후드",
      "허리케인후드",
    ],
  },
  {
    slug: "island-hood",
    number: "02",
    title: "아일랜드 후드교체",
    subtitle: "ISLAND HOOD",
    description:
      "아일랜드 주방에 설치된 천장형·독립형 후드 교체 상담. 천장 고정 구조와 배기 연결 상태를 확인합니다.",
    keywords: [
      "천장형 후드",
      "독립형 후드",
      "아일랜드 렌지후드",
      "천장 고정형 후드",
    ],
  },
  {
    slug: "chimney-hood",
    number: "03",
    title: "침니 후드교체",
    subtitle: "CHIMNEY HOOD",
    description:
      "벽면에 설치된 침니형 주방후드 교체 상담. 굴뚝형·데코형·경사형 후드의 규격과 설치 환경을 확인합니다.",
    keywords: [
      "침니형 후드",
      "벽부형 후드",
      "굴뚝형 후드",
      "데코후드",
      "경사형 후드",
    ],
  },
];

const steps = [
  {
    number: "01",
    title: "기존 후드 확인",
    description:
      "제품 전체 사진과 모델명, 설치 공간을 확인합니다.",
  },
  {
    number: "02",
    title: "교체 가능 여부 상담",
    description:
      "규격과 배기덕트 연결 방식, 고정 구조를 검토합니다.",
  },
  {
    number: "03",
    title: "제품 및 비용 안내",
    description:
      "설치 환경에 따라 교체 방법과 예상 비용을 상담합니다.",
  },
  {
    number: "04",
    title: "일정 및 작업 협의",
    description:
      "작업 가능 지역과 일정, 추가 작업 여부를 협의합니다.",
  },
];

const faqs = [
  {
    question: "오래된 주방후드도 교체할 수 있나요?",
    answer:
      "기존 제품의 크기와 설치 공간, 배기덕트 상태에 따라 교체 가능 여부가 달라집니다. 제품 사진과 모델명을 확인하면 상담에 도움이 됩니다.",
  },
  {
    question: "기존 후드와 다른 브랜드로 교체할 수 있나요?",
    answer:
      "설치 규격과 고정 방식, 배기 연결이 적합하면 다른 브랜드 제품으로 교체를 검토할 수 있습니다.",
  },
  {
    question: "아일랜드후드와 침니후드도 교체하나요?",
    answer:
      "두 제품 모두 교체 상담 대상입니다. 아일랜드후드는 천장 고정 구조, 침니후드는 벽면 고정 및 배기 연결 상태를 확인해야 합니다.",
  },
  {
    question: "후드 교체 비용은 얼마인가요?",
    answer:
      "제품 종류와 설치 환경, 기존 제품 철거 및 추가 마감 여부에 따라 달라집니다. 정확한 비용은 상담을 통해 안내합니다.",
  },
];

const styles = {
  page: {
    minHeight: "100vh",
    background: "#faf9f6",
    color: "#171717",
    fontFamily:
      "'Pretendard', 'Noto Sans KR', Arial, sans-serif",
  },
  container: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "0 20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
    gap: 18,
  },
  card: {
    background: "#fff",
    border: "1px solid #e7e3dc",
    borderRadius: 14,
    padding: 26,
  },
} as const;

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        name: SITE.name,
        url: SITE.url,
        inLanguage: "ko-KR",
      },
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        telephone: SITE.phone,
        description: SITE.description,
      },
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/#webpage`,
        name: "전국 주방후드 교체 | 후드의정석",
        url: SITE.url,
        inLanguage: "ko-KR",
      },
      {
        "@type": "ItemList",
        name: "후드의정석 주요 서비스",
        itemListElement: services.map(
          (service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: service.name,
            url: `${SITE.url}/area`,
          })
        ),
      },
    ],
  };

  return (
    <main style={styles.page}>
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
            gap: 15,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: 23,
              fontWeight: 900,
              color: "#171717",
              textDecoration: "none",
              letterSpacing: "-1px",
            }}
          >
            후드의정석
          </Link>

          <nav
            aria-label="주요 메뉴"
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              flexWrap: "wrap",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            <a
              href="#services"
              style={{ color: "#333" }}
            >
              교체 서비스
            </a>
            <a
              href="#areas"
              style={{ color: "#333" }}
            >
              전국 지역
            </a>
            <a
              href="#faq"
              style={{ color: "#333" }}
            >
              자주 묻는 질문
            </a>
          </nav>

          <a
            href={SITE.phoneHref}
            style={{
              background: "#171717",
              color: "#fff",
              padding: "12px 17px",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 800,
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
            "linear-gradient(135deg, #171717 0%, #292622 100%)",
          color: "#fff",
          textAlign: "center",
          padding: "105px 20px",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p
            style={{
              color: "#d7b67a",
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "3px",
              marginBottom: 18,
            }}
          >
            HOOD MASTER
          </p>

          <h1
            style={{
              fontSize: "clamp(34px, 6vw, 59px)",
              lineHeight: 1.3,
              letterSpacing: "-2px",
              margin: "0 0 24px",
              fontWeight: 900,
            }}
          >
            주방후드 교체,
            <br />
            후드의정석
          </h1>

          <p
            style={{
              color: "#d1d1d1",
              lineHeight: 2,
              fontSize: 17,
              margin: "0 0 32px",
            }}
          >
            렌지후드 · 아일랜드후드 · 침니후드
            <br />
            전국 지역별 후드 교체 상담 안내
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <a
              href={SITE.phoneHref}
              style={{
                background: "#a78047",
                color: "#fff",
                padding: "16px 26px",
                borderRadius: 9,
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              전화상담 바로가기
            </a>

            <Link
              href="/area"
              style={{
                border: "1px solid #777",
                color: "#fff",
                padding: "16px 26px",
                borderRadius: 9,
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              전국 지역 찾아보기
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        style={{ padding: "80px 0" }}
      >
        <div style={styles.container}>
          <p
            style={{
              color: "#a78047",
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: "2px",
              marginBottom: 12,
            }}
          >
            OUR SERVICES
          </p>

          <h2
            style={{
              fontSize: 32,
              letterSpacing: "-1.2px",
              margin: "0 0 15px",
            }}
          >
            후드 교체 전문 서비스
          </h2>

          <p
            style={{
              color: "#666",
              lineHeight: 1.9,
              margin: "0 0 32px",
            }}
          >
            주방 구조와 기존 후드 형태에 따라
            교체 방법이 달라집니다.
            원하는 서비스를 선택하고
            지역별 상세 정보를 확인하세요.
          </p>

          <div style={styles.grid}>
            {serviceDetails.map((service) => (
              <article
                key={service.slug}
                style={styles.card}
              >
                <p
                  style={{
                    color: "#a78047",
                    fontWeight: 900,
                    fontSize: 13,
                    margin: "0 0 15px",
                  }}
                >
                  SERVICE {service.number}
                </p>

                <h3
                  style={{
                    fontSize: 24,
                    margin: "0 0 9px",
                  }}
                >
                  {service.title}
                </h3>

                <p
                  style={{
                    fontSize: 12,
                    color: "#999",
                    letterSpacing: "1px",
                    margin: "0 0 18px",
                  }}
                >
                  {service.subtitle}
                </p>

                <p
                  style={{
                    color: "#666",
                    lineHeight: 1.9,
                    fontSize: 14,
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
                    marginBottom: 25,
                  }}
                >
                  {service.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      style={{
                        background: "#f7f5f0",
                        borderRadius: 6,
                        padding: "7px 9px",
                        fontSize: 12,
                        color: "#555",
                      }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                <Link
                  href="/area"
                  style={{
                    display: "block",
                    background: "#171717",
                    color: "#fff",
                    padding: 14,
                    textAlign: "center",
                    borderRadius: 8,
                    textDecoration: "none",
                    fontWeight: 800,
                    fontSize: 14,
                  }}
                >
                  지역별 {service.title} 보기 →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section
        id="areas"
        style={{
          background: "#fff",
          padding: "80px 0",
          borderTop: "1px solid #eee",
        }}
      >
        <div style={styles.container}>
          <p
            style={{
              color: "#a78047",
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: "2px",
              marginBottom: 12,
            }}
          >
            SERVICE AREA
          </p>

          <h2
            style={{
              fontSize: 32,
              letterSpacing: "-1px",
              margin: "0 0 15px",
            }}
          >
            전국 후드 교체 지역 안내
          </h2>

          <p
            style={{
              color: "#666",
              lineHeight: 1.9,
              margin: "0 0 30px",
            }}
          >
            서울·경기·인천부터 충청·강원·영남·호남·제주까지
            전국 시·군·구별 교체 상담 정보를
            확인할 수 있습니다.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 190px), 1fr))",
              gap: 12,
            }}
          >
            {regions.map((region) => (
              <Link
                key={region.slug}
                href={`/area/${region.slug}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                  background: "#faf9f6",
                  border: "1px solid #e8e5df",
                  borderRadius: 10,
                  padding: "19px 16px",
                  color: "#171717",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: 15,
                }}
              >
                <span>{region.name}</span>
                <span style={{ color: "#a78047" }}>
                  →
                </span>
              </Link>
            ))}
          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: 30,
            }}
          >
            <Link
              href="/area"
              style={{
                display: "inline-block",
                background: "#171717",
                color: "#fff",
                padding: "15px 28px",
                borderRadius: 9,
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              전국 지역 전체 보기
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding: "80px 0" }}>
        <div style={styles.container}>
          <h2
            style={{
              fontSize: 30,
              margin: "0 0 15px",
              letterSpacing: "-1px",
            }}
          >
            후드 교체 상담 절차
          </h2>

          <p
            style={{
              color: "#666",
              lineHeight: 1.9,
              margin: "0 0 30px",
            }}
          >
            기존 제품의 규격과 설치 환경을
            확인한 후 교체 방법을 상담합니다.
          </p>

          <div style={styles.grid}>
            {steps.map((step) => (
              <div
                key={step.number}
                style={styles.card}
              >
                <div
                  style={{
                    color: "#a78047",
                    fontWeight: 900,
                    marginBottom: 15,
                  }}
                >
                  STEP {step.number}
                </div>

                <h3
                  style={{
                    fontSize: 18,
                    margin: "0 0 12px",
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontSize: 14,
                    color: "#666",
                    lineHeight: 1.9,
                    margin: 0,
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        style={{
          background: "#fff",
          padding: "80px 0",
        }}
      >
        <div style={styles.container}>
          <h2
            style={{
              fontSize: 30,
              margin: "0 0 30px",
            }}
          >
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
                  background: "#faf9f6",
                  border: "1px solid #e7e3dc",
                  borderRadius: 10,
                  padding: "20px 22px",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontWeight: 800,
                    lineHeight: 1.8,
                  }}
                >
                  {faq.question}
                </summary>

                <p
                  style={{
                    color: "#666",
                    lineHeight: 1.9,
                    fontSize: 14,
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
          textAlign: "center",
          padding: "75px 20px",
        }}
      >
        <h2
          style={{
            fontSize: 30,
            margin: "0 0 15px",
          }}
        >
          주방후드 교체 상담
        </h2>

        <p
          style={{
            color: "#555",
            lineHeight: 1.9,
            margin: "0 0 27px",
          }}
        >
          기존 후드 사진과 설치 지역을
          알려주시면 상담에 도움이 됩니다.
        </p>

        <a
          href={SITE.phoneHref}
          style={{
            display: "inline-block",
            background: "#171717",
            color: "#fff",
            padding: "17px 32px",
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
          padding: "35px 20px 100px",
          textAlign: "center",
          lineHeight: 2,
          fontSize: 13,
        }}
      >
        <strong
          style={{
            color: "#fff",
            fontSize: 18,
          }}
        >
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
        aria-label="후드의정석 전화상담"
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
