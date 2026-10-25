"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  Phone,
  AlertCircle,
  ChevronRight,
  RefreshCw,
  Box,
  CheckSquare,
} from "lucide-react";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";
import { useOrders } from "@/context/OrderContext";

function OrderTrackingContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("code") || "";
  const initialPhone = searchParams.get("phone") || "";

  const { orders, trackOrder, updateOrderStatus } = useOrders();

  const [searchCode, setSearchCode] = useState(initialCode);
  const [searchPhone, setSearchPhone] = useState(initialPhone);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    async function loadInitial() {
      if (initialCode) {
        const found = trackOrder(initialCode, initialPhone);
        if (found) {
          setCurrentOrder(found);
        } else {
          // Query directly from MongoDB API
          try {
            const res = await fetch(`/api/orders?code=${encodeURIComponent(initialCode)}`);
            if (res.ok) {
              const json = await res.json();
              if (json.data && json.data.length > 0) {
                setCurrentOrder(json.data[0]);
              } else if (orders.length > 0) {
                setCurrentOrder(orders[0]);
              }
            } else if (orders.length > 0) {
              setCurrentOrder(orders[0]);
            }
          } catch (e) {
            if (orders.length > 0) setCurrentOrder(orders[0]);
          }
        }
        setSearched(true);
      } else if (orders.length > 0 && !currentOrder) {
        setCurrentOrder(orders[0]);
      }
    }
    loadInitial();
  }, [initialCode, initialPhone, orders]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    // 1. Search in local state first
    const found = trackOrder(searchCode, searchPhone);
    if (found) {
      setCurrentOrder(found);
      setSearched(true);
      return;
    }

    // 2. Query live from MongoDB Atlas API
    try {
      const queryParams = new URLSearchParams({ code: searchCode.trim() });
      if (searchPhone.trim()) queryParams.set("phone", searchPhone.trim());
      const res = await fetch(`/api/orders?${queryParams.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setCurrentOrder(json.data[0]);
          setSearched(true);
          return;
        }
      }
    } catch (e) {
      console.warn("Live order query error:", e);
    }

    setCurrentOrder(null);
    setSearched(true);
  };

  const handleSelectSample = (ord) => {
    setSearchCode(ord.code);
    setSearchPhone(ord.recipientInfo?.recipientPhone || "");
    setCurrentOrder(ord);
    setSearched(true);
  };

  // Demo simulator to advance status
  const handleAdvanceStatus = () => {
    if (!currentOrder) return;
    const stages = ["pending", "preparing", "photo_sent", "delivering", "completed"];
    const currentIdx = stages.indexOf(currentOrder.orderStatus);
    const nextIdx = (currentIdx + 1) % stages.length;
    const nextStatus = stages[nextIdx];
    updateOrderStatus(currentOrder.id, nextStatus);

    const updated = orders.find((o) => o.id === currentOrder.id);
    if (updated) {
      setCurrentOrder({ ...updated });
    } else {
      setCurrentOrder({
        ...currentOrder,
        orderStatus: nextStatus,
      });
    }
  };

  const formatPrice = (p) => new Intl.NumberFormat("vi-VN").format(p) + "₫";

  const getStepIcon = (status, isCompleted, isCurrent) => {
    if (isCompleted) {
      return <CheckCircle2 className="w-5 h-5 text-white" />;
    }
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-white" />;
      case "preparing":
        return <Box className="w-4 h-4 text-white" />;
      case "photo_sent":
        return <Package className="w-4 h-4 text-white" />;
      case "delivering":
        return <Truck className="w-4 h-4 text-white" />;
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-white" />;
      default:
        return <Package className="w-4 h-4 text-white" />;
    }
  };

  return (
    <main className="max-w-[1100px] mx-auto px-4 py-8">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8 text-center space-y-3">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center justify-center gap-2">
          📦 Tra Cứu & Theo Dõi Tiến Độ Đơn Hàng Tạp Hóa
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Nhập mã đơn hàng hoặc số điện thoại để xem trực tiếp các khâu soạn hàng, đóng thùng và giao hàng
        </p>
      </div>

      {/* Search Box */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-md p-6 max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Mã đơn hàng (VD: TAPHOA-1082) *
              </label>
              <input
                type="text"
                required
                placeholder="Nhập mã đơn hàng..."
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae] font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Số điện thoại người nhận (tùy chọn)
              </label>
              <input
                type="tel"
                placeholder="Ví dụ: 0908123456"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#1b7dae] hover:bg-[#15638c] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" /> Tra Cứu Tiến Độ Đơn Hàng
          </button>
        </form>

        {/* Demo order chips */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-gray-500 font-medium">Đơn mẫu thử nghiệm:</span>
          {orders.slice(0, 3).map((ord) => (
            <button
              key={ord.id}
              type="button"
              onClick={() => handleSelectSample(ord)}
              className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#1b7dae] border border-blue-200 font-mono font-bold text-[11px] hover:bg-[#1b7dae] hover:text-white transition-colors cursor-pointer"
            >
              #{ord.code} ({ord.orderStatus})
            </button>
          ))}
        </div>
      </div>

      {/* Result Section */}
      {currentOrder ? (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Order Header Card */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 font-mono">
                  Đơn Hàng #{currentOrder.code}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    currentOrder.orderStatus === "completed"
                      ? "bg-emerald-100 text-emerald-800"
                      : currentOrder.orderStatus === "delivering"
                      ? "bg-blue-100 text-[#1b7dae] animate-pulse"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {currentOrder.orderStatus === "pending" && "Tiếp nhận đơn"}
                  {currentOrder.orderStatus === "preparing" && "Kho đang soạn hàng"}
                  {currentOrder.orderStatus === "photo_sent" && "Đã xuất kho"}
                  {currentOrder.orderStatus === "delivering" && "Đang giao hàng"}
                  {currentOrder.orderStatus === "completed" && "Giao thành công"}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Thời gian đặt: {new Date(currentOrder.createdAt).toLocaleString("vi-VN")} • Phương thức:{" "}
                <strong className="uppercase">
                  {currentOrder.paymentMethod === "vietqr" ? "VietQR Chuyển khoản" : "Tiền mặt COD"}
                </strong>
              </p>
            </div>

            {/* Advance Status Demo Tool */}
            <button
              type="button"
              onClick={handleAdvanceStatus}
              className="self-start md:self-auto px-4 py-2 rounded-xl bg-gray-100 hover:bg-[#1b7dae] hover:text-white text-gray-700 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-gray-200"
              title="Chuyển bước tiến trình tiếp theo để kiểm tra"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Thử nghiệm: Chuyển bước kế tiếp
            </button>
          </div>

          {/* 5-Step Progress Timeline */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
            <h3 className="font-extrabold text-base text-gray-900 mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#1b7dae]" />
              Tiến Trình Đóng Gói & Giao Hàng Tạp Hóa
            </h3>

            <div className="relative">
              {/* Stepper bar desktop */}
              <div className="space-y-6 sm:space-y-8 relative before:absolute before:inset-0 before:left-5 sm:before:left-6 before:w-0.5 before:bg-gray-200 before:z-0">
                {currentOrder.statusHistory?.map((step, idx) => {
                  const isDone = step.completed;
                  const isCurrent = step.current;

                  return (
                    <div key={idx} className="relative z-10 flex items-start gap-4 sm:gap-6">
                      {/* Step Circle */}
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 shadow-md transition-all ${
                          isDone
                            ? "bg-emerald-600 ring-4 ring-emerald-100"
                            : isCurrent
                            ? "bg-[#1b7dae] ring-4 ring-blue-100 animate-pulse"
                            : "bg-gray-300 ring-4 ring-gray-100"
                        }`}
                      >
                        {getStepIcon(step.status, isDone, isCurrent)}
                      </div>

                      {/* Step Details */}
                      <div
                        className={`flex-1 p-4 rounded-2xl border transition-all ${
                          isCurrent
                            ? "bg-blue-50/70 border-blue-200 shadow-xs"
                            : isDone
                            ? "bg-gray-50 border-gray-100"
                            : "bg-white border-gray-100 opacity-60"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <h4
                            className={`font-bold text-xs sm:text-sm ${
                              isCurrent ? "text-[#1b7dae]" : "text-gray-900"
                            }`}
                          >
                            {step.title}
                          </h4>
                          <span className="text-[11px] font-semibold text-gray-400">
                            {step.time}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Details & Items Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Recipient Card */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-gray-900 pb-2 border-b border-gray-100 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#1b7dae]" /> Thông Tin Nhận Hàng
              </h3>

              <div className="space-y-3 text-xs text-gray-700">
                <div>
                  <span className="text-gray-400 block">Người nhận hàng:</span>
                  <strong className="text-gray-900 text-sm">
                    {currentOrder.recipientInfo?.recipientName}
                  </strong>
                </div>

                <div>
                  <span className="text-gray-400 block">Số điện thoại:</span>
                  <strong className="text-gray-900 font-mono text-sm">
                    {currentOrder.recipientInfo?.recipientPhone}
                  </strong>
                </div>

                <div>
                  <span className="text-gray-400 block">Địa chỉ giao hàng:</span>
                  <span className="font-semibold text-gray-900 leading-relaxed">
                    {currentOrder.recipientInfo?.recipientAddress},{" "}
                    {currentOrder.recipientInfo?.recipientCity}
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 block">Khung giờ giao hẹn trước:</span>
                  <strong className="text-[#1b7dae]">
                    {currentOrder.recipientInfo?.deliveryTimeSlot} - {currentOrder.recipientInfo?.deliveryDate}
                  </strong>
                </div>

                {currentOrder.recipientInfo?.note && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <span className="text-amber-800 font-bold block mb-0.5">Ghi chú giao:</span>
                    <span className="text-amber-900 italic">
                      &quot;{currentOrder.recipientInfo?.note}&quot;
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Items Breakdown Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-gray-900 pb-2 border-b border-gray-100 flex items-center justify-between">
                <span>Danh Sách Mặt Hàng Tạp Hóa ({currentOrder.items?.length || 0})</span>
                <span className="text-xs text-emerald-600 font-bold">Date mới 100%</span>
              </h3>

              <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto pr-1">
                {currentOrder.items?.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center gap-3.5 text-xs">
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="w-14 h-14 object-contain rounded-xl border border-gray-200 p-1 shrink-0 bg-gray-50"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 line-clamp-1">
                        {item.product?.name}
                      </h4>
                      <div className="text-[11px] text-gray-500">
                        {item.product?.unit ? `ĐVT: ${item.product.unit}` : ""} • SL: x{item.quantity}
                      </div>
                      <div className="font-bold text-[#df4c00] mt-0.5">
                        {formatPrice(item.product?.price || 0)}
                      </div>
                    </div>
                    <div className="font-extrabold text-gray-900 text-sm">
                      {formatPrice((item.product?.price || 0) * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="border-t border-gray-100 pt-3 space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Tiền hàng:</span>
                  <span className="font-semibold">{formatPrice(currentOrder.subtotal || currentOrder.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span className="font-semibold">
                    {currentOrder.shippingFee ? formatPrice(currentOrder.shippingFee) : "Miễn phí"}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-gray-900 pt-2 border-t border-gray-100">
                  <span>Tổng thanh toán:</span>
                  <span className="text-base text-[#df4c00]">
                    {formatPrice(currentOrder.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : searched ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-lg mx-auto shadow-sm space-y-4">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto" />
          <h3 className="font-bold text-lg text-gray-900">
            Không tìm thấy thông tin đơn hàng #{searchCode}
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Vui lòng kiểm tra lại mã đơn hàng hoặc số điện thoại người nhận. Nếu bạn vừa đặt hàng, hệ thống có thể mất vài phút để cập nhật.
          </p>
          <div className="pt-2">
            <a
              href="tel:0908123456"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1b7dae] text-white font-bold text-xs"
            >
              <Phone className="w-4 h-4" /> Gọi hotline 0908.123.456 hỗ trợ
            </a>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default function OrderTrackingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased pb-14 lg:pb-0 flex flex-col justify-between">
      <div>
        <TopHeader />
        <Header onToggleMobileMenu={() => setMobileMenuOpen(true)} />
        <Navbar />

        {/* Breadcrumb */}
        <div className="bg-white py-3 border-b border-gray-100 shadow-2xs">
          <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            <Link href="/" className="hover:text-[#1b7dae]">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1b7dae] font-semibold">Theo dõi đơn hàng tạp hóa</span>
          </div>
        </div>

        <Suspense fallback={<div className="text-center py-20 text-gray-500 text-sm">Đang tải thông tin đơn hàng...</div>}>
          <OrderTrackingContent />
        </Suspense>

        <Footer />
        <FloatingWidgets />
        <MobileNav isMobileMenuOpen={mobileMenuOpen} setIsMobileMenuOpen={setMobileMenuOpen} />
      </div>
    </div>
  );
}
