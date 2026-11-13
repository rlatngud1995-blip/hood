import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { regions } from "../lib/regions";
import { SITE } from "../lib/services";

/* =========================================================
   후드의정석 메인 페이지
   app/page.tsx
========================================================= */

const HERO_IMAGES = [
  {
    src: "/12B08037-6AD2-4EF2-AB3F-2F9FAA2EE6A2.png",
    alt: "주방후드 교체 작업 참고 이미지",
  },
  {
    src: "/310B47AA-B344-4A17-9160-AC277DBF595E.png",
    alt: "아일랜드후드 교체 작업 참고 이미지",
  },
  {
    src: "/10D74E67-C29E-41AD-85D7-64D8092D6C4D.png",
    alt: "침니후드 교체 작업 참고 이미지",
  },
];

const COUPON_IMAGE =
  "/8BE994D5-1983-4D8D-8C74-999E637E17EA.png";

const SERVICES = [
  {
    number: "01",
    eyebrow: "KITCHEN HOOD",
    title: "주방후드 교체",
    description:
      "가정집 주방에 설치된 렌지후드, 후황, 슬림후드, 빌트인후드, 통후드의 교체 상담을 진행합니다.",
    detail:
      "기존 제품 모델명과 가로 폭, 상부장 내부 공간, 배기덕트 위치를 확인해 교체 가능한 제품 형태를 검토합니다.",
    image:
      "/12B08037-6AD2-4EF2-AB3F-2F9FAA2EE6A2.png",
    href: "/services/kitchen-hood",
    alt: "주방후드와 렌지후드 교체 안내",
  },
  {
    number: "02",
    eyebrow: "ISLAND HOOD",
    title: "아일랜드후드 교체",
    description:
      "아일랜드 주방 중앙부 천장에 설치된 후드의 교체 상담을 진행합니다.",
    detail:
      "천장 고정 구조와 제품 높이, 전원 위치, 배기덕트 연결 상태를 함께 확인하는 것이 중요합니다.",
    image:
      "/310B47AA-B344-4A17-9160-AC277DBF595E.png",
    href: "/services/island-hood",
    alt: "천장형 아일랜드후드 교체 안내",
  },
  {
    number: "03",
    eyebrow: "CHIMNEY HOOD",
    title: "침니후드 교체",
    description:
      "벽면에 설치되는 침니후드와 데코형 후드의 철거 및 교체 상담을 진행합니다.",
    detail:
      "기존 제품의 폭과 높이, 벽면 고정 상태, 배기구 위치를 확인해 설치 조건을 검토합니다.",
    image:
      "/10D74E67-C29E-41AD-85D7-64D8092D6C4D.png",
    href: "/services/chimney-hood",
    alt: "벽면형 침니후드 교체 안내",
  },
];

const CHECK_ITEMS = [
  {
    number: "01",
    title: "기존 후드 전체 사진",
    description:
      "후드와 주변 상부장이 함께 보이도록 촬영하면 현재 설치 형태를 파악하기 좋습니다.",
  },
  {
    number: "02",
    title: "제품 모델명",
    description:
      "필터 안쪽이나 제품 하단의 라벨에서 모델명을 확인하면 제품 규격을 비교하는 데 도움이 됩니다.",
  },
  {
    number: "03",
    title: "후드 가로 폭",
    description:
      "기존 후드의 실제 가로 폭을 확인하면 새 제품의 설치 가능 여부를 판단하기 쉽습니다.",
  },
  {
    number: "04",
    title: "설치 구조",
    description:
      "상부장, 벽면, 천장과 배기덕트 구조에 따라 필요한 설치 작업이 달라질 수 있습니다.",
  },
];

const HOOD_TYPES = [
  "렌지후드",
  "주방후드",
  "후황",
  "슬림후드",
  "빌트인후드",
  "통후드",
  "허리케인후드",
  "침니후드",
  "데코후드",
  "아일랜드후드",
];

const PROCESS = [
  {
    number: "01",
    title: "사진 확인",
    description:
      "현재 설치된 후드와 주변 주방 구조가 보이는 사진을 확인합니다.",
  },
  {
    number: "02",
    title: "모델·규격 확인",
    description:
      "모델명과 제품 폭, 설치 공간을 기준으로 교체 조건을 살펴봅니다.",
  },
  {
    number: "03",
    title: "설치 조건 확인",
    description:
      "상부장 또는 벽면·천장 구조와 배기덕트 위치를 확인합니다.",
  },
  {
    number: "04",
    title: "교체 상담",
    description:
      "확인된 설치 조건을 바탕으로 제품 형태와 필요한 작업을 상담합니다.",
  },
];

const FAQS = [
  {
    question: "오래된 주방후드도 교체할 수 있나요?",
    answer:
      "기존 제품의 모델명과 크기, 설치 구조를 확인한 뒤 교체 가능 여부를 검토할 수 있습니다. 오래된 제품이라 모델명을 확인하기 어렵다면 후드 전체 사진과 가로 폭을 함께 확인해 주세요.",
  },
  {
    question: "렌지후드나 후황도 교체 가능한가요?",
    answer:
      "렌지후드, 레인지후드, 후황 등으로 불리는 가정용 주방 환기후드도 상담 가능합니다. 실제 작업 방법은 현재 제품과 설치 구조에 따라 달라질 수 있습니다.",
  },
  {
    question: "기존 제품과 다른 브랜드로 바꿀 수 있나요?",
    answer:
      "제품 폭과 설치 공간, 고정 방식, 배기덕트 연결 규격이 맞는 경우 다른 브랜드 제품도 검토할 수 있습니다.",
  },
  {
    question: "아일랜드후드는 일반 후드와 무엇이 다른가요?",
    answer:
      "아일랜드후드는 주방 중앙부 천장에 고정되는 경우가 많아 천장 고정 구조와 전원, 배기덕트 위치까지 확인하는 것이 중요합니다.",
  },
  {
    question: "상담할 때 어떤 사진이 필요한가요?",
    answer:
      "후드 전체 모습, 주변 상부장이나 벽면이 함께 보이는 사진, 제품 모델명이 적힌 라벨 사진을 준비하면 상담에 도움이 됩니다.",
  },
];

/* =========================================================
   SEO METADATA
========================================================= */

export const metadata: Metadata = {
  title: {
    absolute: "후드의정석 | 전국 주방후드·렌지후드 교체",
  },

  description:
    "전국 주방후드·렌지후드·후황·아일랜드후드·침니후드 교체 상담 전문 후드의정석.",

  alternates: {
    canonical: SITE.url,
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
    url: SITE.url,
    title: "후드의정석 | 전국 주방후드·렌지후드 교체",
    description:
      "주방후드·렌지후드·후황·아일랜드후드·침니후드 교체 상담 전문.",

    images: [
      {
        url: `${SITE.url}/12B08037-6AD2-4EF2-AB3F-2F9FAA2EE6A2.png`,
        width: 1200,
        height: 630,
        alt: "후드의정석 주방후드 교체",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "후드의정석 | 전국 주방후드·렌지후드 교체",
    description:
      "주방후드·렌지후드·후황·아일랜드후드·침니후드 교체 상담 전문.",
    images: [
      `${SITE.url}/12B08037-6AD2-4EF2-AB3F-2F9FAA2EE6A2.png`,
    ],
  },
};

/* =========================================================
   MAIN
========================================================= */

export default function HomePage() {
  const year = new Date().getFullYear();

  const schema = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        inLanguage: "ko-KR",
      },

      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        telephone: SITE.phone,
        description:
          "전국 주방후드, 렌지후드, 후황, 아일랜드후드, 침니후드 교체 상담 전문.",
      },

      {
        "@type": "WebPage",
        "@id": `${SITE.url}/#webpage`,
        url: SITE.url,
        name: "후드의정석 | 전국 주방후드·렌지후드 교체",
        description:
          "전국 주방후드·렌지후드·후황·아일랜드후드·침니후드 교체 상담 전문 후드의정석.",
        isPartOf: {
          "@id": `${SITE.url}/#website`,
        },
        about: {
          "@id": `${SITE.url}/#organization`,
        },
        inLanguage: "ko-KR",
      },

      {
        "@type": "ItemList",
        "@id": `${SITE.url}/#services`,
        name: "후드의정석 주요 후드 교체 서비스",
        numberOfItems: 3,
        itemListElement: SERVICES.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.title,
            url: `${SITE.url}${service.href}`,
            provider: {
              "@id": `${SITE.url}/#organization`,
            },
            areaServed: {
              "@type": "Country",
              name: "대한민국",
            },
          },
        })),
      },

      {
        "@type": "FAQPage",
        "@id": `${SITE.url}/#faq`,
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />

      <style>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #f7f5f1;
          color: #171717;
        }

        .page {
          min-height: 100vh;
          background: #f7f5f1;
          color: #171717;
          font-family:
            Pretendard,
            "Noto Sans KR",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        .container {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
        }

        .header {
          position: sticky;
          top: 0;
          z-index: 100;
          height: 72px;
          border-bottom: 1px solid rgba(255,255,255,.09);
          background: rgba(14,14,14,.94);
          backdrop-filter: blur(15px);
        }

        .headerInner {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 11px;
          color: #fff;
          text-decoration: none;
          white-space: nowrap;
        }

        .brandMark {
          width: 36px;
          height: 36px;
          border: 1px solid #b58a4c;
          border-radius: 7px;
          display: grid;
          place-items: center;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: -0.5px;
          color: #d8b276;
        }

        .brandText strong {
          display: block;
          font-size: 20px;
          line-height: 1;
          letter-spacing: -0.7px;
        }

        .brandText small {
          display: block;
          margin-top: 5px;
          color: #969696;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        .navigation {
          display: flex;
          align-items: center;
          gap: 27px;
        }

        .navigation a {
          color: #cfcfcf;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
        }

        .navigation a:hover {
          color: #fff;
        }

        .headerCall {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          padding: 0 17px;
          border-radius: 7px;
          background: #b08448;
          color: #fff !important;
          font-weight: 900 !important;
        }

        .hero {
          position: relative;
          min-height: 720px;
          overflow: hidden;
          display: flex;
          align-items: center;
          background: #111;
        }

        .heroMedia {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .heroSlide {
          position: absolute;
          inset: 0;
          opacity: 0;
          animation: heroFade 15s infinite;
        }

        .heroSlide:nth-child(1) {
          animation-delay: 0s;
        }

        .heroSlide:nth-child(2) {
          animation-delay: 5s;
        }

        .heroSlide:nth-child(3) {
          animation-delay: 10s;
        }

        .heroSlide img {
          object-fit: cover;
          transform: scale(1.02);
        }

        @keyframes heroFade {
          0% {
            opacity: 0;
            transform: scale(1);
          }

          6% {
            opacity: 1;
          }

          28% {
            opacity: 1;
          }

          36% {
            opacity: 0;
            transform: scale(1.05);
          }

          100% {
            opacity: 0;
          }
        }

        .heroOverlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              90deg,
              rgba(5,5,5,.92) 0%,
              rgba(5,5,5,.78) 38%,
              rgba(5,5,5,.35) 68%,
              rgba(5,5,5,.57) 100%
            ),
            linear-gradient(
              0deg,
              rgba(10,10,10,.55),
              rgba(10,10,10,.1)
            );
        }

        .heroContent {
          position: relative;
          z-index: 3;
          padding: 105px 0 95px;
          color: #fff;
        }

        .heroContentInner {
          max-width: 780px;
        }

        .eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
          color: #d4ad72;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 2.5px;
        }

        .eyebrow::before {
          content: "";
          width: 34px;
          height: 1px;
          background: #b08448;
        }

        .hero h1 {
          margin: 0;
          max-width: 760px;
          font-size: clamp(42px, 6.5vw, 76px);
          line-height: 1.08;
          letter-spacing: -3px;
          font-weight: 900;
        }

        .hero h1 span {
          color: #c69b5c;
        }

        .heroDescription {
          max-width: 650px;
          margin: 28px 0 0;
          color: #d4d4d4;
          font-size: 17px;
          line-height: 1.95;
          word-break: keep-all;
        }

        .heroActions {
          display: flex;
          flex-wrap: wrap;
          gap: 11px;
          margin-top: 35px;
        }

        .primaryButton,
        .secondaryButton {
          min-height: 56px;
          padding: 0 25px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 900;
        }

        .primaryButton {
          background: #b08448;
          color: #fff;
        }

        .secondaryButton {
          border: 1px solid rgba(255,255,255,.32);
          background: rgba(255,255,255,.07);
          color: #fff;
          backdrop-filter: blur(10px);
        }

        .heroFacts {
          display: flex;
          flex-wrap: wrap;
          gap: 11px;
          margin-top: 43px;
        }

        .heroFact {
          min-width: 145px;
          padding: 14px 17px;
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(15,15,15,.42);
          border-radius: 8px;
          backdrop-filter: blur(8px);
        }

        .heroFact strong {
          display: block;
          font-size: 14px;
          color: #fff;
        }

        .heroFact span {
          display: block;
          margin-top: 5px;
          font-size: 11px;
          color: #aaa;
        }

        .introStrip {
          background: #171717;
          border-top: 1px solid #282828;
          border-bottom: 1px solid #282828;
        }

        .introStripGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        .introStripItem {
          padding: 25px 24px;
          border-right: 1px solid #2d2d2d;
        }

        .introStripItem:first-child {
          border-left: 1px solid #2d2d2d;
        }

        .introStripItem small {
          display: block;
          color: #987549;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.5px;
        }

        .introStripItem strong {
          display: block;
          margin-top: 7px;
          color: #f7f7f7;
          font-size: 14px;
          line-height: 1.5;
        }

        .section {
          padding: 95px 0;
        }

        .sectionDark {
          background: #141414;
          color: #fff;
        }

        .sectionWarm {
          background: #efeae1;
        }

        .sectionWhite {
          background: #fff;
        }

        .sectionHead {
          max-width: 780px;
          margin-bottom: 42px;
        }

        .sectionLabel {
          display: block;
          margin-bottom: 12px;
          color: #9d7846;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .sectionHead h2 {
          margin: 0;
          font-size: clamp(30px, 4vw, 46px);
          line-height: 1.25;
          letter-spacing: -1.8px;
          word-break: keep-all;
        }

        .sectionHead p {
          max-width: 680px;
          margin: 17px 0 0;
          color: #656565;
          font-size: 15px;
          line-height: 1.9;
          word-break: keep-all;
        }

        .sectionDark .sectionHead p {
          color: #ababab;
        }

        .coupon {
          padding: 52px 0;
          background:
            linear-gradient(135deg, #d9c6a5, #efe5d4 55%, #e2d3ba);
        }

        .couponInner {
          display: grid;
          grid-template-columns: 1fr 370px;
          align-items: center;
          gap: 48px;
        }

        .couponText small {
          display: block;
          color: #7d5e35;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .couponText h2 {
          margin: 12px 0 0;
          font-size: clamp(31px, 4vw, 47px);
          line-height: 1.15;
          letter-spacing: -2px;
        }

        .couponText p {
          max-width: 580px;
          margin: 16px 0 0;
          color: #5f574d;
          font-size: 14px;
          line-height: 1.85;
        }

        .couponCall {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 53px;
          margin-top: 24px;
          padding: 0 22px;
          border-radius: 7px;
          background: #1a1a1a;
          color: #fff;
          text-decoration: none;
          font-size: 13px;
          font-weight: 900;
        }

        .couponImage {
          position: relative;
          width: 100%;
          aspect-ratio: 1.8 / 1;
          overflow: hidden;
          border-radius: 12px;
          box-shadow: 0 18px 45px rgba(66,50,29,.18);
          background: #fff;
        }

        .couponImage img {
          object-fit: contain;
        }

        .serviceList {
          display: grid;
          gap: 20px;
        }

        .serviceCard {
          display: grid;
          grid-template-columns: 430px 1fr;
          min-height: 330px;
          overflow: hidden;
          border-radius: 14px;
          border: 1px solid #e4dfd7;
          background: #fff;
          text-decoration: none;
          color: inherit;
          transition:
            transform .2s ease,
            box-shadow .2s ease,
            border-color .2s ease;
        }

        .serviceCard:nth-child(even) {
          grid-template-columns: 1fr 430px;
        }

        .serviceCard:nth-child(even) .serviceVisual {
          order: 2;
        }

        .serviceCard:hover {
          transform: translateY(-3px);
          border-color: #cdb48e;
          box-shadow: 0 18px 45px rgba(0,0,0,.08);
        }

        .serviceVisual {
          position: relative;
          min-height: 330px;
          overflow: hidden;
          background: #eae7e1;
        }

        .serviceVisual img {
          object-fit: cover;
          transition: transform .5s ease;
        }

        .serviceCard:hover .serviceVisual img {
          transform: scale(1.025);
        }

        .serviceContent {
          padding: 45px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .serviceTop {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .serviceNumber {
          color: #b08448;
          font-size: 12px;
          font-weight: 900;
        }

        .serviceEyebrow {
          color: #999;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.7px;
        }

        .serviceContent h3 {
          margin: 14px 0 0;
          font-size: 31px;
          letter-spacing: -1.3px;
        }

        .serviceContent p {
          margin: 15px 0 0;
          color: #555;
          font-size: 14px;
          line-height: 1.85;
          word-break: keep-all;
        }

        .serviceDetail {
          padding-top: 13px;
          color: #777 !important;
          font-size: 13px !important;
        }

        .serviceMore {
          margin-top: 24px;
          color: #866337;
          font-size: 13px;
          font-weight: 900;
        }

        .expertiseGrid {
          display: grid;
          grid-template-columns: 1.05fr .95fr;
          gap: 65px;
          align-items: center;
        }

        .expertisePanel {
          padding: 38px;
          border-radius: 16px;
          border: 1px solid #302d29;
          background:
            linear-gradient(145deg, #1c1b19, #111);
        }

        .expertisePanel small {
          color: #b68c53;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.7px;
        }

        .expertisePanel h3 {
          margin: 13px 0 0;
          font-size: 29px;
          line-height: 1.35;
          letter-spacing: -1px;
        }

        .expertisePanel p {
          margin: 16px 0 0;
          color: #aaa;
          font-size: 14px;
          line-height: 1.9;
        }

        .hoodTypeList {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 27px;
        }

        .hoodType {
          padding: 10px 12px;
          border: 1px solid #39352f;
          border-radius: 6px;
          background: #191817;
          color: #d4d0c9;
          font-size: 12px;
          font-weight: 700;
        }

        .checkGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 13px;
        }

        .checkCard {
          min-height: 155px;
          padding: 22px;
          border-radius: 11px;
          background: #1d1d1d;
          border: 1px solid #2c2c2c;
        }

        .checkNumber {
          color: #b08448;
          font-size: 11px;
          font-weight: 900;
        }

        .checkCard h3 {
          margin: 11px 0 0;
          font-size: 16px;
        }

        .checkCard p {
          margin: 10px 0 0;
          color: #999;
          font-size: 12px;
          line-height: 1.75;
        }

        .processGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid #dad3c8;
          border-bottom: 1px solid #dad3c8;
        }

        .processItem {
          position: relative;
          padding: 32px 26px;
          border-right: 1px solid #dad3c8;
        }

        .processItem:first-child {
          border-left: 1px solid #dad3c8;
        }

        .processNumber {
          color: #9a7544;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .processItem h3 {
          margin: 13px 0 0;
          font-size: 18px;
          letter-spacing: -.5px;
        }

        .processItem p {
          margin: 10px 0 0;
          color: #666;
          font-size: 13px;
          line-height: 1.75;
        }

        .areaIntro {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 30px;
          margin-bottom: 30px;
        }

        .areaIntro p {
          max-width: 500px;
          margin: 0;
          color: #6b6b6b;
          font-size: 14px;
          line-height: 1.85;
        }

        .areaGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .areaCard {
          min-height: 92px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 18px;
          border: 1px solid #e0ddd7;
          border-radius: 9px;
          background: #fff;
          color: #222;
          text-decoration: none;
          transition:
            border-color .18s ease,
            background .18s ease,
            transform .18s ease;
        }

        .areaCard:hover {
          border-color: #b69262;
          background: #fbf7f0;
          transform: translateY(-2px);
        }

        .areaCard strong {
          font-size: 15px;
        }

        .areaCard span {
          margin-top: 7px;
          color: #9a7a51;
          font-size: 11px;
          font-weight: 800;
        }

        .areaAll {
          margin-top: 20px;
          display: inline-flex;
          align-items: center;
          min-height: 47px;
          padding: 0 18px;
          border-radius: 7px;
          background: #171717;
          color: #fff;
          text-decoration: none;
          font-size: 13px;
          font-weight: 900;
        }

        .faqList {
          display: grid;
          gap: 11px;
        }

        .faqItem {
          border: 1px solid #e1ddd7;
          border-radius: 10px;
          background: #fff;
          overflow: hidden;
        }

        .faqItem summary {
          cursor: pointer;
          padding: 22px 24px;
          font-size: 15px;
          font-weight: 850;
          line-height: 1.6;
          list-style: none;
        }

        .faqItem summary::-webkit-details-marker {
          display: none;
        }

        .faqItem summary::after {
          content: "+";
          float: right;
          color: #9a7545;
          font-size: 20px;
          line-height: 1;
        }

        .faqItem[open] summary::after {
          content: "−";
        }

        .faqAnswer {
          margin: 0;
          padding: 0 24px 23px;
          color: #666;
          font-size: 14px;
          line-height: 1.9;
        }

        .contact {
          position: relative;
          overflow: hidden;
          padding: 100px 0;
          background:
            radial-gradient(circle at 75% 20%, rgba(176,132,72,.22), transparent 36%),
            #111;
          color: #fff;
        }

        .contact::after {
          content: "HOOD";
          position: absolute;
          right: -30px;
          bottom: -70px;
          color: rgba(255,255,255,.025);
          font-size: 250px;
          line-height: 1;
          font-weight: 900;
          letter-spacing: -15px;
          pointer-events: none;
        }

        .contactInner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 50px;
          align-items: center;
        }

        .contact small {
          color: #bb9158;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .contact h2 {
          max-width: 700px;
          margin: 13px 0 0;
          font-size: clamp(35px, 5vw, 57px);
          line-height: 1.18;
          letter-spacing: -2.5px;
        }

        .contact p {
          max-width: 620px;
          margin: 18px 0 0;
          color: #aaa;
          font-size: 14px;
          line-height: 1.9;
        }

        .contactButton {
          min-width: 220px;
          min-height: 66px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          background: #b08448;
          color: #fff;
          text-decoration: none;
          font-size: 16px;
          font-weight: 900;
        }

        .footer {
          padding: 34px 0 115px;
          background: #0b0b0b;
          border-top: 1px solid #222;
          color: #777;
        }

        .footerInner {
          display: flex;
          justify-content: space-between;
          gap: 30px;
          align-items: flex-start;
        }

        .footerBrand {
          color: #fff;
          font-size: 18px;
          font-weight: 900;
        }

        .footerInfo {
          margin-top: 9px;
          font-size: 12px;
          line-height: 1.8;
        }

        .footerLinks {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 14px;
        }

        .footerLinks a {
          color: #888;
          text-decoration: none;
          font-size: 12px;
        }

        .mobileCall {
          position: fixed;
          left: 15px;
          right: 15px;
          bottom: 13px;
          z-index: 200;
          display: none;
          align-items: center;
          justify-content: center;
          min-height: 57px;
          border-radius: 10px;
          background: #ae8043;
          color: #fff;
          text-decoration: none;
          font-size: 15px;
          font-weight: 900;
          box-shadow: 0 9px 30px rgba(0,0,0,.28);
        }

        @media (max-width: 980px) {
          .navigation a:not(.headerCall) {
            display: none;
          }

          .hero {
            min-height: 680px;
          }

          .introStripGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .serviceCard,
          .serviceCard:nth-child(even) {
            grid-template-columns: 1fr 1.05fr;
          }

          .serviceCard:nth-child(even) .serviceVisual {
            order: initial;
          }

          .serviceContent {
            padding: 35px;
          }

          .expertiseGrid {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .processGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .processItem:nth-child(3) {
            border-left: 1px solid #dad3c8;
          }

          .areaGrid {
            grid-template-columns: repeat(3, 1fr);
          }

          .couponInner {
            grid-template-columns: 1fr 310px;
          }
        }

        @media (max-width: 720px) {
          .container {
            width: min(100% - 32px, 1180px);
          }

          .header {
            height: 64px;
          }

          .brandMark {
            width: 32px;
            height: 32px;
          }

          .brandText strong {
            font-size: 18px;
          }

          .brandText small {
            display: none;
          }

          .headerCall {
            min-height: 38px;
            padding: 0 13px;
            font-size: 12px !important;
          }

          .hero {
            min-height: 660px;
            align-items: flex-end;
          }

          .heroOverlay {
            background:
              linear-gradient(
                0deg,
                rgba(7,7,7,.96) 0%,
                rgba(7,7,7,.78) 46%,
                rgba(7,7,7,.30) 100%
              );
          }

          .heroContent {
            width: 100%;
            padding: 160px 0 54px;
          }

          .eyebrow {
            margin-bottom: 15px;
            font-size: 9px;
          }

          .hero h1 {
            font-size: clamp(39px, 12.5vw, 58px);
            line-height: 1.07;
            letter-spacing: -2.3px;
          }

          .heroDescription {
            margin-top: 20px;
            font-size: 14px;
            line-height: 1.82;
          }

          .heroActions {
            margin-top: 26px;
          }

          .primaryButton,
          .secondaryButton {
            flex: 1 1 calc(50% - 6px);
            min-height: 52px;
            padding: 0 12px;
            font-size: 13px;
          }

          .heroFacts {
            gap: 8px;
            margin-top: 27px;
          }

          .heroFact {
            min-width: 0;
            flex: 1 1 30%;
            padding: 12px 9px;
          }

          .heroFact strong {
            font-size: 12px;
          }

          .heroFact span {
            font-size: 9px;
          }

          .introStripGrid {
            grid-template-columns: 1fr 1fr;
          }

          .introStripItem {
            padding: 19px 15px;
          }

          .introStripItem:nth-child(3) {
            border-left: 1px solid #2d2d2d;
          }

          .introStripItem strong {
            font-size: 12px;
          }

          .section {
            padding: 68px 0;
          }

          .sectionHead {
            margin-bottom: 29px;
          }

          .sectionHead h2 {
            font-size: 31px;
          }

          .sectionHead p {
            font-size: 14px;
            line-height: 1.8;
          }

          .coupon {
            padding: 42px 0;
          }

          .couponInner {
            grid-template-columns: 1fr;
            gap: 27px;
          }

          .couponImage {
            max-width: 440px;
          }

          .serviceList {
            gap: 15px;
          }

          .serviceCard,
          .serviceCard:nth-child(even) {
            grid-template-columns: 1fr;
          }

          .serviceCard:nth-child(even) .serviceVisual {
            order: initial;
          }

          .serviceVisual {
            min-height: 230px;
            aspect-ratio: 16 / 10;
          }

          .serviceContent {
            padding: 27px 23px 30px;
          }

          .serviceContent h3 {
            font-size: 25px;
          }

          .checkGrid {
            grid-template-columns: 1fr 1fr;
          }

          .checkCard {
            min-height: 165px;
            padding: 18px;
          }

          .processGrid {
            grid-template-columns: 1fr;
          }

          .processItem,
          .processItem:nth-child(3) {
            border-left: 1px solid #dad3c8;
            border-right: 1px solid #dad3c8;
            border-bottom: 1px solid #dad3c8;
          }

          .processItem:last-child {
            border-bottom: 0;
          }

          .areaIntro {
            display: block;
          }

          .areaIntro p {
            margin-top: 15px;
          }

          .areaGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .areaCard {
            min-height: 82px;
            padding: 15px;
          }

          .contact {
            padding: 73px 0 90px;
          }

          .contactInner {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .contact h2 {
            font-size: 37px;
          }

          .contactButton {
            width: 100%;
            min-height: 59px;
          }

          .contact::after {
            font-size: 150px;
            right: -10px;
            bottom: -25px;
          }

          .footerInner {
            display: block;
          }

          .footerLinks {
            justify-content: flex-start;
            margin-top: 19px;
          }

          .mobileCall {
            display: flex;
          }
        }

        @media (max-width: 430px) {
          .headerCall {
            font-size: 0 !important;
            width: 42px;
            padding: 0;
          }

          .headerCall::after {
            content: "전화";
            font-size: 12px;
          }

          .checkGrid {
            grid-template-columns: 1fr;
          }

          .areaGrid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .heroSlide {
            animation: none;
            opacity: 0;
          }

          .heroSlide:first-child {
            opacity: 1;
          }

          .serviceCard,
          .serviceVisual img,
          .areaCard {
            transition: none;
          }
        }
      `}</style>

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="header">
        <div className="container headerInner">
          <Link href="/" className="brand" aria-label="후드의정석 홈">
            <div className="brandMark">HM</div>

            <div className="brandText">
              <strong>후드의정석</strong>
              <small>HOOD MASTER</small>
            </div>
          </Link>

          <nav className="navigation" aria-label="주요 메뉴">
            <a href="#service">전문시공</a>
            <a href="#check">교체 전 확인</a>
            <a href="#area">시공지역</a>
            <a href="#faq">자주 묻는 질문</a>

            <a href={SITE.phoneHref} className="headerCall">
              상담 {SITE.phone}
            </a>
          </nav>
        </div>
      </header>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="hero">
        <div className="heroMedia" aria-hidden="true">
          {HERO_IMAGES.map((image, index) => (
            <div className="heroSlide" key={image.src}>
              <Image
                src={image.src}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        <div className="heroOverlay" />

        <div className="container heroContent">
          <div className="heroContentInner">
            <div className="eyebrow">
              KITCHEN HOOD SPECIALIST
            </div>

            <h1>
              주방후드 교체,
              <br />
              <span>후드의정석</span>으로.
            </h1>

            <p className="heroDescription">
              주방후드 · 렌지후드 · 후황부터
              아일랜드후드와 침니후드까지.
              기존 제품의 모델명과 설치 구조를 확인해
              교체에 필요한 조건을 꼼꼼하게 살펴봅니다.
            </p>

            <div className="heroActions">
              <a href={SITE.phoneHref} className="primaryButton">
                전화로 교체 상담
                <span aria-hidden="true">→</span>
              </a>

              <a href="#service" className="secondaryButton">
                시공분야 확인
              </a>
            </div>

            <div className="heroFacts">
              <div className="heroFact">
                <strong>전국 상담</strong>
                <span>지역별 상세 페이지 운영</span>
              </div>

              <div className="heroFact">
                <strong>후드 전문</strong>
                <span>주방 · 아일랜드 · 침니</span>
              </div>

              <div className="heroFact">
                <strong>설치 조건 확인</strong>
                <span>모델 · 규격 · 배기 구조</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROFESSIONAL STRIP
      ====================================================== */}

      <section className="introStrip" aria-label="후드 교체 확인 항목">
        <div className="container introStripGrid">
          <div className="introStripItem">
            <small>PRODUCT</small>
            <strong>기존 후드 모델 확인</strong>
          </div>

          <div className="introStripItem">
            <small>SIZE</small>
            <strong>제품 규격·설치 폭 확인</strong>
          </div>

          <div className="introStripItem">
            <small>DUCT</small>
            <strong>배기덕트 연결 확인</strong>
          </div>

          <div className="introStripItem">
            <small>STRUCTURE</small>
            <strong>상부장·벽면·천장 확인</strong>
          </div>
        </div>
      </section>

      {/* =====================================================
          COUPON
      ====================================================== */}

      <section className="coupon">
        <div className="container couponInner">
          <div className="couponText">
            <small>HOOD MASTER COUPON</small>

            <h2>
              후드 교체 시공비
              <br />
              10,000원 할인
            </h2>

            <p>
              후드의정석 홈페이지 쿠폰입니다.
              상담 시 쿠폰 사용 여부를 말씀해 주세요.
            </p>

            <a href={SITE.phoneHref} className="couponCall">
              쿠폰 사용하고 전화상담
            </a>
          </div>

          <div className="couponImage">
            <Image
              src={COUPON_IMAGE}
              alt="후드의정석 주방후드 교체 시공비 1만원 할인 쿠폰"
              fill
              sizes="(max-width: 720px) 100vw, 370px"
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ====================================================== */}

      <section className="section sectionWhite" id="service">
        <div className="container">
          <div className="sectionHead">
            <span className="sectionLabel">
              SPECIALIZED SERVICE
            </span>

            <h2>
              후드만 집중해서
              <br />
              정확하게 확인합니다.
            </h2>

            <p>
              후드는 겉모습이 비슷해도 설치 방식이 다를 수 있습니다.
              기존 제품의 규격과 주방 구조를 확인한 뒤
              제품 형태에 맞춰 교체 조건을 살펴보는 것이 중요합니다.
            </p>
          </div>

          <div className="serviceList">
            {SERVICES.map((service) => (
              <Link
                href={service.href}
                className="serviceCard"
                key={service.href}
              >
                <div className="serviceVisual">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 720px) 100vw, 430px"
                  />
                </div>

                <div className="serviceContent">
                  <div className="serviceTop">
                    <span className="serviceNumber">
                      {service.number}
                    </span>

                    <span className="serviceEyebrow">
                      {service.eyebrow}
                    </span>
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <p className="serviceDetail">
                    {service.detail}
                  </p>

                  <span className="serviceMore">
                    자세히 보기 →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          EXPERTISE
      ====================================================== */}

      <section className="section sectionDark" id="check">
        <div className="container">
          <div className="sectionHead">
            <span className="sectionLabel">
              PROFESSIONAL CHECK
            </span>

            <h2>
              후드 교체는
              <br />
              제품만 보는 작업이 아닙니다.
            </h2>

            <p>
              후드 종류와 설치 공간, 배기 연결 구조를 함께 확인해야
              교체 과정에서 발생할 수 있는 변수를 줄일 수 있습니다.
            </p>
          </div>

          <div className="expertiseGrid">
            <div className="expertisePanel">
              <small>SUPPORTED HOOD TYPE</small>

              <h3>
                다양한 주방후드 형태를
                <br />
                설치 구조에 맞춰 확인합니다.
              </h3>

              <p>
                일반 렌지후드부터 빌트인형, 벽면형,
                천장형 제품까지 후드 종류에 따라
                확인해야 할 설치 조건이 달라집니다.
              </p>

              <div className="hoodTypeList">
                {HOOD_TYPES.map((type) => (
                  <span className="hoodType" key={type}>
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div className="checkGrid">
              {CHECK_ITEMS.map((item) => (
                <article className="checkCard" key={item.number}>
                  <span className="checkNumber">
                    CHECK {item.number}
                  </span>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESS
      ====================================================== */}

      <section className="section sectionWarm">
        <div className="container">
          <div className="sectionHead">
            <span className="sectionLabel">
              CONSULTING PROCESS
            </span>

            <h2>
              후드 교체 상담,
              <br />
              이렇게 확인합니다.
            </h2>

            <p>
              상담 전에 기존 제품의 사진과 모델명을 준비하면
              설치 형태를 확인하는 데 도움이 됩니다.
            </p>
          </div>

          <div className="processGrid">
            {PROCESS.map((item) => (
              <article className="processItem" key={item.number}>
                <span className="processNumber">
                  STEP {item.number}
                </span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          AREAS
      ====================================================== */}

      <section className="section sectionWhite" id="area">
        <div className="container">
          <div className="areaIntro">
            <div className="sectionHead" style={{ marginBottom: 0 }}>
              <span className="sectionLabel">
                SERVICE AREA
              </span>

              <h2>
                전국 지역별
                <br />
                후드 교체 안내
              </h2>
            </div>

            <p>
              지역을 선택하면 해당 시·도의
              시·군·구별 주방후드·렌지후드 교체 안내 페이지를
              확인할 수 있습니다.
            </p>
          </div>

          <div className="areaGrid">
            {regions.map((region) => (
              <Link
                href={`/area/${region.slug}`}
                className="areaCard"
                key={region.slug}
              >
                <strong>{region.name}</strong>

                <span>
                  지역별 후드 교체 →
                </span>
              </Link>
            ))}
          </div>

          <Link href="/area" className="areaAll">
            전국 시공지역 전체 보기 →
          </Link>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}

      <section className="section" id="faq">
        <div className="container">
          <div className="sectionHead">
            <span className="sectionLabel">
              FAQ
            </span>

            <h2>
              후드 교체 전
              <br />
              자주 묻는 질문
            </h2>

            <p>
              주방후드 교체 상담 전에 많이 확인하는 내용을
              정리했습니다.
            </p>
          </div>

          <div className="faqList">
            {FAQS.map((faq) => (
              <details className="faqItem" key={faq.question}>
                <summary>
                  {faq.question}
                </summary>

                <p className="faqAnswer">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT
      ====================================================== */}

      <section className="contact">
        <div className="container contactInner">
          <div>
            <small>
              HOOD MASTER CONSULTING
            </small>

            <h2>
              교체할 후드가
              <br />
              어떤 제품인지 몰라도 괜찮습니다.
            </h2>

            <p>
              현재 설치된 후드 전체 사진과 제품 모델명,
              설치 지역을 준비해 주세요.
              제품 형태와 설치 조건을 확인하는 데 도움이 됩니다.
            </p>
          </div>

          <a href={SITE.phoneHref} className="contactButton">
            {SITE.phone}
          </a>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="footer">
        <div className="container footerInner">
          <div>
            <div className="footerBrand">
              후드의정석
            </div>

            <div className="footerInfo">
              전국 주방후드 교체 상담
              <br />
              대표 상담 {SITE.phone}
              <br />
              © {year} HOOD MASTER
            </div>
          </div>

          <div className="footerLinks">
            <Link href="/services/kitchen-hood">
              주방후드 교체
            </Link>

            <Link href="/services/island-hood">
              아일랜드후드
            </Link>

            <Link href="/services/chimney-hood">
              침니후드
            </Link>

            <Link href="/area">
              전국 시공지역
            </Link>
          </div>
        </div>
      </footer>

      {/* =====================================================
          MOBILE CALL
      ====================================================== */}

      <a
        href={SITE.phoneHref}
        className="mobileCall"
        aria-label={`후드의정석 전화상담 ${SITE.phone}`}
      >
        후드 교체 전화상담 · {SITE.phone}
      </a>
    </main>
  );
}
