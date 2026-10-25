"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Clock,
  CreditCard,
  QrCode,
  Banknote,
  Copy,
  CheckCircle2,
  Sparkles,
  User,
  Phone,
  MapPin,
  Calendar,
  AlertCircle,
  ShoppingBag,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();
  const { currentUser } = useAuth();
  const { createOrder } = useOrders();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Recipient Info
  const [recipientName, setRecipientName] = useState(currentUser?.name || "Nguyễn Văn Tuấn");
  const [recipientPhone, setRecipientPhone] = useState(currentUser?.phone || "0908123456");
  const [recipientAddress, setRecipientAddress] = useState(
    currentUser?.address || "125 Hùng Vương, Phường 2"
  );
  const [recipientCity, setRecipientCity] = useState("TP. Mỹ Tho, Tiền Giang");

  // Delivery Time Slot
  const [deliveryDate, setDeliveryDate] = useState("Hôm nay");
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState("Giao siêu tốc trong 2H");
  const [orderNote, setOrderNote] = useState("Giao trước 5h chiều, đóng gói cẩn thận tránh vỡ mì.");

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState("vietqr");
  const [copiedSTK, setCopiedSTK] = useState(false);
  const [copiedContent, setCopiedContent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const formatPrice = (p) => new Intl.NumberFormat("vi-VN").format(p) + "₫";

  const isFreeShip = totalPrice >= 200000;
  const shippingFee = isFreeShip ? 0 : 20000;
  const finalTotal = totalPrice + shippingFee;

  // VietQR Bank Info
  const bankAccount = {
    bankName: "MB Bank (Ngân Hàng Quân Đội)",
    accountNumber: "0908123456",
    accountHolder: "BACH HOA NHU NGOC",
    memoPrefix: "TAPHOA",
  };

  const transferMemo = `${bankAccount.memoPrefix} ${recipientPhone.slice(-4) || "8888"}`;
  const vietQrUrl = `https://api.vietqr.io/image/970422-0908123456-compact2.png?amount=${finalTotal}&addInfo=${encodeURIComponent(
    transferMemo
  )}&accountName=BACH%20HOA%20NHU%20NGOC`;

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "stk") {
      setCopiedSTK(true);
      setTimeout(() => setCopiedSTK(false), 2000);
    } else {
      setCopiedContent(true);
      setTimeout(() => setCopiedContent(false), 2000);
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (cart.length === 0) {
      setFormError("Giỏ hàng của bạn đang trống. Vui lòng chọn sản phẩm trước khi đặt hàng!");
      return;
    }

    if (!recipientName.trim() || !recipientPhone.trim() || !recipientAddress.trim()) {
      setFormError("Vui lòng điền đầy đủ tên người nhận, số điện thoại và địa chỉ giao hàng!");
      return;
    }

    setIsSubmitting(true);

    const orderItems = cart.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));

    try {
      const newOrder = await createOrder({
        items: orderItems,
        recipientInfo: {
          senderName: recipientName.trim(),
          senderPhone: recipientPhone.trim(),
          senderEmail: currentUser?.email || "khachhang@bachhoanhungoc.com",
          recipientName: recipientName.trim(),
          recipientPhone: recipientPhone.trim(),
          recipientAddress: recipientAddress.trim(),
          recipientCity: recipientCity.trim(),
          deliveryDate,
          deliveryTimeSlot,
          note: orderNote.trim(),
        },
        paymentMethod,
        paymentStatus: paymentMethod === "vietqr" ? "paid" : "pending",
        subtotal: totalPrice,
        discount: 0,
        shippingFee,
        total: finalTotal,
      });

      clearCart();

      setTimeout(() => {
        setIsSubmitting(false);
        router.push(`/checkout/success?code=${newOrder?.code || "TAPHOA-SUCCESS"}`);
      }, 500);
    } catch (err) {
      setIsSubmitting(false);
      setFormError("Có lỗi xảy ra khi tạo đơn hàng: " + err.message);
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
            <Link href="/" className="hover:text-[#1b7dae]">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/cart" className="hover:text-[#1b7dae]">
              Giỏ hàng
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1b7dae] font-semibold">Đặt hàng & Thanh toán</span>
          </div>
        </div>

        <main className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Thông Tin Giao Hàng & Thanh Toán
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Bách Hóa Như Ngọc cam kết đóng thùng carton cẩn thận và giao tận tay trong 2H
            </p>
          </div>

          {formError && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleOrderSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Delivery & Payment Details */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Recipient Information */}
                <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-4">
                  <h2 className="font-extrabold text-base text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-100">
                    <MapPin className="w-5 h-5 text-[#1b7dae]" />
                    1. Địa Chỉ Nhận Hàng Tạp Hóa
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Họ & Tên người nhận *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Nguyễn Văn Tuấn"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Số điện thoại nhận hàng *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ví dụ: 0908123456"
                        value={recipientPhone}
                        onChange={(e) => setRecipientPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                      />
                    </div>
                  </div>

                  <div className="text-xs space-y-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Địa chỉ chi tiết (Số nhà, tên đường, khu dân cư) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Số 125 Đường Hùng Vương, Phường 2"
                        value={recipientAddress}
                        onChange={(e) => setRecipientAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Tỉnh / Thành Phố
                      </label>
                      <input
                        type="text"
                        value={recipientCity}
                        onChange={(e) => setRecipientCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-hidden focus:border-[#1b7dae]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Delivery Time Slot & Notes */}
                <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-4">
                  <h2 className="font-extrabold text-base text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-100">
                    <Clock className="w-5 h-5 text-[#1b7dae]" />
                    2. Thời Gian Giao & Ghi Chú Đơn Hàng
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Ngày nhận hàng
                      </label>
                      <select
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-hidden focus:border-[#1b7dae] font-semibold"
                      >
                        <option value="Hôm nay">Hôm nay (Giao ngay)</option>
                        <option value="Ngày mai">Ngày mai</option>
                        <option value="Ngày kia">Ngày kia</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">
                        Khung giờ giao hàng
                      </label>
                      <select
                        value={deliveryTimeSlot}
                        onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-hidden focus:border-[#1b7dae] font-semibold"
                      >
                        <option value="Giao siêu tốc trong 2H">⚡ Giao siêu tốc trong 2H</option>
                        <option value="Sáng (08:00 - 11:30)">Sáng (08:00 - 11:30)</option>
                        <option value="Chiều (13:30 - 17:00)">Chiều (13:30 - 17:00)</option>
                        <option value="Tối (17:30 - 20:30)">Tối (17:30 - 20:30)</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="block font-bold text-gray-700 mb-1">
                      Ghi chú thêm cho nhân viên giao hàng
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ví dụ: Gọi trước khi giao 10 phút, gửi bác bảo vệ nếu vắng nhà..."
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                    />
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-4">
                  <h2 className="font-extrabold text-base text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-100">
                    <CreditCard className="w-5 h-5 text-[#1b7dae]" />
                    3. Phương Thức Thanh Toán
                  </h2>

                  <div className="space-y-3">
                    {/* COD Option */}
                    <label
                      className={`flex items-start gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                        paymentMethod === "cod"
                          ? "border-[#1b7dae] bg-blue-50/50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="mt-1 accent-[#1b7dae]"
                      />
                      <div className="flex-1 text-xs">
                        <div className="font-bold text-gray-900 flex items-center gap-1.5 text-sm">
                          <Banknote className="w-4 h-4 text-emerald-600" />
                          Thanh toán khi nhận hàng (COD)
                        </div>
                        <p className="text-gray-500 mt-1 leading-relaxed">
                          Nhận hàng tạp hóa tận nơi, quý khách được đồng kiểm tra hàng trước khi thanh toán tiền mặt cho shipper.
                        </p>
                      </div>
                    </label>

                    {/* VietQR Option */}
                    <label
                      className={`flex items-start gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                        paymentMethod === "vietqr"
                          ? "border-[#1b7dae] bg-blue-50/50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="vietqr"
                        checked={paymentMethod === "vietqr"}
                        onChange={() => setPaymentMethod("vietqr")}
                        className="mt-1 accent-[#1b7dae]"
                      />
                      <div className="flex-1 text-xs">
                        <div className="font-bold text-gray-900 flex items-center gap-1.5 text-sm">
                          <QrCode className="w-4 h-4 text-[#1b7dae]" />
                          Chuyển khoản QR Napas 24/7 (VietQR)
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1b7dae] text-white">
                            Khuyên dùng
                          </span>
                        </div>
                        <p className="text-gray-500 mt-1 leading-relaxed">
                          Mở App ngân hàng bất kỳ để quét mã QR có sẵn số tiền và nội dung chuyển khoản tự động chính xác 100%.
                        </p>

                        {/* VietQR Box Details */}
                        {paymentMethod === "vietqr" && (
                          <div className="mt-4 p-4 rounded-2xl bg-white border border-blue-200 space-y-3">
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                              <div className="w-36 h-36 bg-white p-2 rounded-xl border border-gray-200 shrink-0 shadow-xs flex items-center justify-center">
                                <img
                                  src={vietQrUrl}
                                  alt="VietQR Bách Hóa Như Ngọc"
                                  className="w-full h-full object-contain"
                                />
                              </div>

                              <div className="space-y-1.5 text-xs text-gray-700 flex-1">
                                <div>
                                  Ngân hàng: <strong>{bankAccount.bankName}</strong>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span>Số tài khoản: </span>
                                  <strong className="text-base text-[#1b7dae] font-mono font-black">
                                    {bankAccount.accountNumber}
                                  </strong>
                                  <button
                                    type="button"
                                    onClick={() => copyToClipboard(bankAccount.accountNumber, "stk")}
                                    className="p-1 text-gray-400 hover:text-gray-700 cursor-pointer"
                                    title="Copy STK"
                                  >
                                    <Copy className="w-3.5 h-3.5" />
                                  </button>
                                  {copiedSTK && (
                                    <span className="text-[10px] text-emerald-600 font-bold">
                                      Đã sao chép!
                                    </span>
                                  )}
                                </div>
                                <div>
                                  Chủ tài khoản: <strong>{bankAccount.accountHolder}</strong>
                                </div>
                                <div>
                                  Số tiền: <strong className="text-base text-[#df4c00]">{formatPrice(finalTotal)}</strong>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span>Nội dung: </span>
                                  <span className="px-2 py-0.5 rounded-md bg-gray-100 font-mono font-bold text-gray-800">
                                    {transferMemo}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => copyToClipboard(transferMemo, "memo")}
                                    className="p-1 text-gray-400 hover:text-gray-700 cursor-pointer"
                                  >
                                    <Copy className="w-3.5 h-3.5" />
                                  </button>
                                  {copiedContent && (
                                    <span className="text-[10px] text-emerald-600 font-bold">
                                      Đã copy!
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </label>

                    {/* MoMo Option */}
                    <label
                      className={`flex items-start gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                        paymentMethod === "momo"
                          ? "border-[#1b7dae] bg-blue-50/50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="momo"
                        checked={paymentMethod === "momo"}
                        onChange={() => setPaymentMethod("momo")}
                        className="mt-1 accent-[#1b7dae]"
                      />
                      <div className="flex-1 text-xs">
                        <div className="font-bold text-gray-900 flex items-center gap-1.5 text-sm">
                          <span className="text-pink-600 font-bold">Ví MoMo</span>
                        </div>
                        <p className="text-gray-500 mt-1">
                          Thanh toán nhanh qua ví điện tử MoMo số: <strong>0908.123.456</strong>
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Items Summary */}
              <div className="lg:col-span-5 space-y-5">
                <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-4">
                  <h3 className="font-bold text-base text-gray-900 pb-2 border-b border-gray-100 flex items-center justify-between">
                    <span>Đơn Hàng ({cart.length} món)</span>
                    <Link href="/cart" className="text-xs font-semibold text-[#1b7dae] hover:underline">
                      Chỉnh sửa
                    </Link>
                  </h3>

                  {/* Cart Items Preview */}
                  <div className="max-h-64 overflow-y-auto space-y-3 pr-1 divide-y divide-gray-100 text-xs">
                    {cart.map((item) => (
                      <div key={item.product.id} className="pt-2 flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 object-contain rounded-lg border border-gray-200 shrink-0 p-0.5 bg-gray-50"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <div className="text-[11px] text-gray-400">
                            {item.product.unit ? `ĐVT: ${item.product.unit}` : ""} • SL: x{item.quantity}
                          </div>
                        </div>
                        <div className="font-bold text-gray-900 text-right">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="border-t border-gray-100 pt-3 space-y-2 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Tạm tính tiền hàng:</span>
                      <span className="font-bold text-gray-800">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phí giao hàng:</span>
                      <span>
                        {isFreeShip ? (
                          <span className="text-emerald-600 font-bold">Miễn phí giao hàng</span>
                        ) : (
                          <span className="font-semibold text-gray-800">{formatPrice(shippingFee)}</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Final Total */}
                  <div className="border-t border-gray-100 pt-3 flex items-baseline justify-between">
                    <span className="font-bold text-sm text-gray-900">Tổng thanh toán:</span>
                    <span className="text-xl sm:text-2xl font-black text-[#df4c00]">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-4 bg-[#1b7dae] hover:bg-[#15638c] text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Đang tiếp nhận đơn hàng...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        XÁC NHẬN ĐẶT HÀNG TẠP HÓA
                      </>
                    )}
                  </button>

                  <div className="text-[11px] text-gray-400 text-center leading-relaxed">
                    Bằng việc nhấn đặt hàng, bạn đồng ý với các chính sách mua sắm và giao nhận của Bách Hóa Như Ngọc.
                  </div>
                </div>

                {/* Assurance Card */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2 text-xs text-gray-600">
                  <div className="font-bold text-[#1b7dae] flex items-center gap-1.5">
                    <Truck className="w-4 h-4" /> Cam kết giao hàng đúng hẹn
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Đơn hàng sẽ được nhân viên kho soạn đúng hàng, kiểm tra hạn sử dụng và đóng gói chống sốc trước khi bàn giao cho shipper.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </main>

        <Footer />
        <FloatingWidgets />
        <MobileNav isMobileMenuOpen={mobileMenuOpen} setIsMobileMenuOpen={setMobileMenuOpen} />
      </div>
    </div>
  );
}
