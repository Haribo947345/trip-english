import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Trip English · 해외여행 생활 영어",
    template: "%s · Trip English",
  },
  description:
    "공항, 숙소, 식당, 교통 등 실제 여행 상황에서 바로 쓰는 영어 표현을 듣고, 익히고, 저장하는 모바일 중심 학습 서비스입니다.",
  applicationName: "Trip English",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "Trip English",
    title: "Trip English · 해외여행 생활 영어",
    description:
      "여행 상황을 고르면 바로 쓸 수 있는 영어 표현과 대화, 퀴즈로 이어지는 학습 서비스입니다.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
