import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/context/AppProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bách Hóa Như Ngọc - Siêu Thị Tạp Hóa Online Chính Hãng, Giá Tốt Mỗi Ngày",
  description:
    "Bách Hóa Như Ngọc chuyên cung cấp thực phẩm thiết yếu, mì ăn liền, dầu ăn, gia vị, gạo sạch, sữa tươi, nước giải khát, bánh kẹo và hàng tiêu dùng. Giao hàng nhanh trong 2 giờ tại Tiền Giang & lân cận.",
  icons: {
    icon: "https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/favicon.png?1724383668661",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
