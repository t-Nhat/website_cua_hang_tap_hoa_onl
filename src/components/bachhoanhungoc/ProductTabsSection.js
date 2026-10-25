"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
const TABS = [
    { id: "tab-1", label: "Thịt, cá đông lạnh" },
    { id: "tab-2", label: "Hải sản đông lạnh" },
    { id: "tab-3", label: "Trái cây" },
    { id: "tab-4", label: "Sữa chua, phô mai" },
];
const SAMPLE_FROZEN_PRODUCTS = [
    {
        id: "p-frozen-1",
        name: "Thịt ba chỉ bò Mỹ đông lạnh 500g",
        price: 115000,
        originalPrice: 130000,
        discountPercent: 12,
        image: "https://bizweb.dktcdn.net/thumb/medium/100/468/279/products/thung-30-goi-mi-de-nhat-thit-bam-82g-201912050951055664-1667096237326.jpg?v=1667525933203",
    },
    {
        id: "p-frozen-2",
        name: "Cá hồi phi lê đông lạnh khay 300g",
        price: 165000,
        originalPrice: 185000,
        discountPercent: 11,
        image: "https://bizweb.dktcdn.net/thumb/medium/100/468/279/products/mi-hao-hao-handy-thit-bam-bi-do-ly-68g-201912051409046144-1667096045593.jpg?v=1667525927387",
    },
    {
        id: "p-frozen-3",
        name: "Tôm thẻ bóc nõn xuất khẩu 500g",
        price: 145000,
        originalPrice: 160000,
        discountPercent: 9,
        image: "https://bizweb.dktcdn.net/thumb/medium/100/468/279/products/mi-modern-lau-thai-tom-ly-65g-202207051319061550-1667873309508.jpg?v=1667873516173",
    },
    {
        id: "p-frozen-4",
        name: "Xúc xích Đức xông khói CP gói 500g",
        price: 68000,
        originalPrice: 75000,
        discountPercent: 9,
        image: "https://bizweb.dktcdn.net/thumb/medium/100/468/279/products/mi-hao-hao-vi-tom-chua-cay-goi-75g-202110110919568290-jfif-1667463961664.jpg?v=1667525958653",
    },
];
export function ProductTabsSection() {
    const [activeTab, setActiveTab] = useState("tab-1");
    const { addToCart } = useCart();
    const formatPrice = (price) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
        .format(price)
        .replace("₫", "")
        .trim() + "₫";
    return (<section className="mt-8 bg-[#f4f5f9] py-8 rounded-[15px]">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl sm:text-[22px] font-bold text-[#212b36]">
            Tất cả sản phẩm
          </h2>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {TABS.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`text-xs sm:text-sm px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${activeTab === tab.id
                ? "bg-[#1b7dae] text-white shadow-xs"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"}`}>
                {tab.label}
              </button>))}
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Left Vertical Banner */}
          <div className="hidden sm:block md:col-span-3 rounded-[15px] overflow-hidden shadow-xs">
            <Link href="/collections/all" className="block h-full group relative overflow-hidden">
              <img src="https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/wolf_module_product_banner.jpg?1724383668661" alt="Banner Tất cả sản phẩm" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"/>
            </Link>
          </div>

          {/* Right Product Grid */}
          <div className="md:col-span-9">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {SAMPLE_FROZEN_PRODUCTS.map((prod) => (<div key={prod.id} className="bg-white rounded-[15px] p-3 flex flex-col justify-between hover:shadow-lg transition-all group relative border border-gray-100">
                  {prod.discountPercent && (<span className="absolute top-2 left-2 bg-[#ff424e] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full z-10">
                      -{prod.discountPercent}%
                    </span>)}

                  <div className="relative aspect-square w-full mb-2 overflow-hidden flex items-center justify-center">
                    <img src={prod.image} alt={prod.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"/>
                  </div>

                  <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                    <h4 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 hover:text-[#1b7dae] transition-colors leading-snug">
                      {prod.name}
                    </h4>

                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-sm font-bold text-[#df4c00]">
                        {formatPrice(prod.price)}
                      </span>
                      {prod.originalPrice && (<span className="text-xs text-gray-400 line-through">
                          {formatPrice(prod.originalPrice)}
                        </span>)}
                    </div>

                    <button onClick={() => addToCart(prod)} className="mt-2 w-full py-1.5 px-2 bg-[#1b7dae] hover:bg-[#145d82] text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer">
                      <ShoppingCart className="w-3.5 h-3.5"/>
                      <span>Chọn mua</span>
                    </button>
                  </div>
                </div>))}
            </div>
          </div>
        </div>
      </div>
    </section>);
}
