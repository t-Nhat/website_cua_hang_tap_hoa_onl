"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, ShoppingCart } from "lucide-react";
import { FLASH_SALE_PRODUCTS } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
export function FlashSaleSection() {
    const { addToCart } = useCart();
    const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 54 });
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0)
                    return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0)
                    return { ...prev, minutes: 59, seconds: 59 };
                if (prev.hours > 0)
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return { hours: 24, minutes: 0, seconds: 0 };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const formatNumber = (num) => num.toString().padStart(2, "0");
    const formatPrice = (price) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
        .format(price)
        .replace("₫", "")
        .trim() + "₫";
    return (<section className="mt-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="bg-[#ff685f] rounded-[15px] overflow-hidden shadow-md">
          {/* Section Header */}
          <div className="bg-[#ff463b] px-4 py-3 sm:px-6 sm:py-3.5 flex flex-col md:flex-row items-center justify-between gap-3 text-white">
            <div className="text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                <Link href="/san-pham-khuyen-mai" className="hover:text-[#ffe818] transition-colors">
                  Săn Sale đón lễ
                </Link>
              </h3>
              <p className="text-xs sm:text-sm text-red-100 font-normal mt-0.5">
                Hàng ngàn sản phẩm giảm giá diễn ra từ ngày 30/4 đến 30/6
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold text-white">
                Kết thúc sau
              </span>
              <div className="flex items-center gap-1.5 text-black font-bold">
                <div className="bg-[#ffd400] px-2 py-1 rounded text-center min-w-[32px]">
                  <span className="text-sm sm:text-base leading-none block">
                    {formatNumber(timeLeft.hours)}
                  </span>
                  <span className="text-[9px] font-normal block text-gray-800">Giờ</span>
                </div>
                <span className="text-[#ffd400] font-bold text-lg">:</span>
                <div className="bg-[#ffd400] px-2 py-1 rounded text-center min-w-[32px]">
                  <span className="text-sm sm:text-base leading-none block">
                    {formatNumber(timeLeft.minutes)}
                  </span>
                  <span className="text-[9px] font-normal block text-gray-800">Phút</span>
                </div>
                <span className="text-[#ffd400] font-bold text-lg">:</span>
                <div className="bg-[#ffd400] px-2 py-1 rounded text-center min-w-[32px]">
                  <span className="text-sm sm:text-base leading-none block">
                    {formatNumber(timeLeft.seconds)}
                  </span>
                  <span className="text-[9px] font-normal block text-gray-800">Giây</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {FLASH_SALE_PRODUCTS.map((product) => {
            const percentSold = product.soldCount && product.totalStock
                ? Math.round((product.soldCount / product.totalStock) * 100)
                : 60;
            return (<div key={product.id} className="bg-white rounded-[15px] p-3 flex flex-col justify-between hover:shadow-lg transition-shadow group relative">
                  {/* Sale Tag */}
                  {product.discountPercent && (<div className="absolute top-2 left-2 bg-[#ff424e] text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                      -{product.discountPercent}%
                    </div>)}

                  {/* Product Image */}
                  <div className="relative aspect-square w-full mb-2 overflow-hidden flex items-center justify-center">
                    <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"/>
                  </div>

                  {/* Info */}
                  <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                    <h4 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 hover:text-[#1b7dae] transition-colors leading-snug">
                      {product.name}
                    </h4>

                    {/* Price */}
                    <div className="flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-sm sm:text-base font-bold text-[#df4c00]">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (<span className="text-xs text-gray-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>)}
                    </div>

                    {/* Stock Progress Bar */}
                    <div className="mt-2">
                      <div className="bg-[#ffaaaf] h-4 rounded-full relative overflow-hidden flex items-center">
                        <div className="bg-[#ff424e] h-full absolute left-0 top-0 transition-all duration-500 rounded-full" style={{ width: `${percentSold}%` }}/>
                        <div className="relative z-10 w-full flex items-center justify-center text-[10px] text-white font-semibold">
                          <Flame className="w-3 h-3 mr-0.5 fill-yellow-300 text-yellow-300"/>
                          <span>Đã bán {product.soldCount}</span>
                        </div>
                      </div>
                    </div>

                    {/* Add to Cart button */}
                    <button onClick={() => addToCart(product)} className="mt-2 w-full py-1.5 px-2 bg-[#1b7dae] hover:bg-[#145d82] text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer">
                      <ShoppingCart className="w-3.5 h-3.5"/>
                      <span>Chọn mua</span>
                    </button>
                  </div>
                </div>);
        })}
          </div>
        </div>
      </div>
    </section>);
}
