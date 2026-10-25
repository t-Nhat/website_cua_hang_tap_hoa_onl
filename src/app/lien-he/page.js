"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { CartProvider } from "@/context/CartContext";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";
export default function LienHePage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setForm({ name: "", email: "", phone: "", message: "" });
        }, 4000);
    };
    return (<CartProvider>
      <div className="min-h-screen bg-white text-[#141414] font-sans antialiased pb-14 lg:pb-0">
        <TopHeader />
        <Header onToggleMobileMenu={() => setMobileMenuOpen(true)}/>
        <Navbar />

        {/* Breadcrumb */}
        <div className="bg-[#f7f8fa] py-3 border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            <Link href="/" className="hover:text-[#1b7dae] transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5"/>
            <span className="text-[#1b7dae] font-semibold">Liên hệ</span>
          </div>
        </div>

        <main className="max-w-[1200px] mx-auto px-4 py-8 md:py-10">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#212b36]">
              Liên hệ với chúng tôi
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Bách Hóa Tổng Hợp Như Ngọc luôn sẵn sàng lắng nghe và phục vụ quý khách
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Information & Form */}
            <div className="lg:col-span-5 space-y-6">
              {/* Info Cards */}
              <div className="bg-[#fbfcfd] p-6 rounded-2xl border border-gray-100 space-y-4">
                <h3 className="font-bold text-lg text-gray-900 border-b border-gray-200 pb-2">
                  Thông tin liên hệ
                </h3>
                <div className="space-y-3.5 text-xs sm:text-sm text-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1b7dae] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4"/>
                    </div>
                    <div>
                      <strong>Địa chỉ:</strong>
                      <p className="text-gray-600 mt-0.5">
                        5/4C Lê Thị Hồng Gấm, Phường 6, TP. Mỹ Tho, Tiền Giang
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1b7dae] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4"/>
                    </div>
                    <div>
                      <strong>Hotline tư vấn:</strong>
                      <p className="mt-0.5">
                        <a href="tel:02733867999" className="font-bold text-[#1b7dae] hover:underline">
                          02733867999
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1b7dae] flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4"/>
                    </div>
                    <div>
                      <strong>Email:</strong>
                      <p className="mt-0.5">
                        <a href="mailto:bhnhungoctg@gmail.com" className="text-gray-600 hover:text-[#1b7dae]">
                          bhnhungoctg@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1b7dae] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4"/>
                    </div>
                    <div>
                      <strong>Giờ làm việc:</strong>
                      <p className="text-gray-600 mt-0.5">
                        7:30 - 18:00 (Từ Thứ 2 đến Chủ nhật, kể cả ngày Lễ)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  Gửi tin nhắn cho Như Ngọc
                </h3>

                {submitted ? (<div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-2.5 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0"/>
                    <span>
                      Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công. Chúng tôi sẽ phản hồi sớm nhất có thể.
                    </span>
                  </div>) : (<form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Họ và tên *
                      </label>
                      <input type="text" required placeholder="Nhập họ và tên của bạn" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae] bg-gray-50/40 text-gray-800"/>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-gray-700 mb-1">
                          Số điện thoại *
                        </label>
                        <input type="tel" required placeholder="Số điện thoại" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae] bg-gray-50/40 text-gray-800"/>
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input type="email" placeholder="Địa chỉ Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae] bg-gray-50/40 text-gray-800"/>
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-1">
                        Nội dung liên hệ *
                      </label>
                      <textarea required rows={4} placeholder="Nội dung cần hỗ trợ, tư vấn hoặc đặt hàng sỉ..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae] bg-gray-50/40 text-gray-800"/>
                    </div>

                    <button type="submit" className="w-full py-3 bg-[#1b7dae] hover:bg-[#145d82] text-white font-bold rounded-xl text-sm transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer">
                      <Send className="w-4 h-4"/>
                      <span>GỬI YÊU CẦU</span>
                    </button>
                  </form>)}
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden h-[540px]">
              <iframe title="Bản đồ Bách Hóa Tổng Hợp Như Ngọc" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7849.737248227801!2d106.3441248735846!3d10.352388224650374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310aaff4d89d240b%3A0x7232dfc6b97a94e8!2zQ8O0bmcgVHkgVG5oaCBCw6FjaCBIw7NhIFThu5VuZyBI4bujcCBOaMawIE5n4buNYw!5e0!3m2!1svi!2s!4v1666319315882!5m2!1svi!2s" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
            </div>
          </div>
        </main>

        <Footer />
        <FloatingWidgets />
        <MobileNav isMobileMenuOpen={mobileMenuOpen} setIsMobileMenuOpen={setMobileMenuOpen}/>
      </div>
    </CartProvider>);
}
