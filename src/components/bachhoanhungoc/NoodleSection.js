"use client";
import React from "react";
import Link from "next/link";
import { NOODLE_PRODUCTS } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
export function NoodleSection() {
    const { addToCart } = useCart();
    const formatPrice = (price) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
        .format(price)
        .replace("₫", "")
        .trim() + "₫";
    return (<section className="mt-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Left Vertical Banner */}
          <div className="hidden sm:block md:col-span-3 rounded-[15px] overflow-hidden shadow-xs">
            <Link href="/mi-chao-pho-bun-an-lien" className="block h-full group relative overflow-hidden">
              <img src="https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/wolf_banner_small.jpg?1724383668661" alt="Banner Mì cháo phở bún ăn liền" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"/>
            </Link>
          </div>

          {/* Right Product Grid */}
          <div className="md:col-span-9">
            {/* Title with bottom accent line */}
            <div className="border-b border-gray-200 pb-2.5 mb-4 relative">
              <h2 className="text-lg sm:text-xl font-bold text-[#212b36]">
                <Link href="/mi-chao-pho-bun-an-lien" className="hover:text-[#1b7dae] transition-colors">
                  Mì, cháo, phở, bún ăn liền
                </Link>
              </h2>
              <div className="absolute -bottom-px left-0 w-12 h-0.5 bg-[#1b7dae]"/>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {NOODLE_PRODUCTS.map((prod) => (<div key={prod.id} className="bg-white border border-gray-100 hover:border-[#1b7dae]/40 rounded-xl p-2.5 flex items-center gap-3 hover:shadow-xs transition-all group">
                  {/* Thumbnail 90x90 */}
                  <div className="w-[80px] h-[80px] shrink-0 overflow-hidden flex items-center justify-center bg-gray-50 rounded-lg">
                    <img src={prod.image} alt={prod.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"/>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 hover:text-[#1b7dae] transition-colors leading-tight mb-1">
                      {prod.name}
                    </h4>
                    <div className="text-sm font-bold text-[#df4c00]">
                      {formatPrice(prod.price)}
                    </div>
                    <button onClick={() => addToCart(prod)} className="mt-1 text-[11px] text-[#1b7dae] hover:text-[#145d82] hover:underline font-medium cursor-pointer">
                      + Thêm vào giỏ
                    </button>
                  </div>
                </div>))}
            </div>
          </div>
        </div>
      </div>
    </section>);
}
