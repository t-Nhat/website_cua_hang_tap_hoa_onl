"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Lock, Eye, FileText } from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";
export default function ChinhSachBaoMatPage() {
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
            <span className="text-[#1b7dae] font-semibold">Chính sách bảo mật</span>
          </div>
        </div>

        <main className="max-w-[1200px] mx-auto px-4 py-8 md:py-10">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 md:p-10 space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed">
            <div className="border-b border-gray-100 pb-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1b7dae] flex items-center gap-2">
                <ShieldCheck className="w-8 h-8 text-[#1b7dae]"/>
                CHÍNH SÁCH BẢO MẬT THÔNG TIN
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Áp dụng cho khách hàng giao dịch tại hệ thống website bachhoanhungoc.com
              </p>
            </div>

            <p>
              Chính sách bảo mật cho bạn biết chúng tôi sử dụng thông tin cá nhân của bạn thu thập được tại trang web này như thế nào. Xin vui lòng đọc kỹ chính sách bảo mật trước khi sử dụng trang web hoặc gửi bất kỳ thông tin cá nhân nào.
            </p>

            <div className="bg-blue-50/60 p-5 rounded-xl border border-blue-100 text-gray-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#1b7dae]">
                <Lock className="w-5 h-5"/>
                <span>Cam kết bảo mật của Như Ngọc:</span>
              </div>
              <p className="text-xs sm:text-sm">
                Chính sách của chúng tôi là giữ kín thông tin cá nhân nhận được từ trang web hoàn toàn bảo mật và chỉ dùng cho mục đích nội bộ. Chúng tôi cam kết không bán, chia sẻ hoặc để lộ thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào vì mục đích thương mại.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#1b7dae]"/>
                1. Mục đích và phạm vi thu thập thông tin
              </h2>
              <p>
                Khi Khách hàng gửi liên hệ hoặc đặt hàng tại website, chúng tôi thu thập các thông tin cơ bản gồm: <em>Họ tên, email, số điện thoại, địa chỉ nhận hàng</em>.
              </p>
              <p>Các thông tin này được sử dụng vào những mục đích hợp pháp sau:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600">
                <li>Xác nhận đơn hàng và điều phối giao hàng tận nơi nhanh chóng.</li>
                <li>Cung cấp thông tin hỗ trợ, tư vấn sản phẩm và giải quyết khiếu nại.</li>
                <li>Thông báo các chương trình ưu đãi, tri ân khách hàng thân thiết.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#1b7dae]"/>
                2. Thời gian lưu trữ và phương tiện chỉnh sửa dữ liệu
              </h2>
              <p>
                Dữ liệu cá nhân của khách hàng sẽ được lưu trữ an toàn trên hệ thống máy chủ của công ty cho đến khi có yêu cầu hủy bỏ từ khách hàng hoặc tự khách hàng đăng nhập yêu cầu thay đổi.
              </p>
              <p>
                Khách hàng có quyền kiểm tra, cập nhật, điều chỉnh hoặc yêu cầu hủy bỏ thông tin cá nhân của mình bằng cách liên hệ ban quản trị qua hotline: <strong>02733867999</strong> hoặc email: <strong>bhnhungoctg@gmail.com</strong>.
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
