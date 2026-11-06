
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { regions } from "../lib/regions";
import { SITE } from "../lib/services";

export const metadata: Metadata = {
  title: {
    absolute:
      "후드의정석 | 전국 주방후드·렌지후드·후황 교체",
  },
  description:
    "전국 주방후드 교체 전문 상담 후드의정석. " +
    "렌지후드, 후황, 아일랜드후드, 침니후드, " +
    "빌트인후드, 슬림후드, 허리케인후드 교체. " +
    "시공 전후 사진과 지역별 안내를 확인하세요.",
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title:
      "후드의정석 | 전국 주방후드 교체",
    description:
      "주방후드, 렌지후드, 후황, " +
      "아일랜드후드, 침니후드 교체 상담",
    url: SITE.url,
    siteName: SITE.name,
    locale: "ko_KR",
    type: "website",
  },
};

const photos = {
  kitchen:
    "/12B08037-6AD2-4EF2-AB3F-2F9FAA2EE6A2.png",

  island:
    "/310B47AA-B344-4A17-9160-AC277DBF595E.png",

  chimney:
    "/10D74E67-C29E-41AD-85D7-64D8092D6C4D.png",

  additional:
    "/ECAD3A3D-6C53-43BE-A443-01A321496AE2.png",
};

const categories = [
  {
    title: "주방후드 교체",
    subtitle: "KITCHEN HOOD",
    description:
      "가정집, 아파트, 빌라의 주방후드와 " +
      "렌지후드, 후황, 슬림후드, " +
      "빌트인후드 교체 상담.",
    image: photos.kitchen,
    alt:
      "가정집 주방후드 교체 시공 전후 비교 사진",
    href: "/services/kitchen-hood",
    keywords: [
      "렌지후드 교체",
      "후황 교체",
      "슬림후드 교체",
      "빌트인후드 교체",
      "허리케인후드 교체",
    ],
  },
  {
    title: "아일랜드후드 교체",
    subtitle: "ISLAND HOOD",
    description:
      "천장에 고정된 아일랜드형 주방후드의 " +
      "교체 상담. 설치 높이, 천장 고정 구조와 " +
      "배기 연결 상태를 확인합니다.",
    image: photos.island,
    alt:
      "아일랜드 주방후드 교체 시공 전후 비교 사진",
    href: "/services/island-hood",
    keywords: [
      "아일랜드 렌지후드",
      "천장형 후드",
      "아일랜드 후황",
    ],
  },
  {
    title: "침니후드 교체",
    subtitle: "CHIMNEY HOOD",
    description:
      "벽면에 설치된 침니형, 데코형, " +
      "굴뚝형 주방후드의 교체 상담. " +
      "제품 규격과 배기덕트 연결을 확인합니다.",
    image: photos.chimney,
    alt:
      "침니형 주방후드 교체 시공 전후 비교 사진",
    href: "/services/chimney-hood",
    keywords: [
      "침니 렌지후드",
      "데코후드 교체",
      "굴뚝형 후드 교체",
    ],
  },
];

const gallery = [
  {
    image: photos.additional,
    title: "주방 환기후드 교체",
    alt:
      "주방 환기후드 시공 후와 시공 전 비교",
  },
  {
    image: photos.kitchen,
    title: "가정집 주방후드 교체",
    alt:
      "가정집 렌지후드 교체 전후 비교",
  },
  {
    image: photos.island,
    title: "아일랜드후드 교체",
    alt:
      "아일랜드후드 교체 전후 비교",
  },
  {
    image: photos.chimney,
    title: "침니후드 교체",
    alt:
      "침니후드 교체 전후 비교",
  },
];

const faqs = [
  {
    question: "오래된 주방후드도 교체할 수 있나요?",
    answer:
      "기존 후드의 설치 규격과 공간이 " +
      "적합하면 교체를 검토할 수 있습니다. " +
      "제품 모델명과 사진을 확인하는 것이 좋습니다.",
  },
  {
    question: "후황과 렌지후드는 같은 건가요?",
    answer:
      "후황, 렌지후드, 레인지후드 등은 " +
      "주방 환기후드를 가리키는 표현으로 " +
      "사용됩니다. 실제 제품 종류는 " +
      "모델과 설치 형태에 따라 구분됩니다.",
  },
  {
    question: "후드 교체 비용은 얼마인가요?",
    answer:
      "후드 제품 종류, 기존 제품 철거, " +
      "배기덕트 연결과 추가 마감 작업에 " +
      "따라 달라집니다. 설치 사진을 바탕으로 " +
      "작업 범위를 확인해야 합니다.",
  },
  {
    question: "아일랜드후드도 교체 상담이 가능한가요?",
    answer:
      "네. 천장 고정 구조와 배기 연결 상태, " +
      "교체 제품의 규격을 확인하여 상담합니다.",
  },
];

const container = {
  maxWidth: 1160,
  margin: "0 auto",
  paddingLeft: 20,
  paddingRight: 20,
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(min(100%, 290px), 1fr))",
  gap: 20,
};

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        telephone: SITE.phone,
        description:
          "전국 주방후드, 렌지후드, 후황, " +
          "아일랜드후드 및 침니후드 교체 상담",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        name: SITE.name,
        url: SITE.url,
        inLanguage: "ko-KR",
        publisher: {
          "@id": `${SITE.url}/#organization`,
        },
      },
    ],
  };

  return (
    <main
      style={{
        background: "#faf9f6",
        color: "#171717",
        minHeight: "100vh",
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
          borderBottom: "1px solid #eee",
          padding: "18px 20px",
        }}
      >
        <div
          style={{
            ...container,
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

          <a
            href={SITE.phoneHref}
            style={{
              background: "#171717",
              color: "#fff",
              borderRadius: 8,
              padding: "12px 16px",
              textDecoration: "none",
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
          padding: "80px 20px",
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
              color: "#d5b47b",
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: "2px",
              margin: "0 0 18px",
            }}
          >
            HOOD MASTER
          </p>

          <h1
            style={{
              fontSize: "clamp(31px, 5vw, 49px)",
              lineHeight: 1.35,
              fontWeight: 900,
              letterSpacing: "-1.5px",
              margin: "0 0 22px",
            }}
          >
            전국 주방후드 교체
            <br />
            후드의정석
          </h1>

          <p
            style={{
              color: "#d2d2d2",
              fontSize: 16,
              lineHeight: 2,
              margin: "0 0 30px",
            }}
          >
            렌지후드 · 후황 · 주방후드
            <br />
            아일랜드후드 · 침니후드 교체 상담
          </p>

          <a
            href={SITE.phoneHref}
            style={{
              display: "inline-block",
              padding: "16px 28px",
              background: "#a78047",
              color: "#fff",
              borderRadius: 9,
              textDecoration: "none",
              fontWeight: 900,
            }}
          >
            전화상담 {SITE.phone}
          </a>
        </div>
      </section>

      {/* SERVICE CATEGORIES */}
      <section
        style={{
          ...container,
          paddingTop: 75,
          paddingBottom: 70,
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 35,
          }}
        >
          <p
            style={{
              color: "#a78047",
              fontWeight: 900,
              fontSize: 12,
              letterSpacing: "2px",
            }}
          >
            OUR SERVICES
          </p>

          <h2
            style={{
              fontSize: 30,
              margin: "12px 0",
            }}
          >
            후드 교체 전문 분야
          </h2>

          <p
            style={{
              color: "#666",
              lineHeight: 1.8,
              fontSize: 14,
            }}
          >
            실제 시공 전후 사진으로
            후드 교체 사례를 확인하세요.
          </p>
        </div>

        <div style={grid}>
          {categories.map((item) => (
            <article
              key={item.title}
              style={{
                background: "#fff",
                border: "1px solid #e7e3dc",
                borderRadius: 13,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4 / 3",
                  background: "#eee",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>

              <div style={{ padding: 23 }}>
                <p
                  style={{
                    color: "#a78047",
                    fontWeight: 900,
                    fontSize: 11,
                    letterSpacing: "1px",
                    margin: "0 0 9px",
                  }}
                >
                  {item.subtitle}
                </p>

                <h3
                  style={{
                    fontSize: 21,
                    margin: "0 0 13px",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    color: "#666",
                    lineHeight: 1.9,
                    fontSize: 14,
                    margin: "0 0 18px",
                  }}
                >
                  {item.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 7,
                    marginBottom: 22,
                  }}
                >
                  {item.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      style={{
                        background: "#f5f2ed",
                        padding: "7px 9px",
                        borderRadius: 6,
                        fontSize: 11,
                        color: "#6c6257",
                      }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                <Link
                  href={item.href}
                  style={{
                    display: "block",
                    background: "#171717",
                    color: "#fff",
                    textAlign: "center",
                    padding: "14px",
                    borderRadius: 8,
                    textDecoration: "none",
                    fontWeight: 800,
                    fontSize: 14,
                  }}
                >
                  자세히 보기
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* BEFORE AFTER GALLERY */}
      <section
        style={{
          background: "#f0ece4",
          padding: "75px 0",
        }}
      >
        <div style={container}>
          <div
            style={{
              textAlign: "center",
              marginBottom: 35,
            }}
          >
            <p
              style={{
                color: "#a78047",
                fontWeight: 900,
                fontSize: 12,
                letterSpacing: "2px",
              }}
            >
              BEFORE & AFTER
            </p>

            <h2
              style={{
                fontSize: 30,
                margin: "12px 0",
              }}
            >
              실제 후드 교체 시공 사례
            </h2>

            <p
              style={{
                color: "#666",
                lineHeight: 1.8,
                fontSize: 14,
              }}
            >
              기존 주방후드 철거부터
              새로운 후드 설치까지
              전후 모습을 확인하세요.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
              gap: 20,
            }}
          >
            {gallery.map((item) => (
              <figure
                key={item.image}
                style={{
                  margin: 0,
                  background: "#fff",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 3",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{
                      objectFit: "contain",
                      background: "#eaeaea",
                    }}
                  />
                </div>

                <figcaption
                  style={{
                    padding: "17px 20px",
                    fontSize: 15,
                    fontWeight: 800,
                  }}
                >
                  {item.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* REGION LINKS */}
      <section
        style={{
          ...container,
          paddingTop: 75,
          paddingBottom: 75,
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          <h2
            style={{
              fontSize: 29,
              margin: "0 0 13px",
            }}
          >
            전국 지역별 후드 교체
          </h2>

          <p
            style={{
              color: "#666",
              fontSize: 14,
              lineHeight: 1.9,
            }}
          >
            지역을 선택하면 시·군·구별
            후드 교체 안내 페이지를
            확인할 수 있습니다.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
            gap: 10,
          }}
        >
          {regions.map((region) => (
            <Link
              key={region.slug}
              href={`/area/${region.slug}`}
              style={{
                display: "block",
                background: "#fff",
                border: "1px solid #e5e1d9",
                borderRadius: 9,
                padding: "17px 12px",
                textAlign: "center",
                color: "#333",
                textDecoration: "none",
                fontWeight: 800,
                fontSize: 14,
              }}
            >
              {region.name}
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
              color: "#96713e",
              fontWeight: 900,
              fontSize: 15,
            }}
          >
            전국 지역 전체 보기 →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{
          background: "#fff",
          padding: "75px 20px",
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
              textAlign: "center",
              fontSize: 29,
              margin: "0 0 30px",
            }}
          >
            후드 교체 자주 묻는 질문
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
                  border: "1px solid #e5e5e5",
                  borderRadius: 10,
                  padding: "20px 22px",
                }}
              >
                <summary
                  style={{
                    fontWeight: 800,
                    fontSize: 15,
                    lineHeight: 1.8,
                    cursor: "pointer",
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
          background: "#171717",
          color: "#fff",
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
            color: "#d0d0d0",
            lineHeight: 1.9,
            margin: "0 0 25px",
          }}
        >
          기존 후드 사진과 제품 모델명,
          설치 지역을 알려주시면
          상담에 도움이 됩니다.
        </p>

        <a
          href={SITE.phoneHref}
          style={{
            display: "inline-block",
            padding: "17px 30px",
            background: "#a78047",
            borderRadius: 9,
            color: "#fff",
            textDecoration: "none",
            fontWeight: 900,
          }}
        >
          전화상담 {SITE.phone}
        </a>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#111",
          color: "#bcbcbc",
          textAlign: "center",
          padding: "30px 20px 105px",
          fontSize: 13,
          lineHeight: 2,
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
