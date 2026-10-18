"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { CartProvider, useCart } from "@/context/CartContext";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";
import { CATALOG_PRODUCTS, FLASH_SALE_PRODUCTS, NOODLE_PRODUCTS, Product } from "@/data/mockData";

export default function WishlistPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <CartProvider>
      <WishlistContent
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </CartProvider>
  );
}

function WishlistContent({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  // Aggregate all products to look up
  const allProducts: Product[] = [
    ...FLASH_SALE_PRODUCTS,
    ...NOODLE_PRODUCTS,
    ...CATALOG_PRODUCTS,
  ];

  const favoriteProducts = allProducts.filter((p) => wishlist.includes(p.id));

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
      .format(price)
      .replace("₫", "")
      .trim() + "₫";

  return (
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
          <span className="text-[#1b7dae] font-semibold">Sản phẩm yêu thích</span>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 py-8 md:py-10">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#212b36] flex items-center gap-2">
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
            Sản phẩm yêu thích ({wishlist.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Danh sách các sản phẩm bạn quan tâm và lưu lại để mua sau
          </p>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="bg-[#fbfcfd] border border-gray-100 rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              Chưa có sản phẩm yêu thích nào
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Hãy thả tim các sản phẩm bạn yêu thích khi duyệt cửa hàng để dễ dàng tìm kiếm và đặt hàng sau nhé!
            </p>
            <div>
              <Link
                href="/collections/all"
                className="inline-block py-2.5 px-6 bg-[#1b7dae] hover:bg-[#145d82] text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors shadow-xs"
              >
                Khám phá sản phẩm ngay
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {favoriteProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl p-3 border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group relative"
              >
                <button
                  onClick={() => toggleWishlist(p.id)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow-xs flex items-center justify-center text-rose-500 hover:text-gray-400 transition-colors z-10"
                  title="Xóa khỏi yêu thích"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

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

      <Footer />
      <FloatingWidgets />
      <MobileNav
        isMobileMenuOpen={mobileMenuOpen}
        setIsMobileMenuOpen={setMobileMenuOpen}
      />
    </div>
  );
}
