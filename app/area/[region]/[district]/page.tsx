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

/* =========================================================
   정적 페이지 생성
========================================================= */

export function generateStaticParams() {
  return getAllDistricts().map((item) => ({
    region: item.regionSlug,
    district: item.districtSlug,
  }));
}

/* =========================================================
   지역별 자동 분산 이미지

   새 사진을 public 폴더에 추가하면
   아래 배열에 파일명만 추가하면 됨.
========================================================= */

const CASE_IMAGES = [
  {
    src: "/ECAD3A3D-6C53-43BF-A443-01A321496AE2.png",
    alt: "주방후드 교체 참고 사례",
    caption: "주방후드 교체 참고 이미지",
    type: "주방후드",
  },

  {
    src: "/12B08037-6AD2-4EF2-AB3F-2F9FAA2EE6A2.png",
    alt: "가정용 주방후드 교체 참고 이미지",
    caption: "가정용 주방후드 교체 참고 이미지",
    type: "가정용 주방후드",
  },

  {
    src: "/310B47AA-B344-4A17-9160-AC277DBF595E.png",
    alt: "아일랜드후드 교체 참고 이미지",
    caption: "아일랜드후드 교체 참고 이미지",
    type: "아일랜드후드",
  },

  {
    src: "/10D74E67-C29E-41AD-85D7-64D8092D6C4D.png",
    alt: "침니후드 교체 참고 이미지",
    caption: "침니후드 교체 참고 이미지",
    type: "침니후드",
  },
] as const;

/* =========================================================
   URL별 고정 변형 함수
========================================================= */

function hashString(value: string) {
  let hash = 0;

  for (let i = 0; i < value.length; i += 1) {
    hash =
      (hash * 31 + value.charCodeAt(i)) >>> 0;
  }

  return hash;
}

function pick<T>(
  items: readonly T[],
  seed: number,
  offset = 0
): T {
  return items[
    (seed + offset) % items.length
  ];
}

function rotate<T>(
  items: readonly T[],
  amount: number
): T[] {
  if (items.length === 0) return [];

  const index =
    amount % items.length;

  return [
    ...items.slice(index),
    ...items.slice(0, index),
  ];
}

/* =========================================================
   META TITLE
========================================================= */

const titleTemplates = [
  (name: string) =>
    `${name} 후드 교체 | 주방후드·렌지후드`,

  (name: string) =>
    `${name} 주방후드 교체 | 렌지후드·후황`,

  (name: string) =>
    `${name} 렌지후드 교체 | 주방후드 상담`,

  (name: string) =>
    `${name} 주방 후드 교체 | 후황·빌트인후드`,

  (name: string) =>
    `${name} 후드교체 | 렌지후드·침니후드`,
];

/* =========================================================
   META DESCRIPTION
========================================================= */

const descriptionTemplates = [
  (name: string) =>
    `${name} 주방후드·렌지후드·후황 교체 상담. 설치 규격과 배기 구조를 확인해 안내합니다.`,

  (name: string) =>
    `${name} 렌지후드와 주방후드 교체 상담. 빌트인·슬림·침니·아일랜드후드 설치 조건 확인.`,

  (name: string) =>
    `${name} 후드 교체 상담. 기존 모델명과 설치 공간, 배기덕트를 확인해 교체 방법을 안내합니다.`,

  (name: string) =>
    `${name} 주방 환기후드 교체 안내. 렌지후드·후황·빌트인·침니후드 상담 가능.`,

  (name: string) =>
    `${name} 주방후드 교체가 필요하다면 기존 제품 사진과 모델명을 확인해 상담하세요.`,
];

/* =========================================================
   INTRO
========================================================= */

const introTemplates = [
  (location: string) =>
    `${location}에서 주방후드 교체를 알아보고 있다면 기존 후드의 모델명과 가로 폭부터 확인하는 것이 좋습니다. 같은 크기의 제품이라도 주방가구 구조와 배기덕트 위치에 따라 교체 방법이 달라질 수 있습니다.`,

  (location: string) =>
    `${location}의 렌지후드나 후황을 교체할 때는 제품 크기만 보고 선택하기보다 현재 설치 상태를 먼저 확인해야 합니다. 상부장 내부 공간과 배기구 방향, 기존 고정 방식까지 함께 살펴보는 것이 좋습니다.`,

  (location: string) =>
    `${location}에서 오래된 주방후드를 교체하려면 기존 제품이 슬림형인지 빌트인형인지, 또는 벽면형인지 확인하는 과정이 먼저 필요합니다. 후드 종류에 따라 필요한 설치 공간과 배기 연결 방식이 달라집니다.`,

  (location: string) =>
    `${location} 주방후드 교체 상담은 현재 사용 중인 제품 사진과 모델명 확인부터 시작합니다. 기존 후드의 폭, 상부장 구조와 배기 연결 상태를 확인하면 교체 가능한 제품을 판단하는 데 도움이 됩니다.`,

  (location: string) =>
    `${location}에서 렌지후드 교체가 필요한 경우 기존 제품 철거만 고려하기보다 새 제품이 현재 주방 구조에 맞는지도 확인해야 합니다. 설치 폭과 배기구 위치가 맞지 않으면 추가 작업이 필요할 수 있습니다.`,

  (location: string) =>
    `${location}의 주방 환기후드는 사용 환경과 설치 구조에 따라 다양한 형태가 사용됩니다. 슬림후드, 빌트인후드, 통후드와 침니형 제품은 각각 확인해야 할 설치 조건이 다릅니다.`,

  (location: string) =>
    `${location} 후드 교체를 준비할 때는 현재 후드가 설치된 공간을 먼저 확인하는 것이 중요합니다. 제품 모델명과 가로 폭, 배기덕트 연결 상태가 확인되면 상담이 훨씬 수월해집니다.`,

  (location: string) =>
    `${location}에서 주방후드나 렌지후드를 새 제품으로 바꾸려면 기존 후드의 설치 방식부터 확인해야 합니다. 비슷해 보이는 제품이라도 고정 위치와 덕트 연결 방식이 다를 수 있습니다.`,
];

/* =========================================================
   DETAIL
========================================================= */

const detailTemplates = [
  (name: string) =>
    `${name} 후드 교체 상담 시에는 후드 전체가 보이는 사진과 제품 라벨 사진을 준비하면 좋습니다. 기존 설치 상태를 확인하면 교체 제품의 형태와 예상 작업 범위를 검토하기 쉽습니다.`,

  (name: string) =>
    `${name} 주방후드 교체는 브랜드보다 실제 설치 규격을 확인하는 것이 중요합니다. 제품 폭과 고정 방식, 배기 연결 규격이 맞는 경우 다른 브랜드 제품도 검토할 수 있습니다.`,

  (name: string) =>
    `${name}에서 후드를 교체할 때 기존 상부장을 그대로 사용하는 경우라면 내부 공간 확인이 중요합니다. 빌트인후드와 슬림후드는 가구 구조에 따라 설치 가능 여부가 달라질 수 있습니다.`,

  (name: string) =>
    `${name} 렌지후드 교체 과정에서는 기존 후드 철거 후 배기덕트와 전원 상태를 확인합니다. 필요한 작업은 제품 종류와 현재 설치 상태에 따라 달라질 수 있습니다.`,

  (name: string) =>
    `${name} 후드 교체 전 기존 제품의 모델명을 확인하면 새로운 제품을 비교하는 데 도움이 됩니다. 모델명을 찾기 어려운 경우 제품 전체 사진과 가로 폭을 확인해 주세요.`,

  (name: string) =>
    `${name} 주방후드 상담에서는 현재 후드 형태와 설치 공간을 먼저 확인합니다. 아일랜드형과 침니형 제품은 일반 슬림형 후드와 달리 천장 또는 벽면 고정 구조까지 확인해야 합니다.`,

  (name: string) =>
    `${name}에서 주방 환기후드를 바꿀 계획이라면 제품 선택 전에 기존 배기구의 위치와 연결 상태를 확인하는 것이 좋습니다. 덕트 구조는 작업 범위를 결정하는 주요 요소입니다.`,

  (name: string) =>
    `${name} 후드 교체는 현장마다 동일한 방식으로 진행되지 않습니다. 기존 후드의 규격과 주방가구 구조를 확인해 필요한 작업을 구분하는 것이 우선입니다.`,
];

/* =========================================================
   고객 상담 시작 문구
========================================================= */

const CONSULT_STARTS = [
  (name: string) =>
    `${name}에서 “기존 주방후드가 오래돼 소음이 커지고 흡입도 예전 같지 않은 것 같다”는 내용으로 교체 상담을 요청하는 경우가 있습니다.`,

  (name: string) =>
    `${name}에서 “후드 전원은 들어오는데 팬이 제대로 작동하지 않는 것 같다”는 문의로 상담이 시작되는 경우가 있습니다.`,

  (name: string) =>
    `${name}에서 “주방 인테리어를 하면서 오래된 후드도 함께 교체하고 싶다”는 내용으로 문의하는 경우가 있습니다.`,

  (name: string) =>
    `${name}에서 “기존 후드와 같은 크기의 새 제품으로 바꿀 수 있는지 궁금하다”는 문의가 자주 들어옵니다.`,

  (name: string) =>
    `${name}에서 “후드를 켜면 소리가 너무 커서 사용하기 불편하다”며 교체 가능 여부를 문의하는 경우가 있습니다.`,

  (name: string) =>
    `${name}에서 “오래된 후황을 요즘 사용하는 주방후드로 교체할 수 있는지” 문의하는 경우가 있습니다.`,

  (name: string) =>
    `${name}에서 “기름때가 많이 쌓이고 청소를 해도 상태가 좋지 않아 새 후드로 바꾸고 싶다”는 상담이 들어오기도 합니다.`,

  (name: string) =>
    `${name}에서 “기존 제품 모델명을 모르는데 사진만으로도 교체 상담이 가능한지” 문의하는 경우가 있습니다.`,

  (name: string) =>
    `${name}에서 “후드가 작동은 하지만 냄새가 예전처럼 잘 빠지지 않는다”고 문의하는 경우도 있습니다.`,

  (name: string) =>
    `${name}에서 “빌트인 형태의 후드인데 상부장은 그대로 두고 제품만 교체할 수 있는지” 상담을 요청하는 경우가 있습니다.`,

  (name: string) =>
    `${name}에서 “침니형 후드가 오래돼 새 제품으로 교체하려고 한다”며 설치 가능 여부를 문의하는 경우가 있습니다.`,

  (name: string) =>
    `${name}에서 “아일랜드후드를 교체하려는데 기존 천장 구조를 그대로 사용할 수 있는지” 확인을 요청하는 경우가 있습니다.`,
];

/* =========================================================
   상담 중간 확인 문구
========================================================= */

const CONSULT_MIDDLES = [
  "상담에서는 먼저 현재 설치된 후드 전체 사진과 제품 라벨을 확인합니다. 사진을 통해 기존 후드 형태와 주방가구 구조를 살펴본 뒤 필요한 확인사항을 정리합니다.",

  "먼저 기존 후드의 가로 폭과 제품 형태를 확인하고 상부장 내부 공간, 배기덕트 위치와 연결 상태를 함께 살펴보는 것이 좋습니다.",

  "기존 제품 사진을 확인한 뒤 후드 형태와 설치 공간을 파악하고, 현재 배기 구조를 그대로 사용할 수 있는지 확인하는 순서로 상담을 진행할 수 있습니다.",

  "제품 모델명이 확인되면 규격을 먼저 살펴보고, 모델명을 알 수 없는 경우 후드 전체 사진과 가로 폭을 기준으로 설치 형태를 확인합니다.",

  "상담 과정에서는 후드 자체뿐 아니라 주변 상부장이나 벽면, 천장 구조도 함께 확인합니다. 제품 형태에 따라 필요한 설치 공간이 다르기 때문입니다.",

  "현재 제품의 고정 방식과 배기 연결 방향을 확인하면 새 후드 설치 시 추가 작업이 필요한지 판단하는 데 도움이 됩니다.",
];

/* =========================================================
   작업 내용 문구
========================================================= */

const WORK_DETAILS = [
  "교체 작업은 기존 후드를 분리한 뒤 내부 배기덕트와 전원 상태를 확인하고, 설치 공간에 맞는 새 후드를 고정한 후 배기 연결과 작동 상태를 점검하는 순서로 진행할 수 있습니다.",

  "기존 제품을 철거한 뒤 상부장 내부와 배기구 상태를 확인하고, 설치 조건에 맞춰 새 후드를 고정한 후 배기덕트를 연결하고 작동 여부를 확인합니다.",

  "후드를 분리한 뒤 기존 고정 위치와 배기 연결부를 확인하고, 새 제품이 설치 공간에 맞는지 다시 확인한 후 고정과 배기 연결을 진행합니다.",

  "기존 제품 철거 후 설치면을 확인하고 배기덕트 위치를 점검한 다음 새 후드를 설치합니다. 마지막에는 팬 작동과 배기 연결 상태를 확인하는 과정이 필요합니다.",

  "새 제품을 설치하기 전 기존 후드 철거와 내부 구조 확인을 먼저 진행합니다. 이후 제품 고정, 배기 연결, 전원 확인과 작동 점검 순으로 마무리합니다.",

  "후드 교체는 기존 제품을 제거한 뒤 배기덕트와 설치 구조를 확인하고, 새 제품을 정위치에 고정한 후 정상 작동 여부를 확인하는 과정으로 진행됩니다.",
];

/* =========================================================
   상담 마무리 안내
========================================================= */

const CONSULT_ENDS = [
  "비슷한 형태의 후드 교체를 알아보고 있다면 기존 후드 전체 사진과 모델명, 설치 지역을 함께 알려주면 상담에 도움이 됩니다.",

  "교체 상담을 받을 때는 후드 전체 모습과 제품 라벨, 가로 폭을 확인해 두면 제품 형태를 파악하는 데 도움이 됩니다.",

  "현재 후드 종류를 정확히 모르더라도 전체 사진과 설치 공간이 보이는 사진을 준비하면 기본적인 설치 형태를 확인할 수 있습니다.",

  "후드 교체 전에는 제품 구매부터 진행하기보다 기존 설치 상태와 규격을 먼저 확인하는 것이 좋습니다.",

  "기존 후드와 비슷해 보이는 제품이라도 설치 방식이 다를 수 있으므로 모델명과 배기 구조를 먼저 확인하는 것이 안전합니다.",

  "사진 상담 시 후드 전체와 주변 주방가구가 함께 보이도록 촬영하면 설치 구조를 확인하는 데 더 도움이 됩니다.",
];

/* =========================================================
   상담 제목
========================================================= */

const CONSULT_TITLES = [
  (name: string) =>
    `${name} 후드 교체 상담 예시`,

  (name: string) =>
    `${name} 주방후드 교체 문의는 이렇게 확인합니다`,

  (name: string) =>
    `${name} 렌지후드 교체 상담 흐름`,

  (name: string) =>
    `${name}에서 많이 문의하는 후드 교체 상담`,

  () =>
    "후드 교체 상담은 이렇게 시작됩니다",
];

/* =========================================================
   주거공간 설명
========================================================= */

const housingIntroTemplates = [
  (name: string) =>
    `${name}의 아파트·빌라·주택은 주방가구 구조가 서로 다를 수 있으므로 건물 유형만으로 후드를 선택하기보다 현재 설치 상태를 확인하는 것이 좋습니다.`,

  (name: string) =>
    `${name} 주거공간에서 후드를 교체할 때는 상부장 내부 공간과 기존 제품의 규격을 함께 확인해야 합니다. 주방 구조에 따라 필요한 제품 형태가 달라질 수 있습니다.`,

  (name: string) =>
    `${name} 아파트나 주택의 주방후드는 설치 시기와 주방가구에 따라 다양한 방식으로 고정되어 있을 수 있습니다. 기존 제품을 확인한 뒤 교체 제품을 검토하는 것이 좋습니다.`,

  (name: string) =>
    `${name}의 주방후드 교체는 아파트, 빌라, 단독주택 모두 상담할 수 있으며 실제 작업 방식은 기존 후드와 배기 구조를 기준으로 판단합니다.`,

  (name: string) =>
    `${name} 주거공간에서는 슬림형과 빌트인형 후드가 설치된 경우도 있고 침니형이나 기타 벽면형 제품이 사용되는 경우도 있습니다. 제품 형태별로 필요한 확인 사항이 다릅니다.`,
];

/* =========================================================
   상담 준비
========================================================= */

const prepareTemplates = [
  {
    title: "후드 전체 사진을 준비해 주세요",
    description:
      "후드와 주변 주방가구가 함께 보이는 사진을 준비하면 현재 설치 형태를 확인하는 데 도움이 됩니다.",
  },

  {
    title: "제품 모델명을 확인해 주세요",
    description:
      "후드 하단이나 필터 안쪽에 있는 제품 라벨에서 모델명을 확인하면 교체 제품 비교가 수월합니다.",
  },

  {
    title: "설치 폭도 함께 확인해 주세요",
    description:
      "기존 후드의 가로 폭을 확인하면 새 제품이 현재 공간에 맞는지 검토하는 데 도움이 됩니다.",
  },

  {
    title: "배기구 위치를 확인해 주세요",
    description:
      "기존 후드 내부의 배기덕트 방향과 연결 상태를 확인하면 추가 작업 여부를 판단하는 데 도움이 됩니다.",
  },
];

/* =========================================================
   후드 종류
========================================================= */

const hoodTypes = [
  {
    title: "주방후드 · 렌지후드",
    description:
      "일반 가정집에 설치된 주방후드와 렌지후드는 제품 가로 폭과 고정 구조, 배기 연결 상태를 확인합니다.",
  },

  {
    title: "후황 · 슬림후드",
    description:
      "후황으로 부르는 주방 환기후드와 슬림형 제품은 상부장 내부 공간과 배기구 위치를 확인합니다.",
  },

  {
    title: "빌트인후드",
    description:
      "주방가구 안쪽에 설치된 빌트인후드는 가구 내부 공간과 기존 제품 규격 확인이 중요합니다.",
  },

  {
    title: "통후드",
    description:
      "통후드는 기존 후드의 폭과 상부장 구조, 배기 연결 위치를 확인해 교체 가능 여부를 검토합니다.",
  },

  {
    title: "아일랜드후드",
    description:
      "천장형 아일랜드후드는 천장 고정 구조와 배기덕트, 전원 위치와 설치 높이를 함께 확인합니다.",
  },

  {
    title: "침니후드 · 데코후드",
    description:
      "벽면형 침니후드와 데코후드는 벽면 고정 상태와 제품 높이, 배기 연결 구조를 확인합니다.",
  },
];

/* =========================================================
   주거형태
========================================================= */

const housingTypes = [
  {
    title: "아파트 주방후드",
    description:
      "기존 상부장과 후드 폭, 배기덕트 연결 상태를 확인하여 교체 가능한 제품 형태를 검토합니다.",
  },

  {
    title: "빌라 주방후드",
    description:
      "주방가구 구조와 기존 후드 규격, 배기구 위치를 확인해 필요한 철거 및 설치 범위를 확인합니다.",
  },

  {
    title: "단독주택 주방후드",
    description:
      "벽면 또는 천장 배기 구조와 전원 위치, 기존 후드 고정 상태를 함께 확인합니다.",
  },
];

/* =========================================================
   체크사항
========================================================= */

const checks = [
  {
    title: "제품 모델명",
    description:
      "제품 라벨의 모델명을 확인하면 기존 제품 규격을 파악하고 교체 제품을 비교하는 데 도움이 됩니다.",
  },

  {
    title: "후드 가로 폭",
    description:
      "기존 후드의 가로 폭과 실제 설치 공간을 확인해야 새 제품의 호환 여부를 판단하기 쉽습니다.",
  },

  {
    title: "배기덕트 상태",
    description:
      "배기구의 위치와 덕트 연결 상태에 따라 설치 방법과 추가 작업 여부가 달라질 수 있습니다.",
  },

  {
    title: "상부장 구조",
    description:
      "슬림형과 빌트인형 후드는 주방가구 내부의 높이와 깊이, 고정 위치를 확인해야 합니다.",
  },

  {
    title: "벽면 고정 상태",
    description:
      "침니형과 데코형 제품은 벽면 고정 위치와 설치 높이를 확인하는 과정이 필요합니다.",
  },

  {
    title: "천장 고정 구조",
    description:
      "아일랜드후드는 천장 고정 구조와 배기 연결, 전원 위치까지 확인해야 합니다.",
  },
];

/* =========================================================
   상담과정
========================================================= */

const process = [
  {
    title: "사진 확인",
    description:
      "기존 후드와 주방가구가 함께 보이는 사진을 확인합니다.",
  },

  {
    title: "모델명 확인",
    description:
      "제품 라벨 또는 기존 모델명을 확인합니다.",
  },

  {
    title: "설치 조건 확인",
    description:
      "제품 폭과 배기덕트, 주방가구 구조를 확인합니다.",
  },

  {
    title: "교체 방법 상담",
    description:
      "설치 조건에 맞는 교체 방식과 필요한 작업을 상담합니다.",
  },
];

/* =========================================================
   FAQ
========================================================= */

const faqBank = [
  {
    question:
      "오래된 주방후드도 교체할 수 있나요?",
    answer:
      "기존 제품 규격과 설치 구조를 확인하면 교체 가능 여부를 검토할 수 있습니다. 모델명과 설치 사진이 있으면 상담에 도움이 됩니다.",
  },

  {
    question:
      "렌지후드와 후황도 교체할 수 있나요?",
    answer:
      "렌지후드, 레인지후드, 후황 등으로 불리는 주방 환기후드도 제품 형태와 설치 규격을 확인해 교체 방법을 상담할 수 있습니다.",
  },

  {
    question:
      "다른 브랜드 후드로 바꿀 수 있나요?",
    answer:
      "제품 폭과 설치 공간, 고정 방식과 배기 연결 규격이 맞는 경우 다른 브랜드 제품도 검토할 수 있습니다.",
  },

  {
    question:
      "후드 교체 전에 무엇을 확인해야 하나요?",
    answer:
      "기존 제품 모델명과 가로 폭, 후드 전체 사진, 상부장 또는 벽면 구조를 확인하면 좋습니다.",
  },

  {
    question:
      "빌트인후드도 교체할 수 있나요?",
    answer:
      "빌트인후드는 주방가구 내부의 설치 공간과 기존 제품 규격을 확인한 뒤 교체 가능 여부를 검토합니다.",
  },

  {
    question:
      "아일랜드후드는 일반 후드와 작업이 다른가요?",
    answer:
      "아일랜드후드는 천장에 고정되는 구조이므로 천장 고정 상태와 배기덕트, 전원 위치 확인이 중요합니다.",
  },

  {
    question:
      "침니후드 교체 시 무엇을 확인하나요?",
    answer:
      "침니형 제품은 벽면 고정 상태와 설치 높이, 기존 배기 연결 상태를 확인합니다.",
  },

  {
    question:
      "후드 사진만으로 상담할 수 있나요?",
    answer:
      "후드 전체 모습과 제품 라벨, 주변 주방가구가 보이는 사진이 있으면 기본적인 제품 형태와 설치 상태 확인에 도움이 됩니다.",
  },

  {
    question:
      "후드 가로 폭을 꼭 확인해야 하나요?",
    answer:
      "기존 후드 폭은 새 제품이 현재 설치 공간에 맞는지 검토하는 데 중요한 정보입니다.",
  },

  {
    question:
      "기존 후드를 철거한 뒤 추가 작업이 생길 수도 있나요?",
    answer:
      "기존 배기 연결이나 고정 구조, 주방가구 상태에 따라 추가 작업이 필요한 경우가 있을 수 있습니다.",
  },
];

/* =========================================================
   섹션 제목
========================================================= */

const typeTitles = [
  (name: string) =>
    `${name}에서 교체 가능한 후드 종류`,

  (name: string) =>
    `${name} 주방후드 종류별 교체 안내`,

  (name: string) =>
    `${name} 렌지후드·주방후드 유형`,

  (name: string) =>
    `${name} 후드 종류와 확인사항`,
];

const housingTitles = [
  (name: string) =>
    `${name} 아파트·빌라·주택 후드 교체`,

  (name: string) =>
    `${name} 주거공간별 주방후드 교체`,

  (name: string) =>
    `${name} 아파트와 주택 후드 교체 안내`,

  (name: string) =>
    `${name} 주택 유형별 후드 교체`,
];

const checkTitles = [
  (name: string) =>
    `${name} 후드 교체 전 확인할 사항`,

  (name: string) =>
    `${name} 주방후드 교체 전 체크사항`,

  (name: string) =>
    `${name} 렌지후드 상담 전 확인사항`,

  () =>
    "후드 교체 전에 확인해 주세요",
];

const processTitles = [
  (name: string) =>
    `${name} 후드 교체 상담 과정`,

  (name: string) =>
    `${name} 주방후드 교체 상담 절차`,

  () =>
    "후드 교체 상담은 이렇게 진행됩니다",

  (name: string) =>
    `${name} 렌지후드 상담 순서`,
];

const faqTitles = [
  (name: string) =>
    `${name} 후드 교체 자주 묻는 질문`,

  (name: string) =>
    `${name} 주방후드 교체 FAQ`,

  () =>
    "후드 교체 상담 전 많이 묻는 질문",

  (name: string) =>
    `${name} 렌지후드 교체 Q&A`,
];

/* =========================================================
   STYLE
========================================================= */

const container = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "0 20px",
};

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
  gap: 15,
};

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { region, district } = await params;

  const regionData =
    getRegion(region);

  const districtData =
    getDistrict(region, district);

  if (!regionData || !districtData) {
    return {
      title:
        "페이지를 찾을 수 없습니다",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const name =
    districtData.name;

  const seed =
    hashString(
      `${region}-${district}-${name}`
    );

  const caseImage =
    pick(
      CASE_IMAGES,
      seed,
      7
    );

  const title =
    pick(
      titleTemplates,
      seed
    )(name);

  const description =
    pick(
      descriptionTemplates,
      seed,
      3
    )(name);

  const canonical =
    `${SITE.url}/area/${region}/${district}`;

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
          url:
            `${SITE.url}${caseImage.src}`,

          alt:
            caseImage.alt,
        },
      ],
    },
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function DistrictPage({
  params,
}: PageProps) {
  const { region, district } =
    await params;

  const regionData =
    getRegion(region);

  const districtData =
    getDistrict(region, district);

  if (!regionData || !districtData) {
    notFound();
  }

  const name =
    districtData.name;

  const location =
    `${regionData.name} ${name}`;

  const pageUrl =
    `${SITE.url}/area/${region}/${district}`;

  const seed =
    hashString(
      `${region}-${district}-${name}`
    );

  /* =======================================================
     지역별 고정 이미지
  ======================================================= */

  const caseImage =
    pick(
      CASE_IMAGES,
      seed,
      7
    );

  /* =======================================================
     지역별 고정 상담 조합
  ======================================================= */

  const consultTitle =
    pick(
      CONSULT_TITLES,
      seed,
      9
    )(name);

  const consultStart =
    pick(
      CONSULT_STARTS,
      seed,
      10
    )(name);

  const consultMiddle =
    pick(
      CONSULT_MIDDLES,
      seed,
      11
    );

  const workDetail =
    pick(
      WORK_DETAILS,
      seed,
      12
    );

  const consultEnd =
    pick(
      CONSULT_ENDS,
      seed,
      13
    );

  /* =======================================================
     나머지 지역별 콘텐츠
  ======================================================= */

  const intro =
    pick(
      introTemplates,
      seed
    )(location);

  const detail =
    pick(
      detailTemplates,
      seed,
      2
    )(name);

  const housingIntro =
    pick(
      housingIntroTemplates,
      seed,
      4
    )(name);

  const prepare =
    pick(
      prepareTemplates,
      seed,
      5
    );

  const pageHoodTypes =
    rotate(
      hoodTypes,
      seed % hoodTypes.length
    );

  const pageHousingTypes =
    rotate(
      housingTypes,
      seed % housingTypes.length
    );

  const pageChecks =
    rotate(
      checks,
      seed % checks.length
    ).slice(0, 4);

  const pageProcess =
    rotate(
      process,
      seed % process.length
    );

  const pageFaqs =
    rotate(
      faqBank,
      seed % faqBank.length
    ).slice(0, 5);

  const typeTitle =
    pick(
      typeTitles,
      seed,
      1
    )(name);

  const housingTitle =
    pick(
      housingTitles,
      seed,
      2
    )(name);

  const checkTitle =
    pick(
      checkTitles,
      seed,
      3
    )(name);

  const processTitle =
    pick(
      processTitles,
      seed,
      4
    )(name);

  const faqTitle =
    pick(
      faqTitles,
      seed,
      5
    )(name);

  const otherDistricts =
    rotate(
      regionData.districts.filter(
        (item) =>
          item.slug !== district
      ),
      seed %
        Math.max(
          regionData.districts.length,
          1
        )
    );

  const layoutVariant =
    seed % 3;

  /* =======================================================
     STRUCTURED DATA
  ======================================================= */

  const schema = {
    "@context":
      "https://schema.org",

    "@graph": [
      {
        "@type":
          "WebPage",

        "@id":
          `${pageUrl}#webpage`,

        url:
          pageUrl,

        name:
          `${name} 후드 교체`,

        description:
          `${location} 주방후드 및 렌지후드 교체 안내`,

        inLanguage:
          "ko-KR",

        breadcrumb: {
          "@id":
            `${pageUrl}#breadcrumb`,
        },

        mainEntity: {
          "@id":
            `${pageUrl}#service`,
        },

        primaryImageOfPage: {
          "@id":
            `${pageUrl}#image`,
        },
      },

      {
        "@type":
          "ImageObject",

        "@id":
          `${pageUrl}#image`,

        url:
          `${SITE.url}${caseImage.src}`,

        contentUrl:
          `${SITE.url}${caseImage.src}`,

        caption:
          caseImage.caption,
      },

      {
        "@type":
          "Service",

        "@id":
          `${pageUrl}#service`,

        name:
          `${name} 주방후드 교체 상담`,

        serviceType:
          "주방후드 교체",

        description:
          `${location} 주방후드·렌지후드 교체 상담 안내`,

        provider: {
          "@type":
            "Organization",

          name:
            SITE.name,

          url:
            SITE.url,

          telephone:
            SITE.phone,
        },

        areaServed: {
          "@type":
            "AdministrativeArea",

          name:
            location,
        },

        url:
          pageUrl,
      },

      {
        "@type":
          "BreadcrumbList",

        "@id":
          `${pageUrl}#breadcrumb`,

        itemListElement: [
          {
            "@type":
              "ListItem",

            position: 1,

            name:
              "홈",

            item:
              SITE.url,
          },

          {
            "@type":
              "ListItem",

            position: 2,

            name:
              "전국 지역",

            item:
              `${SITE.url}/area`,
          },

          {
            "@type":
              "ListItem",

            position: 3,

            name:
              regionData.name,

            item:
              `${SITE.url}/area/${region}`,
          },

          {
            "@type":
              "ListItem",

            position: 4,

            name:
              `${name} 후드 교체`,

            item:
              pageUrl,
          },
        ],
      },
    ],
  };

  /* =======================================================
     HOUSING SECTION
  ======================================================= */

  const HousingSection = (
    <section
      style={{
        marginBottom: 55,
      }}
    >
      <h2
        style={{
          fontSize: 26,
          margin:
            "0 0 15px",
        }}
      >
        {housingTitle}
      </h2>

      <p
        style={{
          color:
            "#606060",

          fontSize:
            14,

          lineHeight:
            1.95,

          margin:
            "0 0 23px",
        }}
      >
        {housingIntro}
      </p>

      <div style={grid}>
        {pageHousingTypes.map(
          (item) => (
            <article
              key={
                item.title
              }
              style={{
                background:
                  "#fff",

                border:
                  "1px solid #e7e3dc",

                borderRadius:
                  12,

                padding:
                  23,
              }}
            >
              <h3
                style={{
                  fontSize:
                    18,

                  margin:
                    "0 0 11px",
                }}
              >
                {name} {item.title}
              </h3>

              <p
                style={{
                  color:
                    "#666",

                  fontSize:
                    14,

                  lineHeight:
                    1.9,

                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </article>
          )
        )}
      </div>
    </section>
  );

  /* =======================================================
     TYPE SECTION
  ======================================================= */

  const TypeSection = (
    <section
      style={{
        marginBottom: 55,
      }}
    >
      <h2
        style={{
          fontSize: 26,
          margin:
            "0 0 22px",
        }}
      >
        {typeTitle}
      </h2>

      <div style={grid}>
        {pageHoodTypes.map(
          (item) => (
            <article
              key={
                item.title
              }
              style={{
                background:
                  "#fff",

                border:
                  "1px solid #e7e3dc",

                borderRadius:
                  12,

                padding:
                  23,
              }}
            >
              <h3
                style={{
                  fontSize:
                    18,

                  margin:
                    "0 0 11px",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color:
                    "#666",

                  fontSize:
                    14,

                  lineHeight:
                    1.9,

                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </article>
          )
        )}
      </div>
    </section>
  );

  /* =======================================================
     CHECK SECTION
  ======================================================= */

  const CheckSection = (
    <section
      style={{
        marginBottom: 55,
      }}
    >
      <h2
        style={{
          fontSize:
            26,

          margin:
            "0 0 22px",
        }}
      >
        {checkTitle}
      </h2>

      <div style={grid}>
        {pageChecks.map(
          (item, index) => (
            <article
              key={
                item.title
              }
              style={{
                background:
                  "#f1ece3",

                borderRadius:
                  12,

                padding:
                  23,
              }}
            >
              <p
                style={{
                  color:
                    "#96713e",

                  fontSize:
                    12,

                  fontWeight:
                    900,

                  margin:
                    "0 0 10px",
                }}
              >
                CHECK {index + 1}
              </p>

              <h3
                style={{
                  fontSize:
                    18,

                  margin:
                    "0 0 11px",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color:
                    "#626262",

                  fontSize:
                    14,

                  lineHeight:
                    1.9,

                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </article>
          )
        )}
      </div>
    </section>
  );

  return (
    <main
      style={{
        minHeight:
          "100vh",

        background:
          "#faf9f6",

        color:
          "#171717",

        fontFamily:
          "'Pretendard', 'Noto Sans KR', Arial, sans-serif",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              schema
            ).replace(
              /</g,
              "\\u003c"
            ),
        }}
      />

      {/* HEADER */}

      <header
        style={{
          background:
            "#fff",

          borderBottom:
            "1px solid #e9e5de",

          padding:
            "17px 20px",
        }}
      >
        <div
          style={{
            ...container,

            display:
              "flex",

            justifyContent:
              "space-between",

            alignItems:
              "center",

            gap:
              14,

            flexWrap:
              "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              color:
                "#171717",

              textDecoration:
                "none",

              fontWeight:
                900,

              fontSize:
                22,
            }}
          >
            후드의정석
          </Link>

          <a
            href={
              SITE.phoneHref
            }
            style={{
              background:
                "#171717",

              color:
                "#fff",

              textDecoration:
                "none",

              borderRadius:
                8,

              padding:
                "12px 16px",

              fontWeight:
                800,

              fontSize:
                13,
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
            "linear-gradient(145deg,#121212,#211e1a)",

          color:
            "#fff",

          textAlign:
            "center",

          padding:
            "78px 20px",
        }}
      >
        <div
          style={{
            maxWidth:
              900,

            margin:
              "0 auto",
          }}
        >
          <p
            style={{
              color:
                "#d7b67a",

              fontWeight:
                900,

              letterSpacing:
                "2.5px",

              fontSize:
                11,

              margin:
                "0 0 15px",
            }}
          >
            HOOD MASTER · LOCAL SERVICE
          </p>

          <h1
            style={{
              fontSize:
                "clamp(32px,6vw,48px)",

              fontWeight:
                900,

              lineHeight:
                1.28,

              letterSpacing:
                "-1.5px",

              margin:
                "0 0 18px",
            }}
          >
            {name} 후드 교체
          </h1>

          <p
            style={{
              color:
                "#ddd",

              fontSize:
                16,

              lineHeight:
                1.95,

              margin:
                "0 0 28px",
            }}
          >
            주방후드 · 렌지후드 · 후황
            <br />
            빌트인 · 아일랜드 · 침니후드
          </p>

          <a
            href={
              SITE.phoneHref
            }
            style={{
              display:
                "inline-block",

              background:
                "#ab8247",

              color:
                "#fff",

              textDecoration:
                "none",

              borderRadius:
                10,

              padding:
                "16px 27px",

              fontWeight:
                900,
            }}
          >
            후드 교체 전화상담
          </a>
        </div>
      </section>

      {/* CONTENT */}

      <section
        style={{
          ...container,

          paddingTop:
            40,

          paddingBottom:
            70,
        }}
      >
        {/* BREADCRUMB */}

        <nav
          aria-label="현재 위치"
          style={{
            color:
              "#797979",

            fontSize:
              13,

            lineHeight:
              2,

            marginBottom:
              32,
          }}
        >
          <Link
            href="/"
            style={{
              color:
                "inherit",
            }}
          >
            홈
          </Link>

          {" / "}

          <Link
            href="/area"
            style={{
              color:
                "inherit",
            }}
          >
            전국 지역
          </Link>

          {" / "}

          <Link
            href={`/area/${region}`}
            style={{
              color:
                "inherit",
            }}
          >
            {regionData.name}
          </Link>

          {" / "}

          {name}
        </nav>

        {/* INTRO */}

        <h2
          style={{
            fontSize:
              29,

            margin:
              "0 0 20px",
          }}
        >
          {name} 주방후드·렌지후드 교체
        </h2>

        <p
          style={{
            color:
              "#515151",

            fontSize:
              15,

            lineHeight:
              2,

            margin:
              "0 0 22px",
          }}
        >
          {intro}
        </p>

        <p
          style={{
            color:
              "#515151",

            fontSize:
              15,

            lineHeight:
              2,

            margin:
              "0 0 45px",
          }}
        >
          {detail}
        </p>

        {/* IMAGE */}

        <figure
          style={{
            background:
              "#fff",

            border:
              "1px solid #e7e3dc",

            borderRadius:
              14,

            overflow:
              "hidden",

            margin:
              "0 0 35px",
          }}
        >
          <div
            style={{
              position:
                "relative",

              width:
                "100%",

              aspectRatio:
                "4 / 3",

              background:
                "#ececec",
            }}
          >
            <Image
              src={
                caseImage.src
              }
              alt={
                caseImage.alt
              }
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1000px"
              style={{
                objectFit:
                  "contain",
              }}
            />
          </div>

          <figcaption
            style={{
              padding:
                "25px 24px 27px",
            }}
          >
            <p
              style={{
                color:
                  "#a78047",

                fontWeight:
                  900,

                fontSize:
                  11,

                letterSpacing:
                  "1.5px",

                margin:
                  "0 0 8px",
              }}
            >
              HOOD REPLACEMENT REFERENCE
            </p>

            <h2
              style={{
                fontSize:
                  23,

                margin:
                  "0 0 13px",
              }}
            >
              {caseImage.caption}
            </h2>

            <p
              style={{
                color:
                  "#606060",

                fontSize:
                  14,

                lineHeight:
                  1.95,

                margin:
                  0,
              }}
            >
              후드 교체 작업을 이해하기 위한
              참고 이미지입니다. 실제 교체 제품과
              작업 방법은 기존 후드의 종류,
              설치 공간, 주방가구와 배기덕트
              구조에 따라 달라질 수 있습니다.
            </p>
          </figcaption>
        </figure>

        {/* CONSULT STORY */}

        <section
          style={{
            background:
              "#171717",

            color:
              "#fff",

            borderRadius:
              15,

            padding:
              "31px 27px",

            marginBottom:
              55,
          }}
        >
          <p
            style={{
              color:
                "#c89d5f",

              fontSize:
                11,

              fontWeight:
                900,

              letterSpacing:
                "1.7px",

              margin:
                "0 0 10px",
            }}
          >
            CONSULTATION EXAMPLE
          </p>

          <h2
            style={{
              fontSize:
                25,

              lineHeight:
                1.4,

              margin:
                "0 0 21px",
            }}
          >
            {consultTitle}
          </h2>

          <div
            style={{
              display:
                "grid",

              gap:
                16,
            }}
          >
            <p
              style={{
                color:
                  "#f2f2f2",

                fontSize:
                  15,

                lineHeight:
                  1.95,

                margin:
                  0,
              }}
            >
              {consultStart}
            </p>

            <p
              style={{
                color:
                  "#c9c9c9",

                fontSize:
                  14,

                lineHeight:
                  1.95,

                margin:
                  0,
              }}
            >
              {consultMiddle}
            </p>

            <div
              style={{
                borderLeft:
                  "3px solid #b08448",

                paddingLeft:
                  17,

                margin:
                  "2px 0",
              }}
            >
              <p
                style={{
                  color:
                    "#ddd",

                  fontSize:
                    14,

                  lineHeight:
                    1.95,

                  margin:
                    0,
                }}
              >
                {workDetail}
              </p>
            </div>

            <p
              style={{
                color:
                  "#aaa",

                fontSize:
                  13,

                lineHeight:
                  1.9,

                margin:
                  0,
              }}
            >
              {consultEnd}
            </p>
          </div>
        </section>

        {/* 지역별 섹션 순서 변화 */}

        {layoutVariant === 0 && (
          <>
            {HousingSection}
            {TypeSection}
            {CheckSection}
          </>
        )}

        {layoutVariant === 1 && (
          <>
            {TypeSection}
            {CheckSection}
            {HousingSection}
          </>
        )}

        {layoutVariant === 2 && (
          <>
            {CheckSection}
            {HousingSection}
            {TypeSection}
          </>
        )}

        {/* PREPARE */}

        <aside
          style={{
            background:
              "#fff",

            border:
              "1px solid #ddd5ca",

            borderRadius:
              12,

            padding:
              24,

            marginBottom:
              55,
          }}
        >
          <h2
            style={{
              fontSize:
                22,

              margin:
                "0 0 12px",
            }}
          >
            {prepare.title}
          </h2>

          <p
            style={{
              color:
                "#606060",

              fontSize:
                14,

              lineHeight:
                1.9,

              margin:
                0,
            }}
          >
            {prepare.description}
          </p>
        </aside>

        {/* PROCESS */}

        <section
          style={{
            marginBottom:
              55,
          }}
        >
          <h2
            style={{
              fontSize:
                26,

              margin:
                "0 0 22px",
            }}
          >
            {processTitle}
          </h2>

          <div style={grid}>
            {pageProcess.map(
              (item, index) => (
                <article
                  key={
                    item.title
                  }
                  style={{
                    background:
                      "#171717",

                    color:
                      "#fff",

                    borderRadius:
                      12,

                    padding:
                      23,
                  }}
                >
                  <p
                    style={{
                      color:
                        "#d7b67a",

                      fontSize:
                        12,

                      fontWeight:
                        900,

                      margin:
                        "0 0 10px",
                    }}
                  >
                    STEP {index + 1}
                  </p>

                  <h3
                    style={{
                      fontSize:
                        17,

                      margin:
                        "0 0 10px",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      color:
                        "#ccc",

                      fontSize:
                        13,

                      lineHeight:
                        1.8,

                      margin:
                        0,
                    }}
                  >
                    {item.description}
                  </p>
                </article>
              )
            )}
          </div>
        </section>

        {/* FAQ */}

        <section
          style={{
            marginBottom:
              55,
          }}
        >
          <h2
            style={{
              fontSize:
                26,

              margin:
                "0 0 22px",
            }}
          >
            {faqTitle}
          </h2>

          <div
            style={{
              display:
                "grid",

              gap:
                12,
            }}
          >
            {pageFaqs.map(
              (faq) => (
                <details
                  key={
                    faq.question
                  }
                  style={{
                    background:
                      "#fff",

                    border:
                      "1px solid #e7e3dc",

                    borderRadius:
                      10,

                    padding:
                      "20px 22px",
                  }}
                >
                  <summary
                    style={{
                      cursor:
                        "pointer",

                      fontWeight:
                        800,

                      fontSize:
                        15,

                      lineHeight:
                        1.8,
                    }}
                  >
                    {faq.question}
                  </summary>

                  <p
                    style={{
                      color:
                        "#666",

                      fontSize:
                        14,

                      lineHeight:
                        1.9,

                      margin:
                        "15px 0 0",
                    }}
                  >
                    {faq.answer}
                  </p>
                </details>
              )
            )}
          </div>
        </section>

        {/* INTERNAL LINKS */}

        <section>
          <h2
            style={{
              fontSize:
                24,

              margin:
                "0 0 18px",
            }}
          >
            {regionData.name} 다른 지역 후드 교체
          </h2>

          <div
            style={{
              display:
                "flex",

              flexWrap:
                "wrap",

              gap:
                9,
            }}
          >
            {otherDistricts.map(
              (item) => (
                <Link
                  key={
                    item.slug
                  }
                  href={`/area/${region}/${item.slug}`}
                  style={{
                    background:
                      "#fff",

                    border:
                      "1px solid #e5e5e5",

                    padding:
                      "10px 13px",

                    borderRadius:
                      7,

                    color:
                      "#555",

                    fontSize:
                      13,

                    textDecoration:
                      "none",
                  }}
                >
                  {item.name} 후드 교체
                </Link>
              )
            )}
          </div>

          <div
            style={{
              marginTop:
                28,
            }}
          >
            <Link
              href={`/area/${region}`}
              style={{
                color:
                  "#96713e",

                fontWeight:
                  900,

                fontSize:
                  14,
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
          background:
            "#f0ece4",

          textAlign:
            "center",

          padding:
            "65px 20px",
        }}
      >
        <h2
          style={{
            fontSize:
              28,

            margin:
              "0 0 15px",
          }}
        >
          {name} 후드 교체 상담
        </h2>

        <p
          style={{
            color:
              "#555",

            lineHeight:
              1.9,

            fontSize:
              14,

            margin:
              "0 0 25px",
          }}
        >
          기존 후드 사진과 모델명,
          설치 지역을 알려주시면
          교체 상담에 도움이 됩니다.
        </p>

        <a
          href={
            SITE.phoneHref
          }
          style={{
            display:
              "inline-block",

            background:
              "#171717",

            color:
              "#fff",

            padding:
              "17px 30px",

            borderRadius:
              9,

            fontWeight:
              900,

            textDecoration:
              "none",
          }}
        >
          전화상담 {SITE.phone}
        </a>
      </section>

      {/* FOOTER */}

      <footer
        style={{
          background:
            "#151515",

          color:
            "#bcbcbc",

          padding:
            "30px 20px 110px",

          textAlign:
            "center",

          fontSize:
            13,

          lineHeight:
            1.9,
        }}
      >
        <strong
          style={{
            color:
              "#fff",
          }}
        >
          후드의정석
        </strong>

        <div>
          전국 주방후드 교체 상담
        </div>

        <div>
          {SITE.phone}
        </div>

        <div>
          © {new Date().getFullYear()} 후드의정석
        </div>
      </footer>

      {/* FIXED CALL */}

      <a
        href={
          SITE.phoneHref
        }
        aria-label={`${name} 후드 교체 전화상담`}
        style={{
          position:
            "fixed",

          left:
            16,

          right:
            16,

          bottom:
            14,

          zIndex:
            50,

          background:
            "#a78047",

          color:
            "#fff",

          textAlign:
            "center",

          padding:
            "17px 20px",

          borderRadius:
            12,

          fontWeight:
            900,

          fontSize:
            16,

          textDecoration:
            "none",

          boxShadow:
            "0 6px 25px rgba(0,0,0,0.18)",
        }}
      >
        전화상담 바로가기 · {SITE.phone}
      </a>
    </main>
  );
}
