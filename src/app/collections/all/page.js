"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronRight, Filter, ArrowUpDown, Sparkles, X, Check, Package } from "lucide-react";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";
import { ProductCard } from "@/components/grocery/ProductCard";
import { useProducts } from "@/context/ProductContext";
import { GROCERY_CATEGORIES } from "@/data/groceryData";

function CollectionsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "Tất cả";
  const brandParam = searchParams.get("brand") || "Tất cả";
  const flashSaleParam = searchParams.get("flashSale") === "true";

  const { products } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedBrand, setSelectedBrand] = useState(brandParam);
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Sync state if URL searchParams change
  React.useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
    if (brandParam) setSelectedBrand(brandParam);
  }, [categoryParam, brandParam]);

  // Extract unique brands
  const brandsList = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p.brand) set.add(p.brand);
    });
    return ["Tất cả", ...Array.from(set)];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Flash sale filter
    if (flashSaleParam) {
      list = list.filter((p) => p.isFlashSale || (p.discountPercent && p.discountPercent > 0));
    }

    // Filter by Category
    if (selectedCategory !== "Tất cả") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by Brand
    if (selectedBrand !== "Tất cả") {
      list = list.filter((p) => p.brand === selectedBrand);
    }

    // Filter by Price range (Grocery scale)
    if (priceRange === "under-20k") {
      list = list.filter((p) => p.price < 20000);
    } else if (priceRange === "20k-50k") {
      list = list.filter((p) => p.price >= 20000 && p.price <= 50000);
    } else if (priceRange === "50k-100k") {
      list = list.filter((p) => p.price > 50000 && p.price <= 100000);
    } else if (priceRange === "over-100k") {
      list = list.filter((p) => p.price > 100000);
    }

    // Sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "bestseller") {
      list.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
    } else if (sortBy === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, selectedCategory, selectedBrand, priceRange, sortBy, flashSaleParam]);

  const clearFilters = () => {
    setSelectedCategory("Tất cả");
    setSelectedBrand("Tất cả");
    setPriceRange("all");
    setSortBy("default");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Sidebar Filters */}
      <aside className="lg:col-span-3 space-y-6 bg-white p-5 rounded-3xl border border-gray-100 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#1b7dae]" />
            Bộ Lọc Ngành Hàng
          </h3>
          {(selectedCategory !== "Tất cả" ||
            selectedBrand !== "Tất cả" ||
            priceRange !== "all") && (
            <button
              onClick={clearFilters}
              className="text-xs text-[#1b7dae] hover:underline flex items-center gap-1 font-bold cursor-pointer"
            >
              <X className="w-3 h-3" /> Đặt lại
            </button>
          )}
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-gray-700 mb-2.5">
            Ngành Hàng Tạp Hóa
          </h4>
          <div className="space-y-1">
            {GROCERY_CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-blue-50 text-[#1b7dae] font-bold border border-blue-200"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span>{cat}</span>
                {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-[#1b7dae]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-gray-700 mb-2.5">
            Thương Hiệu
          </h4>
          <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
            {brandsList.map((brand, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedBrand(brand)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedBrand === brand
                    ? "bg-[#1b7dae] text-white font-bold"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Price Ranges */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-gray-700 mb-2.5">
            Khoảng Giá (VND)
          </h4>
          <div className="space-y-1.5 text-xs text-gray-600">
            {[
              { id: "all", label: "Tất cả mức giá" },
              { id: "under-20k", label: "Dưới 20.000₫" },
              { id: "20k-50k", label: "20.000₫ - 50.000₫" },
              { id: "50k-100k", label: "50.000₫ - 100.000₫" },
              { id: "over-100k", label: "Trên 100.000₫" },
            ].map((p) => (
              <label
                key={p.id}
                className="flex items-center gap-2 cursor-pointer hover:text-[#1b7dae]"
              >
                <input
                  type="radio"
                  name="priceRange"
                  value={p.id}
                  checked={priceRange === p.id}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="accent-[#1b7dae] cursor-pointer"
                />
                <span>{p.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Support Banner */}
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs space-y-2">
          <div className="font-bold text-[#1b7dae] flex items-center gap-1">
            <Package className="w-4 h-4" /> Đóng gói cẩn thận
          </div>
          <p className="text-gray-600 text-[11px] leading-relaxed">
            Hàng hóa được bọc chống sốc và đóng thùng carton chuyên dụng, giao tận tay nguyên vẹn.
          </p>
        </div>
      </aside>

      {/* Right Product Grid Area */}
      <section className="lg:col-span-9 space-y-6">
        {/* Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-gray-600">
            Hiển thị <strong className="text-gray-900 font-bold">{filteredProducts.length}</strong> sản phẩm
            {selectedCategory !== "Tất cả" && (
              <span>
                {" "}
                thuộc ngành <strong className="text-[#1b7dae]">{selectedCategory}</strong>
              </span>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-500 font-medium flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sắp xếp theo:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white font-semibold text-gray-700 focus:outline-hidden focus:border-[#1b7dae] cursor-pointer text-xs"
            >
              <option value="default">Mặc định (Mới nhất)</option>
              <option value="bestseller">Bán chạy nhất</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
              <option value="name-asc">Tên A-Z</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center space-y-4">
            <div className="text-4xl">🛒</div>
            <h3 className="font-bold text-base text-gray-800">
              Không tìm thấy sản phẩm tạp hóa phù hợp
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Thử chọn ngành hàng khác hoặc nhấn "Đặt lại bộ lọc" để xem danh mục đầy đủ.
            </p>
            <button
              onClick={clearFilters}
              className="px-5 py-2.5 rounded-xl bg-[#1b7dae] text-white font-bold text-xs hover:bg-[#15638c] transition-colors cursor-pointer"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function CollectionsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans antialiased pb-14 lg:pb-0 flex flex-col justify-between">
      <div>
        <TopHeader />
        <Header onToggleMobileMenu={() => setMobileMenuOpen(true)} />
        <Navbar />

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100 py-3">
          <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-1.5 text-xs text-gray-500">
            <Link href="/" className="hover:text-[#1b7dae]">
              Trang chủ
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="font-semibold text-gray-800">Tất cả sản phẩm tạp hóa</span>
          </div>
        </div>

        <main className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Danh Mục Sản Phẩm Tạp Hóa
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Thực phẩm thiết yếu, mì ăn liền, đồ uống, bánh kẹo và gia vị chất lượng cao từ Bách Hóa Như Ngọc.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="text-center py-20 text-gray-500 text-sm">
                Đang tải danh mục sản phẩm bách hóa...
              </div>
            }
          >
            <CollectionsContent />
          </Suspense>
        </main>

        <Footer />
        <FloatingWidgets />
        <MobileNav
          isMobileMenuOpen={mobileMenuOpen}
          setIsMobileMenuOpen={setMobileMenuOpen}
        />
      </div>
    </div>
  );
}
