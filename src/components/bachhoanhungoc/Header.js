"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Phone,
  User as UserIcon,
  ShoppingBag,
  Menu,
  LayoutDashboard,
  LogOut,
  Package,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const POPULAR_SEARCHES = [
  "Mì Hảo Hảo",
  "Dầu ăn Simply",
  "Gạo ST25",
  "Sữa Vinamilk",
  "Nước mắm Nam Ngư",
  "Bánh AFC",
  "Bột ngọt Ajinomoto",
  "Nước khoáng Lavie",
];

export function Header({ onToggleMobileMenu }) {
  const router = useRouter();
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { currentUser, isAuthenticated, isAdmin, logout, demoLogin } = useAuth();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchFocused(false);
    }
  };

  const handleSelectPopular = (term) => {
    setSearchQuery(term);
    router.push(`/search?query=${encodeURIComponent(term)}`);
    setSearchFocused(false);
  };

  return (
    <header className="bg-white sticky top-0 z-40 shadow-xs border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4 py-3 sm:py-3.5">
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
            <Link href="/" title="Bách Hóa Như Ngọc" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1b7dae] to-[#0284c7] text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                🛒
              </div>
              <div className="leading-tight">
                <span className="block text-lg sm:text-xl font-extrabold tracking-tight text-gray-900 group-hover:text-[#1b7dae] transition-colors">
                  BÁCH HÓA <span className="text-[#1b7dae]">NHƯ NGỌC</span>
                </span>
                <span className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase block">
                  Tạp Hóa Online - Giá Tốt Mỗi Ngày
                </span>
              </div>
            </Link>
          </div>

          {/* Search Bar Desktop */}
          <div className="hidden md:flex flex-1 max-w-[500px] relative">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="w-full flex items-center border-2 border-[#1b7dae] rounded-full overflow-hidden bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-xs">
                <input
                  type="text"
                  placeholder="Tìm mì, dầu ăn, gạo, sữa, nước mắm, gia vị, bánh kẹo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 250)}
                  className="w-full px-5 py-2 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden"
                />
                <button
                  type="submit"
                  aria-label="Tìm kiếm"
                  className="bg-[#1b7dae] text-white px-5 py-2.5 hover:bg-[#15638c] transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Suggestions dropdown */}
            {searchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#1b7dae] animate-pulse"></span>
                  Gợi ý tìm kiếm mặt hàng tạp hóa
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onMouseDown={() => handleSelectPopular(item)}
                      className="text-xs bg-blue-50/70 hover:bg-[#1b7dae] hover:text-white text-gray-700 px-3 py-1.5 rounded-full border border-blue-100 transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Hotline */}
            <a
              href="tel:0908123456"
              className="hidden lg:flex items-center gap-2 text-gray-800 hover:text-[#1b7dae] transition-colors group"
            >
              <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-[#1b7dae] group-hover:bg-[#1b7dae] group-hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left text-xs leading-tight">
                <div className="text-gray-400 uppercase text-[10px] font-semibold">Tạp hóa online</div>
                <div className="font-bold text-sm text-gray-800 group-hover:text-[#1b7dae]">
                  0908.123.456
                </div>
              </div>
            </a>

            {/* Account dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-700 text-xs cursor-pointer border border-transparent hover:border-gray-200"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1b7dae] to-[#0284c7] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {isAuthenticated ? (
                    currentUser?.name?.charAt(0).toUpperCase() || "U"
                  ) : (
                    <UserIcon className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="hidden sm:block text-left leading-tight">
                  <div className="font-semibold text-gray-800 line-clamp-1 max-w-[90px]">
                    {isAuthenticated ? currentUser?.name : "Tài khoản"}
                  </div>
                  <div className="text-[10px] text-gray-500 flex items-center gap-0.5">
                    {isAuthenticated ? (isAdmin ? "Quản trị" : "Thành viên") : "Đăng nhập"}
                    <ChevronDown className="w-2.5 h-2.5" />
                  </div>
                </div>
              </button>

              {/* Account Dropdown Menu */}
              {accountMenuOpen && (
                <div
                  onMouseLeave={() => setAccountMenuOpen(false)}
                  className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-1"
                >
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2.5 border-b border-gray-100 bg-blue-50/50">
                        <div className="font-bold text-xs text-gray-900">{currentUser?.name}</div>
                        <div className="text-[11px] text-gray-500 truncate">{currentUser?.email}</div>
                        <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1b7dae]/10 text-[#1b7dae]">
                          {currentUser?.memberLevel || "Thành viên Bách Hóa"} • {currentUser?.points || 0} điểm
                        </div>
                      </div>

                      <div className="py-1 text-xs">
                        <Link
                          href="/account"
                          onClick={() => setAccountMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
                        >
                          <UserIcon className="w-3.5 h-3.5 text-gray-400" />
                          Hồ sơ khách hàng
                        </Link>
                        <Link
                          href="/order-tracking"
                          onClick={() => setAccountMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
                        >
                          <Package className="w-3.5 h-3.5 text-gray-400" />
                          Tra cứu đơn hàng
                        </Link>
                        {isAdmin && (
                          <Link
                            href="/admin"
                            onClick={() => setAccountMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 text-[#1b7dae] font-semibold"
                          >
                            <LayoutDashboard className="w-3.5 h-3.5" />
                            Quản Trị Bách Hóa (Admin)
                          </Link>
                        )}
                      </div>

                      <div className="border-t border-gray-100 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setAccountMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 text-left cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Đăng xuất
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-3 text-xs space-y-2">
                      <div className="font-bold text-gray-900 pb-1 border-b border-gray-100">
                        Đăng nhập Bách Hóa Như Ngọc
                      </div>
                      <Link
                        href="/account"
                        onClick={() => setAccountMenuOpen(false)}
                        className="block w-full py-2 bg-[#1b7dae] text-white text-center rounded-xl font-bold hover:bg-[#15638c] transition-colors"
                      >
                        Đăng nhập / Đăng ký
                      </Link>

                      <div className="pt-2 border-t border-gray-100 space-y-1.5">
                        <div className="text-[10px] text-gray-500 font-medium">Đăng nhập nhanh Demo:</div>
                        <button
                          type="button"
                          onClick={() => {
                            demoLogin("customer");
                            setAccountMenuOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg bg-gray-50 hover:bg-blue-50 text-[11px] text-gray-700 hover:text-[#1b7dae] font-medium flex items-center justify-between cursor-pointer"
                        >
                          <span>👤 Khách hàng (Tuấn)</span>
                          <span className="text-[10px] text-gray-400">Thử ngay</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            demoLogin("admin");
                            setAccountMenuOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg bg-gray-50 hover:bg-blue-50 text-[11px] text-gray-700 hover:text-[#1b7dae] font-medium flex items-center justify-between cursor-pointer"
                        >
                          <span>👑 Quản trị viên (Admin)</span>
                          <span className="text-[10px] text-[#1b7dae] font-bold">Vào Admin</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="relative p-2 sm:px-3 sm:py-2 rounded-full bg-blue-50 hover:bg-blue-100 text-[#1b7dae] transition-colors flex items-center gap-2 group cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <div className="hidden sm:block text-left text-xs leading-tight">
                <span className="block font-bold">Giỏ hàng</span>
                <span className="text-[10px] text-gray-500 font-medium">({totalItems} món)</span>
              </div>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#df4c00] text-white text-[11px] font-extrabold rounded-full flex items-center justify-center shadow-xs animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
