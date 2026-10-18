"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function TopHeader() {
  const [showRecent, setShowRecent] = useState(false);
  const { wishlistCount } = useCart();

  return (
    <div className="hidden lg:block bg-white border-b border-gray-100 text-[13px] text-[#333] py-1.5 z-40 relative">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
        {/* Topbar Left */}
        <div className="flex items-center space-x-6">
          <Link
            href="/lien-he"
            className="hover:text-[#1b7dae] transition-colors"
            title="Tìm cửa hàng"
          >
            Tìm cửa hàng
          </Link>
          <Link
            href="/lien-he"
            className="hover:text-[#1b7dae] transition-colors"
            title="Hỗ trợ mua hàng"
          >
            Hỗ trợ mua hàng
          </Link>
        </div>

        {/* Topbar Right */}
        <div className="flex items-center space-x-6 relative">
          {/* Recently viewed products */}
          <div
            className="relative cursor-pointer select-none"
            onMouseEnter={() => setShowRecent(true)}
            onMouseLeave={() => setShowRecent(false)}
          >
            <div className="flex items-center space-x-1 hover:text-[#1b7dae] transition-colors">
              <span>Sản phẩm đã xem</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </div>

            {showRecent && (
              <div className="absolute right-0 top-full pt-2 w-[280px] z-50">
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-5 text-center">
                  <img
                    src="https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/nopro.png?1724383668661"
                    alt="Sản phẩm đã xem"
                    className="mx-auto mb-2 w-28 opacity-80"
                  />
                  <p className="text-gray-500 text-xs">Bạn chưa xem sản phẩm nào</p>
                </div>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <Link
            href="/san-pham-yeu-thich"
            className="flex items-center space-x-1 hover:text-[#1b7dae] transition-colors"
            title="Sản phẩm Yêu thích"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>Yêu thích</span>
            <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1">
              {wishlistCount}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
