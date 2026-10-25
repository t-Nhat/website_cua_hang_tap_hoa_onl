"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Heart, Check, Sparkles, Zap, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product }) {
  const router = useRouter();
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const isFavorited = wishlist.includes(product.id);

  const formatPrice = (p) => {
    return new Intl.NumberFormat("vi-VN").format(p) + "₫";
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    router.push("/cart");
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 hover:border-[#1b7dae]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Top Badges */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
        {product.discountPercent && product.discountPercent > 0 ? (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-[#df4c00] text-white shadow-xs">
            -{product.discountPercent}%
          </span>
        ) : null}
        {product.isBestSeller && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-xs flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5" /> Bán chạy
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        type="button"
        onClick={handleToggleWishlist}
        className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-xs cursor-pointer ${
          isFavorited
            ? "bg-rose-50 text-rose-600 fill-rose-600 border border-rose-200"
            : "bg-white/80 hover:bg-white text-gray-500 hover:text-rose-600 border border-gray-100"
        }`}
        title="Thêm vào yêu thích"
      >
        <Heart className={`w-4 h-4 ${isFavorited ? "fill-rose-600 text-rose-600" : ""}`} />
      </button>

      {/* Product Image */}
      <Link
        href={`/products/${product.slug || product.id}`}
        className="relative block w-full aspect-square overflow-hidden bg-gray-50 p-4"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />
        {/* Unit badge on image */}
        {product.unit && (
          <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-xs rounded-md px-2 py-0.5 text-[10px] text-gray-700 font-semibold shadow-2xs border border-gray-100 flex items-center gap-1">
            <Package className="w-3 h-3 text-[#1b7dae]" />
            {product.unit}
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Brand */}
          <div className="flex items-center justify-between gap-1 text-[11px] mb-1">
            <span className="text-[#1b7dae] font-semibold truncate">
              {product.category}
            </span>
            {product.brand && (
              <span className="text-gray-400 font-medium shrink-0">
                {product.brand}
              </span>
            )}
          </div>

          {/* Name */}
          <Link
            href={`/products/${product.slug || product.id}`}
            className="font-bold text-gray-900 text-xs sm:text-sm hover:text-[#1b7dae] transition-colors line-clamp-2 leading-snug mb-2"
            title={product.name}
          >
            {product.name}
          </Link>
        </div>

        <div>
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-base sm:text-lg font-extrabold text-[#df4c00]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Rating and sold info */}
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-3 border-t border-gray-100 pt-2">
            <span className="flex items-center text-amber-500 font-semibold gap-0.5">
              ★ {product.rating || 5.0}
            </span>
            <span>
              Đã bán: <strong className="text-gray-700">{product.soldCount || 10}</strong>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`py-2 px-1.5 sm:px-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border ${
                isAdded
                  ? "bg-emerald-600 border-emerald-600 text-white"
                  : "bg-blue-50/80 border-[#1b7dae]/30 text-[#1b7dae] hover:bg-[#1b7dae] hover:text-white"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Đã thêm!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" /> + Giỏ hàng
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="py-2 px-1.5 sm:px-2 rounded-xl text-[11px] sm:text-xs font-bold bg-[#1b7dae] hover:bg-[#15638c] text-white transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-white" /> Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
