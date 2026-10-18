"use client";

import React from "react";
import { Phone, X, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function FloatingWidgets() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
      .format(price)
      .replace("₫", "")
      .trim() + "₫";

  return (
    <>
      {/* Floating Buttons: Zalo & Phone */}
      <div className="fixed bottom-20 md:bottom-8 right-4 z-40 flex flex-col items-end space-y-3">
        {/* Zalo Button */}
        <a
          href="https://zalo.me/02733867999"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat qua Zalo"
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
          href="tel:02733867999"
          aria-label="Gọi hotline"
          className="relative group flex items-center bg-[#ff424e] hover:bg-[#df323d] text-white px-3.5 py-2.5 rounded-full shadow-xl hover:scale-105 transition-all text-xs font-bold gap-2"
        >
          <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Phone className="w-3.5 h-3.5 fill-white text-white" />
          </span>
          <span className="hidden sm:inline">02733867999</span>
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
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#1b7dae]" />
                  <h3 className="font-bold text-base text-gray-800">
                    Giỏ hàng của bạn ({totalItems})
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <img
                      src="https://bizweb.dktcdn.net/100/468/279/themes/881366/assets/nopro.png?1724383668661"
                      alt="Giỏ hàng trống"
                      className="w-24 mx-auto opacity-70"
                    />
                    <p className="text-gray-500 text-sm">
                      Hiện tại chưa có sản phẩm nào trong giỏ hàng.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="inline-block text-xs font-semibold bg-[#1b7dae] text-white px-5 py-2 rounded-full hover:bg-[#145d82] transition-colors"
                    >
                      Tiếp tục mua hàng
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-contain bg-white rounded-lg p-1 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 leading-tight">
                          {item.product.name}
                        </h4>
                        <div className="text-sm font-bold text-[#df4c00] mt-1">
                          {formatPrice(item.product.price)}
                        </div>

                        {/* Quantity control */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-xs font-bold hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-xs font-bold hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Total & Checkout */}
              {cart.length > 0 && (
                <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Tạm tính:</span>
                    <span className="text-lg font-bold text-[#df4c00]">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <button
                    onClick={() => alert("Chức năng thanh toán đang được xử lý!")}
                    className="w-full py-3 bg-[#1b7dae] hover:bg-[#145d82] text-white font-bold rounded-xl text-sm transition-colors shadow-md cursor-pointer"
                  >
                    Tiến hành đặt hàng
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
