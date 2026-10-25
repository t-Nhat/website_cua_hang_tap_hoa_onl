"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBag, User, X, ChevronRight, Search, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { GROCERY_CATEGORIES } from "@/data/groceryData";

export function MobileNav({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const { totalItems } = useCart();
  const [catExpanded, setCatExpanded] = useState(true);

  return (
    <>
      {/* Bottom Sticky Nav Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 px-3 py-2 shadow-lg">
        <div className="grid grid-cols-5 text-center">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center text-gray-700 hover:text-[#1b7dae]"
          >
            <Menu className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">Menu</span>
          </button>

          <Link
            href="/search"
            className="flex flex-col items-center justify-center text-gray-700 hover:text-[#1b7dae]"
          >
            <Search className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">Tìm kiếm</span>
          </Link>

          <Link
            href="/cart"
            className="flex flex-col items-center justify-center text-gray-700 hover:text-[#1b7dae] relative"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 mb-0.5 text-[#1b7dae]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#df4c00] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold text-[#1b7dae]">Giỏ hàng</span>
          </Link>

          <Link
            href="/order-tracking"
            className="flex flex-col items-center justify-center text-gray-700 hover:text-[#1b7dae]"
          >
            <Package className="w-5 h-5 mb-0.5 text-[#1b7dae]" />
            <span className="text-[10px] font-medium">Theo dõi</span>
          </Link>

          <Link
            href="/account"
            className="flex flex-col items-center justify-center text-gray-700 hover:text-[#1b7dae]"
          >
            <User className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium">Tài khoản</span>
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-[310px] w-full bg-white shadow-2xl flex flex-col justify-between">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-blue-50/70">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛒</span>
                <span className="font-extrabold text-sm text-gray-900">Bách Hóa Như Ngọc</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-full text-gray-500 hover:text-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 font-bold text-[#1b7dae] border-b border-gray-100"
              >
                Trang chủ
              </Link>

              <Link
                href="/collections/all"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 font-bold text-gray-800 border-b border-gray-100 hover:text-[#1b7dae]"
              >
                Tất cả sản phẩm tạp hóa
              </Link>

              {/* Accordion Categories */}
              <div className="border-b border-gray-100 pb-2">
                <div
                  onClick={() => setCatExpanded(!catExpanded)}
                  className="py-2 font-bold text-gray-800 flex items-center justify-between cursor-pointer"
                >
                  <span>Ngành hàng tạp hóa</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform text-[#1b7dae] ${
                      catExpanded ? "rotate-90" : ""
                    }`}
                  />
                </div>
                {catExpanded && (
                  <div className="pl-2 space-y-1 mt-1">
                    {GROCERY_CATEGORIES.slice(1).map((cat, idx) => (
                      <Link
                        key={idx}
                        href={`/collections/all?category=${encodeURIComponent(cat)}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-1 text-xs text-gray-600 hover:text-[#1b7dae]"
                      >
                        • {cat}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/search"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 font-medium text-gray-800 border-b border-gray-100 hover:text-[#1b7dae]"
              >
                🔍 Tìm kiếm sản phẩm
              </Link>

              <Link
                href="/order-tracking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 font-bold text-[#1b7dae] border-b border-gray-100"
              >
                📦 Tra cứu tiến độ đơn hàng
              </Link>

              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 font-bold text-blue-800 bg-blue-50 px-3 rounded-xl hover:bg-blue-100"
              >
                ⭐ Quản Trị Bách Hóa (Admin)
              </Link>
            </div>

            {/* Footer Hotline */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-600">
              <div>
                Hotline giao hàng: <strong className="text-[#1b7dae]">0908.123.456</strong>
              </div>
              <div className="text-[11px] text-gray-400 mt-0.5">Mở cửa: 06:30 - 21:30 hàng ngày</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
