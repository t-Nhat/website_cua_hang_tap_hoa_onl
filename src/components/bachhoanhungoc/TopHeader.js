"use client";

import React from "react";
import Link from "next/link";
import { Heart, Search, ShoppingBag, Clock, LayoutDashboard, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export function TopHeader() {
  const { wishlistCount } = useCart();
  const { isAdmin, currentUser } = useAuth();

  return (
    <div className="hidden lg:block bg-gradient-to-r from-[#145d82] via-[#1b7dae] to-[#0284c7] text-white text-[12px] py-1.5 z-40 relative shadow-xs">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
        {/* Left message */}
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1.5 font-medium text-white">
            <Truck className="w-3.5 h-3.5 text-amber-300" />
            Bách Hóa Như Ngọc - Giao hàng tạp hóa siêu tốc 2H tại TP. Mỹ Tho & các khu vực lân cận
          </span>
          <span className="text-white/40">|</span>
          <span className="flex items-center gap-1 text-white/90">
            <Clock className="w-3.5 h-3.5 text-white/80" />
            Mở cửa: 06:30 - 21:30 hàng ngày
          </span>
        </div>

        {/* Right actions */}
        <div className="flex items-center space-x-5 text-white/95">
          <Link
            href="/order-tracking"
            className="flex items-center gap-1 hover:text-amber-300 transition-colors font-medium"
          >
            <Search className="w-3 h-3 text-amber-300" />
            <span>Tra cứu đơn hàng</span>
          </Link>

          <Link
            href="/admin"
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#1b7dae] transition-all font-semibold text-[11px] shadow-xs"
          >
            <LayoutDashboard className="w-3 h-3" />
            <span>Quản Trị Admin</span>
          </Link>

          <Link
            href="/san-pham-yeu-thich"
            className="flex items-center space-x-1 hover:text-amber-300 transition-colors"
            title="Sản phẩm Yêu thích"
          >
            <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300" />
            <span>Yêu thích ({wishlistCount})</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
