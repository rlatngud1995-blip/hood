
export type Service = {
  slug: string;
  name: string;
  shortName: string;
  title: string;
  description: string;
  keywords: string[];
  types: string[];
  features: string[];
  process: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

/* =====================================
   사이트 기본 정보
===================================== */

export const SITE = {
  name: "후드의정석",
  url: "https://hoodmaster.kr",
  phone: "010-9413-4686",
  phoneHref: "tel:01094134686",

  description:
    "전국 주방후드 교체, 아일랜드후드 교체, 침니후드 교체 상담. 렌지후드, 레인지후드, 후황, 빌트인후드 등 주방 환기설비 교체 안내.",
};

/* =====================================
   서비스 데이터
===================================== */

export const services: Service[] = [
  {
    slug: "kitchen-hood",
    name: "주방후드 교체",
    shortName: "주방후드",
    title: "주방후드 교체 및 렌지후드 교체",

    description:
      "아파트, 빌라, 단독주택의 주방후드와 렌지후드 교체를 안내합니다. 기존 후드 규격, 설치 공간, 배기덕트 상태를 확인해 교체 가능 여부를 상담합니다.",

    keywords: [
      "주방후드 교체",
      "렌지후드 교체",
      "레인지후드 교체",
      "후황 교체",
      "후드 교체",
      "주방 환풍기 교체",
      "가정집 후드 교체",
      "아파트 후드 교체",
      "빌라 후드 교체",
      "주택 후드 교체",
      "빌트인후드 교체",
      "슬림후드 교체",
      "통후드 교체",
      "허리케인후드 교체",
      "싱크대 후드 교체",
      "매립형 후드 교체",
    ],

    types: [
      "슬림형 주방후드",
      "빌트인 주방후드",
      "매립형 주방후드",
      "통후드",
      "허리케인후드",
      "일반 가정용 렌지후드",
    ],

    features: [
      "기존 후드의 가로 폭과 설치 공간 확인",
      "제품 형태와 배기 방식에 맞는 교체 방법 안내",
      "기존 배기덕트 연결 상태 확인",
      "전원 연결과 고정 구조 확인",
      "교체 후 작동 및 흡입 상태 확인",
    ],

    process: [
      "기존 주방후드 사진과 설치 위치 확인",
      "제품 규격 및 교체 가능 여부 상담",
      "교체 제품과 예상 비용 안내",
      "일정 협의 후 교체 작업",
      "작동 상태와 마감 상태 확인",
    ],

    faqs: [
      {
        question:
          "기존 렌지후드와 다른 제품으로 교체할 수 있나요?",
        answer:
          "제품 규격과 설치 공간, 배기덕트 위치에 따라 가능 여부가 달라집니다. 기존 후드 사진과 크기를 확인한 뒤 상담할 수 있습니다.",
      },
      {
        question:
          "오래된 아파트 주방후드도 교체할 수 있나요?",
        answer:
          "오래된 아파트도 교체를 검토할 수 있습니다. 기존 제품의 규격과 배기 구조, 전원 상태를 확인해야 합니다.",
      },
      {
        question: "후드 교체 비용은 얼마인가요?",
        answer:
          "제품 종류, 설치 환경, 기존 후드 철거 및 배기덕트 보수 여부에 따라 비용이 달라집니다. 사진과 설치 정보를 바탕으로 상담할 수 있습니다.",
      },
      {
        question:
          "주방후드 교체 전에 무엇을 준비해야 하나요?",
        answer:
          "후드 정면 사진, 설치 공간 사진, 제품 라벨 또는 모델명과 규격을 확인할 수 있는 자료를 준비하면 도움이 됩니다.",
      },
    ],
  },

  {
    slug: "island-hood",
    name: "아일랜드후드 교체",
    shortName: "아일랜드후드",
    title: "아일랜드후드 교체 및 천장형 후드 교체",

    description:
      "아일랜드 주방에 설치된 천장형·독립형 후드 교체를 안내합니다. 천장 고정 구조, 배기덕트와 전원 위치를 확인해 설치 가능 여부를 상담합니다.",

    keywords: [
      "아일랜드후드 교체",
      "아일랜드 후드교체",
      "아일랜드 주방후드 교체",
      "천장형 후드 교체",
      "독립형 후드 교체",
      "아일랜드 렌지후드 교체",
      "아일랜드 레인지후드 교체",
      "천장 후드 교체",
      "고급 주방후드 교체",
      "아일랜드 후드 설치",
    ],

    types: [
      "천장 고정형 아일랜드후드",
      "독립형 아일랜드후드",
      "박스형 아일랜드후드",
      "원통형 아일랜드후드",
      "디자인 아일랜드후드",
    ],

    features: [
      "천장 고정 구조와 설치 공간 확인",
      "기존 후드 크기와 설치 높이 확인",
      "천장 내부 배기덕트 연결 상태 확인",
      "제품 무게와 고정 방식 검토",
      "설치 후 작동 상태와 마감 확인",
    ],

    process: [
      "아일랜드 주방 및 기존 후드 사진 확인",
      "천장 구조와 제품 규격 상담",
      "교체 가능 여부 및 예상 비용 안내",
      "일정 협의 후 교체 작업",
      "고정 상태와 작동 상태 확인",
    ],

    faqs: [
      {
        question:
          "아일랜드후드도 기존 제품만 철거하고 교체할 수 있나요?",
        answer:
          "기존 고정 구조와 배기덕트, 새 제품 규격이 맞으면 교체를 검토할 수 있습니다. 천장 보강이나 추가 마감이 필요한 경우도 있습니다.",
      },
      {
        question:
          "아일랜드후드는 일반 주방후드와 무엇이 다른가요?",
        answer:
          "일반적인 벽면형 후드와 달리 천장에 고정되는 제품이 많아 천장 구조와 고정 방식, 배기 연결을 추가로 확인해야 합니다.",
      },
      {
        question:
          "아일랜드후드 교체 시 천장 공사가 필요한가요?",
        answer:
          "기존 제품과 새 제품의 규격, 고정 위치, 배기 방식에 따라 천장 보강이나 마감 공사가 필요할 수 있습니다.",
      },
      {
        question:
          "아일랜드후드 교체 상담은 어떻게 하나요?",
        answer:
          "후드 전체 사진과 천장 연결 부분, 제품 라벨을 준비한 뒤 후드의정석 대표번호로 상담할 수 있습니다.",
      },
    ],
  },

  {
    slug: "chimney-hood",
    name: "침니후드 교체",
    shortName: "침니후드",
    title: "침니후드 교체 및 벽부형 후드 교체",

    description:
      "벽면에 설치되는 침니형 주방후드 교체를 안내합니다. 굴뚝형·데코형·경사형 후드의 규격과 배기 연결 상태를 확인해 교체 방법을 상담합니다.",

    keywords: [
      "침니후드 교체",
      "침니 후드교체",
      "침니형 후드 교체",
      "벽부형 후드 교체",
      "굴뚝형 후드 교체",
      "데코후드 교체",
      "경사형 후드 교체",
      "벽걸이 후드 교체",
      "침니 렌지후드 교체",
      "침니 레인지후드 교체",
      "스테인리스 후드 교체",
      "침니후드 설치",
    ],

    types: [
      "T자형 침니후드",
      "경사형 침니후드",
      "굴뚝형 침니후드",
      "데코형 침니후드",
      "벽부형 스테인리스 후드",
    ],

    features: [
      "벽면 고정 상태와 설치 공간 확인",
      "기존 제품의 가로 폭과 설치 높이 확인",
      "배기덕트 위치와 연결 방식 확인",
      "새 제품의 고정 위치 및 마감 범위 검토",
      "교체 후 작동 상태 확인",
    ],

    process: [
      "기존 침니후드와 벽면 사진 확인",
      "제품 규격 및 배기 연결 상태 상담",
      "교체 제품과 예상 비용 안내",
      "일정 협의 후 교체 작업",
      "벽면 마감과 작동 상태 확인",
    ],

    faqs: [
      {
        question:
          "기존 침니후드를 다른 디자인으로 바꿀 수 있나요?",
        answer:
          "설치 공간과 벽면 고정 구조, 배기덕트 위치가 적합하면 다른 디자인으로 교체를 검토할 수 있습니다.",
      },
      {
        question:
          "침니후드 교체 시 타일을 철거해야 하나요?",
        answer:
          "기존 제품과 새 제품의 고정 위치 및 벽면 마감 상태에 따라 달라집니다. 모든 교체 작업에서 타일 철거가 필요한 것은 아닙니다.",
      },
      {
        question:
          "침니후드 교체 비용은 어떻게 결정되나요?",
        answer:
          "제품 규격과 종류, 벽면 고정 상태, 배기덕트 연결 및 추가 마감 여부에 따라 비용이 달라질 수 있습니다.",
      },
      {
        question:
          "침니후드 교체 전 필요한 사진은 무엇인가요?",
        answer:
          "후드 전체 사진, 벽면과 상부 배기 연결 부분, 제품 라벨을 확인할 수 있는 사진을 준비하면 좋습니다.",
      },
    ],
  },
];

/* =====================================
   서비스 조회
===================================== */

export function getService(
  slug: string
): Service | undefined {
  return services.find(
    (service) => service.slug === slug
  );
}

export function getAllServices(): Service[] {
  return services;
}

/* =====================================
   중복 제거
===================================== */

function uniqueStrings(values: string[]): string[] {
  return Array.from(
    new Set(
      values
        .map((value) => value.trim())
        .filter(Boolean)
    )
  );
}

/* =====================================
   지역별 키워드
===================================== */

export function getServiceKeywords(
  serviceSlug: string,
  regionName?: string,
  districtName?: string
): string[] {
  const service = getService(serviceSlug);

  if (!service) return [];

  const location = uniqueStrings(
    [regionName, districtName].filter(
      (value): value is string => Boolean(value)
    )
  ).join(" ");

  if (!location) {
    return uniqueStrings(service.keywords);
  }

  return uniqueStrings([
    `${location} ${service.name}`,
    ...service.keywords.map(
      (keyword) => `${location} ${keyword}`
    ),
  ]);
}

/* =====================================
   지역별 페이지 제목
===================================== */

export function getServicePageTitle(
  serviceSlug: string,
  districtName: string
): string {
  const service = getService(serviceSlug);

  if (!service) {
    return `${districtName} 후드 교체 | ${SITE.name}`;
  }

  return `${districtName} ${service.name} | ${SITE.name}`;
}

/* =====================================
   지역별 페이지 설명
===================================== */

export function getServicePageDescription(
  serviceSlug: string,
  regionName: string,
  districtName: string
): string {
  const service = getService(serviceSlug);

  const location = uniqueStrings([
    regionName,
    districtName,
  ]).join(" ");

  if (!service) {
    return `${location} 주방후드 교체 상담. 기존 후드 규격과 설치 조건 확인. 문의 ${SITE.phone}.`;
  }

  const serviceDetails: Record<string, string> = {
    "kitchen-hood":
      "렌지후드·후황·빌트인후드 교체, 제품 규격과 배기덕트 확인",
    "island-hood":
      "천장형 아일랜드후드 교체, 고정 구조와 배기 연결 확인",
    "chimney-hood":
      "침니형·데코형 후드 교체, 벽면 고정과 배기 연결 확인",
  };

  const detail =
    serviceDetails[serviceSlug] ??
    "기존 후드 규격과 설치 조건 확인";

  return `${location} ${service.name} 상담. ${detail}. 후드의정석 ${SITE.phone}.`;
}

/* =====================================
   지역별 서비스 URL
===================================== */

export function getServicePageUrl(
  regionSlug: string,
  districtSlug: string,
  serviceSlug: string
): string {
  const baseUrl = SITE.url.replace(/\/+$/, "");

  return (
    `${baseUrl}/area/` +
    `${regionSlug}/` +
    `${districtSlug}/` +
    `${serviceSlug}`
  );
}
