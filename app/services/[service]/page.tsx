
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SITE } from "../../../lib/services";

type Props = {
  params: Promise<{ service: string }>;
};

const services = {
  "kitchen-hood": {
    title: "주방후드 교체",
    subtitle: "KITCHEN HOOD",
    image:
      "/12B08037-6AD2-4EF2-AB3F-2F9FAA2EE6A2.png",
    description:
      "주방후드, 렌지후드, 후황, " +
      "빌트인후드, 슬림후드, 통후드, " +
      "허리케인후드 교체 상담",
    details: [
      "가정집 주방후드 교체",
      "아파트 렌지후드 교체",
      "후황 및 슬림후드 교체",
      "빌트인후드 및 통후드 교체",
      "허리케인후드 교체",
    ],
  },
  "island-hood": {
    title: "아일랜드후드 교체",
    subtitle: "ISLAND HOOD",
    image:
      "/310B47AA-B344-4A17-9160-AC277DBF595E.png",
    description:
      "천장에 설치된 아일랜드형 주방후드의 " +
      "교체 상담. 천장 고정 구조, " +
      "전원 및 배기덕트 연결 상태를 확인합니다.",
    details: [
      "아일랜드 주방후드 교체",
      "천장형 렌지후드 교체",
      "아일랜드 후황 교체",
      "기존 후드 철거 및 교체 상담",
    ],
  },
  "chimney-hood": {
    title: "침니후드 교체",
    subtitle: "CHIMNEY HOOD",
    image:
      "/10D74E67-C29E-41AD-85D7-64D8092D6C4D.png",
    description:
      "벽면에 설치된 침니형, 데코형, " +
      "굴뚝형 주방후드의 교체 상담. " +
      "벽면 고정 방식과 배기 연결을 확인합니다.",
    details: [
      "침니형 주방후드 교체",
      "데코후드 교체",
      "굴뚝형 렌지후드 교체",
      "벽부형 주방후드 교체",
    ],
  },
} as const;

type ServiceKey = keyof typeof services;

function getService(slug: string) {
  if (Object.prototype.hasOwnProperty.call(services, slug)) {
    return services[slug as ServiceKey];
  }
  return null;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(services).map((service) => ({
    service,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { service } = await params;
  const data = getService(service);

  if (!data) {
    return {
      title: "페이지를 찾을 수 없습니다",
      robots: { index: false, follow: false },
    };
  }

  const url = `${SITE.url}/services/${service}`;

  return {
    title: {
      absolute: `${data.title} | 후드의정석`,
    },
    description: data.description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${data.title} | 후드의정석`,
      description: data.description,
      url,
      siteName: SITE.name,
      locale: "ko_KR",
      type: "website",
    },
  };
}

const container = {
  maxWidth: 1000,
  margin: "0 auto",
  padding: "0 20px",
};

export default async function ServicePage({
  params,
}: Props) {
  const { service } = await params;
  const data = getService(service);

  if (!data) notFound();

  const pageUrl =
    `${SITE.url}/services/${service}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    serviceType: data.title,
    description: data.description,
    url: pageUrl,
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.phone,
    },
    areaServed: {
      "@type": "Country",
      name: "대한민국",
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
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "#171717",
              textDecoration: "none",
            }}
          >
            후드의정석
          </Link>

          <a
            href={SITE.phoneHref}
            style={{
              background: "#171717",
              color: "#fff",
              padding: "12px 14px",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 800,
              fontSize: 13,
            }}
          >
            전화상담
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        style={{
          background: "#171717",
          color: "#fff",
          textAlign: "center",
          padding: "65px 20px",
        }}
      >
        <p
          style={{
            color: "#d5b47b",
            fontWeight: 900,
            letterSpacing: "2px",
            fontSize: 12,
          }}
        >
          {data.subtitle}
        </p>

        <h1
          style={{
            fontSize: "clamp(30px, 5vw, 44px)",
            margin: "16px 0",
          }}
        >
          {data.title}
        </h1>

        <p
          style={{
            maxWidth: 650,
            margin: "0 auto",
            color: "#d2d2d2",
            lineHeight: 1.9,
          }}
        >
          {data.description}
        </p>
      </section>

      {/* CONTENT */}
      <section
        style={{
          ...container,
          paddingTop: 45,
          paddingBottom: 65,
        }}
      >
        <nav
          aria-label="현재 위치"
          style={{
            marginBottom: 25,
            color: "#777",
            fontSize: 13,
          }}
        >
          <Link href="/" style={{ color: "inherit" }}>
            홈
          </Link>
          {" / "}
          {data.title}
        </nav>

        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "4 / 3",
            background: "#eee",
            borderRadius: 12,
            overflow: "hidden",
            marginBottom: 40,
          }}
        >
          <Image
            src={data.image}
            alt={`${data.title} 시공 전후 사진`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1000px"
            style={{ objectFit: "contain" }}
          />
        </div>

        <h2
          style={{
            fontSize: 25,
            marginBottom: 20,
          }}
        >
          {data.title} 안내
        </h2>

        <p
          style={{
            color: "#555",
            lineHeight: 2,
            marginBottom: 35,
          }}
        >
          후드 교체는 기존 제품의 규격,
          설치 공간, 배기덕트 연결 상태에
          따라 작업 방법이 달라집니다.
          기존 후드 사진과 모델명을 확인하면
          교체 가능 여부와 필요한 작업을
          상담하는 데 도움이 됩니다.
        </p>

        <h2
          style={{
            fontSize: 24,
            marginBottom: 20,
          }}
        >
          주요 교체 항목
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: 12,
            marginBottom: 45,
          }}
        >
          {data.details.map((item) => (
            <div
              key={item}
              style={{
                background: "#fff",
                border: "1px solid #e7e3dc",
                padding: 20,
                borderRadius: 10,
                fontWeight: 700,
                lineHeight: 1.8,
              }}
            >
              ✓ {item}
            </div>
          ))}
        </div>

        <h2
          style={{
            fontSize: 24,
            marginBottom: 18,
          }}
        >
          전국 지역별 후드 교체
        </h2>

        <p
          style={{
            color: "#666",
            lineHeight: 1.9,
            marginBottom: 20,
          }}
        >
          서울, 경기, 인천, 충남, 충북을 비롯한
          전국 시·군·구별 후드 교체
          안내 페이지를 확인할 수 있습니다.
        </p>

        <Link
          href="/area"
          style={{
            display: "inline-block",
            background: "#171717",
            color: "#fff",
            padding: "15px 23px",
            borderRadius: 9,
            textDecoration: "none",
            fontWeight: 800,
          }}
        >
          전국 지역 선택하기
        </Link>
      </section>

      {/* CONTACT */}
      <section
        style={{
          background: "#f0ece4",
          textAlign: "center",
          padding: "65px 20px",
        }}
      >
        <h2
          style={{
            fontSize: 26,
            marginBottom: 15,
          }}
        >
          {data.title} 상담
        </h2>

        <p
          style={{
            color: "#555",
            lineHeight: 1.9,
            marginBottom: 25,
          }}
        >
          기존 제품 사진, 모델명,
          설치 지역을 알려주세요.
        </p>

        <a
          href={SITE.phoneHref}
          style={{
            display: "inline-block",
            background: "#171717",
            color: "#fff",
            padding: "17px 28px",
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
          background: "#171717",
          color: "#ccc",
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
      </footer>

      {/* MOBILE CALL */}
      <a
        href={SITE.phoneHref}
        style={{
          position: "fixed",
          left: 16,
          right: 16,
          bottom: 14,
          zIndex: 50,
          background: "#a78047",
          color: "#fff",
          padding: "17px 20px",
          borderRadius: 12,
          textAlign: "center",
          textDecoration: "none",
          fontWeight: 900,
          boxShadow:
            "0 6px 25px rgba(0,0,0,0.18)",
        }}
      >
        전화상담 바로가기 · {SITE.phone}
      </a>
    </main>
  );
}
