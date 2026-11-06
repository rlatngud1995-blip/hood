import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hoodmaster.kr"),

  title: {
    default: "후드의정석 | 전국 주방후드 교체",
    template: "%s | 후드의정석",
  },

  description:
    "후드의정석은 전국 주방후드 교체 상담을 제공합니다. " +
    "렌지후드, 후황, 빌트인후드, 슬림후드, 허리케인후드, " +
    "아일랜드후드, 침니후드 교체 안내.",

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
  ],

  authors: [
    {
      name: "후드의정석",
      url: "https://hoodmaster.kr",
    },
  ],

  creator: "후드의정석",
  publisher: "후드의정석",

  alternates: {
    canonical: "https://hoodmaster.kr",
  },

  verification: {
    other: {
      "naver-site-verification":
        "1d8b2dd6cb5cf4d1fd42092f36c657cd8087e2e3",
    },
  },

  icons: {
    icon: [
      {
        url: "/8F94A388-C771-48E9-9129-4755DEC71A8B.png",
        type: "image/png",
      },
    ],
    shortcut:
      "/8F94A388-C771-48E9-9129-4755DEC71A8B.png",
    apple:
      "/8F94A388-C771-48E9-9129-4755DEC71A8B.png",
  },

  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://hoodmaster.kr",
    siteName: "후드의정석",
    title: "후드의정석 | 전국 주방후드 교체",
    description:
      "전국 주방후드, 렌지후드, 후황, 아일랜드후드, 침니후드 교체 상담.",
    images: [
      {
        url: "/8F94A388-C771-48E9-9129-4755DEC71A8B.png",
        alt: "후드의정석",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "후드의정석 | 전국 주방후드 교체",
    description:
      "전국 주방후드, 렌지후드, 후황, 아일랜드후드, 침니후드 교체 상담.",
    images: [
      "/8F94A388-C771-48E9-9129-4755DEC71A8B.png",
    ],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://hoodmaster.kr/#organization",
    name: "후드의정석",
    url: "https://hoodmaster.kr",
    logo:
      "https://hoodmaster.kr/8F94A388-C771-48E9-9129-4755DEC71A8B.png",
    telephone: "010-9413-4686",
    description:
      "전국 주방후드, 렌지후드, 후황, " +
      "빌트인후드, 아일랜드후드, 침니후드 교체 상담",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://hoodmaster.kr/#website",
    url: "https://hoodmaster.kr",
    name: "후드의정석",
    inLanguage: "ko-KR",
    publisher: {
      "@id": "https://hoodmaster.kr/#organization",
    },
  };

  return (
    <html lang="ko">
      <head>
        <meta
          name="naver-site-verification"
          content="1d8b2dd6cb5cf4d1fd42092f36c657cd8087e2e3"
        />

        <meta
          name="theme-color"
          content="#171717"
        />

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
