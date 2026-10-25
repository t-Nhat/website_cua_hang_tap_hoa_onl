"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";
import { ProductCard } from "@/components/grocery/ProductCard";

export default function WishlistPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { wishlist, toggleWishlist } = useCart();
  const { products } = useProducts();

  const favoriteProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased pb-14 lg:pb-0 flex flex-col justify-between">
      <div>
        <TopHeader />
        <Header onToggleMobileMenu={() => setMobileMenuOpen(true)} />
        <Navbar />

        {/* Breadcrumb */}
        <div className="bg-white py-3 border-b border-gray-100 shadow-2xs">
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
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-2">
              <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
              Sản phẩm yêu thích ({wishlist.length})
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Danh sách các mặt hàng tạp hóa bạn lưu lại để đặt mua sau
            </p>
          </div>

          {favoriteProducts.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-xs space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                Chưa có mặt hàng yêu thích nào
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Hãy nhấn biểu tượng trái tim trên các sản phẩm tạp hóa khi duyệt cửa hàng để dễ dàng tìm kiếm và đặt hàng sau nhé!
              </p>
              <div>
                <Link
                  href="/collections/all"
                  className="inline-block py-2.5 px-6 bg-[#1b7dae] hover:bg-[#15638c] text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors shadow-xs"
                >
                  Khám phá hàng tạp hóa ngay
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {favoriteProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </main>
      </div>

      <Footer />
      <FloatingWidgets />
      <MobileNav isMobileMenuOpen={mobileMenuOpen} setIsMobileMenuOpen={setMobileMenuOpen} />
    </div>
  );
}
