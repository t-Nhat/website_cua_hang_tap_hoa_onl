"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, RotateCcw, AlertCircle, CheckCircle2 } from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";
export default function ChinhSachDoiTraPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (<CartProvider>
      <div className="min-h-screen bg-white text-[#141414] font-sans antialiased pb-14 lg:pb-0">
        <TopHeader />
        <Header onToggleMobileMenu={() => setMobileMenuOpen(true)}/>
        <Navbar />

        {/* Breadcrumb */}
        <div className="bg-[#f7f8fa] py-3 border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            <Link href="/" className="hover:text-[#1b7dae] transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5"/>
            <span className="text-[#1b7dae] font-semibold">Chính sách đổi trả</span>
          </div>
        </div>

        <main className="max-w-[1200px] mx-auto px-4 py-8 md:py-10">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 md:p-10 space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed">
            <div className="border-b border-gray-100 pb-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1b7dae] flex items-center gap-2">
                <RotateCcw className="w-8 h-8 text-[#1b7dae]"/>
                CHÍNH SÁCH ĐỔI TRẢ SẢN PHẨM TRONG 7 NGÀY
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Cam kết quyền lợi tối đa và sự an tâm tuyệt đối cho khách hàng của Bách Hóa Như Ngọc
              </p>
            </div>

            <div className="bg-amber-50/70 p-5 rounded-xl border border-amber-200/80 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-800">
                <AlertCircle className="w-5 h-5 text-amber-600"/>
                <span>Cam kết đổi trả 100% trong 7 ngày:</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-700">
                Quý khách có thể yêu cầu đổi sang sản phẩm mới hoặc hoàn tiền nếu sản phẩm nhận được có lỗi từ nhà sản xuất, bao bì bị rách hỏng do quá trình vận chuyển hoặc cận hạn sử dụng.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900">
                1. Điều kiện áp dụng đổi trả
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"/>
                  <span>Sản phẩm còn trong thời hạn 7 ngày kể từ ngày nhận hàng thành công.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"/>
                  <span>Sản phẩm còn nguyên tem mác, bao bì ban đầu (trừ trường hợp bao bì bị rách hỏng do giao nhận).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"/>
                  <span>Hàng hóa giao sai số lượng, sai chủng loại so với đơn hàng đã xác nhận.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900">
                2. Hướng dẫn các bước đổi trả nhanh chóng
              </h2>
              <p>
                <strong>Bước 1:</strong> Gọi ngay đến hotline <strong>02733867999</strong> hoặc nhắn tin qua Zalo chính thức của Bách Hóa Như Ngọc, cung cấp mã đơn hàng và hình ảnh sản phẩm cần hỗ trợ.
              </p>
              <p>
                <strong>Bước 2:</strong> Nhân viên tiếp nhận sẽ kiểm tra và xác nhận yêu cầu đổi trả trong vòng 2 giờ làm việc.
              </p>
              <p>
                <strong>Bước 3:</strong> Đội ngũ giao hàng sẽ mang sản phẩm mới đến đổi tận nhà cho quý khách hoàn toàn miễn phí.
              </p>
            </div>
          </div>
        </main>

        <Footer />
        <FloatingWidgets />
        <MobileNav isMobileMenuOpen={mobileMenuOpen} setIsMobileMenuOpen={setMobileMenuOpen}/>
      </div>
    </CartProvider>);
}
