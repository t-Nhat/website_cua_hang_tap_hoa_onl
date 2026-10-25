"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ChevronRight,
  Search as SearchIcon,
  Filter,
  Sparkles,
  X,
  ArrowUpDown,
  Package,
} from "lucide-react";
import { TopHeader } from "@/components/bachhoanhungoc/TopHeader";
import { Header } from "@/components/bachhoanhungoc/Header";
import { Navbar } from "@/components/bachhoanhungoc/Navbar";
import { Footer } from "@/components/bachhoanhungoc/Footer";
import { FloatingWidgets } from "@/components/bachhoanhungoc/FloatingWidgets";
import { MobileNav } from "@/components/bachhoanhungoc/MobileNav";
import { ProductCard } from "@/components/grocery/ProductCard";
import { useProducts } from "@/context/ProductContext";
import { GROCERY_CATEGORIES } from "@/data/groceryData";

const POPULAR_GROCERY_TAGS = [
  "Mì Hảo Hảo",
  "Dầu ăn Simply",
  "Gạo ST25",
  "Sữa Vinamilk",
  "Nước mắm Nam Ngư",
  "Bột ngọt Ajinomoto",
  "Lavie",
  "Bánh AFC",
  "Đường Biên Hòa",
  "Milo",
];

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query") || searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "all";

  const { products } = useProducts();

  const [keyword, setKeyword] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceFilter, setPriceFilter] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    setKeyword(queryParam);
  }, [queryParam]);

  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Extract unique brands from products
  const brandsList = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p.brand) set.add(p.brand);
    });
    return ["all", ...Array.from(set)];
  }, [products]);

  // Filter products by keyword, category, price, and brand
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // 1. Filter by Name / Keyword
    if (keyword.trim()) {
      const q = keyword.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // 2. Filter by Category
    if (selectedCategory !== "all" && selectedCategory !== "Tất cả") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // 3. Filter by Brand
    if (selectedBrand !== "all") {
      list = list.filter((p) => p.brand === selectedBrand);
    }

    // 4. Filter by Price
    if (priceFilter === "under-20k") {
      list = list.filter((p) => p.price < 20000);
    } else if (priceFilter === "20k-50k") {
      list = list.filter((p) => p.price >= 20000 && p.price <= 50000);
    } else if (priceFilter === "50k-100k") {
      list = list.filter((p) => p.price > 50000 && p.price <= 100000);
    } else if (priceFilter === "over-100k") {
      list = list.filter((p) => p.price > 100000);
    }

    // 5. Sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "bestseller") {
      list.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
    }

    return list;
  }, [products, keyword, selectedCategory, selectedBrand, priceFilter, sortBy]);

  const clearFilters = () => {
    setKeyword("");
    setSelectedCategory("all");
    setPriceFilter("all");
    setSelectedBrand("all");
    setSortBy("default");
  };

  const hasActiveFilters =
    keyword.trim() !== "" ||
    (selectedCategory !== "all" && selectedCategory !== "Tất cả") ||
    selectedBrand !== "all" ||
    priceFilter !== "all";

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-8 md:py-10">
      {/* Title & Search Bar */}
      <div className="max-w-2xl mx-auto mb-8 text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Tìm Kiếm Sản Phẩm Tạp Hóa
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Tra cứu nhanh các mặt hàng theo <strong>tên sản phẩm</strong>, <strong>ngành hàng</strong> và <strong>mức giá</strong>
        </p>

        {/* Input */}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Nhập tên mặt hàng (mì Hảo Hảo, dầu ăn, gạo, sữa...)..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full px-5 py-3.5 pr-12 rounded-2xl border-2 border-[#1b7dae] shadow-xs text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-100 bg-white"
          />
          {keyword ? (
            <button
              onClick={() => setKeyword("")}
              className="absolute right-4 p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <SearchIcon className="absolute right-4 w-5 h-5 text-[#1b7dae]" />
          )}
        </div>

        {/* Popular Tags */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
          <span className="text-xs text-gray-500 font-semibold mr-1">Tìm nhanh:</span>
          {POPULAR_GROCERY_TAGS.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => setKeyword(tag)}
              className="text-xs bg-white hover:bg-[#1b7dae] hover:text-white text-gray-700 px-2.5 py-1 rounded-full border border-gray-200 transition-colors shadow-2xs cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-gray-100 shadow-xs mb-8 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2 font-extrabold text-sm text-gray-800">
            <Filter className="w-4 h-4 text-[#1b7dae]" />
            Bộ Lọc Nhanh
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs font-bold text-[#1b7dae] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" /> Đặt lại tất cả
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* 1. Category Filter */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Ngành Hàng
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#1b7dae] cursor-pointer"
            >
              <option value="all">Tất cả ngành hàng</option>
              {GROCERY_CATEGORIES.slice(1).map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Brand Filter */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Thương Hiệu
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#1b7dae] cursor-pointer"
            >
              <option value="all">Tất cả thương hiệu</option>
              {brandsList
                .filter((b) => b !== "all")
                .map((b, i) => (
                  <option key={i} value={b}>
                    {b}
                  </option>
                ))}
            </select>
          </div>

          {/* 3. Price Filter */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Mức Giá
            </label>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs font-semibold text-gray-800 focus:outline-hidden focus:border-[#1b7dae] cursor-pointer"
            >
              <option value="all">Tất cả mức giá</option>
              <option value="under-20k">Dưới 20.000₫</option>
              <option value="20k-50k">Từ 20.000₫ - 50.000₫</option>
              <option value="50k-100k">Từ 50.000₫ - 100.000₫</option>
              <option value="over-100k">Trên 100.000₫</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200">
        <div className="text-xs sm:text-sm text-gray-600">
          Tìm thấy <strong className="text-gray-900 font-extrabold">{filteredProducts.length}</strong> sản phẩm
          {keyword && (
            <span>
              {" "}
              với từ khóa &quot;<strong className="text-[#1b7dae]">{keyword}</strong>&quot;
            </span>
          )}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500 font-medium">Sắp xếp:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl border border-gray-200 bg-white font-semibold text-gray-700 text-xs focus:outline-hidden cursor-pointer"
          >
            <option value="default">Mặc định</option>
            <option value="bestseller">Bán chạy nhất</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
          </select>
        </div>
      </div>

      {/* Results Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center space-y-4 shadow-2xs">
          <div className="text-4xl">🛒</div>
          <h3 className="font-bold text-base text-gray-800">
            Không tìm thấy sản phẩm tạp hóa phù hợp
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Vui lòng thử tìm kiếm bằng từ khóa khác hoặc xóa bộ lọc để hiển thị danh mục đầy đủ.
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-2.5 bg-[#1b7dae] text-white rounded-xl text-xs font-bold hover:bg-[#15638c] transition-colors cursor-pointer"
          >
            Xem tất cả sản phẩm
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
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
            <span className="font-semibold text-gray-800">Tìm kiếm sản phẩm tạp hóa</span>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="text-center py-20 text-gray-500 text-sm">
              Đang tải kết quả tìm kiếm...
            </div>
          }
        >
          <SearchPageContent />
        </Suspense>

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
