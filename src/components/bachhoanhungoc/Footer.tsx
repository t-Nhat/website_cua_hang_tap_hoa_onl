"use client";

import React from "react";
import Link from "next/link";
import { ChevronUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-12 bg-[#0189FF] text-white pt-10 pb-6 relative">
      {/* Top Policies Card */}
      <div className="max-w-[1200px] mx-auto px-4 mb-10">
        <div className="bg-white/10 backdrop-blur-xs rounded-[15px] p-5 sm:p-6 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3.5">
              <img
                src="https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/footer_policy_img_1.png?1724383668661"
                alt="Đặt online giao tận nhà đúng giờ"
                className="w-10 h-10 object-contain shrink-0"
              />
              <span className="font-semibold text-sm sm:text-base text-white">
                Đặt online giao tận nhà đúng giờ
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <img
                src="https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/footer_policy_img_2.png?1724383668661"
                alt="Đổi trả sản phẩm trong 7 ngày"
                className="w-10 h-10 object-contain shrink-0"
              />
              <span className="font-semibold text-sm sm:text-base text-white">
                Đổi trả sản phẩm trong 7 ngày
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <img
                src="https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/footer_policy_img_3.png?1724383668661"
                alt="Sản phẩm sạch tại vườn"
                className="w-10 h-10 object-contain shrink-0"
              />
              <span className="font-semibold text-sm sm:text-base text-white">
                Sản phẩm sạch tại vườn
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-white/20 text-sm">
          {/* Col 1: Company Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white/95 p-3 rounded-xl inline-block shadow-xs">
              <img
                src="https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/footer-logo.png?1724383668661"
                alt="Bách Hóa Tổng Hợp Như Ngọc"
                className="h-9 w-auto object-contain"
              />
            </div>
            <div className="text-white/90 text-xs sm:text-sm leading-relaxed space-y-2">
              <p className="font-semibold text-white">
                Công ty TNHH Bách hóa tổng hợp Như Ngọc.
              </p>
              <p>
                Mã số doanh nghiệp: 1201397981 - Do Sở Kế Hoạch và Đầu Tư tỉnh Kiên Giang cấp ngày 17/08/2012
              </p>
              <p>
                Địa chỉ: 5/4C Lê Thị Hồng Gấm, Phường 6, Tp Mỹ Tho, Tiền Giang
              </p>
            </div>
          </div>

          {/* Col 2: Customer Support */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-bold text-base text-white uppercase tracking-wider">
              Hỗ trợ khách hàng
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <img
                  src="https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/footer-phone.png?1724383668661"
                  alt="Hotline"
                  className="w-5 h-5 object-contain mt-0.5 shrink-0"
                />
                <div>
                  <a
                    href="tel:02733867999"
                    className="font-bold text-lg text-white hover:text-yellow-300 transition-colors block"
                  >
                    02733867999
                  </a>
                  <span className="text-white/80 text-xs">
                    Từ thứ 2 - chủ nhật (8:00 - 18:00)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <img
                  src="https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/footer-email.png?1724383668661"
                  alt="Email"
                  className="w-5 h-5 object-contain shrink-0"
                />
                <a
                  href="mailto:bhnhungoctg@gmail.com"
                  className="text-white/90 hover:text-yellow-300 transition-colors"
                >
                  bhnhungoctg@gmail.com
                </a>
              </div>

              {/* Social icons */}
              <div className="pt-2">
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white flex items-center justify-center p-1.5 transition-colors group"
                    title="Facebook"
                  >
                    <img
                      src="https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/social_facebook_icon.svg?1724383668661"
                      alt="Facebook"
                      className="w-full h-full object-contain"
                    />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white flex items-center justify-center p-1.5 transition-colors group"
                    title="Tiki"
                  >
                    <img
                      src="https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/social_tiki_icon.svg?1724383668661"
                      alt="Tiki"
                      className="w-full h-full object-contain"
                    />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white flex items-center justify-center p-1.5 transition-colors group"
                    title="Lazada"
                  >
                    <img
                      src="https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/lazada-icon_-1.svg?1724383668661"
                      alt="Lazada"
                      className="w-full h-full object-contain"
                    />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white flex items-center justify-center p-1.5 transition-colors group"
                    title="Shopee"
                  >
                    <img
                      src="https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/social_shopee_icon.svg?1724383668661"
                      alt="Shopee"
                      className="w-full h-full object-contain"
                    />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white flex items-center justify-center p-1.5 transition-colors group"
                    title="TikTok"
                  >
                    <img
                      src="https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/social_tiktok_icon.svg?1724383668661"
                      alt="TikTok"
                      className="w-full h-full object-contain"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Support Links & Ministry of Industry and Trade */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-bold text-base text-white uppercase tracking-wider">
              Hỗ trợ
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/90">
              <li>
                <Link href="/search" className="hover:text-yellow-300 transition-colors">
                  Tìm kiếm
                </Link>
              </li>
              <li>
                <Link href="/account/login" className="hover:text-yellow-300 transition-colors">
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link href="/account/register" className="hover:text-yellow-300 transition-colors">
                  Đăng ký
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-yellow-300 transition-colors">
                  Giỏ hàng
                </Link>
              </li>
            </ul>
            <div className="pt-2">
              <a
                href="http://online.gov.vn/Home/WebDetails/118879"
                target="_blank"
                rel="noreferrer"
                title="Đã thông báo Bộ Công Thương"
                className="inline-block"
              >
                <img
                  src="https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/logobct.png?1724383668661"
                  alt="Bộ Công Thương"
                  className="h-10 w-auto object-contain"
                />
              </a>
            </div>
          </div>

          {/* Col 4: Policies */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-bold text-base text-white uppercase tracking-wider">
              Chính sách
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/90">
              <li>
                <Link
                  href="/chinh-sach-bao-mat"
                  className="hover:text-yellow-300 transition-colors"
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach-kiem-hang"
                  className="hover:text-yellow-300 transition-colors"
                >
                  Chính sách vận chuyển & thanh toán
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach-doi-tra"
                  className="hover:text-yellow-300 transition-colors"
                >
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach-kiem-hang-1"
                  className="hover:text-yellow-300 transition-colors"
                >
                  Chính sách kiểm hàng
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/80 gap-3">
          <p>
            © Bản quyền thuộc về <strong className="text-white">NHƯ NGỌC</strong> | Cung cấp bởi Sapo
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Lên đầu trang"
            className="flex items-center gap-1.5 bg-black/30 hover:bg-black/60 text-white px-3 py-1.5 rounded-full border border-white/20 transition-colors cursor-pointer text-xs"
          >
            <span>Lên đầu trang</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
