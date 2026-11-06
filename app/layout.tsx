
import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://hoodmaster.kr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "후드의정석 | 전국 주방후드 교체·설치 전문",
    template: "%s | 후드의정석",
  },
  description:
    "전국 주방후드 교체 및 설치 전문업체 후드의정석. 가정용후드, 아일랜드후드, 침니후드, 허리케인후드, 후황 교체 및 주방 환기시설 시공 상담.",
  keywords: [
    "후드의정석",
    "주방후드교체",
    "후드교체",
    "후황교체",
    "주방후드설치",
    "가정용후드교체",
    "아일랜드후드교체",
    "침니후드교체",
    "허리케인후드교체",
    "레인지후드교체",
    "렌지후드교체",
    "후드설치업체",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "후드의정석 | 전국 주방후드 교체 전문",
    description:
      "주방후드부터 아일랜드후드까지 전국 후드 교체·설치 전문",
    url: SITE_URL,
    siteName: "후드의정석",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
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
