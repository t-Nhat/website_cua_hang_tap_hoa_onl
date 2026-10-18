"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { MEGA_MENU_CATEGORIES } from "@/data/mockData";

export function Navbar() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);

  return (
    <nav className="hidden lg:block bg-white border-b border-gray-100 z-30 relative shadow-2xs">
      <div className="max-w-[1200px] mx-auto px-4">
        <ul className="flex items-center space-x-1 font-medium text-[15px] text-gray-800">
          {/* Trang chủ */}
          <li>
            <Link
              href="/"
              className="inline-block py-3 px-4 text-[#1b7dae] font-semibold hover:text-[#1b7dae] transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-[#1b7dae]"
            >
              Trang chủ
            </Link>
          </li>

          {/* Giới thiệu */}
          <li>
            <Link
              href="/gioi-thieu"
              className="inline-block py-3 px-4 hover:text-[#1b7dae] transition-colors"
            >
              Giới thiệu
            </Link>
          </li>

          {/* Sản phẩm with Mega Menu */}
          <li
            className="relative"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <Link
              href="/collections/all"
              className="flex items-center gap-1.5 py-3 px-4 hover:text-[#1b7dae] transition-colors"
            >
              <span>Sản phẩm</span>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#1b7dae]" />
            </Link>

            {/* Mega Menu Dropdown */}
            {megaOpen && (
              <div className="absolute left-[-150px] top-full w-[1140px] pt-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6">
                  <div className="grid grid-cols-12 gap-6">
                    {/* Categories Column */}
                    <div className="col-span-8 grid grid-cols-3 gap-6 max-h-[460px] overflow-y-auto pr-2">
                      {MEGA_MENU_CATEGORIES.map((cat, idx) => (
                        <div key={idx} className="space-y-2">
                          <Link
                            href={cat.href}
                            className="font-bold text-sm text-[#1b7dae] hover:underline block pb-1 border-b border-gray-100"
                          >
                            {cat.title}
                          </Link>
                          <ul className="space-y-1.5 text-xs text-gray-600">
                            {cat.subcategories.map((sub, sIdx) => (
                              <li key={sIdx}>
                                <Link
                                  href={sub.href}
                                  className="hover:text-[#1b7dae] hover:translate-x-1 inline-block transition-transform duration-100"
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Promotion Banner */}
                    <div className="col-span-4 flex flex-col justify-center">
                      <Link
                        href="/collections/all"
                        className="block rounded-lg overflow-hidden shadow-md group relative hover:opacity-95 transition-opacity"
                      >
                        <img
                          src="https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/mega-1-image.jpg?1724383668661"
                          alt="Sản phẩm nổi bật"
                          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* Tin tức */}
          <li>
            <Link
              href="/tin-tuc"
              className="inline-block py-3 px-4 hover:text-[#1b7dae] transition-colors"
            >
              Tin tức
            </Link>
          </li>

          {/* Chính sách Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setPolicyOpen(true)}
            onMouseLeave={() => setPolicyOpen(false)}
          >
            <div className="flex items-center gap-1.5 py-3 px-4 hover:text-[#1b7dae] transition-colors cursor-pointer">
              <span>Chính sách</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            {policyOpen && (
              <div className="absolute left-0 top-full pt-1 w-64 z-50 animate-in fade-in duration-100">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                  <Link
                    href="/chinh-sach-bao-mat"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#1b7dae] transition-colors"
                  >
                    Chính sách bảo mật
                  </Link>
                  <Link
                    href="/chinh-sach-van-chuyen"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#1b7dae] transition-colors"
                  >
                    Chính sách vận chuyển
                  </Link>
                  <Link
                    href="/chinh-sach-kiem-hang"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#1b7dae] transition-colors"
                  >
                    Chính sách kiểm hàng
                  </Link>
                  <Link
                    href="/chinh-sach-doi-tra"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#1b7dae] transition-colors"
                  >
                    Chính sách đổi trả
                  </Link>
                </div>
              </div>
            )}
          </li>

          {/* Liên hệ */}
          <li>
            <Link
              href="/lien-he"
              className="inline-block py-3 px-4 hover:text-[#1b7dae] transition-colors"
            >
              Liên hệ
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
