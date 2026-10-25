"use client";

import React from "react";
import Link from "next/link";
import { ChevronUp, Phone, MapPin, Mail, ShieldCheck, Truck, Package, LayoutDashboard } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-12 bg-gradient-to-b from-[#143244] via-[#0f2533] to-[#0a1822] text-white pt-12 pb-6 relative">
      {/* Top Value Strip */}
      <div className="max-w-[1200px] mx-auto px-4 mb-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-white/15">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#1b7dae]/30 text-blue-300 flex items-center justify-center shrink-0 border border-blue-400/30">
                <Truck className="w-5 h-5 text-blue-200" />
              </div>
              <div>
                <span className="font-bold text-sm sm:text-base text-white block">
                  Giao hàng siêu tốc 2 giờ
                </span>
                <span className="text-xs text-blue-200/80">
                  Giao nhanh tại TP. Mỹ Tho, đóng thùng carton chống bẹp vỡ
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#1b7dae]/30 text-blue-300 flex items-center justify-center shrink-0 border border-blue-400/30">
                <Package className="w-5 h-5 text-blue-200" />
              </div>
              <div>
                <span className="font-bold text-sm sm:text-base text-white block">
                  100% Hàng Date Mới
                </span>
                <span className="text-xs text-blue-200/80">
                  Nhập chính hãng Acecook, Masan, Vinamilk, Simply, Knorr
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#1b7dae]/30 text-blue-300 flex items-center justify-center shrink-0 border border-blue-400/30">
                <ShieldCheck className="w-5 h-5 text-blue-200" />
              </div>
              <div>
                <span className="font-bold text-sm sm:text-base text-white block">
                  Đồng kiểm & Đổi trả 48H
                </span>
                <span className="text-xs text-blue-200/80">
                  Kiểm tra hàng trước khi thanh toán, đổi trả miễn phí
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-white/10 text-xs sm:text-sm">
          {/* Col 1: Store Branding */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1b7dae] to-[#0284c7] text-white flex items-center justify-center font-bold text-xl shadow-md">
                🛒
              </div>
              <div>
                <span className="block text-base sm:text-lg font-black tracking-tight text-white">
                  BÁCH HÓA <span className="text-blue-300">NHƯ NGỌC</span>
                </span>
                <span className="text-[10px] text-blue-200 font-semibold tracking-wider uppercase block">
                  Cửa Hàng Tạp Hóa Online Tiện Lợi
                </span>
              </div>
            </div>

            <div className="text-blue-100/80 text-xs leading-relaxed space-y-2">
              <p className="font-semibold text-white">
                Hệ Thống Phân Phối Hàng Tiêu Dùng Bách Hóa Như Ngọc
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
                <span>5/4C Lê Thị Hồng Gấm, Phường 6, TP. Mỹ Tho, Tiền Giang</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-300 shrink-0" />
                <span>Hotline: 0273.3867.999 - 0908.123.456</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-300 shrink-0" />
                <span>Email: contact@bachhoanhungoc.com</span>
              </p>
            </div>
          </div>

          {/* Col 2: Ngành hàng */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-blue-300">
              Ngành Hàng Nổi Bật
            </h4>
            <ul className="space-y-2 text-xs text-blue-100/80">
              <li>
                <Link
                  href="/collections/all?category=Mì,+cháo,+phở,+bún+ăn+liền"
                  className="hover:text-white transition-colors"
                >
                  Mì, Phở, Bún Ăn Liền
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/all?category=Dầu+ăn,+nước+chấm,+gia+vị"
                  className="hover:text-white transition-colors"
                >
                  Dầu Ăn & Nước Chấm Gia Vị
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/all?category=Gạo,+bột,+đồ+khô"
                  className="hover:text-white transition-colors"
                >
                  Gạo ST25 & Đồ Khô Đóng Gói
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/all?category=Sữa+uống+các+loại"
                  className="hover:text-white transition-colors"
                >
                  Sữa Tươi & Sữa Dinh Dưỡng
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/all?category=Bánh+kẹo+các+loại"
                  className="hover:text-white transition-colors"
                >
                  Bánh Kẹo & Đồ Ăn Vặt
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hỗ trợ khách hàng */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-blue-300">
              Hỗ Trợ Khách Hàng
            </h4>
            <ul className="space-y-2 text-xs text-blue-100/80">
              <li>
                <Link href="/order-tracking" className="hover:text-white transition-colors">
                  Tra cứu tiến độ đơn hàng
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-van-chuyen" className="hover:text-white transition-colors">
                  Chính sách giao hàng siêu tốc 2H
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-kiem-hang" className="hover:text-white transition-colors">
                  Chính sách đồng kiểm hàng hóa
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-doi-tra" className="hover:text-white transition-colors">
                  Chính sách đổi trả trong 48H
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-bao-mat" className="hover:text-white transition-colors">
                  Chính sách bảo mật thông tin
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quản trị & Liên kết */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-blue-300">
              Hệ Thống
            </h4>
            <div className="space-y-2 text-xs">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors border border-white/15"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-blue-300" />
                <span>Admin Dashboard</span>
              </Link>
              <p className="text-[11px] text-blue-200/60 leading-relaxed">
                Quản lý sản phẩm tạp hóa, đơn hàng và biểu đồ doanh thu.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-200/60 gap-4">
          <p>© 2026 Bách Hóa Như Ngọc. Bản quyền thuộc về Cửa Hàng Bách Hóa Online.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-xs"
          >
            <span>Về đầu trang</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
