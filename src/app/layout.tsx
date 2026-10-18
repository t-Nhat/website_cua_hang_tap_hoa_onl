import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Bách Hóa Tổng Hợp Như Ngọc",
  description:
    "Công ty TNHH Bách hóa Tổng hợp Như Ngọc được thành lập từ năm 2012 với định hướng phân phối các sản phẩm Bột ngọt Ajinomoto, đường Biên Hòa, váng sữa Monte, các loại bánh kẹo Kinh Đô, Danisa, Yến sào Khánh Hòa, sữa Vinamilk...",
  icons: {
    icon: "https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/favicon.png?1724383668661",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
