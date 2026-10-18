"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, ClipboardCheck, CheckCircle2, AlertTriangle } from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";

export default function ChinhSachKiemHangPage() {
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
            <span className="text-[#1b7dae] font-semibold">Chính sách kiểm hàng</span>
          </div>
        </div>

        <main className="max-w-[1200px] mx-auto px-4 py-8 md:py-10">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 md:p-10 space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed">
            <div className="border-b border-gray-100 pb-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1b7dae] flex items-center gap-2">
                <ClipboardCheck className="w-8 h-8 text-[#1b7dae]" />
                CHÍNH SÁCH KIỂM HÀNG ĐỒNG KIỂM
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Quyền lợi đồng kiểm trực tiếp khi nhận hàng từ nhân viên giao hàng của Bách Hóa Như Ngọc
              </p>
            </div>

            <p>
              Nhằm mang đến trải nghiệm mua sắm an tâm nhất, <strong>Bách Hóa Tổng Hợp Như Ngọc</strong> áp dụng chính sách <strong>ĐỒNG KIỂM 100%</strong> khi quý khách nhận hàng.
            </p>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900">
                1. Quy định đồng kiểm khi nhận hàng
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Quý khách được phép mở kiện hàng ra để kiểm tra số lượng, tên sản phẩm, hạn sử dụng và tình trạng nguyên vẹn bên ngoài.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Đối chiếu hóa đơn hoặc phiếu giao hàng kèm theo kiện hàng với các sản phẩm thực tế nhận được.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Lưu ý: Không được phép bóc seal sản phẩm dùng thử hoặc xé bao bì tiêu thụ trước khi thanh toán.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900">
                2. Xử lý khi hàng hóa không đúng cam kết
              </h2>
              <div className="bg-red-50/70 p-4 rounded-xl border border-red-200/80 text-xs sm:text-sm space-y-2 text-red-900">
                <div className="flex items-center gap-2 font-bold text-red-700">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Quyền từ chối nhận hàng:</span>
                </div>
                <p>
                  Nếu phát hiện hàng bị móp méo, rách vỡ, cận date hoặc thiếu hàng so với đơn đặt, quý khách có quyền từ chối nhận hàng ngay tại chỗ mà không phải trả bất kỳ khoản phí nào.
                </p>
                <p>
                  Nhân viên giao nhận sẽ mang hàng về kho và công ty sẽ sắp xếp chuyến giao bù trong thời gian sớm nhất.
                </p>
              </div>
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
    </CartProvider>
  );
}
