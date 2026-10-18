"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Truck, Clock, MapPin, CheckCircle } from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";

export default function ChinhSachVanChuyenPage() {
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
            <span className="text-[#1b7dae] font-semibold">Chính sách vận chuyển</span>
          </div>
        </div>

        <main className="max-w-[1200px] mx-auto px-4 py-8 md:py-10">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 md:p-10 space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed">
            <div className="border-b border-gray-100 pb-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1b7dae] flex items-center gap-2">
                <Truck className="w-8 h-8 text-[#1b7dae]" />
                CHÍNH SÁCH VẬN CHUYỂN & GIAO NHẬN
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Quy định phạm vi giao nhận, biểu phí và thời gian giao hàng tại Bách Hóa Như Ngọc
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100">
                <div className="font-bold text-[#1b7dae] mb-1 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> Giao hàng trong 48h
                </div>
                <p className="text-xs text-gray-600">
                  Giao nhanh trong 24h - 48h trên toàn khu vực Tiền Giang và các tỉnh lân cận.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <div className="font-bold text-emerald-700 mb-1 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" /> Miễn phí vận chuyển
                </div>
                <p className="text-xs text-gray-600">
                  Hỗ trợ giao hàng miễn phí tận nơi cho các đơn hàng theo chính sách ưu đãi.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100">
                <div className="font-bold text-amber-700 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> Phạm vi phủ sóng
                </div>
                <p className="text-xs text-gray-600">
                  Mỹ Tho, Tiền Giang, Long An, Bến Tre và các tuyến tỉnh miền Tây lân cận.
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h2 className="text-lg font-bold text-gray-900">
                1. Quy trình giao nhận hàng hóa
              </h2>
              <p>
                Sau khi khách hàng đặt hàng thành công qua website, app hoặc điện thoại hotline, nhân viên chăm sóc khách hàng của Bách Hóa Như Ngọc sẽ liên hệ xác nhận đơn hàng, số lượng và địa chỉ cụ thể.
              </p>
              <p>
                Đơn hàng sau đó được đóng gói kỹ càng tại kho tổng số 5/4C Lê Thị Hồng Gấm, Phường 6, TP. Mỹ Tho và giao cho đội ngũ nhân viên giao hàng trực tiếp mang đến tận nhà quý khách.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900">
                2. Kiểm tra hàng và thanh toán (COD)
              </h2>
              <p>
                Khách hàng được quyền <strong>mở kiện hàng và đồng kiểm số lượng, hạn sử dụng, bao bì</strong> sản phẩm với nhân viên giao hàng trước khi thanh toán tiền mặt hoặc chuyển khoản.
              </p>
              <p>
                Nếu có bất kỳ sai sót hoặc hàng hóa không đúng yêu cầu, khách hàng có thể từ chối nhận hàng mà không phải chịu bất kỳ chi phí phát sinh nào.
              </p>
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
