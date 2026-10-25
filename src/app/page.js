"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Truck,
  ShieldCheck,
  Package,
  ArrowRight,
  Flame,
  ChevronRight,
  Clock,
  CheckCircle2,
  Tag,
  Star,
  Zap,
} from "lucide-react";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";
import { ProductCard } from "@/components/grocery/ProductCard";
import { useProducts } from "@/context/ProductContext";
import { GROCERY_CATEGORIES } from "@/data/groceryData";
import { BRANDS } from "@/data/mockData";

const HERO_SLIDES = [
  {
    title: "Bách Hóa Như Ngọc - Siêu Thị Tạp Hóa Online Tiện Lợi",
    subtitle: "Thực phẩm khô, mì ăn liền, dầu ăn, gạo sạch, sữa và gia vị thiết yếu. Date mới 100%, giao nhanh tận cửa trong 2 giờ.",
    image: "https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/slider_1.jpg?1724383668661",
    buttonText: "MUA SẮM NGAY",
    link: "/collections/all",
    badge: "🛒 Giá Bình Ổn - Tích Điểm Đổi Quà",
  },
  {
    title: "Đại Tiệc Mì & Gia Vị Giá Sốc - Tiết Kiệm Lên Đến 20%",
    subtitle: "Mì Hảo Hảo, Simply, Nam Ngư, hạt nêm Knorr, bột ngọt Ajinomoto đóng thùng tiện lợi giá ưu đãi cho mọi gia đình.",
    image: "https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/slider_2.jpg?1724383668661",
    buttonText: "XEM FLASH SALE",
    link: "/collections/all?flashSale=true",
    badge: "🔥 Flash Sale Giờ Vàng Mỗi Ngày",
  },
];

const VALUE_PROPS = [
  {
    icon: Truck,
    title: "Giao Siêu Tốc 2H",
    desc: "Nội thành TP. Mỹ Tho & lân cận",
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: Package,
    title: "100% Date Mới",
    desc: "Chính hãng Acecook, Masan, Vinamilk",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: Tag,
    title: "Giá Tốt Tiết Kiệm",
    desc: "Mua thùng & combo ưu đãi lớn",
    color: "text-amber-600 bg-amber-50",
  },
  {
    icon: ShieldCheck,
    title: "Đồng Kiểm Khi Nhận",
    desc: "Kiểm tra hàng trước, đổi trả 48H",
    color: "text-indigo-600 bg-indigo-50",
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTabCat, setActiveTabCat] = useState("Tất cả");
  const { products } = useProducts();

  // Flash sale products (discounted)
  const flashSaleProducts = products
    .filter((p) => p.isFlashSale || (p.discountPercent && p.discountPercent > 0))
    .slice(0, 4);

  // Filter products by tab
  const tabProducts =
    activeTabCat === "Tất cả"
      ? products.slice(0, 8)
      : products.filter((p) => p.category === activeTabCat).slice(0, 8);

  const bestSellerProducts = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased pb-14 lg:pb-0 flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <TopHeader />

        {/* Main Header */}
        <Header onToggleMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Navigation Bar */}
        <Navbar />

        <main className="space-y-10 sm:space-y-12 pb-12">
          {/* ======================================================== */}
          {/* HERO BANNER SECTION */}
          {/* ======================================================== */}
          <section className="relative overflow-hidden bg-gray-900 text-white">
            <div className="relative min-h-[420px] sm:min-h-[480px] flex items-center">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{ backgroundImage: `url(${HERO_SLIDES[currentSlide].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30"></div>
              </div>

              {/* Slide Content */}
              <div className="relative max-w-[1200px] mx-auto px-4 py-12 z-10 w-full">
                <div className="max-w-2xl space-y-4 sm:space-y-5 animate-in fade-in slide-in-from-left duration-500">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b7dae] text-white text-xs font-bold shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    {HERO_SLIDES[currentSlide].badge}
                  </span>

                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-sm">
                    {HERO_SLIDES[currentSlide].title}
                  </h1>

                  <p className="text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed max-w-xl">
                    {HERO_SLIDES[currentSlide].subtitle}
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link
                      href={HERO_SLIDES[currentSlide].link}
                      className="px-6 py-3.5 bg-gradient-to-r from-[#1b7dae] to-[#0284c7] hover:from-[#15638c] hover:to-[#0369a1] text-white font-extrabold rounded-2xl text-xs sm:text-sm shadow-xl transition-all flex items-center gap-2 hover:scale-105"
                    >
                      {HERO_SLIDES[currentSlide].buttonText}
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      href="/order-tracking"
                      className="px-6 py-3.5 bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs font-bold rounded-2xl text-xs sm:text-sm transition-all"
                    >
                      Tra Cứu Đơn Hàng
                    </Link>
                  </div>
                </div>
              </div>

              {/* Slider Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentSlide === i ? "w-8 bg-[#1b7dae]" : "w-2 bg-white/50"
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ======================================================== */}
          {/* VALUE PROPS STRIP */}
          {/* ======================================================== */}
          <section className="max-w-[1200px] mx-auto px-4 -mt-6 relative z-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {VALUE_PROPS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition-shadow"
                  >
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ======================================================== */}
          {/* FLASH SALE GROCERY SECTION */}
          {/* ======================================================== */}
          <section className="max-w-[1200px] mx-auto px-4">
            <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 rounded-3xl p-4 sm:p-6 shadow-xl text-white">
              {/* Header Flash Sale */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-white text-red-600 rounded-xl shadow-md animate-bounce">
                    <Flame className="w-6 h-6 fill-red-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg sm:text-2xl font-black uppercase tracking-wide">
                        Flash Sale Tạp Hóa Giá Sốc
                      </h2>
                      <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-gray-900 font-extrabold text-[11px]">
                        HOT
                      </span>
                    </div>
                    <p className="text-xs text-white/90">
                      Mì ăn liền, dầu ăn, sữa, đồ uống giảm giá chớp nhoáng
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto bg-black/25 px-3 py-1.5 rounded-xl backdrop-blur-xs text-xs font-semibold">
                  <Clock className="w-4 h-4 text-yellow-300" />
                  <span>Kết thúc sau:</span>
                  <span className="bg-white text-red-600 font-black px-1.5 py-0.5 rounded-md">
                    03
                  </span>
                  :
                  <span className="bg-white text-red-600 font-black px-1.5 py-0.5 rounded-md">
                    42
                  </span>
                  :
                  <span className="bg-white text-red-600 font-black px-1.5 py-0.5 rounded-md">
                    18
                  </span>
                </div>
              </div>

              {/* Flash Sale Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {flashSaleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>

          {/* ======================================================== */}
          {/* GROCERY CATEGORY PILLS / QUICK ACCESS */}
          {/* ======================================================== */}
          <section className="max-w-[1200px] mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                  Ngành Hàng Thiết Yếu
                </h2>
                <p className="text-xs text-gray-500">
                  Chọn nhanh mặt hàng tạp hóa bạn cần mua sắm hôm nay
                </p>
              </div>
              <Link
                href="/collections/all"
                className="text-xs font-bold text-[#1b7dae] hover:text-[#15638c] flex items-center gap-1"
              >
                Tất cả ngành hàng <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { name: "Mì & Bún Ăn Liền", icon: "🍜", query: "Mì, cháo, phở, bún ăn liền" },
                { name: "Dầu Ăn & Gia Vị", icon: "🧂", query: "Dầu ăn, nước chấm, gia vị" },
                { name: "Gạo ST25 & Đồ Khô", icon: "🌾", query: "Gạo, bột, đồ khô" },
                { name: "Sữa Dinh Dưỡng", icon: "🥛", query: "Sữa uống các loại" },
                { name: "Nước Giải Khát", icon: "🧃", query: "Đồ uống các loại" },
                { name: "Bánh Kẹo & Snack", icon: "🍪", query: "Bánh kẹo các loại" },
              ].map((cat, idx) => (
                <Link
                  key={idx}
                  href={`/collections/all?category=${encodeURIComponent(cat.query)}`}
                  className="bg-white p-3.5 rounded-2xl border border-gray-100 hover:border-[#1b7dae] shadow-2xs hover:shadow-md transition-all text-center group flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </span>
                  <span className="font-bold text-xs text-gray-800 group-hover:text-[#1b7dae] leading-snug">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* ======================================================== */}
          {/* TABBED CATALOG SECTION */}
          {/* ======================================================== */}
          <section className="max-w-[1200px] mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-2 border-b border-gray-200">
              <div>
                <h2 className="text-lg sm:text-2xl font-black text-gray-900">
                  Mặt Hàng Tạp Hóa Mới Nhập Kho
                </h2>
                <p className="text-xs text-gray-500">
                  Hàng chính hãng, hạn sử dụng xa, bao bì chuẩn mới 100%
                </p>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {GROCERY_CATEGORIES.slice(0, 5).map((cat, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveTabCat(cat)}
                    className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${
                      activeTabCat === cat
                        ? "bg-[#1b7dae] text-white shadow-xs"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
              {tabProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/collections/all"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-white border-2 border-[#1b7dae] text-[#1b7dae] hover:bg-[#1b7dae] hover:text-white font-bold text-xs sm:text-sm transition-all shadow-xs"
              >
                Xem thêm các sản phẩm khác →
              </Link>
            </div>
          </section>

          {/* ======================================================== */}
          {/* BEST SELLERS GROCERY SECTION */}
          {/* ======================================================== */}
          <section className="max-w-[1200px] mx-auto px-4">
            <div className="bg-amber-50/60 border border-amber-200/60 rounded-3xl p-5 sm:p-7">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[11px] font-bold mb-1 shadow-2xs">
                    <Star className="w-3 h-3 fill-white" /> Top Sản Phẩm Bán Chạy Nhất
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                    Gia Đình Nào Cũng Cần
                  </h2>
                </div>
                <Link
                  href="/collections/all"
                  className="text-xs font-bold text-amber-700 hover:underline"
                >
                  Xem thêm →
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {bestSellerProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>

          {/* ======================================================== */}
          {/* FEATURED BRANDS */}
          {/* ======================================================== */}
          <section className="max-w-[1200px] mx-auto px-4">
            <div className="border-b border-gray-200 pb-2 mb-4">
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                Thương Hiệu Tiêu Dùng Đồng Hành
              </h2>
              <p className="text-xs text-gray-500">
                Phân phối chính hãng từ các tập đoàn thực phẩm hàng đầu
              </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {BRANDS.slice(0, 6).map((brand) => (
                <div
                  key={brand.id}
                  className="bg-white border border-gray-100 rounded-2xl p-3 flex flex-col items-center justify-center hover:shadow-sm transition-all"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-10 sm:h-12 w-auto object-contain mb-1.5"
                    loading="lazy"
                  />
                  <span className="text-[11px] font-semibold text-gray-600 text-center">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Widgets & Mobile Nav */}
        <FloatingWidgets />
        <MobileNav
          isMobileMenuOpen={mobileMenuOpen}
          setIsMobileMenuOpen={setMobileMenuOpen}
        />
      </div>
    </div>
  );
}
