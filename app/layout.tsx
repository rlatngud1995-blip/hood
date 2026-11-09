
import type {
  Metadata,
  Viewport,
} from "next";

import "./globals.css";

import { SITE } from "../lib/services";

/* =====================================
   기본 정보
===================================== */

const SITE_URL = "https://hoodmaster.kr";

const SITE_NAME = "후드의정석";

const SITE_DESCRIPTION =
  "후드의정석은 전국 주방후드 교체 상담을 제공합니다. " +
  "렌지후드, 레인지후드, 후황, 빌트인후드, " +
  "슬림후드, 허리케인후드, 아일랜드후드, " +
  "침니후드 교체를 안내합니다.";

const FAVICON =
  "/8F94A388-C771-48E9-9129-4755DEC71A8B.png";

/* =====================================
   뷰포트 및 테마
===================================== */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#171717",
};

/* =====================================
   SEO 메타데이터
===================================== */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "후드의정석 | 전국 주방후드 교체",
    template: "%s | 후드의정석",
  },

  description: SITE_DESCRIPTION,

  applicationName: SITE_NAME,

  keywords: [
    "후드 교체",
    "주방후드 교체",
    "렌지후드 교체",
    "레인지후드 교체",
    "후황 교체",
    "빌트인후드 교체",
    "슬림후드 교체",
    "허리케인후드 교체",
    "아일랜드후드 교체",
    "침니후드 교체",
    "주방 환기후드",
    "가정집 후드 교체",
    "주방후드 설치",
    "후드 교체 업체",
  ],

  authors: [
    {
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],

  creator: SITE_NAME,

  publisher: SITE_NAME,

  /*
   * Canonical은 여기서 고정하지 않습니다.
   *
   * 지역별 페이지와 서비스별 페이지에서
   * 각 페이지의 실제 주소를 canonical로
   * 설정해야 합니다.
   */

  verification: {
    other: {
      "naver-site-verification":
        "1d8b2dd6cb5cf4d1fd42092f36c657cd8087e2e3",
    },
  },

  icons: {
    icon: [
      {
        url: FAVICON,
        type: "image/png",
      },
    ],

    shortcut: FAVICON,

    apple: FAVICON,
  },

  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: SITE_NAME,

    title: "후드의정석 | 전국 주방후드 교체",

    description: SITE_DESCRIPTION,

    images: [
      {
        url: FAVICON,
        alt: "후드의정석 로고",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: "후드의정석 | 전국 주방후드 교체",
    description: SITE_DESCRIPTION,
    images: [FAVICON],
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

  category: "주방후드 교체",
};

/* =====================================
   구조화 데이터
===================================== */

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",

  "@id": `${SITE_URL}/#organization`,

  name: SITE_NAME,

  url: SITE_URL,

  logo: `${SITE_URL}${FAVICON}`,

  telephone: SITE.phone,

  description: SITE_DESCRIPTION,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",

  "@id": `${SITE_URL}/#website`,

  url: SITE_URL,

  name: SITE_NAME,

  inLanguage: "ko-KR",

  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
};

/* =====================================
   루트 레이아웃
===================================== */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              organizationSchema
            ).replace(/</g, "\\u003c"),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              websiteSchema
            ).replace(/</g, "\\u003c"),
          }}
        />
      </head>

      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#faf9f6",
        }}
      >
        {children}
      </body>
    </html>
  );
}
