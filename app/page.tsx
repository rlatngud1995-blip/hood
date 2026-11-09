
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { regions } from "../lib/regions";
import { SITE } from "../lib/services";

const BASE_URL = SITE.url.replace(/\/+$/, "");

export const metadata: Metadata = {
  title: {
    absolute: "후드의정석 | 전국 주방후드·렌지후드 교체",
  },
  description:
    "전국 주방후드·렌지후드·후황·아일랜드후드·침니후드 교체 상담. 설치 규격, 배기덕트, 교체 비용 확인 사항 안내.",
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "후드의정석 | 전국 주방후드 교체",
    description:
      "주방후드 교체 전 확인 사항부터 제품 종류, 설치 조건, 지역별 상담 안내까지.",
    url: BASE_URL,
    siteName: SITE.name,
    locale: "ko_KR",
    type: "website",
  },
};

const heroSlides = [
  {
    image: "/12B08037-6AD2-4EF2-AB3F-2F9FAA2EE6A2.png",
    alt: "주방후드 교체 작업 전후 비교 사진",
  },
  {
    image: "/310B47AA-B344-4A17-9160-AC277DBF595E.png",
    alt: "아일랜드후드 교체 작업 전후 비교 사진",
  },
  {
    image: "/10D74E67-C29E-41AD-85D7-64D8092D6C4D.png",
    alt: "침니후드 교체 작업 전후 비교 사진",
  },
];

const categories = [
  {
    title: "주방후드 교체",
    subtitle: "KITCHEN HOOD",
    image: heroSlides[0].image,
    alt: "가정집 주방후드 교체 전후 사진",
    href: "/services/kitchen-hood",
    description:
      "아파트, 빌라, 단독주택의 주방후드 교체를 안내합니다. 기존 후드의 가로 폭과 설치장 구조, 배기 연결 상태를 확인하는 것이 중요합니다.",
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
    image: heroSlides[1].image,
    alt: "천장형 아일랜드후드 교체 전후 사진",
    href: "/services/island-hood",
    description:
      "주방 중앙에 설치된 천장형 아일랜드후드 교체를 안내합니다. 천장 고정 방식과 배기덕트 위치, 제품 크기를 함께 확인합니다.",
    keywords: [
      "아일랜드 렌지후드",
      "천장형 후드",
      "아일랜드 후황",
    ],
  },
  {
    title: "침니후드 교체",
    subtitle: "CHIMNEY HOOD",
    image: heroSlides[2].image,
    alt: "벽면형 침니후드 교체 전후 사진",
    href: "/services/chimney-hood",
    description:
      "벽면에 설치하는 침니형, 데코형, 굴뚝형 후드의 교체를 안내합니다. 벽체 고정 상태와 배기구 위치, 마감 범위를 확인합니다.",
    keywords: [
      "침니 렌지후드",
      "데코후드 교체",
      "굴뚝형 후드 교체",
    ],
  },
];

const checks = [
  {
    title: "기존 후드 규격",
    description:
      "후드의 가로 폭과 높이, 설치장 내부 공간을 확인합니다. 기존 제품의 모델명을 알면 규격 확인에 도움이 됩니다.",
  },
  {
    title: "배기덕트 연결",
    description:
      "배기관의 위치와 연결 방식, 손상 여부를 살펴봅니다. 새 후드와 배기구가 맞지 않으면 추가 작업이 필요할 수 있습니다.",
  },
  {
    title: "전원 및 고정 상태",
    description:
      "콘센트 위치와 전원 연결 방식, 벽면 또는 천장의 고정 구조를 확인합니다.",
  },
  {
    title: "추가 마감 여부",
    description:
      "기존 후드 철거 후 노출되는 벽면이나 가구 부분에 별도 마감 작업이 필요한지 확인합니다.",
  },
];

const steps = [
  {
    number: "01",
    title: "기존 후드 확인",
    description:
      "설치된 후드의 전체 사진, 모델명, 설치 지역을 확인합니다.",
  },
  {
    number: "02",
    title: "교체 조건 상담",
    description:
      "제품 규격과 설치 구조를 바탕으로 교체 가능 여부 및 필요한 작업을 안내합니다.",
  },
  {
    number: "03",
    title: "비용 및 일정 확인",
    description:
      "제품과 현장 조건에 따른 예상 비용, 방문 가능 일정 등을 상담합니다.",
  },
  {
    number: "04",
    title: "교체 및 작동 확인",
    description:
      "시공이 진행되는 경우 기존 제품 철거, 새 제품 설치, 배기 및 작동 상태를 확인합니다.",
  },
];

const faqs = [
  {
    question: "오래된 주방후드도 교체할 수 있나요?",
    answer:
      "기존 후드의 설치 규격과 공간이 적합하면 교체를 검토할 수 있습니다. 제품 모델명과 설치 사진을 확인하면 상담에 도움이 됩니다.",
  },
  {
    question: "후황과 렌지후드는 같은 건가요?",
    answer:
      "후황, 렌지후드, 레인지후드는 주방 환기후드를 가리키는 표현으로 사용됩니다. 실제 제품 종류는 설치 형태에 따라 구분됩니다.",
  },
  {
    question: "후드 교체 비용은 얼마인가요?",
    answer:
      "제품 종류와 크기, 기존 후드 철거 난이도, 배기덕트 연결, 전기 및 마감 작업 여부에 따라 비용이 달라집니다. 현장 사진과 모델명을 준비하면 보다 구체적인 상담에 도움이 됩니다.",
  },
  {
    question: "아일랜드후드도 교체할 수 있나요?",
    answer:
      "천장 고정 구조와 배기 연결 상태, 교체 제품의 규격을 확인한 뒤 교체 가능 여부를 검토합니다.",
  },
  {
    question: "후드 교체 전에 무엇을 준비해야 하나요?",
    answer:
      "후드 전체 사진, 제품 라벨이나 모델명, 설치 공간의 가로 폭, 설치 지역을 준비하면 좋습니다. 사진만으로 확인하기 어려운 부분은 추가 확인이 필요할 수 있습니다.",
  },
];

const container = {
  maxWidth: 1160,
  margin: "0 auto",
  paddingLeft: 20,
  paddingRight: 20,
};

const sectionTitleStyle = {
  fontSize: 30,
  lineHeight: 1.4,
  letterSpacing: "-0.8px",
};

export default function HomePage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/#webpage`,
    url: BASE_URL,
    name: "후드의정석 | 전국 주방후드·렌지후드 교체",
    description:
      "전국 주방후드 교체 상담과 제품 종류, 설치 전 확인 사항, 지역별 안내",
    inLanguage: "ko-KR",
    isPartOf: {
      "@id": `${BASE_URL}/#website`,
    },
    about: {
      "@id": `${BASE_URL}/#organization`,
    },
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
          __html: JSON.stringify(pageSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes hoodSlide1 {
              0%, 29% {
                opacity: 1;
                transform: scale(1);
              }
              34%, 95% {
                opacity: 0;
                transform: scale(1.05);
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }

            @keyframes hoodSlide2 {
              0%, 29% {
                opacity: 0;
                transform: scale(1.05);
              }
              34%, 62% {
                opacity: 1;
                transform: scale(1);
              }
              67%, 100% {
                opacity: 0;
                transform: scale(1.05);
              }
            }

            @keyframes hoodSlide3 {
              0%, 62% {
                opacity: 0;
                transform: scale(1.05);
              }
              67%, 95% {
                opacity: 1;
                transform: scale(1);
              }
              100% {
                opacity: 0;
                transform: scale(1.05);
              }
            }

            .hood-slide-1 {
              animation: hoodSlide1 12s infinite ease-in-out;
            }

            .hood-slide-2 {
              animation: hoodSlide2 12s infinite ease-in-out;
            }

            .hood-slide-3 {
              animation: hoodSlide3 12s infinite ease-in-out;
            }

            @media (prefers-reduced-motion: reduce) {
              .hood-slide-1 {
                animation: none;
                opacity: 1 !important;
              }

              .hood-slide-2,
              .hood-slide-3 {
                animation: none;
                opacity: 0 !important;
              }
            }
          `,
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
          position: "relative",
          overflow: "hidden",
          background: "#171717",
          color: "#fff",
          textAlign: "center",
          minHeight: 610,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 20px",
        }}
      >
        {heroSlides.map((slide, index) => (
          <div
            key={slide.image}
            className={`hood-slide-${index + 1}`}
            style={{
              position: "absolute",
              inset: 0,
              opacity: index === 0 ? 1 : 0,
            }}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
        ))}

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.72), rgba(0,0,0,0.82))",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 3,
            maxWidth: 850,
            margin: "0 auto",
          }}
        >
          <p
            style={{
              color: "#e0bb78",
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: "3px",
              margin: "0 0 18px",
            }}
          >
            HOOD MASTER
          </p>

          <h1
            style={{
              fontSize: "clamp(34px, 6vw, 54px)",
              lineHeight: 1.3,
              fontWeight: 900,
              letterSpacing: "-1.5px",
              margin: "0 0 22px",
              textShadow:
                "0 3px 15px rgba(0,0,0,0.45)",
            }}
          >
            전국 주방후드 교체
            <br />
            후드의정석
          </h1>

          <p
            style={{
              color: "#ededed",
              fontSize: 16,
              lineHeight: 2,
              margin: "0 0 30px",
              textShadow:
                "0 2px 10px rgba(0,0,0,0.6)",
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
              padding: "17px 30px",
              background: "#b58a48",
              color: "#fff",
              borderRadius: 10,
              textDecoration: "none",
              fontWeight: 900,
              fontSize: 16,
              boxShadow:
                "0 8px 25px rgba(0,0,0,0.25)",
            }}
          >
            전화상담 {SITE.phone}
          </a>
        </div>
      </section>

      {/* COUPON */}
      <section
        style={{
          background: "#fff8ee",
          padding: "55px 0",
        }}
      >
        <div style={container}>
          <div
            style={{
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            <p
              style={{
                color: "#a78047",
                fontWeight: 900,
                fontSize: 12,
                letterSpacing: "2px",
                margin: "0 0 10px",
              }}
            >
              SPECIAL COUPON
            </p>

            <h2
              style={{
                fontSize: 28,
                margin: "0 0 10px",
              }}
            >
              시공비 10,000원 할인
            </h2>

            <p
              style={{
                color: "#666",
                lineHeight: 1.8,
                fontSize: 14,
                margin: 0,
              }}
            >
              후드 교체 상담 시 쿠폰 사용을 알려주세요.
            </p>
          </div>

          <div
            style={{
              maxWidth: 950,
              margin: "0 auto",
              background: "#fff",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow:
                "0 10px 35px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "2 / 1",
                background: "#f3eee6",
              }}
            >
              <Image
                src="/8BE994D5-1983-4D8D-8C74-999E637E17EA.png"
                alt="후드의정석 주방후드 교체 시공비 1만원 할인 쿠폰"
                fill
                sizes="(max-width: 768px) 100vw, 950px"
                style={{
                  objectFit: "contain",
                }}
              />
            </div>

            <div
              style={{
                padding: "22px 22px 25px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: "#666",
                  fontSize: 13,
                  lineHeight: 1.8,
                  margin: "0 0 17px",
                }}
              >
                후드 교체 시 사용 가능 · 상담 시 쿠폰 사용 여부를 말씀해주세요.
              </p>

              <a
                href={SITE.phoneHref}
                style={{
                  display: "inline-block",
                  background: "#171717",
                  color: "#fff",
                  padding: "15px 24px",
                  borderRadius: 9,
                  textDecoration: "none",
                  fontWeight: 900,
                  fontSize: 14,
                }}
              >
                쿠폰 사용하고 전화상담
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
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

          <h2 style={sectionTitleStyle}>
            후드 교체 전문 분야
          </h2>

          <p
            style={{
              color: "#666",
              lineHeight: 1.8,
              fontSize: 14,
            }}
          >
            주방 구조와 후드 종류에 맞는 교체 서비스를 확인하세요.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 290px), 1fr))",
            gap: 20,
          }}
        >
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
                    objectFit: "contain",
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
                  {item.title} 자세히 보기
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* BEFORE REPLACEMENT */}
      <section
        style={{
          background: "#fff",
          padding: "75px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 1160,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            <h2 style={sectionTitleStyle}>
              주방후드 교체 전 확인 사항
            </h2>
            <p
              style={{
                color: "#666",
                fontSize: 14,
                lineHeight: 1.9,
              }}
            >
              같은 크기의 후드라도 설치 환경에 따라 필요한 작업이 달라질 수 있습니다.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
              gap: 15,
            }}
          >
            {checks.map((item, index) => (
              <article
                key={item.title}
                style={{
                  border: "1px solid #e9e5dd",
                  borderRadius: 12,
                  padding: 24,
                  background: "#faf9f6",
                }}
              >
                <div
                  style={{
                    color: "#a78047",
                    fontSize: 13,
                    fontWeight: 900,
                    marginBottom: 13,
                  }}
                >
                  CHECK {String(index + 1).padStart(2, "0")}
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

      {/* PROCESS */}
      <section
        style={{
          background: "#faf9f6",
          padding: "75px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 1160,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: 30,
            }}
          >
            <h2 style={sectionTitleStyle}>
              후드 교체 상담부터 설치 확인까지
            </h2>
            <p
              style={{
                color: "#666",
                fontSize: 14,
                lineHeight: 1.9,
              }}
            >
              제품과 현장 상태에 따라 실제 작업 내용은 달라질 수 있습니다.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
              gap: 15,
            }}
          >
            {steps.map((step) => (
              <article
                key={step.number}
                style={{
                  background: "#fff",
                  border: "1px solid #e7e3dc",
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    color: "#a78047",
                    fontWeight: 900,
                    marginBottom: 14,
                  }}
                >
                  {step.number}
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
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* REGIONS */}
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
              서울·경기·인천·부산·대구·대전·광주·울산을 비롯한 전국 지역별
              주방후드 교체 상담 안내를 확인하세요.
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
          기존 후드 사진과 제품 모델명, 설치 지역을 알려주시면
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
        <div>© {new Date().getFullYear()} 후드의정석</div>
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
