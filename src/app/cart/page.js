"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Tag,
  ShieldCheck,
  Truck,
  RotateCcw,
  ArrowRight,
  Package,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";

export default function CartPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

  const [voucherCode, setVoucherCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [voucherApplied, setVoucherApplied] = useState("");
  const [voucherError, setVoucherError] = useState("");

  const formatPrice = (p) => new Intl.NumberFormat("vi-VN").format(p) + "₫";

  // Freeship threshold 200,000₫ for grocery
  const freeShipThreshold = 200000;
  const isFreeShip = totalPrice >= freeShipThreshold || voucherApplied === "FREESHIP";
  const shippingFee = isFreeShip ? 0 : 20000;
  const progressPercent = Math.min(100, Math.round((totalPrice / freeShipThreshold) * 100));

  const handleApplyVoucher = (e) => {
    e.preventDefault();
    setVoucherError("");
    const code = voucherCode.trim().toUpperCase();
    if (!code) return;

    if (code === "NHUNGOC10") {
      const disc = Math.round(totalPrice * 0.1);
      setDiscountAmount(disc);
      setVoucherApplied("NHUNGOC10");
    } else if (code === "TAPHOA20K") {
      setDiscountAmount(20000);
      setVoucherApplied("TAPHOA20K");
    } else if (code === "FREESHIP") {
      setDiscountAmount(0);
      setVoucherApplied("FREESHIP");
    } else {
      setVoucherError("Mã giảm giá không hợp lệ hoặc đã hết hạn.");
    }
  };

  const finalTotal = Math.max(0, totalPrice - discountAmount + (isFreeShip ? 0 : shippingFee));

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
            <span className="text-[#1b7dae] font-semibold">Giỏ hàng ({totalItems} sản phẩm)</span>
          </div>
        </div>

        <main className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2.5">
              <ShoppingBag className="w-6 h-6 text-[#1b7dae]" />
              Giỏ Hàng Tạp Hóa Của Bạn
              <span className="text-xs font-bold text-[#1b7dae] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                {totalItems} món
              </span>
            </h1>

            {cart.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-bold cursor-pointer self-start sm:self-auto"
              >
                <Trash2 className="w-3.5 h-3.5" /> Xóa tất cả giỏ hàng
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 sm:p-16 text-center border border-gray-100 shadow-sm max-w-lg mx-auto">
              <div className="w-20 h-20 bg-blue-50 text-[#1b7dae] rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                Giỏ hàng của bạn đang trống!
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed">
                Hãy chọn những mặt hàng thực phẩm thiết yếu, mì ăn liền, gia vị và đồ uống cho gia đình bạn.
              </p>
              <Link
                href="/collections/all"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1b7dae] hover:bg-[#15638c] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                TIẾP TỤC MUA SẮM TẠP HÓA
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Cart Items List */}
              <div className="lg:col-span-8 space-y-4">
                {/* Free Shipping Progress Bar */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-gray-700 flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-[#1b7dae]" />
                      {isFreeShip ? (
                        <span className="text-emerald-600 font-bold">
                          🎉 Bạn đã đủ điều kiện được MIỄN PHÍ VẬN CHUYỂN!
                        </span>
                      ) : (
                        <span>
                          Mua thêm{" "}
                          <strong className="text-[#df4c00]">
                            {formatPrice(freeShipThreshold - totalPrice)}
                          </strong>{" "}
                          để được Miễn phí giao hàng (đơn từ 200.000₫)
                        </span>
                      )}
                    </span>
                    <span className="font-extrabold text-[#1b7dae]">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#1b7dae] to-[#0284c7] h-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Items Table / Cards */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-xs divide-y divide-gray-100 overflow-hidden">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <Link
                          href={`/products/${item.product.slug || item.product.id}`}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-50 border border-gray-200 shrink-0 flex items-center justify-center p-1"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </Link>
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold text-[#1b7dae] uppercase tracking-wider block">
                            {item.product.category}
                          </span>
                          <Link
                            href={`/products/${item.product.slug || item.product.id}`}
                            className="font-bold text-xs sm:text-sm text-gray-900 hover:text-[#1b7dae] line-clamp-2 transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          {item.product.unit && (
                            <span className="text-[11px] text-gray-500 block mt-0.5">
                              Đơn vị tính: <strong>{item.product.unit}</strong>
                            </span>
                          )}
                          <div className="text-xs sm:text-sm font-extrabold text-[#df4c00] mt-1">
                            {formatPrice(item.product.price)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-gray-200 rounded-xl bg-white overflow-hidden shadow-2xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-100 cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 py-1.5 text-xs font-bold text-gray-900 min-w-[32px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-100 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Line Total */}
                        <div className="text-right min-w-[85px]">
                          <span className="text-xs text-gray-400 block sm:hidden">Thành tiền:</span>
                          <span className="font-extrabold text-sm sm:text-base text-gray-900">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                          title="Xóa sản phẩm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <Link
                    href="/collections/all"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1b7dae] hover:underline"
                  >
                    <ArrowLeft className="w-4 h-4" /> Tiếp tục mua sắm
                  </Link>
                </div>
              </div>

              {/* Right Column: Order Summary & Voucher */}
              <div className="lg:col-span-4 space-y-5">
                {/* Voucher Box */}
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-3">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-[#1b7dae]" />
                    Mã Giảm Giá / Voucher
                  </h3>

                  <form onSubmit={handleApplyVoucher} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Nhập mã (NHUNGOC10, FREESHIP)..."
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      className="flex-1 px-3.5 py-2 text-xs border border-gray-200 rounded-xl uppercase font-bold focus:outline-hidden focus:border-[#1b7dae]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#1b7dae] hover:bg-[#15638c] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
                    >
                      Áp dụng
                    </button>
                  </form>

                  {/* Suggestion Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["NHUNGOC10", "TAPHOA20K", "FREESHIP"].map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => setVoucherCode(code)}
                        className="text-[10px] bg-blue-50 text-[#1b7dae] border border-blue-200 px-2 py-0.5 rounded-md font-bold hover:bg-[#1b7dae] hover:text-white transition-colors cursor-pointer"
                      >
                        {code}
                      </button>
                    ))}
                  </div>

                  {voucherApplied && (
                    <div className="text-xs text-emerald-600 font-bold flex items-center gap-1 pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Đã áp dụng mã: {voucherApplied}
                    </div>
                  )}

                  {voucherError && (
                    <div className="text-xs text-red-600 font-medium pt-1">
                      {voucherError}
                    </div>
                  )}
                </div>

                {/* Price Summary */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-4">
                  <h3 className="font-bold text-sm text-gray-900 pb-2 border-b border-gray-100">
                    Tóm Tắt Đơn Hàng
                  </h3>

                  <div className="space-y-2.5 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Tạm tính ({totalItems} món):</span>
                      <span className="font-bold text-gray-800">{formatPrice(totalPrice)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Giảm giá voucher:</span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Phí giao hàng:</span>
                      <span>
                        {isFreeShip ? (
                          <span className="text-emerald-600 font-bold">Miễn phí</span>
                        ) : (
                          <span className="font-semibold text-gray-800">{formatPrice(shippingFee)}</span>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-baseline justify-between">
                    <div>
                      <span className="font-bold text-sm text-gray-900 block">Tổng thanh toán:</span>
                      <span className="text-[10px] text-gray-400">(Đã bao gồm thuế & phí)</span>
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-[#df4c00]">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => router.push("/checkout")}
                    className="w-full py-3.5 px-4 bg-[#1b7dae] hover:bg-[#15638c] text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                  >
                    TIẾN HÀNH ĐẶT HÀNG <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>

        <Footer />
        <FloatingWidgets />
        <MobileNav isMobileMenuOpen={mobileMenuOpen} setIsMobileMenuOpen={setMobileMenuOpen} />
      </div>
    </div>
  );
}
