
import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://hoodmaster.kr";
const SITE_NAME = "후드의정석";

const FAVICON =
  "/C0500998-EA19-4072-BE43-D77819DAA210.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "후드의정석 | 주방후드 교체·아일랜드후드·침니후드 전문",
    template: "%s | 후드의정석",
  },

  description:
    "후드의정석은 전국 주방후드 교체 전문업체입니다. 가정집 주방후드, 아일랜드후드, 침니후드, 빌트인후드, 후황 교체 및 설치 상담을 제공합니다.",

  applicationName: SITE_NAME,

  keywords: [
    "후드의정석",
    "주방후드교체",
    "주방후드교체업체",
    "후드교체",
    "후황교체",
    "가정집후드교체",
    "아일랜드후드교체",
    "침니후드교체",
    "빌트인후드교체",
    "허리케인후드교체",
    "주방후드설치",
    "레인지후드교체",
    "전국후드교체",
  ],

  alternates: {
    canonical: SITE_URL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  icons: {
    icon: [
      {
        url: FAVICON,
        type: "image/png",
        sizes: "any",
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
    title:
      "후드의정석 | 전국 주방후드 교체 전문",
    description:
      "주방후드·아일랜드후드·침니후드 교체 전문. 전국 후드 교체 및 설치 상담.",
    images: [
      {
        url: FAVICON,
        alt: "후드의정석 로고",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: "후드의정석 | 주방후드 교체 전문",
    description:
      "전국 주방후드·아일랜드후드·침니후드 교체 전문",
    images: [FAVICON],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
