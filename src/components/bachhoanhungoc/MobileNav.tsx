"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBag, Heart, User, X, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { MEGA_MENU_CATEGORIES } from "@/data/mockData";

export function MobileNav({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}) {
  const { totalItems, wishlistCount, setIsCartOpen } = useCart();
  const [expandedCat, setExpandedCat] = useState<number | null>(null);

  return (
    <>
      {/* Bottom Sticky Nav Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 px-3 py-2 shadow-lg">
        <div className="grid grid-cols-4 text-center">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center text-gray-700 hover:text-[#1b7dae]"
          >
            <Menu className="w-5 h-5 mb-0.5" />
            <span className="text-[11px] font-medium">Menu</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="flex flex-col items-center justify-center text-gray-700 hover:text-[#1b7dae] relative"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 mb-0.5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium">Giỏ hàng</span>
          </button>

          <Link
            href="/san-pham-yeu-thich"
            className="flex flex-col items-center justify-center text-gray-700 hover:text-[#1b7dae] relative"
          >
            <div className="relative">
              <Heart className="w-5 h-5 mb-0.5 text-rose-500" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium">Yêu thích</span>
          </Link>

          <Link
            href="/account"
            className="flex flex-col items-center justify-center text-gray-700 hover:text-[#1b7dae]"
          >
            <User className="w-5 h-5 mb-0.5" />
            <span className="text-[11px] font-medium">Tài khoản</span>
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

          <div className="fixed inset-y-0 left-0 max-w-[300px] w-full bg-white shadow-2xl flex flex-col justify-between">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-blue-50">
              <img
                src="https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/logo.png?1724383668661"
                alt="Logo"
                className="h-8 w-auto object-contain"
              />
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
                href="/gioi-thieu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 font-medium text-gray-800 border-b border-gray-100 hover:text-[#1b7dae]"
              >
                Giới thiệu
              </Link>

              {/* Accordion Categories */}
              <div className="border-b border-gray-100 pb-2">
                <div className="py-2 font-medium text-gray-800 flex items-center justify-between">
                  <span>Danh mục sản phẩm</span>
                </div>
                <div className="pl-2 space-y-2 mt-1">
                  {MEGA_MENU_CATEGORIES.map((cat, idx) => (
                    <div key={idx} className="text-xs">
                      <button
                        onClick={() =>
                          setExpandedCat(expandedCat === idx ? null : idx)
                        }
                        className="w-full flex items-center justify-between text-left font-semibold text-gray-700 py-1 hover:text-[#1b7dae]"
                      >
                        <span>{cat.title}</span>
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform ${
                            expandedCat === idx ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      {expandedCat === idx && (
                        <ul className="pl-3 py-1 space-y-1 text-gray-500">
                          {cat.subcategories.map((sub, sIdx) => (
                            <li key={sIdx}>
                              <Link
                                href={sub.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-0.5 hover:text-[#1b7dae]"
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/tin-tuc"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 font-medium text-gray-800 border-b border-gray-100 hover:text-[#1b7dae]"
              >
                Tin tức
              </Link>
              <Link
                href="/chinh-sach-bao-mat"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 font-medium text-gray-800 border-b border-gray-100 hover:text-[#1b7dae]"
              >
                Chính sách
              </Link>
              <Link
                href="/lien-he"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 font-medium text-gray-800 hover:text-[#1b7dae]"
              >
                Liên hệ
              </Link>
            </div>

            {/* Footer Hotline */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-600">
              <div>Hotline: <strong className="text-[#1b7dae]">02733867999</strong></div>
              <div className="mt-1">Email: bhnhungoctg@gmail.com</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
