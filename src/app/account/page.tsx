"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  User,
  Package,
  MapPin,
  Lock,
  LogOut,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";

export default function AccountPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "addresses">("profile");

  const mockOrders = [
    {
      id: "#NHUNGOC-1082",
      date: "12/10/2026",
      items: "2 sản phẩm (Mì Hảo Hảo Tôm Chua Cay, Nước Mắm Nam Ngư)",
      total: "285.000₫",
      status: "Đang giao hàng",
      statusColor: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      id: "#NHUNGOC-0941",
      date: "28/09/2026",
      items: "5 sản phẩm (Sữa Tươi TH True Milk, Dầu Ăn Simply, Gạo ST25)",
      total: "640.000₫",
      status: "Đã hoàn thành",
      statusColor: "text-green-600 bg-green-50 border-green-200",
    },
  ];

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#f8f9fa] text-[#141414] font-sans antialiased pb-14 lg:pb-0">
        <TopHeader />
        <Header onToggleMobileMenu={() => setMobileMenuOpen(true)} />
        <Navbar />

        {/* Breadcrumb */}
        <div className="bg-white py-3 border-b border-gray-100 shadow-2xs">
          <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            <Link href="/" className="hover:text-[#1b7dae] transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1b7dae] font-semibold">Tài khoản của tôi</span>
          </div>
        </div>

        <main className="max-w-[1200px] mx-auto px-4 py-8">
          <h1 className="text-xl sm:text-2xl font-bold text-[#212b36] mb-6">
            Trang tài khoản khách hàng
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs text-center">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-[#1b7dae] flex items-center justify-center mx-auto mb-3 font-bold text-xl border-2 border-[#1b7dae]">
                  NN
                </div>
                <h3 className="font-bold text-gray-900 text-sm">
                  Khách Hàng Thân Thiết
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">khachhang@bachhoanhungoc.com</p>
                <div className="mt-3 inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 text-[11px] font-semibold rounded-full border border-amber-200">
                  ★ Thành viên Bạc (250 điểm)
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
                <nav className="divide-y divide-gray-100 text-xs sm:text-sm font-medium">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer ${
                      activeTab === "profile"
                        ? "bg-blue-50/70 text-[#1b7dae] font-bold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    Thông tin tài khoản
                  </button>

                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer ${
                      activeTab === "orders"
                        ? "bg-blue-50/70 text-[#1b7dae] font-bold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Package className="w-4 h-4" />
                    Đơn hàng của bạn ({mockOrders.length})
                  </button>

                  <button
                    onClick={() => setActiveTab("addresses")}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer ${
                      activeTab === "addresses"
                        ? "bg-blue-50/70 text-[#1b7dae] font-bold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    Sổ địa chỉ nhận hàng
                  </button>

                  <Link
                    href="/account/login"
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                  </Link>
                </nav>
              </div>
            </div>

            {/* Main Content Pane */}
            <div className="md:col-span-3">
              {activeTab === "profile" && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-base font-bold text-gray-900">
                      Hồ sơ cá nhân
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Quản lý thông tin hồ sơ để bảo mật tài khoản
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div>
                      <label className="block text-gray-500 mb-1">Họ và tên</label>
                      <input
                        type="text"
                        defaultValue="Nguyễn Văn A"
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-500 mb-1">Số điện thoại</label>
                      <input
                        type="text"
                        defaultValue="0917 123 456"
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-500 mb-1">Email</label>
                      <input
                        type="email"
                        defaultValue="khachhang@bachhoanhungoc.com"
                        disabled
                        className="w-full p-2.5 rounded-xl border border-gray-100 bg-gray-50 text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-500 mb-1">Ngày sinh</label>
                      <input
                        type="date"
                        defaultValue="1995-05-15"
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => alert("Thông tin đã được cập nhật thành công!")}
                      className="px-6 py-2.5 bg-[#1b7dae] text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-[#145d82] transition-colors cursor-pointer shadow-xs"
                    >
                      LƯU THAY ĐỔI
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6">
                  <div className="border-b border-gray-100 pb-4 mb-4 flex justify-between items-center">
                    <div>
                      <h2 className="text-base font-bold text-gray-900">
                        Đơn hàng của bạn
                      </h2>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Theo dõi tình trạng đơn đặt hàng tại Bách Hóa Như Ngọc
                      </p>
                    </div>
                    <Link
                      href="/collections/all"
                      className="text-xs font-semibold text-[#1b7dae] hover:underline flex items-center gap-1"
                    >
                      Mua thêm <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-gray-600 border-b border-gray-100">
                          <th className="p-3">Mã đơn</th>
                          <th className="p-3">Ngày đặt</th>
                          <th className="p-3">Chi tiết hàng</th>
                          <th className="p-3">Tổng tiền</th>
                          <th className="p-3">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {mockOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50/50">
                            <td className="p-3 font-bold text-[#1b7dae]">
                              {order.id}
                            </td>
                            <td className="p-3 text-gray-600">{order.date}</td>
                            <td className="p-3 text-gray-800 line-clamp-1 max-w-[200px]">
                              {order.items}
                            </td>
                            <td className="p-3 font-bold text-gray-900">
                              {order.total}
                            </td>
                            <td className="p-3">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${order.statusColor}`}
                              >
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "addresses" && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 space-y-4">
                  <div className="border-b border-gray-100 pb-4 flex justify-between items-center">
                    <div>
                      <h2 className="text-base font-bold text-gray-900">
                        Sổ địa chỉ nhận hàng
                      </h2>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Địa chỉ dùng để nhận hàng nhanh chóng
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert("Tính năng thêm địa chỉ mới!")}
                      className="px-3.5 py-1.5 bg-[#1b7dae] text-white rounded-lg text-xs font-semibold hover:bg-[#145d82] cursor-pointer"
                    >
                      + Thêm địa chỉ mới
                    </button>
                  </div>

                  <div className="border border-blue-200 bg-blue-50/30 rounded-xl p-4 relative">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-sm text-gray-900">
                        Nguyễn Văn A
                      </span>
                      <span className="text-xs text-gray-500">| 0917 123 456</span>
                      <span className="px-2 py-0.5 bg-blue-100 text-[#1b7dae] text-[10px] font-semibold rounded-md ml-auto">
                        Mặc định
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Ấp Mỹ Phú, Xã Phú Mỹ, Huyện Tân Phước, Tỉnh Tiền Giang
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
        <FloatingWidgets />
        <MobileNav
          isMobileMenuOpen={mobileMenuOpen}
          setIsMobileMenuOpen={setMobileMenuOpen}
        />
      </div>
    </CartProvider>
  );
}
