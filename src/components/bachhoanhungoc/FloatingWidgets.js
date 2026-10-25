"use client";

import React from "react";
import Link from "next/link";
import { Phone, X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function FloatingWidgets() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalPrice,
    totalItems,
  } = useCart();

  const formatPrice = (p) => new Intl.NumberFormat("vi-VN").format(p) + "₫";

  return (
    <>
      {/* Floating Buttons: Zalo & Phone */}
      <div className="fixed bottom-20 md:bottom-8 right-4 z-40 flex flex-col items-end space-y-3">
        {/* Zalo Button */}
        <a
          href="https://zalo.me/0908123456"
          target="_blank"
          rel="noreferrer"
          aria-label="Tư vấn đặt hàng tạp hóa qua Zalo"
          className="relative group w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-500 shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
        >
          <span className="absolute -inset-1 rounded-full bg-blue-400 opacity-60 animate-ping"></span>
          <img
            src="https://bizweb.dktcdn.net/100/313/291/themes/733872/assets/zalo-icon.png?1599185880236"
            alt="Zalo"
            className="w-8 h-8 md:w-9 md:h-9 object-contain relative z-10"
          />
        </a>

        {/* Hotline Call Button */}
        <a
          href="tel:0908123456"
          aria-label="Gọi đặt hàng tạp hóa siêu tốc"
          className="relative group flex items-center bg-[#1b7dae] hover:bg-[#15638c] text-white px-3.5 py-2.5 rounded-full shadow-xl hover:scale-105 transition-all text-xs font-bold gap-2"
        >
          <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Phone className="w-3.5 h-3.5 fill-white text-white" />
          </span>
          <span className="hidden sm:inline">0908.123.456</span>
        </a>
      </div>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-2xs transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
              {/* Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-blue-50/70">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#1b7dae]" />
                  <h3 className="font-extrabold text-base text-gray-900">
                    Giỏ hàng bách hóa ({totalItems})
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full hover:bg-blue-100 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingBag className="w-16 h-16 text-blue-200 mx-auto" />
                    <p className="text-gray-500 text-xs sm:text-sm">
                      Hiện tại chưa có mặt hàng tạp hóa nào trong giỏ.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="inline-block text-xs font-bold bg-[#1b7dae] text-white px-5 py-2.5 rounded-xl hover:bg-[#15638c] transition-colors cursor-pointer"
                    >
                      Tiếp tục chọn mua hàng
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-contain bg-white rounded-xl border border-gray-200 shrink-0 p-1"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-gray-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-gray-500 font-medium">
                          {item.product.unit ? `ĐVT: ${item.product.unit}` : ""}
                        </div>
                        <div className="text-xs font-bold text-[#df4c00]">
                          {formatPrice(item.product.price)}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-xs font-bold hover:bg-gray-100 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-xs font-semibold px-2">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-xs font-bold hover:bg-gray-100 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                        title="Xóa khỏi giỏ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">Tạm tính:</span>
                    <span className="text-lg font-extrabold text-[#df4c00]">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="py-2.5 px-3 rounded-xl border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 font-bold text-xs text-center transition-colors"
                    >
                      Xem giỏ hàng
                    </Link>
                    <Link
                      href="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="py-2.5 px-3 rounded-xl bg-[#1b7dae] text-white hover:bg-[#15638c] font-bold text-xs text-center transition-colors flex items-center justify-center gap-1 shadow-md shadow-blue-500/20"
                    >
                      Đặt hàng <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
