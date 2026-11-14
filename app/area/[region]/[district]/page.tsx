
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getAllDistricts,
  getDistrict,
  getRegion,
} from "../../../../lib/regions";

import { SITE } from "../../../../lib/services";

type PageProps = {
  params: Promise<{
    region: string;
    district: string;
  }>;
};

export const dynamicParams = false;

/* =========================================
   정적 지역 페이지 생성
========================================= */

export function generateStaticParams() {
  return getAllDistricts().map((item) => ({
    region: item.regionSlug,
    district: item.districtSlug,
  }));
}

/* =========================================
   기본 설정
========================================= */

const PHONE = SITE.phone;
const PHONE_HREF = SITE.phoneHref;

const container = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "0 20px",
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
  gap: 16,
};

/* =========================================
   실제 보유한 참고 이미지
   지역별 실제 시공으로 오인되지 않도록 표시
========================================= */

const IMAGES = {
  kitchen: {
    src: "/ECAD3A3D-6C53-43BF-A443-01A321496AE2.png",
    alt: "주방후드 교체 참고 이미지",
    title: "주방후드 교체 참고",
  },
  home: {
    src: "/12B08037-6AD2-4EF2-AB3F-2F9FAA2EE6A2.png",
    alt: "가정용 주방후드 교체 참고 이미지",
    title: "가정용 후드 교체 참고",
  },
  island: {
    src: "/310B47AA-B344-4A17-9160-AC277DBF595E.png",
    alt: "아일랜드후드 교체 참고 이미지",
    title: "아일랜드후드 교체 참고",
  },
  chimney: {
    src: "/10D74E67-C29E-41AD-85D7-64D8092D6C4D.png",
    alt: "침니후드 교체 참고 이미지",
    title: "침니후드 교체 참고",
  },
};

/* =========================================
   서비스별 전문 콘텐츠
========================================= */

const HOOD_GUIDES = [
  {
    id: "built-in",
    title: "빌트인 주방후드",
    summary:
      "상부장 내부에 매립되거나 가구와 일체형으로 설치되는 후드입니다.",
    inspection:
      "기존 제품의 폭뿐 아니라 상부장 내부 깊이, 높이, 고정 위치와 배기구 방향을 확인해야 합니다.",
    caution:
      "제품 외형 크기가 같아도 매립 치수나 고정 구조가 다르면 가구 가공이 필요할 수 있습니다.",
  },
  {
    id: "slim",
    title: "슬림후드 · 후황",
    summary:
      "일반적인 가정용 주방가구 하단에 설치되는 얇은 형태의 환기후드입니다.",
    inspection:
      "제품 폭, 상부장 하부 고정 방식, 배기구 위치와 전원 연결 조건을 확인합니다.",
    caution:
      "기존 제품과 새 제품의 배기구 위치가 다르면 덕트 연결 방식이 달라질 수 있습니다.",
  },
  {
    id: "island",
    title: "아일랜드후드",
    summary:
      "조리대가 주방 중앙에 있는 구조에서 천장에 고정하는 형태의 후드입니다.",
    inspection:
      "천장 내부 고정 구조, 배기덕트 경로, 전원 위치, 제품 설치 높이를 확인합니다.",
    caution:
      "천장 마감재만으로 제품을 지지할 수 없으므로 적절한 고정 구조를 확인해야 합니다.",
  },
  {
    id: "chimney",
    title: "침니후드 · 데코후드",
    summary:
      "벽면에 고정하고 배기덕트를 장식 커버로 감싸는 형태의 후드입니다.",
    inspection:
      "벽면 고정 상태, 후드 폭, 배기구 위치, 장식 커버 높이를 확인합니다.",
    caution:
      "기존 고정 구멍과 새 제품의 브래킷 위치가 다를 수 있어 설치면 점검이 필요합니다.",
  },
] as const;

/* =========================================
   실제 사용 환경별 문제 해결 안내
========================================= */

const SYMPTOM_GUIDES = [
  {
    title: "후드 흡입력이 약해진 경우",
    description:
      "필터 오염, 배기덕트 막힘, 팬 성능 저하 등 여러 원인이 있을 수 있습니다. 후드 전체를 교체하기 전에 필터와 배기 경로를 함께 확인하는 것이 좋습니다.",
    check:
      "필터 청소 여부, 팬 회전 상태, 배기 연결부",
  },
  {
    title: "후드에서 큰 소음이 발생하는 경우",
    description:
      "모터나 팬의 이상뿐 아니라 제품 고정 상태, 덕트 진동으로도 소음이 발생할 수 있습니다. 소음의 원인을 확인한 후 수리 또는 교체를 판단해야 합니다.",
    check:
      "소음 발생 위치, 팬 상태, 고정 부위",
  },
  {
    title: "후드 전원이 들어오지 않는 경우",
    description:
      "전원 공급이나 스위치, 내부 부품 문제일 수 있습니다. 전기적인 이상이 의심되면 임의로 분해하지 말고 전문가의 점검을 받아야 합니다.",
    check:
      "전원 공급 상태, 제품 모델명, 증상",
  },
  {
    title: "오래된 후황을 교체하려는 경우",
    description:
      "기존 제품과 같은 모델이 단종되었더라도 설치 공간과 배기 규격이 맞는 대체 제품을 검토할 수 있습니다.",
    check:
      "기존 후드 폭, 상부장 구조, 배기구 위치",
  },
];

/* =========================================
   주거 형태별 설치 조건
========================================= */

const HOUSING_GUIDES = [
  {
    title: "아파트 주방후드",
    description:
      "상부장 구조와 기존 배기덕트 연결 상태를 확인합니다. 공동주택에서는 기존 배기 경로와 역류방지 장치 등의 상태도 검토할 필요가 있습니다.",
  },
  {
    title: "빌라 · 다세대주택 후드",
    description:
      "주방가구 구조와 배기구 위치가 현장마다 다를 수 있습니다. 기존 설치 공간과 외부 배기 연결 방식을 확인합니다.",
  },
  {
    title: "단독주택 주방후드",
    description:
      "외벽 또는 천장 방향으로 연결된 배기 경로와 덕트 상태, 제품 고정 위치를 함께 검토합니다.",
  },
];

/* =========================================
   상담 전 체크리스트
========================================= */

const CHECKLIST = [
  {
    title: "기존 제품 모델명",
    description:
      "후드 하단이나 필터 안쪽의 제품 라벨을 확인해 주세요. 모델명은 제품 규격과 설치 방식을 파악하는 데 도움이 됩니다.",
  },
  {
    title: "후드 가로 폭",
    description:
      "기존 제품의 가로 폭과 실제 설치 공간을 확인해 주세요. 폭이 같아도 고정 구조가 다를 수 있습니다.",
  },
  {
    title: "상부장 또는 설치면",
    description:
      "빌트인형은 가구 내부 공간, 침니형은 벽면, 아일랜드형은 천장 고정 구조를 확인해야 합니다.",
  },
  {
    title: "배기덕트 연결",
    description:
      "배기구 방향과 덕트 규격, 연결 상태에 따라 설치 방법이나 추가 작업 여부가 달라질 수 있습니다.",
  },
  {
    title: "전원 및 작동 상태",
    description:
      "현재 후드가 작동하는지, 소음이나 전원 문제가 있는지 알려주면 교체 상담에 도움이 됩니다.",
  },
  {
    title: "주방 전체 사진",
    description:
      "후드뿐 아니라 주변 가구와 벽면, 천장까지 보이는 사진이 있으면 설치 조건을 파악하기 좋습니다.",
  },
];

/* =========================================
   정상적인 상담 순서
========================================= */

const PROCESS = [
  {
    title: "기존 후드 사진 확인",
    description:
      "제품 전체 모습과 주변 설치 공간을 확인합니다.",
  },
  {
    title: "모델명 및 규격 확인",
    description:
      "기존 제품의 형태, 가로 폭과 설치 조건을 확인합니다.",
  },
  {
    title: "배기 및 고정 구조 검토",
    description:
      "배기덕트 연결과 상부장, 벽면 또는 천장 구조를 검토합니다.",
  },
  {
    title: "교체 방법 상담",
    description:
      "설치 조건에 맞는 교체 제품과 필요한 작업 범위를 안내합니다.",
  },
];

/* =========================================
   FAQ
========================================= */

const FAQS = [
  {
    question: "기존 후드 모델을 몰라도 교체 상담이 가능한가요?",
    answer:
      "가능합니다. 기존 후드 전체 사진과 제품 폭, 설치 공간이 보이는 사진을 준비하면 기본적인 제품 형태를 확인할 수 있습니다. 정확한 호환 여부는 추가 확인이 필요할 수 있습니다.",
  },
  {
    question: "다른 브랜드의 후드로 교체할 수 있나요?",
    answer:
      "기존 설치 공간과 고정 방식, 배기 연결 조건이 맞는다면 다른 브랜드 제품도 검토할 수 있습니다. 단순히 제품 폭이 같다는 이유만으로 호환된다고 판단해서는 안 됩니다.",
  },
  {
    question: "오래된 후황도 교체할 수 있나요?",
    answer:
      "기존 제품이 단종되었더라도 대체 제품을 검토할 수 있습니다. 설치 공간, 배기구 위치와 전원 조건을 확인해야 합니다.",
  },
  {
    question: "후드 교체 시 상부장도 철거해야 하나요?",
    answer:
      "반드시 그런 것은 아닙니다. 기존 가구를 유지하면서 교체할 수 있는 경우도 있지만 제품 규격이나 고정 구조가 다르면 추가 작업이 필요할 수 있습니다.",
  },
  {
    question: "아일랜드후드도 교체할 수 있나요?",
    answer:
      "천장 고정 구조와 배기덕트, 전원 위치를 확인한 뒤 교체 가능 여부를 검토합니다. 일반 슬림후드와 설치 방식이 다릅니다.",
  },
  {
    question: "침니후드 교체 시 주의할 점은 무엇인가요?",
    answer:
      "벽면 고정 상태, 설치 높이, 장식 커버 규격과 배기덕트 연결을 확인해야 합니다. 기존 브래킷을 그대로 사용할 수 있는지도 검토가 필요합니다.",
  },
  {
    question: "후드가 시끄러우면 무조건 교체해야 하나요?",
    answer:
      "그렇지는 않습니다. 팬이나 모터 문제 외에 고정 상태나 배기덕트 진동이 원인일 수도 있습니다. 상태를 확인한 후 교체 필요성을 판단하는 것이 좋습니다.",
  },
];

/* =========================================
   지역별 콘텐츠 선택
   무작위 문장 변형 대신 실용적인 주제 선택

   주의:
   실제 지역별 시공 이력은 별도 데이터가
   확인된 경우에만 추가해야 합니다.
========================================= */

function getPageFocus(region: string, district: string) {
  const key = `${region}/${district}`;

  let value = 0;

  for (let i = 0; i < key.length; i += 1) {
    value = (value * 31 + key.charCodeAt(i)) >>> 0;
  }

  return value % HOOD_GUIDES.length;
}

/* =========================================
   메타데이터
========================================= */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { region, district } = await params;

  const regionData = getRegion(region);
  const districtData = getDistrict(region, district);

  if (!regionData || !districtData) {
    return {
      title: "페이지를 찾을 수 없습니다",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const location = `${regionData.name} ${districtData.name}`;
  const canonical = `${SITE.url}/area/${region}/${district}`;

  const focus = HOOD_GUIDES[getPageFocus(region, district)];

  const title = `${districtData.name} 주방후드 교체 | 후드의정석`;

  const description =
    `${location} 주방후드·렌지후드 교체 상담. ` +
    `${focus.title} 설치 조건과 기존 제품 규격, ` +
    `배기덕트 및 교체 전 확인사항을 안내합니다.`;

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: SITE.name,
      title,
      description,
      url: canonical,
      images: [
        {
          url: `${SITE.url}${IMAGES.kitchen.src}`,
          alt: IMAGES.kitchen.alt,
        },
      ],
    },
  };
}

/* =========================================
   공통 카드
========================================= */

function InfoCard({
  title,
  description,
  dark = false,
}: {
  title: string;
  description: string;
  dark?: boolean;
}) {
  return (
    <article
      style={{
        background: dark ? "#171717" : "#fff",
        color: dark ? "#fff" : "#171717",
        border: dark ? "none" : "1px solid #e7e3dc",
        borderRadius: 12,
        padding: 23,
      }}
    >
      <h3
        style={{
          fontSize: 18,
          lineHeight: 1.5,
          margin: "0 0 12px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: dark ? "#ccc" : "#626262",
          fontSize: 14,
          lineHeight: 1.9,
          margin: 0,
        }}
      >
        {description}
      </p>
    </article>
  );
}

/* =========================================
   지역별 개별페이지
========================================= */

export default async function DistrictPage({
  params,
}: PageProps) {
  const { region, district } = await params;

  const regionData = getRegion(region);
  const districtData = getDistrict(region, district);

  if (!regionData || !districtData) {
    notFound();
  }

  const name = districtData.name;
  const location = `${regionData.name} ${name}`;
  const pageUrl = `${SITE.url}/area/${region}/${district}`;

  const focusIndex = getPageFocus(region, district);
  const focus = HOOD_GUIDES[focusIndex];

  const relatedGuides = [
    focus,
    ...HOOD_GUIDES.filter((item) => item.id !== focus.id),
  ];

  const otherDistricts = regionData.districts.filter(
    (item) => item.slug !== district
  );

  /* =====================================
     구조화 데이터
  ===================================== */

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${name} 주방후드 교체`,
        description:
          `${location} 주방후드 교체와 설치 전 확인사항 안내`,
        inLanguage: "ko-KR",
        breadcrumb: {
          "@id": `${pageUrl}#breadcrumb`,
        },
        mainEntity: {
          "@id": `${pageUrl}#service`,
        },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: `${name} 주방후드 교체 상담`,
        serviceType: "주방후드 교체",
        description:
          `${location} 주방후드·렌지후드 교체 및 설치 조건 상담`,
        provider: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
          telephone: PHONE,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: location,
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
            item: SITE.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "전국 지역",
            item: `${SITE.url}/area`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: regionData.name,
            item: `${SITE.url}/area/${region}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: `${name} 후드 교체`,
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
          "'Pretendard','Noto Sans KR',Arial,sans-serif",
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
          borderBottom: "1px solid #e9e5de",
          padding: "17px 20px",
        }}
      >
        <div
          style={{
            ...container,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              color: "#171717",
              textDecoration: "none",
              fontWeight: 900,
              fontSize: 22,
            }}
          >
            후드의정석
          </Link>

          <a
            href={PHONE_HREF}
            style={{
              background: "#171717",
              color: "#fff",
              textDecoration: "none",
              borderRadius: 8,
              padding: "12px 16px",
              fontWeight: 800,
              fontSize: 13,
            }}
          >
            전화상담 {PHONE}
          </a>
        </div>
      </header>

      {/* HERO */}

      <section
        style={{
          background:
            "linear-gradient(145deg,#121212,#211e1a)",
          color: "#fff",
          textAlign: "center",
          padding: "78px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          <p
            style={{
              color: "#d7b67a",
              fontWeight: 900,
              letterSpacing: "2.5px",
              fontSize: 11,
              margin: "0 0 15px",
            }}
          >
            HOOD MASTER · LOCAL SERVICE
          </p>

          <h1
            style={{
              fontSize: "clamp(32px,6vw,48px)",
              fontWeight: 900,
              lineHeight: 1.28,
              letterSpacing: "-1.5px",
              margin: "0 0 18px",
            }}
          >
            {name} 주방후드 교체
          </h1>

          <p
            style={{
              color: "#ddd",
              fontSize: 16,
              lineHeight: 1.95,
              margin: "0 0 28px",
            }}
          >
            주방후드 · 렌지후드 · 후황
            <br />
            빌트인 · 아일랜드 · 침니후드
          </p>

          <a
            href={PHONE_HREF}
            style={{
              display: "inline-block",
              background: "#ab8247",
              color: "#fff",
              textDecoration: "none",
              borderRadius: 10,
              padding: "16px 27px",
              fontWeight: 900,
            }}
          >
            후드 교체 전화상담
          </a>
        </div>
      </section>

      {/* MAIN CONTENT */}

      <section
        style={{
          ...container,
          paddingTop: 40,
          paddingBottom: 70,
        }}
      >
        {/* BREADCRUMB */}

        <nav
          aria-label="현재 위치"
          style={{
            color: "#797979",
            fontSize: 13,
            lineHeight: 2,
            marginBottom: 32,
          }}
        >
          <Link href="/">홈</Link>
          {" / "}
          <Link href="/area">전국 지역</Link>
          {" / "}
          <Link href={`/area/${region}`}>
            {regionData.name}
          </Link>
          {" / "}
          {name}
        </nav>

        {/* INTRO */}

        <section style={{ marginBottom: 50 }}>
          <h2
            style={{
              fontSize: 29,
              lineHeight: 1.45,
              margin: "0 0 20px",
            }}
          >
            {name} 후드 교체 전 확인해야 할 사항
          </h2>

          <p
            style={{
              color: "#515151",
              fontSize: 15,
              lineHeight: 2,
              margin: "0 0 18px",
            }}
          >
            {location}에서 주방후드 교체를 준비하고
            있다면 새 제품을 구매하기 전에 기존
            후드의 설치 조건을 확인하는 것이
            중요합니다. 후드의 가로 폭뿐 아니라
            주방가구 내부 공간, 고정 방식,
            배기덕트 연결 위치에 따라 교체
            가능한 제품이 달라질 수 있습니다.
          </p>

          <p
            style={{
              color: "#515151",
              fontSize: 15,
              lineHeight: 2,
              margin: 0,
            }}
          >
            후드의정석은 기존 제품 사진과 모델명,
            설치 공간을 바탕으로 교체 조건을
            상담합니다. 정확한 작업 범위는 실제
            설치 상태를 확인한 후 판단해야 합니다.
          </p>
        </section>

        {/* IMAGE */}

        <figure
          style={{
            background: "#fff",
            border: "1px solid #e7e3dc",
            borderRadius: 14,
            overflow: "hidden",
            margin: "0 0 50px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 3",
              background: "#ececec",
            }}
          >
            <Image
              src={IMAGES.kitchen.src}
              alt={IMAGES.kitchen.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1000px"
              style={{
                objectFit: "contain",
              }}
            />
          </div>

          <figcaption style={{ padding: 24 }}>
            <p
              style={{
                color: "#a78047",
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "1.5px",
                margin: "0 0 8px",
              }}
            >
              HOOD REPLACEMENT REFERENCE
            </p>

            <h2
              style={{
                fontSize: 23,
                margin: "0 0 12px",
              }}
            >
              주방후드 교체 참고 이미지
            </h2>

            <p
              style={{
                color: "#606060",
                fontSize: 14,
                lineHeight: 1.95,
                margin: 0,
              }}
            >
              후드 교체 작업을 이해하기 위한 참고
              이미지입니다. 해당 지역에서 진행한
              실제 시공사례를 의미하지 않으며,
              현장에 따라 제품과 작업 방법이
              달라질 수 있습니다.
            </p>
          </figcaption>
        </figure>

        {/* FOCUS GUIDE */}

        <section
          style={{
            background: "#171717",
            color: "#fff",
            borderRadius: 15,
            padding: "32px 27px",
            marginBottom: 55,
          }}
        >
          <p
            style={{
              color: "#c89d5f",
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "1.7px",
              margin: "0 0 10px",
            }}
          >
            INSTALLATION GUIDE
          </p>

          <h2
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              margin: "0 0 18px",
            }}
          >
            {name} 후드 교체 안내 · {focus.title}
          </h2>

          <p
            style={{
              color: "#e5e5e5",
              fontSize: 15,
              lineHeight: 1.95,
              margin: "0 0 20px",
            }}
          >
            {focus.summary}
          </p>

          <h3
            style={{
              color: "#d7b67a",
              fontSize: 17,
              margin: "0 0 10px",
            }}
          >
            설치 전 확인사항
          </h3>

          <p
            style={{
              color: "#ddd",
              fontSize: 14,
              lineHeight: 1.95,
              margin: "0 0 20px",
            }}
          >
            {focus.inspection}
          </p>

          <h3
            style={{
              color: "#d7b67a",
              fontSize: 17,
              margin: "0 0 10px",
            }}
          >
            주의할 점
          </h3>

          <p
            style={{
              color: "#ddd",
              fontSize: 14,
              lineHeight: 1.95,
              margin: 0,
            }}
          >
            {focus.caution}
          </p>
        </section>

        {/* HOOD TYPES */}

        <section style={{ marginBottom: 55 }}>
          <h2
            style={{
              fontSize: 26,
              margin: "0 0 22px",
            }}
          >
            주방후드 종류별 교체 조건
          </h2>

          <div style={grid}>
            {relatedGuides.map((item) => (
              <InfoCard
                key={item.id}
                title={item.title}
                description={`${item.summary} ${item.inspection}`}
              />
            ))}
          </div>
        </section>

        {/* PROBLEM GUIDE */}

        <section style={{ marginBottom: 55 }}>
          <h2
            style={{
              fontSize: 26,
              margin: "0 0 15px",
            }}
          >
            후드 상태에 따른 점검 방법
          </h2>

          <p
            style={{
              color: "#606060",
              fontSize: 14,
              lineHeight: 1.9,
              margin: "0 0 22px",
            }}
          >
            후드가 정상적으로 작동하지 않는다고
            해서 반드시 전체 교체가 필요한 것은
            아닙니다. 증상에 따라 확인할 부분이
            달라집니다.
          </p>

          <div style={grid}>
            {SYMPTOM_GUIDES.map((item) => (
              <article
                key={item.title}
                style={{
                  background: "#fff",
                  border: "1px solid #e7e3dc",
                  borderRadius: 12,
                  padding: 23,
                }}
              >
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
                    color: "#626262",
                    fontSize: 14,
                    lineHeight: 1.9,
                    margin: "0 0 15px",
                  }}
                >
                  {item.description}
                </p>

                <p
                  style={{
                    color: "#96713e",
                    fontSize: 13,
                    fontWeight: 800,
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  확인사항: {item.check}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* HOUSING */}

        <section style={{ marginBottom: 55 }}>
          <h2
            style={{
              fontSize: 26,
              margin: "0 0 22px",
            }}
          >
            {name} 주거공간별 후드 교체 안내
          </h2>

          <div style={grid}>
            {HOUSING_GUIDES.map((item) => (
              <InfoCard
                key={item.title}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </section>

        {/* CHECKLIST */}

        <section style={{ marginBottom: 55 }}>
          <h2
            style={{
              fontSize: 26,
              margin: "0 0 22px",
            }}
          >
            후드 교체 상담 전 체크리스트
          </h2>

          <div style={grid}>
            {CHECKLIST.map((item, index) => (
              <article
                key={item.title}
                style={{
                  background: "#f1ece3",
                  borderRadius: 12,
                  padding: 23,
                }}
              >
                <p
                  style={{
                    color: "#96713e",
                    fontSize: 12,
                    fontWeight: 900,
                    margin: "0 0 10px",
                  }}
                >
                  CHECK {index + 1}
                </p>

                <h3
                  style={{
                    fontSize: 18,
                    margin: "0 0 11px",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    color: "#626262",
                    fontSize: 14,
                    lineHeight: 1.9,
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* CONSULTATION */}

        <section style={{ marginBottom: 55 }}>
          <h2
            style={{
              fontSize: 26,
              margin: "0 0 22px",
            }}
          >
            {name} 후드 교체 상담 절차
          </h2>

          <div style={grid}>
            {PROCESS.map((item, index) => (
              <article
                key={item.title}
                style={{
                  background: "#171717",
                  color: "#fff",
                  borderRadius: 12,
                  padding: 23,
                }}
              >
                <p
                  style={{
                    color: "#d7b67a",
                    fontSize: 12,
                    fontWeight: 900,
                    margin: "0 0 10px",
                  }}
                >
                  STEP {index + 1}
                </p>

                <h3
                  style={{
                    fontSize: 17,
                    margin: "0 0 10px",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    color: "#ccc",
                    fontSize: 13,
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}

        <section style={{ marginBottom: 55 }}>
          <h2
            style={{
              fontSize: 26,
              margin: "0 0 22px",
            }}
          >
            {name} 후드 교체 자주 묻는 질문
          </h2>

          <div
            style={{
              display: "grid",
              gap: 12,
            }}
          >
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                style={{
                  background: "#fff",
                  border: "1px solid #e7e3dc",
                  borderRadius: 10,
                  padding: "20px 22px",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontWeight: 800,
                    fontSize: 15,
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
        </section>

        {/* INTERNAL LINKS */}

        <section>
          <h2
            style={{
              fontSize: 24,
              margin: "0 0 18px",
            }}
          >
            {regionData.name} 다른 지역 후드 교체
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 9,
            }}
          >
            {otherDistricts.map((item) => (
              <Link
                key={item.slug}
                href={`/area/${region}/${item.slug}`}
                style={{
                  background: "#fff",
                  border: "1px solid #e5e5e5",
                  padding: "10px 13px",
                  borderRadius: 7,
                  color: "#555",
                  fontSize: 13,
                  textDecoration: "none",
                }}
              >
                {item.name} 후드 교체
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 28 }}>
            <Link
              href={`/area/${region}`}
              style={{
                color: "#96713e",
                fontWeight: 900,
                fontSize: 14,
              }}
            >
              ← {regionData.name} 전체 지역 보기
            </Link>
          </div>
        </section>
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
            fontSize: 28,
            margin: "0 0 15px",
          }}
        >
          {name} 후드 교체 상담
        </h2>

        <p
          style={{
            color: "#555",
            lineHeight: 1.9,
            fontSize: 14,
            margin: "0 0 25px",
          }}
        >
          기존 후드 사진과 모델명,
          <br />
          설치 지역을 알려주시면
          <br />
          교체 상담에 도움이 됩니다.
        </p>

        <a
          href={PHONE_HREF}
          style={{
            display: "inline-block",
            background: "#171717",
            color: "#fff",
            padding: "17px 30px",
            borderRadius: 9,
            fontWeight: 900,
            textDecoration: "none",
          }}
        >
          전화상담 {PHONE}
        </a>
      </section>

      {/* FOOTER */}

      <footer
        style={{
          background: "#151515",
          color: "#bcbcbc",
          padding: "30px 20px 110px",
          textAlign: "center",
          fontSize: 13,
          lineHeight: 1.9,
        }}
      >
        <strong style={{ color: "#fff" }}>
          후드의정석
        </strong>

        <div>전국 주방후드 교체 상담</div>
        <div>{PHONE}</div>
        <div>
          © {new Date().getFullYear()} 후드의정석
        </div>
      </footer>

      {/* FIXED CALL */}

      <a
        href={PHONE_HREF}
        aria-label={`${name} 후드 교체 전화상담`}
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
          boxShadow: "0 6px 25px rgba(0,0,0,0.18)",
        }}
      >
        전화상담 바로가기 · {PHONE}
      </a>
    </main>
  );
}
