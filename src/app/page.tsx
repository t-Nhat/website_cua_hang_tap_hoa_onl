"use client";

import React, { useState } from "react";
import { CartProvider } from "@/context/CartContext";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { HeroSlider } from "@/components/bachhoanhungoc/HeroSlider";
import { FlashSaleSection } from "@/components/bachhoanhungoc/FlashSaleSection";
import { CategoryBlocks } from "@/components/bachhoanhungoc/CategoryBlocks";
import { FeaturedBrands } from "@/components/bachhoanhungoc/FeaturedBrands";
import { ProductTabsSection } from "@/components/bachhoanhungoc/ProductTabsSection";
import { FeaturePromoBanners } from "@/components/bachhoanhungoc/FeaturePromoBanners";
import { NoodleSection } from "@/components/bachhoanhungoc/NoodleSection";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-white text-[#141414] font-sans antialiased selection:bg-[#1b7dae] selection:text-white pb-14 lg:pb-0">
        {/* Top Header Bar */}
        <TopHeader />

        {/* Main Header */}
        <Header onToggleMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Navigation Bar with Mega Menu */}
        <Navbar />

        {/* Main Body Sections */}
        <main>
          {/* Section 1: Hero Banner Slider */}
          <HeroSlider />

          {/* Section 2: Flash Sale Săn Sale đón lễ */}
          <FlashSaleSection />

          {/* Section 3: 4 Themed Category Cards */}
          <CategoryBlocks />

          {/* Section 4: Thương hiệu nổi bật */}
          <FeaturedBrands />

          {/* Section 5: Tất cả sản phẩm with Category Tabs */}
          <ProductTabsSection />

          {/* Section 6: Twin Promotional Banners */}
          <FeaturePromoBanners />

          {/* Section 7: Mì, cháo, phở, bún ăn liền */}
          <NoodleSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Contact Buttons and Slide-in Cart Drawer */}
        <FloatingWidgets />

        {/* Mobile Sticky Nav & Drawer */}
        <MobileNav
          isMobileMenuOpen={mobileMenuOpen}
          setIsMobileMenuOpen={setMobileMenuOpen}
        />
      </div>
    </CartProvider>
  );
}
