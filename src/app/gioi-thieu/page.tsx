"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Clock, Award, ShieldCheck, HeartHandshake } from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";

export default function GioiThieuPage() {
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
            <span className="text-[#1b7dae] font-semibold">Giới thiệu</span>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-[1200px] mx-auto px-4 py-8 md:py-10">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 md:p-10">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1b7dae] mb-6 pb-4 border-b border-gray-100">
              Giới thiệu về Bách Hóa Tổng Hợp Như Ngọc
            </h1>

            {/* Section 1 */}
            <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
              <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-[#212b36] text-[#1b7dae]">
                <Award className="w-6 h-6 text-[#1b7dae]" />
                <h2>1. Giới thiệu về công ty</h2>
              </div>

              <p className="text-justify">
                <strong>Công ty TNHH Bách hóa Tổng hợp Như Ngọc</strong> được thành lập từ năm 2012 với định hướng phân phối các sản phẩm tiêu dùng chính hãng hàng đầu: <em>Bột ngọt Ajinomoto, đường Biên Hòa, váng sữa Monte, các loại bánh kẹo Kinh Đô, Danisa, Yến sào Khánh Hòa, sữa Vinamilk, Ensure, Cô Gái Hà Lan, Milo, Cà phê Wakeup Sài Gòn, Vinacafe, Buổi Sáng, Cà phê phố và hàng gia vị tổng hợp Chinsu, Aji-ngon…</em>
              </p>

              <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100/80 my-4 space-y-2">
                <p>
                  🚚 <strong>Mạng lưới phân phối:</strong> Hệ thống nhân viên bán hàng chuyên nghiệp phủ rộng khắp các kênh tạp hóa, kênh Thương mại điện tử, kênh nhà hàng quán ăn, suất ăn công nghiệp trên địa bàn tỉnh <strong>Tiền Giang – Long An – Bến Tre</strong> và các tỉnh lân cận. Đội ngũ giao nhận hàng năng động, nhiệt tình phục vụ khách hàng kể cả ngày Lễ, Thứ bảy và Chủ Nhật.
                </p>
                <p>
                  🎁 <strong>Dịch vụ quà tặng:</strong> Chúng tôi phục vụ các dịch vụ quà tặng nhân dịp lễ, Tết trong năm. Quý khách có thể đặt hàng qua điện thoại, chúng tôi giao hàng tận nơi hoàn toàn miễn phí. Khách hàng kiểm tra hàng hóa chu đáo rồi mới thanh toán tiền.
                </p>
                <p>
                  📱 <strong>Kênh mua sắm trực tuyến:</strong> Đặt hàng tiện lợi qua website và ứng dụng, giao hàng nhanh chóng trong 48h. Với phương châm <em>bán lẻ giá sỉ</em>, đa dạng sản phẩm thiết yếu phục vụ đời sống hàng ngày, rất phù hợp cho các bà mẹ bỉm sữa, nội trợ và các đại lý kinh doanh tạp hóa cộng tác mua bán.
                </p>
              </div>

              {/* Section 2 */}
              <div className="pt-6">
                <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-[#212b36] mb-3 text-[#1b7dae]">
                  <Clock className="w-6 h-6 text-[#1b7dae]" />
                  <h2>2. Thời gian làm việc</h2>
                </div>

                <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/80">
                  <p className="italic text-gray-800 font-medium mb-2">
                    Với phương châm: <strong>“Khách hàng là người trả lương cho tập thể công ty !”</strong>
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">
                    ⏰ Thời gian: <span className="text-[#df4c00]">Từ 7h30 đến 18h00</span> (kể cả Thứ bảy, Chủ nhật và ngày Lễ)
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="pt-6">
                <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-[#212b36] mb-3 text-[#1b7dae]">
                  <ShieldCheck className="w-6 h-6 text-[#1b7dae]" />
                  <h2>3. Chính sách bán hàng & Cam kết</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1b7dae] flex items-center justify-center mb-3">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">BÁN LẺ GIÁ SỈ</h3>
                    <p className="text-xs text-gray-500">
                      Mức giá cạnh tranh tối đa cho cả khách lẻ và các đại lý tạp hóa.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-3">
                      <HeartHandshake className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">PHỤC VỤ TẬN TÌNH</h3>
                    <p className="text-xs text-gray-500">
                      Giao hàng nhanh đúng hẹn, hỗ trợ kiểm hàng trước khi thanh toán.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">TẬN TÂM VÌ KHÁCH HÀNG</h3>
                    <p className="text-xs text-gray-500">
                      Đặt quyền lợi và sự hài lòng của khách hàng lên hàng đầu.
                    </p>
                  </div>
                </div>
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
