"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  UserPlus,
  Lock,
  Mail,
  User,
  Phone,
  Eye,
  EyeOff,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Gift,
} from "lucide-react";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password.length < 6) {
      setErrorMessage("Mật khẩu phải chứa ít nhất 6 ký tự.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không trùng khớp!");
      return;
    }
    if (!agreed) {
      setErrorMessage("Vui lòng đồng ý với Điều khoản dịch vụ & Chính sách của Bách Hóa Như Ngọc.");
      return;
    }

    setIsLoading(true);
    const res = await register({
      name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
      address: address.trim(),
    });
    setIsLoading(false);

    if (res.success) {
      setSuccessMessage(res.message);
      setTimeout(() => {
        router.push("/account");
      }, 1000);
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased pb-14 lg:pb-0 flex flex-col justify-between">
      <div>
        <TopHeader />
        <Header onToggleMobileMenu={() => setMobileMenuOpen(true)} />
        <Navbar />

        {/* Breadcrumb */}
        <div className="bg-white py-3 border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            <Link href="/" className="hover:text-[#1b7dae] transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#1b7dae] font-semibold">Đăng ký tài khoản</span>
          </div>
        </div>

        <main className="max-w-[1200px] mx-auto px-4 py-12">
          <div className="max-w-lg mx-auto bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1b7dae] to-[#0284c7] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                <UserPlus className="w-7 h-7" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Đăng Ký Thành Viên Bách Hóa
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Tạo tài khoản để theo dõi đơn hàng tạp hóa, lưu địa chỉ và tích điểm đổi quà
              </p>
              <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-[#1b7dae] text-xs font-bold rounded-full border border-blue-200">
                <Gift className="w-3.5 h-3.5 text-[#1b7dae]" /> Tặng 50 điểm tích lũy ngay khi đăng ký thành công
              </div>
            </div>

            {/* Alerts */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Họ và tên *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn Tuấn"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Số điện thoại *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="0908123456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                    />
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="tuan.nguyen@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                    />
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Địa chỉ giao hàng mặc định
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="125 Hùng Vương, Phường 2, TP. Mỹ Tho, Tiền Giang"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                  />
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Mật khẩu (ít nhất 6 ký tự) *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                    />
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Xác nhận mật khẩu *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                    />
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="accent-[#1b7dae] cursor-pointer"
                />
                <label htmlFor="agree" className="text-[11px] text-gray-600 cursor-pointer">
                  Tôi đồng ý với{" "}
                  <span className="text-[#1b7dae] font-semibold underline">Điều khoản dịch vụ</span> &{" "}
                  <span className="text-[#1b7dae] font-semibold underline">Chính sách bảo mật</span> của Bách Hóa Như Ngọc
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-[#1b7dae] hover:bg-[#15638c] text-white font-extrabold text-sm rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {isLoading ? "Đang tạo tài khoản..." : "HOÀN TẤT ĐĂNG KÝ"}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-gray-100 text-center text-xs text-gray-600">
              Đã có tài khoản Bách Hóa Như Ngọc?{" "}
              <Link href="/account/login" className="font-bold text-[#1b7dae] hover:underline">
                Đăng nhập tại đây
              </Link>
            </div>
          </div>
        </main>

        <Footer />
        <FloatingWidgets />
        <MobileNav isMobileMenuOpen={mobileMenuOpen} setIsMobileMenuOpen={setMobileMenuOpen} />
      </div>
    </div>
  );
}
