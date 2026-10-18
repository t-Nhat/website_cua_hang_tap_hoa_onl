"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronRight, Search as SearchIcon, ShoppingCart } from "lucide-react";
import { CartProvider, useCart } from "@/context/CartContext";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";
import { CATALOG_PRODUCTS, FLASH_SALE_PRODUCTS, NOODLE_PRODUCTS, Product } from "@/data/mockData";

export default function SearchPage() {
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
            <span className="text-[#1b7dae] font-semibold">Tìm kiếm</span>
          </div>
        </div>

        <Suspense fallback={<div className="text-center py-20">Đang tải...</div>}>
          <SearchContent />
        </Suspense>

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

function SearchContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query") || searchParams.get("q") || "";
  const [keyword, setKeyword] = useState(queryParam);
  const { addToCart } = useCart();

  useEffect(() => {
    setKeyword(queryParam);
  }, [queryParam]);

  const allProducts: Product[] = [
    ...FLASH_SALE_PRODUCTS,
    ...NOODLE_PRODUCTS,
    ...CATALOG_PRODUCTS,
  ];

  // Filter distinct by id
  const uniqueProducts = Array.from(
    new Map(allProducts.map((item) => [item.id, item])).values()
  );

  const matchedProducts = keyword.trim()
    ? uniqueProducts.filter((p) =>
        p.name.toLowerCase().includes(keyword.trim().toLowerCase())
      )
    : uniqueProducts;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
      .format(price)
      .replace("₫", "")
      .trim() + "₫";

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8 md:py-10">
      <div className="max-w-xl mx-auto mb-8 text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#212b36]">
          Tìm kiếm sản phẩm
        </h1>
        <div className="flex items-center border-2 border-[#1b7dae] rounded-full overflow-hidden bg-white shadow-xs">
          <input
            type="text"
            placeholder="Nhập tên sản phẩm cần tìm..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full px-5 py-2.5 text-sm text-gray-800 focus:outline-hidden"
          />
          <button className="bg-[#1b7dae] text-white px-6 py-3 hover:bg-[#145d82] transition-colors flex items-center justify-center">
            <SearchIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mb-6 pb-3 border-b border-gray-200">
        <p className="text-sm text-gray-600">
          {keyword.trim() ? (
            <>
              Tìm thấy <strong className="text-[#1b7dae]">{matchedProducts.length}</strong> kết quả cho từ khóa &quot;<strong>{keyword}</strong>&quot;
            </>
          ) : (
            <>Tất cả sản phẩm gợi ý ({matchedProducts.length})</>
          )}
        </p>
      </div>

      {matchedProducts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <p className="text-gray-500 text-sm">
            Rất tiếc, không tìm thấy sản phẩm nào phù hợp với &quot;{keyword}&quot;.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Vui lòng thử lại với từ khóa khác (ví dụ: mì, sữa, bánh, dầu ăn...)
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {matchedProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl p-3 border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="aspect-square w-full mb-2 flex items-center justify-center bg-gray-50/50 rounded-lg overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="space-y-2 flex-1 flex flex-col justify-between">
                <h4 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 hover:text-[#1b7dae] transition-colors leading-snug">
                  {p.name}
                </h4>
                <div className="text-sm font-bold text-[#df4c00]">
                  {formatPrice(p.price)}
                </div>
                <button
                  onClick={() => addToCart(p)}
                  className="w-full py-1.5 px-2 bg-[#1b7dae] hover:bg-[#145d82] text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Chọn mua</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
