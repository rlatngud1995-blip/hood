import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { regions } from "../lib/regions";
import { SITE } from "../lib/services";

const BASE_URL = SITE.url.replace(/\/+$/, "");

export const metadata: Metadata = {
  title: {
    absolute: "후드의정석 | 전국 주방후드·렌지후드 교체 전문",
  },
  description:
    "전국 주방후드, 렌지후드, 침니후드, 아일랜드후드 교체 및 설치 비용, 규격 확인, 배기덕트 점검 전문 상담 안내.",
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "후드의정석 | 전국 주방후드·렌지후드 교체",
    description:
      "주방후드 교체 전 확인 사항부터 제품 종류, 설치 조건, 지역별 맞춤 상담 안내.",
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
      "아파트, 빌라, 단독주택의 노후된 주방후드 및 렌지후드 교체를 전문적으로 안내합니다. 기존 후드의 가로 폭 규격과 싱크대 상부장 설치장 구조, 배기구 연결 상태를 꼼꼼히 확인하여 안전하고 깔끔하게 교체해 드립니다.",
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
      "주방 중앙 대면형 조리 공간에 설치된 천장형 아일랜드후드 교체를 안내합니다. 천장 내부의 튼튼한 고정 방식과 배기덕트 위치, 주방 인테리어에 맞는 제품 크기를 함께 고려하여 안전하게 설치합니다.",
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
      "주방 벽면에 설치하는 세련된 디자인의 침니형, 데코형, 굴뚝형 후드 교체를 안내합니다. 벽체 고정 상태와 배기구 위치, 상부 마감 커버 범위를 정확히 측정하여 빈틈없이 시공합니다.",
    keywords: [
      "침니 렌지후드",
      "데코후드 교체",
      "굴뚝형 후드 교체",
    ],
  },
];

const checks = [
  {
    title: "기존 후드 규격 확인",
    description:
      "후드의 가로 폭(예: 600mm, 900mm)과 높이, 상부장 내부 공간을 확인합니다. 기존 제품의 브랜드와 모델명을 알고 계시면 규격 확인과 제품선정에 큰 도움이 됩니다.",
  },
  {
    title: "배기덕트 연결 상태",
    description:
      "싱크대 상부장 내부 배기관(자바라)의 위치와 연결 방식, 기름때로 인한 손상 여부를 살펴봅니다. 새 후드와 배기구 위치가 다를 경우 연장 및 보완 작업이 필요합니다.",
  },
  {
    title: "전원 및 고정 구조",
    description:
      "후드 작동을 위한 전원 콘센트 위치와 전기 연결 방식, 벽면 또는 천장에 안전하게 지지되어 있는 고정 구조를 세심하게 점검합니다.",
  },
  {
    title: "추가 마감 및 보수 작업",
    description:
      "기존 후드를 철거한 뒤 노출되는 타일 벽면이나 가구 틈새, 오염 부위에 별도의 마감 작업이나 청소가 필요한지 미리 확인하여 깔끔한 마무리를 유도합니다.",
  },
];

const steps = [
  {
    number: "01",
    title: "기존 후드 사진 및 모델 확인",
    description:
      "현재 설치되어 있는 주방후드의 전체 사진과 내부 라벨의 모델명, 설치 지역을 문자나 전화로 편하게 알려주세요.",
  },
  {
    number: "02",
    title: "맞춤 교체 조건 상담",
    description:
      "고객님의 주방 규격과 설치 구조를 바탕으로 교체 가능 여부 및 현장에 적합한 최적의 후드 제품을 안내해 드립니다.",
  },
  {
    number: "03",
    title: "합리적인 비용 및 일정 조율",
    description:
      "제품 비용과 현장 난이도에 따른 투명한 예상 비용을 산정하고, 고객님이 원하시는 방문 가능 일정을 조율합니다.",
  },
  {
    number: "04",
    title: "전문 시공 및 작동 테스트",
    description:
      "베테랑 기사님이 방문하여 기존 후드 안전 철거, 새 제품 완벽 설치 후 배기 성능과 소음, 정상 작동 여부를 최종 점검합니다.",
  },
];

const faqs = [
  {
    question: "오래되고 단종된 주방후드도 교체할 수 있나요?",
    answer:
      "네, 충분히 교체 가능합니다. 오래된 구형 모델이거나 단종된 제품이라도 현재 나오는 표준 규격 제품들로 대부분 호환 설치가 가능합니다. 기존 후드의 전체 사진과 모델명을 촬영해 보내주시면 정확한 호환 제품을 안내해 드립니다.",
  },
  {
    question: "후황, 렌지후드, 주방후드는 다 같은 말인가요?",
    answer:
      "네, 모두 같은 의미로 사용되는 표현입니다. 일상에서는 흔히 '후황'이나 '렌지후드'로 부르며, 공식 명칭은 주방 환기후드 또는 레인지후드입니다. 설치 형태에 따라 슬림후드, 빌트인후드, 침니후드, 아일랜드후드로 분류됩니다.",
  },
  {
    question: "주방후드 교체 비용은 대략 얼마인가요?",
    answer:
      "후드 교체 비용은 선택하시는 제품의 종류(슬림형, 침니형, 아일랜드형 등)와 사이즈, 기존 후드 철거의 난이도, 배기덕트 연장 여부, 추가 마감 작업 유무에 따라 달라집니다. 현장 사진을 보내주시면 상세하고 투명한 견적을 안내해 드립니다.",
  },
  {
    question: "아일랜드 천장형 후드도 교체 시공이 가능 한가요?",
    answer:
      "네, 가능합니다. 아일랜드후드는 일반 벽면형 후드와 달리 천장 고정 구조와 배기덕트 위치가 매우 중요하므로, 현장 천장 구조를 확인한 후 안전하고 튼튼하게 교체 작업을 진행해 드립니다.",
  },
  {
    question: "후드 교체를 신청하기 전에 무엇을 준비해야 하나요?",
    answer:
      "현재 설치되어 있는 주방후드의 전체 모습 사진, 제품에 부착된 모델명 스티커 사진, 설치되어 있는 주방의 대략적인 가로 폭, 그리고 방문 지역을 미리 준비해 주시면 훨씬 빠르고 정확한 상담이 가능합니다.",
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
              0%, 29% { opacity: 1; transform: scale(1); }
              34%, 95% { opacity: 0; transform: scale(1.05); }
              100% { opacity: 1; transform: scale(1); }
            }
            @keyframes hoodSlide2 {
              0%, 29% { opacity: 0; transform: scale(1.05); }
              34%, 62% { opacity: 1; transform: scale(1); }
              67%, 100% { opacity: 0; transform: scale(1.05); }
            }
            @keyframes hoodSlide3 {
              0%, 62% { opacity: 0; transform: scale(1.05); }
              67%, 95% { opacity: 1; transform: scale(1); }
              100% { opacity: 0; transform: scale(1.05); }
            }
            .hood-slide-1 { animation: hoodSlide1 12s infinite ease-in-out; }
            .hood-slide-2 { animation: hoodSlide2 12s infinite ease-in-out; }
            .hood-slide-3 { animation: hoodSlide3 12s infinite ease-in-out; }
            @media (prefers-reduced-motion: reduce) {
              .hood-slide-1 { animation: none; opacity: 1 !important; }
              .hood-slide-2, .hood-slide-3 { animation: none; opacity: 0 !important; }
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
              textShadow: "0 3px 15px rgba(0,0,0,0.45)",
            }}
          >
            전국 주방후드 교체 전문
            <br />
            후드의정석 공식 홈페이지
          </h1>

          <p
            style={{
              color: "#ededed",
              fontSize: 16,
              lineHeight: 2,
              margin: "0 0 30px",
              textShadow: "0 2px 10px rgba(0,0,0,0.6)",
            }}
          >
            가정용 렌지후드 · 후황 · 주방후드 교체 및
            <br />
            아일랜드후드 · 침니후드 전문 설치 상담 안내
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
              boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
            }}
          >
            전화상담 바로가기 {SITE.phone}
          </a>
        </div>
      </section>

      {/* SEO를 위한 숨김없는 메인 소개 텍스트 블록 (네이버 검색엔진 최적화 핵심) */}
      <section
        style={{
          background: "#fff",
          padding: "50px 20px",
          borderBottom: "1px solid #eee",
        }}
      >
        <div style={{ maxWidth: 850, margin: "0 auto", textAlign: "left" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 15, color: "#111" }}>
            전국 주방후드·렌지후드 교체 완벽 가이드
          </h2>
          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.9, margin: "0 0 15px" }}>
            안녕하세요, <strong>후드의정석</strong>입니다. 저희는 서울, 경기, 인천을 포함한 전국 각 지역에서 가정용 주방후드, 렌지후드, 후황, 침니후드, 아일랜드후드 교체 및 설치 시공을 전문적으로 지원하고 있습니다. 오래 사용하여 흡입력이 떨어지거나 소음이 심해진 주방후드는 요리 시 발생하는 유증기와 연기를 제대로 배출하지 못해 실내 공기질을 악화시킬 수 있습니다.
          </p>
          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.9, margin: 0 }}>
            기존에 설치된 제품의 규격과 배기구 환경을 정확히 파악하여 안전하게 교체하는 것이 무엇보다 중요합니다. 후드의정석에서는 풍부한 현장 경험과 노하우를 바탕으로 고객님의 주방 구조에 가장 알맞은 제품 선정부터 깔끔한 철거 및 설치까지 투명하게 상담해 드립니다.
          </p>
        </div>
      </section>

      {/* COUPON */}
      <section style={{ background: "#fff8ee", padding: "55px 0" }}>
        <div style={container}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <p style={{ color: "#a78047", fontWeight: 900, fontSize: 12, letterSpacing: "2px", margin: "0 0 10px" }}>
              SPECIAL COUPON
            </p>
            <h2 style={{ fontSize: 28, margin: "0 0 10px" }}>시공비 10,000원 할인 이벤트</h2>
            <p style={{ color: "#666", lineHeight: 1.8, fontSize: 14, margin: 0 }}>
              후드 교체 상담 시 할인 쿠폰 사용을 말씀해 주시면 혜택을 적용해 드립니다.
            </p>
          </div>

          <div style={{ maxWidth: 950, margin: "0 auto", background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 10px 35px rgba(0,0,0,0.08)" }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "2 / 1", background: "#f3eee6" }}>
              <Image
                src="/8BE994D5-1983-4D8D-8C74-999E637E17EA.png"
                alt="후드의정석 주방후드 교체 시공비 1만원 할인 쿠폰"
                fill
                sizes="(max-width: 768px) 100vw, 950px"
                style={{ objectFit: "contain" }}
              />
            </div>
            <div style={{ padding: "22px 22px 25px", textAlign: "center" }}>
              <p style={{ color: "#666", fontSize: 13, lineHeight: 1.8, margin: "0 0 17px" }}>
                주방후드 교체 시 사용 가능 · 전화 상담 시 쿠폰 사용 의사를 꼭 말씀해 주세요.
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
                쿠폰 사용하고 전화상담 연결
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ ...container, paddingTop: 75, paddingBottom: 75 }}>
        <div style={{ textAlign: "center", marginBottom: 35 }}>
          <p style={{ color: "#a78047", fontWeight: 900, fontSize: 12, letterSpacing: "2px" }}>
            OUR SERVICES
          </p>
          <h2 style={sectionTitleStyle}>주방후드 교체 전문 분야</h2>
          <p style={{ color: "#666", lineHeight: 1.8, fontSize: 14 }}>
            주방 구조와 후드 종류에 딱 맞는 맞춤형 교체 서비스를 확인해 보세요.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 290px), 1fr))", gap: 20 }}>
          {categories.map((item) => (
            <article key={item.title} style={{ background: "#fff", border: "1px solid #e7e3dc", borderRadius: 13, overflow: "hidden" }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3", background: "#eee" }}>
                <Image src={item.image} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "contain" }} />
              </div>
              <div style={{ padding: 23 }}>
                <p style={{ color: "#a78047", fontWeight: 900, fontSize: 11, letterSpacing: "1px", margin: "0 0 9px" }}>
                  {item.subtitle}
                </p>
                <h3 style={{ fontSize: 21, margin: "0 0 13px" }}>{item.title}</h3>
                <p style={{ color: "#666", lineHeight: 1.9, fontSize: 14, margin: "0 0 18px" }}>
                  {item.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 22 }}>
                  {item.keywords.map((keyword) => (
                    <span key={keyword} style={{ background: "#f5f2ed", padding: "7px 9px", borderRadius: 6, fontSize: 11, color: "#6c6257" }}>
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
      <section style={{ background: "#fff", padding: "75px 20px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={sectionTitleStyle}>주방후드 교체 전 반드시 확인해야 할 사항</h2>
            <p style={{ color: "#666", fontSize: 14, lineHeight: 1.9 }}>
              비슷한 크기의 후드 교체라 할지라도 현장 설치 환경과 규격에 따라 필요한 작업이 달라집니다.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 15 }}>
            {checks.map((item, index) => (
              <article key={item.title} style={{ border: "1px solid #e9e5dd", borderRadius: 12, padding: 24, background: "#faf9f6" }}>
                <div style={{ color: "#a78047", fontSize: 13, fontWeight: 900, marginBottom: 13 }}>
                  CHECK {String(index + 1).padStart(2, "0")}
                </div>
                <h3 style={{ fontSize: 18, margin: "0 0 12px" }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.9, margin: 0 }}>
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ background: "#faf9f6", padding: "75px 20px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <h2 style={sectionTitleStyle}>후드 교체 상담부터 안전 설치까지의 과정</h2>
            <p style={{ color: "#666", fontSize: 14, lineHeight: 1.9 }}>
              체계적인 절차를 통해 고객님의 주방에 가장 안전하고 깔끔한 시공을 약속드립니다.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 15 }}>
            {steps.map((step) => (
              <article key={step.number} style={{ background: "#fff", border: "1px solid #e7e3dc", borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 28, color: "#a78047", fontWeight: 900, marginBottom: 14 }}>
                  {step.number}
                </div>
                <h3 style={{ fontSize: 18, margin: "0 0 12px" }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.9, margin: 0 }}>
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* REGIONS */}
      <section style={{ background: "#f0ece4", padding: "75px 0" }}>
        <div style={container}>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <h2 style={{ fontSize: 29, margin: "0 0 13px" }}>전국 지역별 주방후드 교체 서비스 안내</h2>
            <p style={{ color: "#666", fontSize: 14, lineHeight: 1.9 }}>
              서울, 경기, 인천, 부산, 대구, 대전, 광주, 울산을 비롯한 전국 모든 지역에서 주방후드 교체 상담이 가능합니다.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", gap: 10 }}>
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

          <div style={{ textAlign: "center", marginTop: 30 }}>
            <Link href="/area" style={{ color: "#96713e", fontWeight: 900, fontSize: 15 }}>
              전국 지역 전체 보기 및 상세 안내 →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#fff", padding: "75px 20px" }}>
        <div style={{ maxWidth: 850, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 29, margin: "0 0 30px" }}>
            주방후드 교체 관련 자주 묻는 질문 (FAQ)
          </h2>

          <div style={{ display: "grid", gap: 12 }}>
            {faqs.map((faq) => (
              <details key={faq.question} style={{ border: "1px solid #e5e5e5", borderRadius: 10, padding: "20px 22px" }}>
                <summary style={{ fontWeight: 800, fontSize: 15, lineHeight: 1.8, cursor: "pointer" }}>
                  {faq.question}
                </summary>
                <p style={{ color: "#666", lineHeight: 1.9, fontSize: 14, margin: "15px 0 0" }}>
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ background: "#171717", color: "#fff", textAlign: "center", padding: "75px 20px" }}>
        <h2 style={{ fontSize: 30, margin: "0 0 15px" }}>전국 주방후드 교체 전문 상담</h2>
        <p style={{ color: "#d0d0d0", lineHeight: 1.9, margin: "0 0 25px" }}>
          기존 후드 전체 사진, 제품 모델명, 설치 지역을 미리 준비해 주시면 더욱 신속하고 정확한 상담이 가능합니다.
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
          전화상담 연결하기 {SITE.phone}
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#111", color: "#bcbcbc", textAlign: "center", padding: "30px 20px 105px", fontSize: 13, lineHeight: 2 }}>
        <strong style={{ color: "#fff" }}>후드의정석</strong>
        <div>전국 주방후드·렌지후드 교체 전문 상담 센터</div>
        <div>대표 연락처: {SITE.phone}</div>
        <div>© {new Date().getFullYear()} 후드의정석. All rights reserved.</div>
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
          boxShadow: "0 6px 25px rgba(0,0,0,0.18)",
        }}
      >
        전화상담 바로가기 · {SITE.phone}
      </a>
    </main>
  );
}
