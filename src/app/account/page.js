"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  User,
  Package,
  MapPin,
  LogOut,
  ShoppingBag,
  Clock,
  ArrowRight,
  LayoutDashboard,
  Box,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";

export default function AccountPage() {
  const router = useRouter();
  const { currentUser, isAuthenticated, isAdmin, updateProfile, logout } = useAuth();
  const { orders } = useOrders();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");

  // Profile edit state
  const [editName, setEditName] = useState(currentUser?.name || "Nguyễn Văn Tuấn");
  const [editPhone, setEditPhone] = useState(currentUser?.phone || "0908123456");
  const [editAddress, setEditAddress] = useState(currentUser?.address || "125 Hùng Vương, Phường 2, TP. Mỹ Tho, Tiền Giang");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const formatPrice = (p) => new Intl.NumberFormat("vi-VN").format(p) + "₫";

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            Tiếp nhận đơn
          </span>
        );
      case "preparing":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#1b7dae] border border-blue-200">
            Kho đang soạn hàng
          </span>
        );
      case "photo_sent":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            Đã đóng thùng xuất kho
          </span>
        );
      case "delivering":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            Shipper đang giao hàng
          </span>
        );
      case "completed":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Giao thành công
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased pb-14 lg:pb-0 flex flex-col justify-between">
      <div>
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
            <span className="text-[#1b7dae] font-semibold">Tài khoản khách hàng</span>
          </div>
        </div>

        <main className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">
              Quản Lý Tài Khoản Khách Hàng
            </h1>
            {isAdmin && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#1b7dae] hover:bg-[#15638c] text-white rounded-xl text-xs font-bold shadow-md transition-all self-start sm:self-auto"
              >
                <LayoutDashboard className="w-4 h-4" />
                Đến Trang Quản Trị Admin
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1 space-y-4">
              <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-xs text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#1b7dae] to-[#0284c7] text-white flex items-center justify-center mx-auto mb-3 font-bold text-2xl shadow-md">
                  {currentUser?.name ? currentUser.name.slice(0, 2).toUpperCase() : "KH"}
                </div>
                <h3 className="font-bold text-gray-900 text-sm">
                  {currentUser?.name || "Nguyễn Văn Tuấn"}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {currentUser?.email || "khachhang@bachhoanhungoc.com"}
                </p>
                <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 text-[11px] font-bold rounded-full border border-amber-200">
                  ★ {currentUser?.memberLevel || "Thành viên Thân Thiết"} ({currentUser?.points || 450} điểm)
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
                <nav className="divide-y divide-gray-100 text-xs sm:text-sm font-medium">
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer ${
                      activeTab === "orders"
                        ? "bg-blue-50 text-[#1b7dae] font-bold border-l-4 border-[#1b7dae]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Package className="w-4 h-4" />
                    <span>Lịch sử đơn hàng</span>
                    <span className="ml-auto bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
                      {orders.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer ${
                      activeTab === "profile"
                        ? "bg-blue-50 text-[#1b7dae] font-bold border-l-4 border-[#1b7dae]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Thông tin cá nhân</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("addresses")}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer ${
                      activeTab === "addresses"
                        ? "bg-blue-50 text-[#1b7dae] font-bold border-l-4 border-[#1b7dae]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Địa chỉ giao hàng</span>
                  </button>

                  <Link
                    href="/order-tracking"
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Tra cứu đơn trực tiếp</span>
                  </Link>

                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-[#1b7dae] bg-blue-50/50 hover:bg-blue-50 font-bold transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#1b7dae]" />
                      <span>Trang Quản Trị Bách Hóa</span>
                    </Link>
                  )}

                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Đăng xuất</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="md:col-span-3">
              {activeTab === "orders" && (
                <div className="space-y-4">
                  <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                      <div>
                        <h2 className="text-base font-bold text-gray-900">
                          Danh Sách Đơn Hàng Tạp Hóa Của Bạn
                        </h2>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Xem tiến trình soạn hàng, đóng thùng và giao hàng siêu tốc
                        </p>
                      </div>
                      <Link
                        href="/order-tracking"
                        className="text-xs font-bold text-[#1b7dae] hover:underline flex items-center gap-1"
                      >
                        Tra cứu mã đơn <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {orders.length === 0 ? (
                      <div className="text-center py-12">
                        <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">Bạn chưa có đơn đặt hàng nào.</p>
                        <Link
                          href="/collections/all"
                          className="mt-4 inline-block px-5 py-2.5 bg-[#1b7dae] text-white font-bold text-xs rounded-xl hover:bg-[#15638c]"
                        >
                          Mua sắm hàng tạp hóa ngay
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((ord) => (
                          <div
                            key={ord.id}
                            className="p-4 sm:p-5 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all bg-white hover:shadow-md"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100 text-xs">
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-sm text-gray-900 font-mono">
                                  #{ord.code}
                                </span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-500">
                                  {new Date(ord.createdAt).toLocaleDateString("vi-VN")}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusBadge(ord.orderStatus)}
                                <span
                                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                                    ord.paymentStatus === "paid"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-700"
                                  }`}
                                >
                                  {ord.paymentStatus === "paid" ? "Đã thanh toán" : "Thanh toán COD"}
                                </span>
                              </div>
                            </div>

                            {/* Items List */}
                            <div className="py-3 space-y-2">
                              {ord.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-xs">
                                  <img
                                    src={item.product?.image}
                                    alt={item.product?.name}
                                    className="w-12 h-12 rounded-lg object-contain border border-gray-200 p-0.5 bg-gray-50"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className="font-bold text-gray-800 truncate">
                                      {item.product?.name}
                                    </div>
                                    <div className="text-gray-400 text-[11px]">
                                      {item.product?.unit ? `ĐVT: ${item.product.unit}` : ""} • SL: x{item.quantity}
                                    </div>
                                  </div>
                                  <div className="font-bold text-gray-900">
                                    {formatPrice((item.product?.price || 0) * item.quantity)}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Recipient info & total */}
                            <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                              <div className="text-gray-600">
                                <span className="text-gray-400">Giao đến:</span>{" "}
                                <strong>{ord.recipientInfo?.recipientName}</strong> (
                                {ord.recipientInfo?.recipientPhone}) - {ord.recipientInfo?.deliveryTimeSlot}
                              </div>
                              <div className="flex items-center justify-between sm:justify-end gap-3">
                                <div>
                                  <span className="text-gray-400">Tổng: </span>
                                  <strong className="text-sm font-black text-[#df4c00]">
                                    {formatPrice(ord.total)}
                                  </strong>
                                </div>
                                <Link
                                  href={`/order-tracking?code=${ord.code}&phone=${ord.recipientInfo?.recipientPhone}`}
                                  className="px-3.5 py-1.5 bg-blue-50 text-[#1b7dae] hover:bg-[#1b7dae] hover:text-white rounded-xl font-bold transition-all"
                                >
                                  Theo dõi tiến độ
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "profile" && (
                <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-6">
                  <div>
                    <h2 className="text-base font-bold text-gray-900">
                      Thông Tin Cá Nhân Khách Hàng
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Cập nhật thông tin liên hệ và tài khoản lưu trữ trên MongoDB Atlas
                    </p>
                  </div>

                  {saveMessage && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>{saveMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Họ và tên *</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Email đăng nhập (Cố định)</label>
                      <input
                        type="email"
                        disabled
                        value={currentUser?.email || "khachhang@bachhoanhungoc.com"}
                        className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Số điện thoại *</label>
                      <input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Hạng thành viên & Điểm</label>
                      <input
                        type="text"
                        disabled
                        value={`${currentUser?.memberLevel || "Thành viên Thân Thiết"} (${currentUser?.points || 450} điểm)`}
                        className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-gray-700 mb-1">Địa chỉ nhận hàng mặc định</label>
                      <input
                        type="text"
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isSavingProfile}
                    onClick={async () => {
                      setIsSavingProfile(true);
                      setSaveMessage("");
                      const res = await updateProfile({
                        name: editName,
                        phone: editPhone,
                        address: editAddress,
                      });
                      setIsSavingProfile(false);
                      setSaveMessage(res.message || "Đã lưu cập nhật vào database thành công!");
                      setTimeout(() => setSaveMessage(""), 4000);
                    }}
                    className="px-5 py-2.5 bg-[#1b7dae] text-white font-bold text-xs rounded-xl hover:bg-[#15638c] cursor-pointer disabled:opacity-50 transition-all shadow-sm"
                  >
                    {isSavingProfile ? "Đang lưu vào Database..." : "Lưu Thay Đổi Thông Tin"}
                  </button>
                </div>
              )}

              {activeTab === "addresses" && (
                <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div>
                      <h2 className="text-base font-bold text-gray-900">
                        Sổ Địa Chỉ Giao Hàng Tạp Hóa
                      </h2>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Lưu sẵn địa chỉ giao hàng để đặt hàng nhanh chóng trên hệ thống
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/30 text-xs space-y-2">
                    <div className="flex items-center gap-2">
                      <strong className="text-gray-900">{currentUser?.name || editName}</strong>
                      <span className="text-gray-400">|</span>
                      <span className="text-gray-600">{currentUser?.phone || editPhone}</span>
                      <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1b7dae] text-white">
                        Mặc định
                      </span>
                    </div>
                    <p className="text-gray-700">
                      {currentUser?.address || editAddress}
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab("profile")}
                        className="text-[#1b7dae] font-bold text-xs hover:underline"
                      >
                        Chỉnh sửa địa chỉ này
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
      <FloatingWidgets />
      <MobileNav isMobileMenuOpen={mobileMenuOpen} setIsMobileMenuOpen={setMobileMenuOpen} />
    </div>
  );
}
