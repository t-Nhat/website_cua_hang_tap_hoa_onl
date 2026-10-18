"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronRight,
  Phone,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  ShoppingCart,
  Check,
} from "lucide-react";
import { CartProvider, useCart } from "@/context/CartContext";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";
import { FLASH_SALE_PRODUCTS, NOODLE_PRODUCTS, Product } from "@/data/mockData";

export default function ProductDetailPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <CartProvider>
      <ProductDetailContent
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </CartProvider>
  );
}

function ProductDetailContent({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) {
  const params = useParams();
  const slug = params?.slug as string;
  const { addToCart, toggleWishlist, wishlist } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState<"goi" | "thung">("goi");
  const [added, setAdded] = useState(false);

  // Sample active product
  const product: Product = {
    id: "sp-hao-hao",
    name: "Mì Hảo Hảo tôm chua cay gói 75g",
    price: selectedUnit === "goi" ? 5000 : 145000,
    originalPrice: selectedUnit === "goi" ? 5500 : 155000,
    discountPercent: 10,
    image:
      "https://bizweb.dktcdn.net/thumb/large/100/468/279/products/mi-hao-hao-vi-tom-chua-cay-goi-75g-202110110919568290-jfif-1667463961664.jpg?v=1667525958653",
  };

  const isFavorited = wishlist.includes(product.id);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
      .format(price)
      .replace("₫", "")
      .trim() + "₫";

  const handleBuy = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

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
          <Link
            href="/collections/all"
            className="hover:text-[#1b7dae] transition-colors"
          >
            Mì, cháo, phở, bún ăn liền
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1b7dae] font-semibold line-clamp-1">
            {product.name}
          </span>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Product Main Box */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Gallery Images */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="w-full aspect-square bg-[#fbfcfd] rounded-2xl border border-gray-100 p-6 flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex items-center gap-3 mt-4">
              <button className="w-16 h-16 rounded-xl border-2 border-[#1b7dae] p-1 bg-white">
                <img
                  src={product.image}
                  alt="Thumbnail"
                  className="w-full h-full object-contain"
                />
              </button>
            </div>
          </div>

          {/* Details & Actions */}
          <div className="md:col-span-7 space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h1 className="text-xl sm:text-2xl font-bold text-[#212b36] mb-2 leading-tight">
                {product.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <div>
                  Thương hiệu: <strong className="text-gray-800">ACECOOK</strong>
                </div>
                <div>|</div>
                <div>
                  Mã sản phẩm: <strong className="text-gray-800">SP0096</strong>
                </div>
                <div>|</div>
                <div>
                  Tình trạng: <span className="text-emerald-600 font-semibold">Còn hàng</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-orange-50/50 p-4 rounded-xl flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#df4c00]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discountPercent && (
                <span className="bg-[#ff424e] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  -{product.discountPercent}%
                </span>
              )}
            </div>

            {/* Quy cách lựa chọn */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase">
                Quy cách đóng gói:
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedUnit("goi")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                    selectedUnit === "goi"
                      ? "border-[#1b7dae] bg-blue-50/50 text-[#1b7dae]"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Gói 75g (5.000₫)
                </button>
                <button
                  onClick={() => setSelectedUnit("thung")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                    selectedUnit === "thung"
                      ? "border-[#1b7dae] bg-blue-50/50 text-[#1b7dae]"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Thùng 30 gói (145.000₫)
                </button>
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-bold text-gray-700 uppercase">
                Số lượng:
              </label>
              <div className="flex items-center border border-gray-200 rounded-xl w-32 bg-gray-50/50 overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="flex-1 text-center font-bold text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <button
                onClick={handleBuy}
                className="flex-1 py-3.5 px-6 bg-[#ff424e] hover:bg-[#df323d] text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Đã thêm vào giỏ!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>ĐẶT MUA NGAY</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`px-4 py-3.5 border rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-colors cursor-pointer ${
                  isFavorited
                    ? "border-rose-300 bg-rose-50 text-rose-600"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? "fill-rose-500" : ""}`} />
                <span>{isFavorited ? "Đã thích" : "Yêu thích"}</span>
              </button>
            </div>

            {/* Hot Call Support */}
            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center gap-3 text-xs sm:text-sm">
              <div className="w-8 h-8 rounded-full bg-[#1b7dae] text-white flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                Gọi <a href="tel:02733867999" className="font-bold text-[#1b7dae]">02733867999</a> để được tư vấn mua hàng trực tiếp & giao hàng trong 48h!
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs text-gray-600">
              <div className="p-2.5 rounded-lg bg-gray-50 flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#1b7dae]" />
                <span>Giao hàng nhanh</span>
              </div>
              <div className="p-2.5 rounded-lg bg-gray-50 flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Hàng chính hãng</span>
              </div>
              <div className="p-2.5 rounded-lg bg-gray-50 flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-amber-600" />
                <span>Đổi trả 7 ngày</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description Tabs */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-xs p-6 md:p-8">
          <h2 className="text-lg font-bold text-[#212b36] border-b border-gray-200 pb-3 mb-4">
            Mô tả sản phẩm
          </h2>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p>
              <strong>Mì Hảo Hảo tôm chua cay</strong> là sản phẩm mì ăn liền quốc dân được hàng triệu gia đình Việt Nam tin dùng. Sản phẩm được sản xuất theo công nghệ Nhật Bản hiện đại của tập đoàn Acecook Việt Nam.
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Khối lượng tịnh:</strong> 75g/gói</li>
              <li><strong>Hương vị:</strong> Tôm chua cay đậm đà, sợi mì dai ngon vàng óng</li>
              <li><strong>Thành phần:</strong> Bột mì, dầu cọ tinh luyện, muối, đường, tôm, ớt, rau sấy khô...</li>
              <li><strong>Cách dùng:</strong> Cho vắt mì và các gói gia vị vào tô. Chế khoảng 400ml nước sôi, đậy nắp trong 3 phút, trộn đều và thưởng thức.</li>
              <li><strong>Bảo quản:</strong> Nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.</li>
            </ul>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-[#212b36] mb-4">
            Sản phẩm cùng loại
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {NOODLE_PRODUCTS.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl p-3 border border-gray-100 hover:border-[#1b7dae]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="aspect-square w-full mb-2 flex items-center justify-center">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-medium text-gray-800 line-clamp-2 mb-1">
                    {p.name}
                  </h4>
                  <div className="text-sm font-bold text-[#df4c00]">
                    {formatPrice(p.price)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
