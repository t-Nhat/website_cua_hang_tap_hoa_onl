"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Phone, User, ShoppingBag, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";

const POPULAR_SEARCHES = [
  "Trái cây",
  "Sữa tươi",
  "Sữa chua",
  "Thịt xông khói",
  "Mì ăn liền",
  "Nước ngọt",
];

export function Header({ onToggleMobileMenu }: { onToggleMobileMenu?: () => void }) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <header className="bg-white sticky top-0 z-40 shadow-xs border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 text-gray-700 hover:text-[#1b7dae] focus:outline-hidden"
            aria-label="Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" title="Bách Hóa Tổng Hợp Như Ngọc" className="block">
              <img
                src="https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/logo.png?1724383668661"
                alt="Bách Hóa Tổng Hợp Như Ngọc"
                className="h-8 sm:h-9 md:h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Search Bar Desktop */}
          <div className="hidden md:flex flex-1 max-w-[520px] relative">
            <div className="w-full flex items-center border-2 border-[#1b7dae] rounded-full overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#1b7dae]/20 transition-all">
              <input
                type="text"
                placeholder="Bạn cần tìm gì?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                className="w-full px-5 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden"
              />
              <button
                type="submit"
                aria-label="Tìm kiếm"
                className="bg-[#1b7dae] text-white px-5 py-2.5 hover:bg-[#145d82] transition-colors flex items-center justify-center shrink-0"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Suggestions dropdown */}
            {searchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                  Tìm kiếm phổ biến
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(item)}
                      className="text-xs bg-gray-50 hover:bg-[#1b7dae] hover:text-white text-gray-700 px-3 py-1.5 rounded-full border border-gray-200 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Hotline */}
            <a
              href="tel:02733867999"
              className="hidden lg:flex items-center gap-2 text-gray-800 hover:text-[#1b7dae] transition-colors group"
            >
              <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-[#1b7dae] group-hover:bg-[#1b7dae] group-hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left text-xs leading-tight">
                <div className="text-gray-400 uppercase text-[10px] font-semibold">Hotline</div>
                <div className="font-bold text-sm text-gray-800 group-hover:text-[#1b7dae]">
                  02733867999
                </div>
              </div>
            </a>

            {/* Account */}
            <div
              className="hidden sm:block relative"
              onMouseEnter={() => setAccountMenuOpen(true)}
              onMouseLeave={() => setAccountMenuOpen(false)}
            >
              <button className="flex items-center gap-2 text-gray-800 hover:text-[#1b7dae] transition-colors group py-1">
                <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 group-hover:text-[#1b7dae] group-hover:bg-blue-50 transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <div className="text-left hidden lg:block text-xs leading-tight">
                  <span className="font-medium text-gray-800 group-hover:text-[#1b7dae]">
                    Tài khoản
                  </span>
                </div>
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 top-full pt-1 w-44 z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                    <Link
                      href="/account/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1b7dae] transition-colors"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      href="/account/register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1b7dae] transition-colors"
                    >
                      Đăng ký
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 text-gray-800 hover:text-[#1b7dae] transition-colors group relative cursor-pointer"
              title="Xem giỏ hàng"
            >
              <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-[#1b7dae] group-hover:bg-[#1b7dae] group-hover:text-white transition-colors relative">
                <ShoppingBag className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              </div>
              <div className="text-left hidden lg:block text-xs leading-tight">
                <span className="font-semibold text-gray-800 group-hover:text-[#1b7dae]">
                  Giỏ hàng
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <div className="w-full flex items-center border border-[#1b7dae] rounded-full overflow-hidden bg-white">
            <input
              type="text"
              placeholder="Bạn cần tìm gì?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden"
            />
            <button
              type="submit"
              aria-label="Tìm kiếm"
              className="bg-[#1b7dae] text-white px-4 py-2 hover:bg-[#145d82] flex items-center justify-center shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
