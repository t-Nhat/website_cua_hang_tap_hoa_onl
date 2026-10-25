"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronRight,
  Heart,
  Truck,
  ShieldCheck,
  Plus,
  Minus,
  ShoppingCart,
  Check,
  Sparkles,
  Package,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";
import { ProductCard } from "@/components/grocery/ProductCard";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import { DEFAULT_GROCERY_PRODUCTS } from "@/data/groceryData";

export default function ProductDetailPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased pb-14 lg:pb-0 flex flex-col justify-between">
      <div>
        <TopHeader />
        <Header onToggleMobileMenu={() => setMobileMenuOpen(true)} />
        <Navbar />
        <ProductDetailContent />
      </div>

      <Footer />
      <FloatingWidgets />
      <MobileNav isMobileMenuOpen={mobileMenuOpen} setIsMobileMenuOpen={setMobileMenuOpen} />
    </div>
  );
}

function ProductDetailContent() {
  const router = useRouter();
  const params = useParams();
  const rawSlug = params?.slug || "";

  const { getProductBySlug, products } = useProducts();
  const { addToCart, toggleWishlist, wishlist } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Find product by slug or id
  const product =
    getProductBySlug(rawSlug) ||
    products.find((p) => p.slug === rawSlug || p.id === rawSlug) ||
    DEFAULT_GROCERY_PRODUCTS[0];

  const isFavorited = wishlist.includes(product.id);
  const formatPrice = (p) => new Intl.NumberFormat("vi-VN").format(p) + "₫";

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/cart");
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-white py-3 border-b border-gray-100 shadow-2xs">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-2 text-xs sm:text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#1b7dae] transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/collections/all" className="hover:text-[#1b7dae] transition-colors">
            Tạp hóa online
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href={`/collections/all?category=${encodeURIComponent(product.category)}`}
            className="hover:text-[#1b7dae] transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1b7dae] font-semibold line-clamp-1">
            {product.name}
          </span>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Product Image */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner flex items-center justify-center p-6 group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                {product.discountPercent && product.discountPercent > 0 && (
                  <span className="absolute top-4 left-4 bg-[#df4c00] text-white text-xs font-black px-2.5 py-1 rounded-full shadow-md">
                    -{product.discountPercent}%
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${
                    isFavorited
                      ? "bg-rose-50 text-rose-600 border border-rose-200"
                      : "bg-white/90 text-gray-500 hover:text-rose-600"
                  }`}
                  title="Yêu thích"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? "fill-rose-600 text-rose-600" : ""}`} />
                </button>
              </div>

              {/* Badges strip under image */}
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-gray-600">
                <div className="p-2 rounded-xl bg-blue-50 border border-blue-100 font-medium">
                  ✅ 100% Date mới
                </div>
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100 font-medium">
                  📦 Đóng thùng cẩn thận
                </div>
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-100 font-medium">
                  ⚡ Giao trong 2H
                </div>
              </div>
            </div>

            {/* Right: Product Info & Actions */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Category & Brand tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#1b7dae]">
                    {product.category}
                  </span>
                  {product.brand && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                      Thương hiệu: {product.brand}
                    </span>
                  )}
                  {product.unit && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      Đơn vị tính: {product.unit}
                    </span>
                  )}
                </div>

                {/* Name */}
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 tracking-tight leading-snug">
                  {product.name}
                </h1>

                {/* Rating & Sold count */}
                <div className="flex items-center gap-4 text-xs text-gray-500 border-y border-gray-100 py-2.5">
                  <div className="flex items-center text-amber-500 font-bold gap-1">
                    ★ {product.rating || 5.0} ({product.reviewsCount || 42} đánh giá)
                  </div>
                  <span>•</span>
                  <div>
                    Đã bán: <strong className="text-gray-900">{product.soldCount || 150}</strong>
                  </div>
                  <span>•</span>
                  <div className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Còn {product.stock || 120} {product.unit || "sản phẩm"} trong kho
                  </div>
                </div>

                {/* Price block */}
                <div className="bg-gray-50 rounded-2xl p-4 flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#df4c00]">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm sm:text-base text-gray-400 line-through font-medium">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {product.discountPercent && product.discountPercent > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-[#df4c00] text-white">
                      Tiết kiệm {product.discountPercent}%
                    </span>
                  )}
                </div>

                {/* Description snippet */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {product.description ||
                    "Sản phẩm chính hãng chất lượng cao, bao bì đóng gói bảo đảm tiêu chuẩn vệ sinh an toàn thực phẩm, được cung cấp trực tiếp bởi Bách Hóa Như Ngọc."}
                </p>

                {/* Quantity selector */}
                <div className="flex items-center gap-4 pt-2">
                  <span className="text-xs font-bold text-gray-700">Số lượng:</span>
                  <div className="flex items-center border border-gray-200 rounded-xl bg-white overflow-hidden shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 text-sm font-bold text-gray-900 min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-gray-400">
                    Tổng: <strong className="text-[#df4c00]">{formatPrice(product.price * quantity)}</strong>
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                      added
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-blue-50 border-blue-200 text-[#1b7dae] hover:bg-blue-100"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" /> Đã thêm vào giỏ!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" /> Thêm Vào Giỏ Hàng
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="py-3.5 px-6 rounded-2xl font-bold text-xs sm:text-sm bg-[#1b7dae] hover:bg-[#15638c] text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-white" /> Mua Ngay & Giao Trong 2H
                  </button>
                </div>
              </div>

              {/* Delivery Assurance */}
              <div className="border-t border-gray-100 pt-4 text-xs text-gray-500 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#1b7dae]" />
                  <span>
                    Giao hàng nhanh 2H tại TP. Mỹ Tho | Miễn phí ship cho đơn từ 200.000₫
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>
                    Kiểm tra hàng trước khi thanh toán, hoàn tiền 100% nếu cận date hoặc lỗi bao bì
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications & Detailed Info */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
            <Package className="w-5 h-5 text-[#1b7dae]" /> Thông Tin Chi Tiết Sản Phẩm
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <table className="w-full text-xs">
              <tbody className="divide-y divide-gray-100">
                <tr className="py-2.5">
                  <td className="py-2.5 text-gray-500 font-medium w-40">Tên sản phẩm</td>
                  <td className="py-2.5 font-bold text-gray-900">{product.name}</td>
                </tr>
                <tr className="py-2.5">
                  <td className="py-2.5 text-gray-500 font-medium">Ngành hàng</td>
                  <td className="py-2.5 font-bold text-[#1b7dae]">{product.category}</td>
                </tr>
                <tr className="py-2.5">
                  <td className="py-2.5 text-gray-500 font-medium">Thương hiệu</td>
                  <td className="py-2.5 font-semibold text-gray-800">{product.brand || "Việt Nam"}</td>
                </tr>
                <tr className="py-2.5">
                  <td className="py-2.5 text-gray-500 font-medium">Đơn vị tính</td>
                  <td className="py-2.5 font-semibold text-gray-800">{product.unit || "Gói"}</td>
                </tr>
              </tbody>
            </table>

            <table className="w-full text-xs">
              <tbody className="divide-y divide-gray-100">
                <tr className="py-2.5">
                  <td className="py-2.5 text-gray-500 font-medium w-40">Xuất xứ</td>
                  <td className="py-2.5 font-semibold text-gray-800">{product.origin || "Việt Nam"}</td>
                </tr>
                <tr className="py-2.5">
                  <td className="py-2.5 text-gray-500 font-medium">Tình trạng tồn kho</td>
                  <td className="py-2.5 font-bold text-emerald-600">Còn hàng sẵn tại cửa hàng</td>
                </tr>
                <tr className="py-2.5">
                  <td className="py-2.5 text-gray-500 font-medium">Hạn sử dụng</td>
                  <td className="py-2.5 font-semibold text-gray-800">Date mới nhất 2026</td>
                </tr>
                <tr className="py-2.5">
                  <td className="py-2.5 text-gray-500 font-medium">Bảo quản</td>
                  <td className="py-2.5 font-semibold text-gray-800">Nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Related Grocery Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              Sản Phẩm Cùng Ngành Hàng
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
