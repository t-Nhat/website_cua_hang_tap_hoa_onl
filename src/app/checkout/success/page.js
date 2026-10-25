"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Search, Phone, Home, Truck, Package } from "lucide-react";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { useOrders } from "@/context/OrderContext";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderCode = searchParams.get("code") || "TAPHOA-1082";
  const { getOrderById } = useOrders();
  const order = getOrderById(orderCode);

  const formatPrice = (p) => new Intl.NumberFormat("vi-VN").format(p) + "₫";

  return (
    <main className="max-w-[800px] mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-10 text-center">
        {/* Animated Checkmark */}
        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-5 border-4 border-green-100 shadow-sm animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200 uppercase tracking-wider inline-block mb-3">
          Đặt hàng thành công
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
          Cảm Ơn Quý Khách Đã Mua Sắm!
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto mb-6 leading-relaxed">
          Đơn hàng của bạn đã được ghi nhận vào hệ thống Bách Hóa Như Ngọc. Đội ngũ kho đang soạn hàng, kiểm tra hạn sử dụng và chuẩn bị đóng thùng giao siêu tốc.
        </p>

        {/* Order Details Card */}
        <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5 text-left mb-6 space-y-3 text-xs sm:text-sm">
          <div className="flex items-center justify-between pb-3 border-b border-blue-100">
            <span className="text-gray-500 font-medium">Mã đơn hàng:</span>
            <strong className="text-[#1b7dae] font-mono text-base font-black">
              #{orderCode}
            </strong>
          </div>

          {order && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Người nhận hàng:</span>
                <strong className="text-gray-800">
                  {order.recipientInfo?.recipientName} ({order.recipientInfo?.recipientPhone})
                </strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Địa chỉ giao:</span>
                <span className="text-gray-800 font-medium text-right max-w-xs truncate">
                  {order.recipientInfo?.recipientAddress}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Thời gian hẹn giao:</span>
                <strong className="text-gray-800">
                  {order.recipientInfo?.deliveryTimeSlot} - {order.recipientInfo?.deliveryDate}
                </strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Phương thức thanh toán:</span>
                <span className="font-bold text-gray-800 uppercase">
                  {order.paymentMethod === "vietqr" ? "Chuyển khoản VietQR" : "Tiền mặt khi nhận (COD)"}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-blue-100 pt-2">
                <span className="text-gray-500">Tổng thanh toán:</span>
                <strong className="text-[#df4c00] text-base font-black">
                  {formatPrice(order.total)}
                </strong>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/order-tracking?code=${orderCode}`}
            className="px-6 py-3.5 bg-[#1b7dae] hover:bg-[#15638c] text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            THEO DÕI TIẾN ĐỘ ĐƠN HÀNG NGAY
          </Link>
          <Link
            href="/"
            className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <Home className="w-4 h-4" /> Về trang chủ
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-6 text-xs text-gray-500">
          <span className="flex items-center gap-1 text-gray-600">
            <Phone className="w-3.5 h-3.5 text-[#1b7dae]" /> Hotline hỗ trợ: <strong>0908.123.456</strong>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-gray-600">
            <Truck className="w-3.5 h-3.5 text-[#1b7dae]" /> Giao siêu tốc trong 2H
          </span>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased pb-14 lg:pb-0 flex flex-col justify-between">
      <div>
        <TopHeader />
        <Header />
        <Navbar />
        <Suspense fallback={<div className="text-center py-20 text-gray-500 text-sm">Đang tải thông tin đơn hàng...</div>}>
          <SuccessContent />
        </Suspense>
      </div>
      <Footer />
      <FloatingWidgets />
    </div>
  );
}
