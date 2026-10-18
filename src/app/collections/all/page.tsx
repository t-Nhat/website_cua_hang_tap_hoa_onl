"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, ShoppingCart, Filter, ArrowUpDown } from "lucide-react";
import { CartProvider, useCart } from "@/context/CartContext";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";
import { CATALOG_PRODUCTS, MEGA_MENU_CATEGORIES, Product } from "@/data/mockData";

export default function CollectionsAllPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <CartProvider>
      <CollectionsAllContent
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </CartProvider>
  );
}

function CollectionsAllContent({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
      .format(price)
      .replace("₫", "")
      .trim() + "₫";

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...CATALOG_PRODUCTS];

    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (priceRange === "under-50k") {
      list = list.filter((p) => p.price < 50000);
    } else if (priceRange === "50k-100k") {
      list = list.filter((p) => p.price >= 50000 && p.price <= 100000);
    } else if (priceRange === "100k-200k") {
      list = list.filter((p) => p.price >= 100000 && p.price <= 200000);
    } else if (priceRange === "over-200k") {
      list = list.filter((p) => p.price > 200000);
    }

    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      list.sort((a, b) => b.name.localeCompare(a.name));
    }

    return list;
  }, [selectedCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-white text-[#141414] font-sans antialiased pb-14 lg:pb-0">
      <TopHeader />
      <Header onToggleMobileMenu={() => setMobileMenuOpen(true)} />
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-[#f7f8fa] py-3 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <Link href="/" className="hover:text-[#1b7dae] transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#1b7dae] font-semibold">Tất cả sản phẩm</span>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-6 bg-[#fbfcfd] p-5 rounded-2xl border border-gray-100">
            <div>
              <h3 className="font-bold text-base text-[#212b36] mb-3 pb-2 border-b border-gray-200 flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#1b7dae]" />
                Danh mục sản phẩm
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm">
                <li>
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
                      selectedCategory === "all"
                        ? "bg-[#1b7dae] text-white font-semibold"
                        : "text-gray-700 hover:text-[#1b7dae] hover:bg-gray-100"
                    }`}
                  >
                    Tất cả danh mục
                  </button>
                </li>
                {MEGA_MENU_CATEGORIES.map((cat, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => setSelectedCategory(cat.title)}
                      className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
                        selectedCategory === cat.title
                          ? "bg-[#1b7dae] text-white font-semibold"
                          : "text-gray-700 hover:text-[#1b7dae] hover:bg-gray-100"
                      }`}
                    >
                      {cat.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-bold text-base text-[#212b36] mb-3 pb-2 border-b border-gray-200">
                Khoảng giá
              </h3>
              <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === "all"}
                    onChange={() => setPriceRange("all")}
                    className="accent-[#1b7dae]"
                  />
                  <span>Tất cả mức giá</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === "under-50k"}
                    onChange={() => setPriceRange("under-50k")}
                    className="accent-[#1b7dae]"
                  />
                  <span>Dưới 50.000₫</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === "50k-100k"}
                    onChange={() => setPriceRange("50k-100k")}
                    className="accent-[#1b7dae]"
                  />
                  <span>50.000₫ - 100.000₫</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === "100k-200k"}
                    onChange={() => setPriceRange("100k-200k")}
                    className="accent-[#1b7dae]"
                  />
                  <span>100.000₫ - 200.000₫</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === "over-200k"}
                    onChange={() => setPriceRange("over-200k")}
                    className="accent-[#1b7dae]"
                  />
                  <span>Trên 200.000₫</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Right Product Grid Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* Toolbar: Title & Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#212b36]">
                  Tất cả sản phẩm
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  Hiển thị {filteredProducts.length} sản phẩm
                </p>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="text-gray-500 flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  Sắp xếp:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 text-xs sm:text-sm focus:outline-hidden focus:border-[#1b7dae]"
                >
                  <option value="default">Mặc định</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                  <option value="name-asc">Tên: A-Z</option>
                  <option value="name-desc">Tên: Z-A</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-2xl">
                <p className="text-gray-500 text-sm">
                  Không tìm thấy sản phẩm nào phù hợp với bộ lọc.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setPriceRange("all");
                  }}
                  className="mt-3 text-xs font-semibold text-[#1b7dae] hover:underline cursor-pointer"
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-white rounded-xl p-3 flex flex-col justify-between border border-gray-100 hover:border-[#1b7dae]/40 hover:shadow-md transition-all group"
                  >
                    <div className="relative aspect-square w-full mb-3 overflow-hidden flex items-center justify-center bg-gray-50/50 rounded-lg">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="space-y-2 flex-1 flex flex-col justify-between">
                      <h4 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 hover:text-[#1b7dae] transition-colors leading-snug">
                        {prod.name}
                      </h4>

                      <div className="text-sm font-bold text-[#df4c00]">
                        {formatPrice(prod.price)}
                      </div>

                      <button
                        onClick={() => addToCart(prod)}
                        className="w-full py-1.5 px-2 bg-[#1b7dae] hover:bg-[#145d82] text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Chọn mua</span>
                      </button>
                    </div>
                  </div>
                ))}
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
  );
}
