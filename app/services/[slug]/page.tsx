
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  SITE,
  services,
  getService,
} from "../../../lib/services";

import { regions } from "../../../lib/regions";

/* =====================================
   기본 설정
===================================== */

const BASE_URL = SITE.url.replace(/\/+$/, "");

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* =====================================
   서비스별 사진
===================================== */

const serviceImages: Record<string, string> = {
  "kitchen-hood":
    "/12B08037-6AD2-4EF2-AB3F-2F9FAA2EE6A2.png",

  "island-hood":
    "/310B47AA-B344-4A17-9160-AC277DBF595E.png",

  "chimney-hood":
    "/10D74E67-C29E-41AD-85D7-64D8092D6C4D.png",
};

/* =====================================
   정적 페이지 생성
===================================== */

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

/* =====================================
   SEO 메타데이터
===================================== */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const service = getService(slug);

  if (!service) {
    return {
      title: "서비스를 찾을 수 없습니다",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const url = `${BASE_URL}/services/${slug}`;

  return {
    title: {
      absolute: `${service.title} | ${SITE.name}`,
    },

    description: service.description,

    keywords: service.keywords,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: `${service.title} | ${SITE.name}`,
      description: service.description,
      url,
      siteName: SITE.name,
      locale: "ko_KR",
      type: "website",
      images: [
        {
          url: serviceImages[slug],
          alt: `${service.name} 작업 전후`,
        },
      ],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

/* =====================================
   서비스 상세 페이지
===================================== */

export default async function ServicePage({
  params,
}: PageProps) {
  const { slug } = await params;

  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const pageUrl = `${BASE_URL}/services/${slug}`;

  const image = serviceImages[slug];

  const schema = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: service.name,
        description: service.description,
        serviceType: service.name,

        provider: {
          "@id": `${BASE_URL}/#organization`,
        },

        areaServed: {
          "@type": "Country",
          name: "대한민국",
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
            item: BASE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: service.name,
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
            maxWidth: 1120,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 15,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              color: "#171717",
              fontSize: 23,
              fontWeight: 900,
              textDecoration: "none",
            }}
          >
            후드의정석
          </Link>

          <a
            href={SITE.phoneHref}
            style={{
              padding: "12px 17px",
              background: "#171717",
              color: "#fff",
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
          background: "#171717",
          color: "#fff",
          padding: "65px 20px",
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
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: "2px",
            }}
          >
            HOOD MASTER SERVICE
          </p>

          <h1
            style={{
              fontSize: "clamp(30px, 5vw, 46px)",
              lineHeight: 1.4,
              margin: "15px 0 20px",
              fontWeight: 900,
            }}
          >
            {service.title}
          </h1>

          <p
            style={{
              color: "#ddd",
              lineHeight: 1.9,
              fontSize: 15,
              margin: 0,
            }}
          >
            {service.description}
          </p>
        </div>
      </section>

      {/* BREADCRUMB */}
      <nav
        aria-label="현재 위치"
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "22px 20px",
          fontSize: 13,
          color: "#777",
        }}
      >
        <Link href="/" style={{ color: "inherit" }}>
          홈
        </Link>
        {" / "}
        {service.name}
      </nav>

      {/* IMAGE */}
      <section
        style={{
          maxWidth: 1050,
          margin: "0 auto",
          padding: "20px 20px 65px",
        }}
      >
        <h2
          style={{
            fontSize: 27,
            margin: "0 0 22px",
          }}
        >
          {service.name} 작업 사진
        </h2>

        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            background: "#eee",
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          <Image
            src={image}
            alt={`${service.name} 시공 전후 비교`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1050px"
            style={{
              objectFit: "contain",
            }}
          />
        </div>

        <p
          style={{
            color: "#777",
            fontSize: 13,
            lineHeight: 1.8,
            marginTop: 15,
          }}
        >
          제품 형태와 설치 환경에 따라
          실제 작업 방식은 달라질 수 있습니다.
        </p>
      </section>

      {/* TYPES */}
      <section
        style={{
          background: "#fff",
          padding: "65px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
          }}
        >
          <h2 style={{ fontSize: 27 }}>
            {service.name} 종류
          </h2>

          <p
            style={{
              color: "#666",
              lineHeight: 1.9,
            }}
          >
            기존 후드의 종류와 규격에 따라
            교체 가능 여부가 달라질 수 있습니다.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
              gap: 13,
              marginTop: 25,
            }}
          >
            {service.types.map((type) => (
              <div
                key={type}
                style={{
                  background: "#faf9f6",
                  padding: 21,
                  border: "1px solid #e7e3dc",
                  borderRadius: 10,
                  fontWeight: 700,
                }}
              >
                {type}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        style={{
          padding: "65px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
          }}
        >
          <h2 style={{ fontSize: 27 }}>
            교체 전 확인 사항
          </h2>

          <div
            style={{
              display: "grid",
              gap: 12,
              marginTop: 25,
            }}
          >
            {service.features.map((feature, index) => (
              <div
                key={feature}
                style={{
                  padding: "18px 22px",
                  border: "1px solid #e7e3dc",
                  borderRadius: 10,
                  background: "#fff",
                  lineHeight: 1.8,
                }}
              >
                <strong
                  style={{
                    color: "#a78047",
                    marginRight: 13,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </strong>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section
        style={{
          padding: "65px 20px",
          background: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
          }}
        >
          <h2 style={{ fontSize: 27 }}>
            {service.name} 진행 과정
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 190px), 1fr))",
              gap: 13,
              marginTop: 25,
            }}
          >
            {service.process.map((step, index) => (
              <article
                key={step}
                style={{
                  border: "1px solid #e7e3dc",
                  borderRadius: 10,
                  padding: 22,
                  background: "#faf9f6",
                }}
              >
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 900,
                    color: "#a78047",
                    marginBottom: 12,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <p
                  style={{
                    lineHeight: 1.8,
                    fontSize: 14,
                    margin: 0,
                  }}
                >
                  {step}
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
            }}
          >
            전국 {service.name} 지역 안내
          </h2>

          <p
            style={{
              color: "#666",
              lineHeight: 1.9,
              margin: "0 0 25px",
            }}
          >
            지역을 선택하면 해당 지역의
            주방후드 교체 상담 정보를 확인할 수 있습니다.
            방문 가능 여부는 상담 시 확인해주세요.
          </p>

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
                  background: "#fff",
                  padding: "16px 12px",
                  textAlign: "center",
                  borderRadius: 9,
                  border: "1px solid #e5e1d9",
                  color: "#333",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 800,
                }}
              >
                {region.name}
              </Link>
            ))}
          </div>

          <div
            style={{
              marginTop: 25,
              textAlign: "center",
            }}
          >
            <Link
              href="/area"
              style={{
                color: "#96713e",
                fontWeight: 900,
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
          padding: "65px 20px",
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
              textAlign: "center",
              margin: "0 0 28px",
            }}
          >
            {service.name} 자주 묻는 질문
          </h2>

          <div
            style={{
              display: "grid",
              gap: 12,
            }}
          >
            {service.faqs.map((faq) => (
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
        </div>
      </section>

      {/* CONTACT */}
      <section
        style={{
          background: "#171717",
          color: "#fff",
          padding: "65px 20px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: 28,
            margin: "0 0 15px",
          }}
        >
          {service.name} 상담
        </h2>

        <p
          style={{
            color: "#ddd",
            lineHeight: 1.9,
            margin: "0 0 25px",
          }}
        >
          기존 후드 사진과 모델명,
          설치 지역을 준비해 상담해주세요.
        </p>

        <a
          href={SITE.phoneHref}
          style={{
            display: "inline-block",
            padding: "17px 30px",
            background: "#a78047",
            color: "#fff",
            borderRadius: 9,
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
          padding: "30px 20px 105px",
          textAlign: "center",
          fontSize: 13,
          lineHeight: 2,
        }}
      >
        <strong style={{ color: "#fff" }}>
          후드의정석
        </strong>

        <div>{service.name} 상담</div>
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
