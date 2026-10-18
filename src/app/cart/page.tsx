"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  CheckCircle2,
} from "lucide-react";
import { CartProvider, useCart } from "@/context/CartContext";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";

function CartPageContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat("vi-VN").format(p) + "₫";
  };

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherCode.trim()) return;

    if (voucherCode.toUpperCase() === "NHUNGOC10") {
      setDiscount(0.1);
      setVoucherApplied(true);
      alert("Đã áp dụng mã giảm giá 10%!");
    } else if (voucherCode.toUpperCase() === "FREESHIP") {
      alert("Đã áp dụng mã miễn phí vận chuyển!");
      setVoucherApplied(true);
    } else {
      alert("Mã giảm giá không hợp lệ hoặc đã hết hạn!");
    }
  };

  const finalTotal = totalPrice * (1 - discount);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#141414] font-sans antialiased pb-14 lg:pb-0">
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
          <span className="text-[#1b7dae] font-semibold">Giỏ hàng ({totalItems})</span>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 py-8">
        <h1 className="text-xl sm:text-2xl font-bold text-[#212b36] mb-6 flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-[#1b7dae]" />
          Giỏ hàng của bạn
          <span className="text-sm font-normal text-gray-500">
            ({totalItems} sản phẩm)
          </span>
        </h1>

        {checkoutSuccess ? (
          <div className="bg-white rounded-2xl p-8 sm:p-12 text-center border border-green-100 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Đặt hàng thành công!
            </h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Cảm ơn bạn đã mua sắm tại <strong>Bách Hóa Như Ngọc</strong>. Đơn hàng của bạn đang được tiếp nhận và xử lý. Nhân viên chúng tôi sẽ gọi điện xác nhận trong ít phút.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/collections/all"
                className="px-6 py-2.5 bg-[#1b7dae] text-white rounded-xl font-bold text-sm hover:bg-[#145d82] transition-colors"
              >
                Tiếp tục mua hàng
              </Link>
              <Link
                href="/"
                className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-200 transition-colors"
              >
                Về trang chủ
              </Link>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 sm:p-16 text-center border border-gray-100 shadow-sm max-w-xl mx-auto">
            <div className="w-20 h-20 bg-blue-50 text-[#1b7dae] rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              Giỏ hàng của bạn đang trống!
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-6">
              Hãy chọn những sản phẩm tiêu dùng thiết yếu với giá tốt nhất tại Bách Hóa Như Ngọc.
            </p>
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1b7dae] text-white font-bold rounded-xl text-sm hover:bg-[#145d82] transition-all shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              TIẾP TỤC MUA SẮM
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Table Header (Desktop) */}
                <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3.5 bg-gray-50 text-xs font-semibold text-gray-600 border-b border-gray-100">
                  <div className="col-span-6">Sản phẩm</div>
                  <div className="col-span-2 text-center">Đơn giá</div>
                  <div className="col-span-2 text-center">Số lượng</div>
                  <div className="col-span-2 text-right">Thành tiền</div>
                </div>

                {/* Items */}
                <div className="divide-y divide-gray-100">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-4 sm:p-6 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center flex flex-col gap-3"
                    >
                      {/* Product Info */}
                      <div className="sm:col-span-6 flex items-center gap-3">
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden border border-gray-100 bg-[#f9f9f9]">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-contain p-1"
                            sizes="80px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/products/${item.product.id}`}
                            className="font-medium text-xs sm:text-sm text-gray-800 hover:text-[#1b7dae] transition-colors line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          {item.product.category && (
                            <span className="text-[11px] text-gray-500 block mt-0.5">
                              {item.product.category}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id)}
                            className="inline-flex items-center gap-1 text-[11px] text-red-500 hover:text-red-700 mt-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                            Xóa
                          </button>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="sm:col-span-2 sm:text-center text-xs sm:text-sm font-semibold text-gray-800">
                        <span className="sm:hidden text-gray-500 font-normal">Đơn giá: </span>
                        {formatPrice(item.product.price)}
                      </div>

                      {/* Quantity Selector */}
                      <div className="sm:col-span-2 flex sm:justify-center items-center">
                        <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-1.5 sm:p-2 text-gray-600 hover:text-black cursor-pointer"
                            aria-label="Giảm"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1.5 sm:p-2 text-gray-600 hover:text-black cursor-pointer"
                            aria-label="Tăng"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Total Line Price */}
                      <div className="sm:col-span-2 text-left sm:text-right text-xs sm:text-sm font-bold text-[#df4c00]">
                        <span className="sm:hidden text-gray-500 font-normal">Thành tiền: </span>
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Note */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                  Ghi chú cho đơn hàng (Tùy chọn)
                </label>
                <textarea
                  rows={3}
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi đến..."
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-hidden focus:border-[#1b7dae]"
                />
              </div>

              {/* Continue Shopping Link */}
              <div className="flex justify-between items-center pt-2">
                <Link
                  href="/collections/all"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1b7dae] hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Tiếp tục chọn thêm sản phẩm
                </Link>
              </div>
            </div>

            {/* Right Column: Order Summary & Checkout */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">
                  Tóm tắt đơn hàng
                </h2>

                {/* Voucher input */}
                <form onSubmit={handleApplyVoucher} className="mb-4">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Mã ưu đãi / Khuyến mãi
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Nhập NHUNGOC10..."
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs uppercase rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                      />
                      <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Áp dụng
                    </button>
                  </div>
                  {voucherApplied && (
                    <span className="text-[11px] text-green-600 mt-1 block">
                      ✓ Đã áp dụng mã thành công!
                    </span>
                  )}
                </form>

                <div className="space-y-2.5 text-xs sm:text-sm text-gray-600 border-t border-gray-100 pt-4">
                  <div className="flex justify-between">
                    <span>Tạm tính ({totalItems} món):</span>
                    <span className="font-semibold text-gray-800">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá (10%):</span>
                      <span className="font-semibold">
                        -{formatPrice(totalPrice * discount)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span className="text-gray-500 italic">Tính khi thanh toán</span>
                  </div>

                  <div className="flex justify-between border-t border-gray-100 pt-3 text-sm sm:text-base font-bold text-gray-900">
                    <span>Tổng thanh toán:</span>
                    <span className="text-[#df4c00] text-lg sm:text-xl">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 text-right">
                    (Đã bao gồm thuế VAT nếu có)
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full mt-5 py-3.5 bg-[#df4c00] hover:bg-[#b83e00] text-white font-bold rounded-xl text-sm transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  TIẾN HÀNH ĐẶT HÀNG
                </button>
              </div>

              {/* Trust Badges */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3.5 text-xs text-gray-600">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#1b7dae] shrink-0" />
                  <span>Giao hàng nhanh trong 48h tại Tiền Giang & lân cận</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-[#1b7dae] shrink-0" />
                  <span>Đổi trả miễn phí 100% trong 7 ngày nếu lỗi</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#1b7dae] shrink-0" />
                  <span>Được đồng kiểm tra hàng trước khi thanh toán tiền mặt</span>
                </div>
              </div>
            </div>
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

export default function CartPage() {
  return (
    <CartProvider>
      <CartPageContent />
    </CartProvider>
  );
}
