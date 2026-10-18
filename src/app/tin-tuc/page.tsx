"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Calendar, User, ArrowRight } from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  href: string;
}

const NEWS_ARTICLES: NewsItem[] = [
  {
    id: "news-1",
    title: "5 món quà tặng 20/10 ý nghĩa 100% phụ nữ đều muốn nhận",
    date: "14/10/2022",
    author: "Sapo",
    image:
      "https://bizweb.dktcdn.net/100/468/279/articles/black-woman-holding-christmas-gift-createherstock.jpg?v=1665736925783",
    excerpt:
      "Ngày Phụ nữ Việt Nam 20/10 đang đến rất gần, hãy cùng Bách Hóa Như Ngọc khám phá top 5 món quà tặng thiết thực và tinh tế nhất khiến phái đẹp mỉm cười hạnh phúc...",
    href: "/5-mon-qua-tang-20-10-y-nghia-100-phu-nu-deu-muon-nhan",
  },
  {
    id: "news-2",
    title: "Nên tặng quà giáng sinh gì cho bạn gái mới quen?",
    date: "14/10/2022",
    author: "Sapo",
    image:
      "https://bizweb.dktcdn.net/100/468/279/articles/gifts-1477296936959.jpeg?v=1665736926213",
    excerpt:
      "Giáng sinh là dịp tuyệt vời để thể hiện sự quan tâm đối với nửa kia. Đối với một người bạn gái mới quen, việc chọn quà cần sự khéo léo để vừa tinh tế vừa ngọt ngào...",
    href: "/nen-tang-qua-giang-sinh-gi-cho-ban-gai-moi-quen",
  },
  {
    id: "news-3",
    title: "Ý nghĩa hoa hồng trong ngày kỷ niệm, ngày lễ tình nhân",
    date: "14/10/2022",
    author: "Sapo",
    image:
      "https://bizweb.dktcdn.net/100/468/279/articles/anh-hoa-hong-trang-dep-tinh-khiet-3.jpg?v=1665736924493",
    excerpt:
      "Mỗi màu sắc của hoa hồng lại gửi gắm một thông điệp tình cảm sâu sắc. Cùng tìm hiểu ý nghĩa của hoa hồng đỏ, hồng trắng và hồng vàng trong các ngày kỷ niệm đặc biệt...",
    href: "/y-nghia-hoa-hong-trong-ngay-ky-niem-ngay-le-tinh-nhan",
  },
  {
    id: "news-4",
    title: "Tặng gì cho một nửa ngày 20-10? Và đây là bí quyết",
    date: "14/10/2022",
    author: "Sapo",
    image:
      "https://bizweb.dktcdn.net/100/468/279/articles/wedding-door-gifts-01.jpg?v=1665736925047",
    excerpt:
      "Không cần những món quà quá đắt tiền, bí quyết để chinh phục trái tim người phụ nữ nằm ở sự chân thành và những món quà gắn liền với thói quen sinh hoạt mỗi ngày...",
    href: "/tang-gi-cho-mot-nua-ngay-20-10-va-day-la-bi-quyet",
  },
  {
    id: "news-5",
    title: "3 món quà Giáng sinh ý nghĩa nhất dành tặng trong mùa Noel",
    date: "14/10/2022",
    author: "Sapo",
    image:
      "https://bizweb.dktcdn.net/100/468/279/articles/introduction.jpg?v=1665736924123",
    excerpt:
      "Mùa đông năm nay, hãy mang hơi ấm đến cho gia đình và bạn bè bằng những món quà Noel ngập tràn yêu thương và ý nghĩa được chuẩn bị công phu từ Bách Hóa Như Ngọc...",
    href: "/3-mon-qua-giang-sinh-y-nghia-nhat-danh-tang-trong-mua-noel-14-12-2017",
  },
];

export default function TinTucPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-white text-[#141414] font-sans antialiased pb-14 lg:pb-0">
        <TopHeader />
        <Header onToggleMobileMenu={() => setMobileMenuOpen(true)} />
        <Navbar />

        {/* Breadcrumb */}
        <div className="bg-[#f7f8fa] py-3 border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            <Link href="/" className="hover:text-[#1b7dae] transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1b7dae] font-semibold">Tin tức</span>
          </div>
        </div>

        <main className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#212b36]">
              Tin tức & Cẩm nang
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Cập nhật thông tin khuyến mãi, mẹo vặt gia đình và cẩm nang tiêu dùng thông minh
            </p>
          </div>

          {/* Featured Top 2 Big Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {NEWS_ARTICLES.slice(0, 2).map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {item.author}
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#1b7dae] transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#1b7dae] flex items-center gap-1 pt-1">
                    Đọc tiếp <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Lower 3 Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NEWS_ARTICLES.slice(2).map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-1.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {item.author}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#1b7dae] transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mt-1 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#1b7dae] flex items-center gap-1 pt-1">
                    Đọc tiếp <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </main>

        <Footer />
        <FloatingWidgets />
        <MobileNav
          isMobileMenuOpen={mobileMenuOpen}
          setIsMobileMenuOpen={setMobileMenuOpen}
        />
      </div>
    </CartProvider>
  );
}
