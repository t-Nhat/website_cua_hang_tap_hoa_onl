"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, LayoutDashboard, Search, Flame, ShoppingCart } from "lucide-react";
import { GROCERY_CATEGORIES } from "@/data/groceryData";
import { MEGA_MENU_CATEGORIES } from "@/data/mockData";

export function Navbar() {
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);

  return (
    <nav className="hidden lg:block bg-white border-b border-gray-100 z-30 relative shadow-2xs">
      <div className="max-w-[1200px] mx-auto px-4">
        <ul className="flex items-center space-x-1 font-medium text-[13px] sm:text-[14px] text-gray-800">
          {/* Trang chủ */}
          <li>
            <Link
              href="/"
              className="inline-block py-3 px-3 text-[#1b7dae] font-bold hover:text-[#15638c] transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-[#1b7dae]"
            >
              Trang chủ
            </Link>
          </li>

          {/* Tất cả ngành hàng with Mega Menu */}
          <li
            className="relative"
            onMouseEnter={() => setCatDropdownOpen(true)}
            onMouseLeave={() => setCatDropdownOpen(false)}
          >
            <Link
              href="/collections/all"
              className="flex items-center gap-1.5 py-3 px-3 text-gray-700 hover:text-[#1b7dae] transition-colors"
            >
              <span>Danh Mục Ngành Hàng</span>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#1b7dae]" />
            </Link>

            {catDropdownOpen && (
              <div className="absolute left-0 top-full w-[720px] pt-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {MEGA_MENU_CATEGORIES.slice(0, 6).map((cat, i) => (
                      <div key={i}>
                        <h4 className="font-bold text-xs uppercase text-[#1b7dae] tracking-wider mb-2 pb-1 border-b border-blue-50">
                          {cat.title}
                        </h4>
                        <ul className="space-y-1.5 text-xs text-gray-600">
                          {cat.subcategories?.slice(0, 5).map((sub, j) => (
                            <li key={j}>
                              <Link
                                href={`/search?query=${encodeURIComponent(sub.name)}`}
                                className="hover:text-[#1b7dae] hover:translate-x-1 inline-block transition-transform duration-100 font-medium"
                              >
                                • {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">
                      Bách Hóa Như Ngọc cam kết date mới 100% & đồng kiểm khi nhận hàng.
                    </span>
                    <Link
                      href="/collections/all"
                      className="text-xs font-bold text-[#1b7dae] hover:underline"
                    >
                      Xem tất cả sản phẩm →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* Quick Category links */}
          <li>
            <Link
              href="/collections/all?category=Mì,+cháo,+phở,+bún+ăn+liền"
              className="inline-block py-3 px-2.5 text-gray-700 hover:text-[#1b7dae] transition-colors"
            >
              Mì Ăn Liền
            </Link>
          </li>

          <li>
            <Link
              href="/collections/all?category=Dầu+ăn,+nước+chấm,+gia+vị"
              className="inline-block py-3 px-2.5 text-gray-700 hover:text-[#1b7dae] transition-colors"
            >
              Dầu Ăn & Gia Vị
            </Link>
          </li>

          <li>
            <Link
              href="/collections/all?category=Gạo,+bột,+đồ+khô"
              className="inline-block py-3 px-2.5 text-gray-700 hover:text-[#1b7dae] transition-colors"
            >
              Gạo & Đồ Khô
            </Link>
          </li>

          <li>
            <Link
              href="/collections/all?category=Sữa+uống+các+loại"
              className="inline-block py-3 px-2.5 text-gray-700 hover:text-[#1b7dae] transition-colors"
            >
              Sữa Các Loại
            </Link>
          </li>

          <li>
            <Link
              href="/collections/all?category=Bánh+kẹo+các+loại"
              className="inline-block py-3 px-2.5 text-gray-700 hover:text-[#1b7dae] transition-colors"
            >
              Bánh Kẹo
            </Link>
          </li>

          <li>
            <Link
              href="/collections/all?flashSale=true"
              className="inline-flex items-center gap-1 py-3 px-2.5 text-[#df4c00] hover:text-red-700 transition-colors font-bold"
            >
              <Flame className="w-3.5 h-3.5 fill-[#df4c00] text-[#df4c00] animate-pulse" />
              Flash Sale
            </Link>
          </li>

          {/* Tra cứu đơn hàng */}
          <li>
            <Link
              href="/order-tracking"
              className="inline-flex items-center gap-1.5 py-3 px-2.5 text-gray-700 hover:text-[#1b7dae] transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-gray-400" />
              <span>Theo Dõi Đơn</span>
            </Link>
          </li>

          {/* Trang Quản Trị Admin */}
          <li className="ml-auto">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 py-1.5 px-3.5 bg-gradient-to-r from-[#1b7dae] to-[#0284c7] hover:from-[#15638c] hover:to-[#0369a1] text-white rounded-full font-bold text-xs shadow-xs transition-all hover:scale-105"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Quản Trị Bách Hóa</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
