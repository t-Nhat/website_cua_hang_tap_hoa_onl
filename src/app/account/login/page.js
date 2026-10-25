"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  LogIn,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  UserCheck,
} from "lucide-react";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, demoLogin, isAuthenticated, currentUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      setSuccessMessage(res.message);
      setTimeout(() => {
        router.push("/account");
      }, 900);
    } else {
      setErrorMessage(res.message);
    }
  };

  const handleQuickDemo = (role) => {
    demoLogin(role);
    setSuccessMessage(
      role === "admin"
        ? "Đăng nhập thành công với tài khoản Quản Trị Viên (Admin)!"
        : "Đăng nhập thành công với tài khoản Khách Hàng Thân Thiết (Tuấn)!"
    );
    setTimeout(() => {
      router.push(role === "admin" ? "/admin" : "/account");
    }, 700);
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
            <span className="text-[#1b7dae] font-semibold">Đăng nhập tài khoản</span>
          </div>
        </div>

        <main className="max-w-[1200px] mx-auto px-4 py-12">
          <div className="max-w-md mx-auto bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1b7dae] to-[#0284c7] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                <LogIn className="w-7 h-7" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Đăng Nhập Bách Hóa Như Ngọc
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Theo dõi đơn hàng tạp hóa và tích điểm đổi quà thành viên
              </p>
            </div>

            {/* Quick Demo Login Box */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <div className="flex items-center gap-1.5 font-bold text-xs text-blue-900 mb-2">
                <Sparkles className="w-4 h-4 text-[#1b7dae]" />
                <span>Đăng nhập thử nghiệm nhanh 1 Click:</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo("customer")}
                  className="py-2.5 px-3 rounded-xl bg-white border border-blue-200 hover:border-blue-400 text-[#1b7dae] hover:bg-blue-50 text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5" /> Khách hàng Demo
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo("admin")}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#1b7dae] to-[#0284c7] text-white text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-95"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Admin Quản Trị
                </button>
              </div>
              <p className="text-[10px] text-gray-500 mt-2 text-center">
                Hoặc nhập thông tin email bên dưới để đăng nhập
              </p>
            </div>

            {/* Alerts */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1.5">
                  Địa chỉ Email *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="khachhang@bachhoanhungoc.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5">
                  Mật khẩu *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Mật khẩu (mặc định: 123 hoặc admin)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-[#1b7dae] hover:bg-[#15638c] text-white font-extrabold text-sm rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {isLoading ? "Đang xác thực..." : "ĐĂNG NHẬP NGAY"}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-gray-100 text-center text-xs text-gray-600">
              Chưa có tài khoản Bách Hóa Như Ngọc?{" "}
              <Link href="/account/register" className="font-bold text-[#1b7dae] hover:underline">
                Đăng ký ngay tại đây
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
