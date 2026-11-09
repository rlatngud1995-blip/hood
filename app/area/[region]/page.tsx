
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getRegion, regions } from "../../../lib/regions";
import { SITE, services } from "../../../lib/services";

type PageProps = {
  params: Promise<{ region: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return regions.map((region) => ({
    region: region.slug,
  }));
}

function getAreaText(
  regionName: string,
  districtNames: string[]
) {
  const examples = districtNames.slice(0, 5).join(", ");

  return {
    introduction:
      `${regionName} 지역에서 주방후드 교체를 알아보고 ` +
      `계신다면 기존 후드의 종류와 설치 구조를 먼저 ` +
      `확인하는 것이 좋습니다. 일반 주방후드, ` +
      `아일랜드후드, 침니후드 등은 설치 형태와 ` +
      `배기 연결 방식에 따라 확인할 사항이 다릅니다.`,

    districts:
      examples
        ? `${regionName} 지역 안내에서는 ${examples} 등 ` +
          `${districtNames.length}개 지역의 상세 안내를 ` +
          `확인할 수 있습니다. 실제 방문 및 작업 가능 ` +
          `여부는 상담을 통해 확인해 주세요.`
        : `${regionName} 지역의 후드 교체 상담과 ` +
          `작업 가능 여부를 확인해 주세요.`,

    preparation:
      `후드 교체를 문의하기 전 제품 전체 사진, ` +
      `기존 후드의 가로 크기, 설치 공간, ` +
      `배기구 위치를 확인하면 상담에 도움이 됩니다. ` +
      `제품 모델명을 알고 있다면 함께 알려주세요.`,
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { region: slug } = await params;
  const region = getRegion(slug);

  if (!region) {
    return {
      title: "지역을 찾을 수 없습니다 | 후드의정석",
      robots: { index: false, follow: false },
    };
  }

  const title =
    `${region.name} 주방후드 교체·렌지후드 교체 | 후드의정석`;

  const description =
    `${region.name} 주방후드, 렌지후드, 아일랜드후드, ` +
    `침니후드 교체 상담 안내. ` +
    `${region.districts.length}개 지역별 안내와 ` +
    `후드 교체 전 확인사항을 살펴보세요. ` +
    `문의 ${SITE.phone}.`;

  const url = `${SITE.url}/area/${region.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
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
  const { region: slug } = await params;
  const region = getRegion(slug);

  if (!region) notFound();

  const pageUrl = `${SITE.url}/area/${region.slug}`;

  const districtNames = region.districts.map(
    (district) => district.name
  );

  const content = getAreaText(
    region.name,
    districtNames
  );

  const faqs = [
    {
      question:
        `${region.name}에서 어떤 종류의 후드를 교체할 수 있나요?`,
      answer:
        "일반 주방후드, 렌지후드, 아일랜드후드, " +
        "침니후드 등 다양한 제품의 교체를 상담할 수 " +
        "있습니다. 실제 작업 가능 여부는 기존 설치 " +
        "상태와 제품 규격 확인 후 안내합니다.",
    },
    {
      question: "기존 후드와 다른 제품으로 교체할 수 있나요?",
      answer:
        "설치 공간, 후드 크기, 배기구 위치, " +
        "고정 방식이 맞는지 확인해야 합니다. " +
        "제품 사진과 규격을 전달하면 상담에 도움이 됩니다.",
    },
    {
      question: "후드 교체 전에 무엇을 준비해야 하나요?",
      answer:
        "기존 후드의 전체 사진과 모델명, " +
        "가로 크기, 설치 지역을 확인해 주세요. " +
        "배기 연결 부분의 사진도 있으면 좋습니다.",
    },
    {
      question:
        `${region.name} 모든 지역에서 작업이 가능한가요?`,
      answer:
        "지역별 방문 및 작업 가능 여부는 " +
        "일정과 현장 조건에 따라 달라질 수 있습니다. " +
        "정확한 주소와 작업 내용을 알려주시면 " +
        "상담을 통해 확인할 수 있습니다.",
    },
  ];

  const breadcrumbs = [
    { name: "홈", url: SITE.url },
    { name: "전국 지역 안내", url: `${SITE.url}/area` },
    { name: region.name, url: pageUrl },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${region.name} 후드 교체 지역 안내`,
      url: pageUrl,
      description: content.introduction,
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
            url: `${pageUrl}/${district.slug}`,
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
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  const container = {
    maxWidth: 1120,
    margin: "0 auto",
  };

  const section = {
    padding: "58px 20px",
  };

  const heading = {
    fontSize: 27,
    letterSpacing: "-1px",
    lineHeight: 1.4,
    margin: "0 0 18px",
  };

  const paragraph = {
    fontSize: 15,
    lineHeight: 1.95,
    color: "#555",
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

      <header
        style={{
          background: "#fff",
          borderBottom: "1px solid #eaeaea",
          padding: "18px 20px",
        }}
      >
        <div
          style={{
            ...container,
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
          padding: "75px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 850, margin: "0 auto" }}>
          <p
            style={{
              color: "#d7b67a",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "2px",
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
              margin: "18px 0",
            }}
          >
            {region.name} 주방후드 교체
          </h1>

          <p
            style={{
              color: "#d0d0d0",
              fontSize: 16,
              lineHeight: 1.9,
            }}
          >
            렌지후드 · 아일랜드후드 · 침니후드
            <br />
            지역별 교체 상담 및 설치 확인 안내
          </p>
        </div>
      </section>

      <section style={section}>
        <div style={container}>
          <nav
            aria-label="현재 위치"
            style={{
              fontSize: 13,
              color: "#777",
              marginBottom: 32,
            }}
          >
            <Link href="/">홈</Link>
            {" / "}
            <Link href="/area">전국 지역</Link>
            {" / "}
            {region.name}
          </nav>

          <h2 style={heading}>
            {region.name} 후드 교체 안내
          </h2>

          <p style={paragraph}>
            {content.introduction}
          </p>

          <p style={paragraph}>
            {content.districts}
          </p>
        </div>
      </section>

      <section
        style={{
          ...section,
          background: "#fff",
        }}
      >
        <div style={container}>
          <h2 style={heading}>
            {region.name} 시·군·구별 안내
          </h2>

          <p style={paragraph}>
            아래에서 해당 지역을 선택하면
            후드 교체 상세 안내를 확인할 수 있습니다.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
              gap: 14,
              marginTop: 26,
            }}
          >
            {region.districts.map((district) => (
              <Link
                key={district.slug}
                href={`/area/${region.slug}/${district.slug}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                  background: "#faf9f6",
                  border: "1px solid #e6e2da",
                  borderRadius: 12,
                  padding: "23px 20px",
                  color: "#171717",
                  textDecoration: "none",
                }}
              >
                <div>
                  <strong style={{ fontSize: 17 }}>
                    {district.name}
                  </strong>
                  <div
                    style={{
                      color: "#777",
                      fontSize: 12,
                      marginTop: 8,
                    }}
                  >
                    주방후드 교체 지역 안내
                  </div>
                </div>
                <span
                  aria-hidden="true"
                  style={{
                    color: "#a78047",
                    fontSize: 22,
                  }}
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={section}>
        <div style={container}>
          <h2 style={heading}>
            {region.name} 후드 교체 서비스
          </h2>

          <p style={paragraph}>
            후드의 종류에 따라 설치 공간,
            배기 연결 방식 및 제품 규격을
            확인해야 합니다.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 270px), 1fr))",
              gap: 16,
              marginTop: 25,
            }}
          >
            {services.map((service) => (
              <article
                key={service.slug}
                style={{
                  background: "#fff",
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

                <p style={paragraph}>
                  {service.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 7,
                  }}
                >
                  {service.types.map((type) => (
                    <span
                      key={type}
                      style={{
                        background: "#faf9f6",
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

      <section
        style={{
          ...section,
          background: "#fff",
        }}
      >
        <div style={container}>
          <h2 style={heading}>
            후드 교체 전 확인사항
          </h2>

          <p style={paragraph}>
            {content.preparation}
          </p>

          <ol
            style={{
              paddingLeft: 22,
              color: "#444",
              lineHeight: 2.2,
            }}
          >
            <li>기존 후드 종류와 모델명 확인</li>
            <li>후드 가로 크기와 설치 공간 측정</li>
            <li>배기구 및 배기 덕트 위치 확인</li>
            <li>기존 제품과 설치 공간 사진 준비</li>
            <li>작업 지역과 희망 일정 전달</li>
          </ol>
        </div>
      </section>

      <section style={section}>
        <div style={container}>
          <h2 style={heading}>
            {region.name} 후드 교체 자주 묻는 질문
          </h2>

          <div
            style={{
              display: "grid",
              gap: 14,
            }}
          >
            {faqs.map((faq) => (
              <article
                key={faq.question}
                style={{
                  padding: 24,
                  background: "#fff",
                  border: "1px solid #eaeaea",
                  borderRadius: 12,
                }}
              >
                <h3
                  style={{
                    fontSize: 17,
                    margin: "0 0 12px",
                  }}
                >
                  {faq.question}
                </h3>
                <p
                  style={{
                    ...paragraph,
                    margin: 0,
                  }}
                >
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          ...section,
          background: "#fff",
        }}
      >
        <div style={container}>
          <h2 style={heading}>
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
              .filter((item) => item.slug !== region.slug)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/area/${item.slug}`}
                  style={{
                    background: "#faf9f6",
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
        </div>
      </section>

      <section
        style={{
          background: "#f0ece4",
          textAlign: "center",
          padding: "65px 20px",
        }}
      >
        <h2 style={heading}>
          {region.name} 후드 교체 상담
        </h2>

        <p style={paragraph}>
          주방후드 · 렌지후드 · 아일랜드후드 · 침니후드
          <br />
          기존 제품 사진과 설치 지역을 알려주세요.
        </p>

        <a
          href={SITE.phoneHref}
          style={{
            display: "inline-block",
            marginTop: 15,
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
          boxShadow: "0 6px 25px rgba(0,0,0,0.18)",
        }}
      >
        전화상담 바로가기 · {SITE.phone}
      </a>
    </main>
  );
}
