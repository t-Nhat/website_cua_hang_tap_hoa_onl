"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Search,
  X,
  RefreshCw,
  Sparkles,
  BarChart3,
  AlertTriangle,
  ArrowUpRight,
  ExternalLink,
  Truck,
  CheckCircle2,
  Box,
  Tag,
  Star,
} from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { useOrders } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";
import { GROCERY_CATEGORIES, GROCERY_UNITS } from "@/data/groceryData";

const PRESET_GROCERY_IMAGES = [
  {
    label: "Mì Hảo Hảo Tôm Chua Cay",
    url: "https://bizweb.dktcdn.net/thumb/medium/100/468/279/products/mi-hao-hao-vi-tom-chua-cay-goi-75g-202110110919568290-jfif-1667463961664.jpg?v=1667525958653",
  },
  {
    label: "Dầu Ăn Simply 1L",
    url: "https://bizweb.dktcdn.net/thumb/large/100/468/279/products/vn-11134207-7r98o-lzrcc0vppvm578-1727936481482.jpg?v=1727936488937",
  },
  {
    label: "Gạo Thơm ST25 A An 5Kg",
    url: "https://bizweb.dktcdn.net/thumb/large/100/468/279/collections/logo-aan.png?v=1668670831913",
  },
  {
    label: "Sữa Lúa Mạch Milo 400g",
    url: "https://bizweb.dktcdn.net/thumb/large/100/468/279/products/vn-11134207-7r98o-lzbkynehyahte6-1724564167899.jpg?v=1726909449597",
  },
  {
    label: "Nước Mắm Nam Ngư 900ml",
    url: "https://bizweb.dktcdn.net/thumb/large/100/468/279/products/vn-11134207-7r98o-m05fho037jwvd6-1727936358419.jpg?v=1727936366730",
  },
  {
    label: "Mì Ly Modern Lẩu Thái 67g",
    url: "https://bizweb.dktcdn.net/thumb/medium/100/468/279/products/mi-modern-lau-thai-tom-ly-65g-202207051319061550-1667873309508.jpg?v=1667873516173",
  },
  {
    label: "Thùng 16 Hộp Bánh Quy AFC",
    url: "https://bizweb.dktcdn.net/thumb/large/100/468/279/products/vn-11134207-7r98o-lxw6h0n0jp3vcd-1724566457713.jpg?v=1726905805760",
  },
  {
    label: "Bánh Oreo Socola Pie 112g",
    url: "https://bizweb.dktcdn.net/thumb/large/100/468/279/products/vn-11134207-7r98o-lxz95r09vheh35-1724566469384.jpg?v=1726905782583",
  },
  {
    label: "Nước Khoáng Lavie 500ml",
    url: "https://bizweb.dktcdn.net/thumb/large/100/468/279/products/vn-11134207-7r98o-ltrx1dpbux3hab-1724565244155.jpg?v=1726909349373",
  },
  {
    label: "Bột Ngọt Ajinomoto 454g",
    url: "https://bizweb.dktcdn.net/thumb/large/100/468/279/collections/untitled.png?v=1668302964867",
  },
  {
    label: "Đường Tinh Luyện Biên Hòa 1Kg",
    url: "https://bizweb.dktcdn.net/thumb/large/100/468/279/collections/logo-duong-bien-hoa-moi.png?v=1668305561690",
  },
  {
    label: "Sữa Tươi Vinamilk Lốc 4 Hộp",
    url: "https://bizweb.dktcdn.net/thumb/large/100/468/279/collections/logo.png?v=1668498529110",
  },
];

export default function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct, resetProducts } = useProducts();
  const { orders, stats, updateOrderStatus, resetOrders } = useOrders();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState("products");

  // Filter & Search states for products
  const [productSearch, setProductSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal States: Add / Edit Product
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form states for Add/Edit
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("Mì, cháo, phở, bún ăn liền");
  const [formUnit, setFormUnit] = useState("Gói");
  const [formBrand, setFormBrand] = useState("Acecook");
  const [formOrigin, setFormOrigin] = useState("Việt Nam");
  const [formPrice, setFormPrice] = useState(5000);
  const [formOriginalPrice, setFormOriginalPrice] = useState(6000);
  const [formStock, setFormStock] = useState(100);
  const [formImage, setFormImage] = useState(PRESET_GROCERY_IMAGES[0].url);
  const [formDescription, setFormDescription] = useState("");

  // Delete confirmation modal state
  const [deletingId, setDeletingId] = useState(null);

  // Database Connection & Seed State
  const [dbStatus, setDbStatus] = useState({ checking: true, connected: false, message: "Đang kiểm tra kết nối..." });
  const [seeding, setSeeding] = useState(false);

  React.useEffect(() => {
    checkDbHealth();
  }, []);

  const checkDbHealth = async () => {
    try {
      setDbStatus((prev) => ({ ...prev, checking: true }));
      const res = await fetch("/api/health");
      const json = await res.json();
      if (res.ok && json.readyState === 1) {
        setDbStatus({ checking: false, connected: true, message: "MongoDB Atlas: Đã kết nối" });
      } else {
        setDbStatus({
          checking: false,
          connected: false,
          message: json.hint || json.message || "Chưa kết nối",
        });
      }
    } catch (e) {
      setDbStatus({ checking: false, connected: false, message: "Chưa kết nối CSDL" });
    }
  };

  const handleSeedMongo = async () => {
    try {
      setSeeding(true);
      const res = await fetch("/api/seed", { method: "POST" });
      const json = await res.json();
      if (res.ok && json.success) {
        alert("🎉 Nạp dữ liệu sản phẩm & đơn hàng vào MongoDB Atlas thành công!");
        window.location.reload();
      } else {
        alert("Thông báo: " + (json.error || json.message || "Vui lòng kiểm tra lại cấu hình kết nối MongoDB."));
      }
    } catch (e) {
      alert("Lỗi kết nối: " + e.message);
    } finally {
      setSeeding(false);
    }
  };

  const formatPrice = (p) => new Intl.NumberFormat("vi-VN").format(p) + "₫";

  // Filtered grocery products list in admin
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        productSearch.trim() === "" ||
        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
        (p.brand && p.brand.toLowerCase().includes(productSearch.toLowerCase()));
      const matchCat = categoryFilter === "all" || p.category === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [products, productSearch, categoryFilter]);

  // Open modal for adding new grocery product
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormName("");
    setFormCategory("Mì, cháo, phở, bún ăn liền");
    setFormUnit("Gói");
    setFormBrand("Acecook");
    setFormOrigin("Việt Nam");
    setFormPrice(5000);
    setFormOriginalPrice(6000);
    setFormStock(150);
    setFormImage(PRESET_GROCERY_IMAGES[0].url);
    setFormDescription("Sản phẩm tạp hóa chính hãng, chất lượng cao, hạn sử dụng date mới 100%.");
    setIsModalOpen(true);
  };

  // Open modal for editing existing grocery product
  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormUnit(p.unit || "Gói");
    setFormBrand(p.brand || "Việt Nam");
    setFormOrigin(p.origin || "Việt Nam");
    setFormPrice(p.price);
    setFormOriginalPrice(p.originalPrice || Math.round(p.price * 1.1));
    setFormStock(p.stock);
    setFormImage(p.image);
    setFormDescription(p.description || "");
    setIsModalOpen(true);
  };

  // Handle Form Submit (Add or Update)
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const discountPct =
      formOriginalPrice > formPrice
        ? Math.round(((formOriginalPrice - formPrice) / formOriginalPrice) * 100)
        : 0;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formName.trim(),
        category: formCategory,
        unit: formUnit,
        brand: formBrand.trim(),
        origin: formOrigin.trim(),
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        discountPercent: discountPct,
        stock: Number(formStock),
        image: formImage,
        description: formDescription,
      });
    } else {
      addProduct({
        name: formName.trim(),
        category: formCategory,
        unit: formUnit,
        brand: formBrand.trim(),
        origin: formOrigin.trim(),
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        discountPercent: discountPct,
        stock: Number(formStock),
        image: formImage,
        description: formDescription,
        isBestSeller: false,
        isFlashSale: false,
      });
    }

    setIsModalOpen(false);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (deletingId) {
      deleteProduct(deletingId);
      setDeletingId(null);
    }
  };

  // Max value in 7 days chart for scaling
  const maxRevenue = Math.max(...stats.chartData7Days.map((c) => c.revenue), 1000000);

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#0f172a] font-sans antialiased">
      {/* Admin Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1b7dae] to-[#0284c7] text-white flex items-center justify-center font-black text-xl shadow-md">
              🛒
            </div>
            <div>
              <span className="block font-black text-base text-gray-900 leading-tight">
                QUẢN TRỊ BÁCH HÓA NHƯ NGỌC
              </span>
              <span className="text-[11px] text-gray-500 font-medium">
                Hệ thống Quản lý Sản phẩm Tạp Hóa & Thống kê Doanh thu
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Database connection badge */}
            <div
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                dbStatus.connected
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}
              title={dbStatus.message}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  dbStatus.connected ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                }`}
              ></span>
              <span>{dbStatus.connected ? "MongoDB Atlas: Đã kết nối" : "MongoDB: Cần cấu hình"}</span>
            </div>

            {/* Seed button */}
            <button
              type="button"
              onClick={handleSeedMongo}
              disabled={seeding}
              className="px-3 py-1.5 bg-blue-50 hover:bg-[#1b7dae] text-[#1b7dae] hover:text-white border border-blue-200 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
              title="Đồng bộ nạp dữ liệu mẫu vào MongoDB Atlas"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${seeding ? "animate-spin" : ""}`} />
              <span>{seeding ? "Đang nạp..." : "Đồng bộ MongoDB"}</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Xem Cửa Hàng
            </Link>
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-gray-200 text-xs text-gray-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>
                Admin: <strong>{currentUser?.name || "Quản trị viên"}</strong>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Container */}
      <main className="max-w-[1400px] mx-auto px-4 py-6 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-2xs max-w-xl">
          <button
            type="button"
            onClick={() => setActiveTab("products")}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "products"
                ? "bg-[#1b7dae] text-white shadow-md"
                : "text-gray-600 hover:text-black hover:bg-gray-100"
            }`}
          >
            <Box className="w-4 h-4" />
            Quản Lý Sản Phẩm ({products.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("analytics")}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "analytics"
                ? "bg-[#1b7dae] text-white shadow-md"
                : "text-gray-600 hover:text-black hover:bg-gray-100"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Thống Kê Doanh Thu
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "orders"
                ? "bg-[#1b7dae] text-white shadow-md"
                : "text-gray-600 hover:text-black hover:bg-gray-100"
            }`}
          >
            <Package className="w-4 h-4" />
            Đơn Hàng ({orders.length})
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: QUẢN LÝ SẢN PHẨM TẠP HÓA (FEATURE 9) */}
        {/* ======================================================== */}
        {activeTab === "products" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Action Bar */}
            <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-1 flex-col sm:flex-row items-center gap-3">
                {/* Search */}
                <div className="relative w-full sm:w-80">
                  <input
                    type="text"
                    placeholder="Tìm mặt hàng theo tên hoặc thương hiệu..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                {/* Filter Category */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full sm:w-auto p-2 text-xs rounded-xl border border-gray-200 bg-gray-50 font-medium cursor-pointer"
                >
                  <option value="all">Tất cả ngành hàng</option>
                  {GROCERY_CATEGORIES.slice(1).map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetProducts}
                  className="px-3.5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Khôi phục danh mục tạp hóa mặc định"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Khôi phục gốc
                </button>

                <button
                  type="button"
                  onClick={handleOpenAdd}
                  className="px-4 py-2.5 bg-[#1b7dae] hover:bg-[#15638c] text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  THÊM SẢN PHẨM MỚI
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-black text-sm text-gray-900">
                  Danh Sách Hàng Tạp Hóa Đang Bán ({filteredProducts.length} mặt hàng)
                </h3>
                <span className="text-xs text-gray-500">
                  Dữ liệu được lưu trữ trực tiếp và đồng bộ với trang mua sắm
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="bg-gray-50/70 text-[11px] font-black uppercase text-gray-500 border-b border-gray-200">
                    <tr>
                      <th className="py-3 px-4">Ảnh & Tên Mặt Hàng</th>
                      <th className="py-3 px-4">Ngành Hàng</th>
                      <th className="py-3 px-4 text-center">ĐVT</th>
                      <th className="py-3 px-4 text-right">Giá Bán</th>
                      <th className="py-3 px-4 text-right">Giá Gốc</th>
                      <th className="py-3 px-4 text-center">Tồn Kho</th>
                      <th className="py-3 px-4 text-center">Đã Bán</th>
                      <th className="py-3 px-4 text-right">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-12 h-12 rounded-xl object-contain border border-gray-200 p-0.5 bg-gray-50 shrink-0"
                            />
                            <div>
                              <div className="font-bold text-gray-900 line-clamp-1 max-w-xs">
                                {p.name}
                              </div>
                              <div className="text-[11px] text-gray-400">
                                {p.brand ? `Thương hiệu: ${p.brand}` : "Bách Hóa Như Ngọc"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#1b7dae] font-bold text-[11px]">
                            {p.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-semibold text-gray-700">
                          {p.unit || "Gói"}
                        </td>
                        <td className="py-3 px-4 text-right font-extrabold text-[#df4c00]">
                          {formatPrice(p.price)}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-400 line-through">
                          {p.originalPrice ? formatPrice(p.originalPrice) : "-"}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                              p.stock > 20
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-red-50 text-red-600"
                            }`}
                          >
                            {p.stock}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-bold text-gray-800">
                          {p.soldCount || 0}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(p)}
                              className="p-1.5 rounded-lg bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-[#1b7dae] transition-colors cursor-pointer"
                              title="Chỉnh sửa sản phẩm"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingId(p.id)}
                              className="p-1.5 rounded-lg bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                              title="Xóa sản phẩm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: THỐNG KÊ DOANH THU (FEATURE 10) */}
        {/* ======================================================== */}
        {activeTab === "analytics" && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">
                    Tổng Doanh Thu
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">
                    {formatPrice(stats.totalRevenue)}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3.5 h-3.5" /> Tăng trưởng 18% so với tuần trước
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">
                    Doanh Thu Hôm Nay
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-[#1b7dae] mt-1">
                    {formatPrice(stats.todayRevenue)}
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium block mt-1">
                    Cập nhật thời gian thực
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1b7dae] flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">
                    Tổng Đơn Hàng
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-gray-900 mt-1">
                    {stats.totalOrdersCount} đơn
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium block mt-1">
                    {stats.deliveringCount} đang giao • {stats.completedCount} hoàn thành
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">
                    Giá Trị Trung Bình / Đơn
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-amber-600 mt-1">
                    {formatPrice(stats.averageOrderValue)}
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium block mt-1">
                    Trung bình đơn tạp hóa gia đình
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* 7-Day Revenue Bar Chart & Order Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* 7-Day Interactive Bar Chart */}
              <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-base text-gray-900 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-[#1b7dae]" />
                      Biểu Đồ Doanh Thu 7 Ngày Gần Nhất
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Theo dõi biến động doanh số bán lẻ tạp hóa trong tuần
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#1b7dae] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    7 ngày qua
                  </span>
                </div>

                <div className="h-64 pt-6 flex items-end justify-between gap-3 px-2">
                  {stats.chartData7Days.map((col, idx) => {
                    const heightPercent = Math.max(15, Math.round((col.revenue / maxRevenue) * 100));

                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                        {/* Tooltip value */}
                        <div className="text-[10px] font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-gray-900 text-white px-1.5 py-0.5 rounded-md">
                          {formatPrice(col.revenue)} ({col.ordersCount} đơn)
                        </div>

                        {/* Bar */}
                        <div className="w-full max-w-[42px] bg-gray-100 rounded-t-xl overflow-hidden flex flex-col justify-end h-44">
                          <div
                            className="w-full bg-gradient-to-t from-[#1b7dae] to-[#0284c7] group-hover:from-blue-600 group-hover:to-blue-400 transition-all duration-500 rounded-t-xl"
                            style={{ height: `${heightPercent}%` }}
                          />
                        </div>

                        {/* Date label */}
                        <span className="text-[11px] font-bold text-gray-500 mt-1">
                          {col.date}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Status Breakdown */}
              <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
                <h3 className="font-black text-base text-gray-900">
                  Phân Bổ Trạng Thái Đơn Hàng
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 border border-amber-200">
                    <span className="font-bold text-amber-800 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      Tiếp nhận đơn
                    </span>
                    <strong className="text-amber-900 font-black text-sm">{stats.pendingCount}</strong>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-50 border border-blue-200">
                    <span className="font-bold text-blue-800 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                      Kho đang soạn & xuất kho
                    </span>
                    <strong className="text-blue-900 font-black text-sm">{stats.preparingCount}</strong>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-indigo-50 border border-indigo-200">
                    <span className="font-bold text-indigo-800 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                      Shipper đang giao hàng
                    </span>
                    <strong className="text-indigo-900 font-black text-sm">{stats.deliveringCount}</strong>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <span className="font-bold text-emerald-800 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      Giao hàng thành công
                    </span>
                    <strong className="text-emerald-900 font-black text-sm">{stats.completedCount}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Selling Grocery Products Table */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-base text-gray-900 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    Top Mặt Hàng Tạp Hóa Bán Chạy Nhất
                  </h3>
                  <p className="text-xs text-gray-500">
                    Mặt hàng có lượng tiêu thụ và doanh thu cao nhất theo thống kê
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="bg-gray-50/70 text-[11px] font-black uppercase text-gray-500 border-b border-gray-200">
                    <tr>
                      <th className="py-3 px-4">Tên Mặt Hàng</th>
                      <th className="py-3 px-4">Ngành Hàng</th>
                      <th className="py-3 px-4 text-center">Đơn Vị Tính</th>
                      <th className="py-3 px-4 text-center">Số Lượng Đã Bán</th>
                      <th className="py-3 px-4 text-right">Tổng Doanh Thu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {stats.topSellingProducts.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/70">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 object-contain rounded-xl border border-gray-200 p-0.5 bg-gray-50 shrink-0"
                            />
                            <span className="font-bold text-gray-900">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#1b7dae] font-semibold text-[11px]">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-medium text-gray-600">
                          {item.unit || "Gói"}
                        </td>
                        <td className="py-3 px-4 text-center font-black text-gray-900 text-sm">
                          {item.sold}
                        </td>
                        <td className="py-3 px-4 text-right font-black text-[#df4c00] text-sm">
                          {formatPrice(item.revenue)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: QUẢN LÝ ĐƠN HÀNG */}
        {/* ======================================================== */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-black text-base text-gray-900">
                  Danh Sách Đơn Đặt Hàng Tạp Hóa ({orders.length} đơn)
                </h3>
                <p className="text-xs text-gray-500">
                  Cập nhật tiến trình thực tế: Tiếp nhận ➔ Soạn hàng ➔ Xuất kho ➔ Đang giao ➔ Hoàn thành
                </p>
              </div>

              <button
                type="button"
                onClick={resetOrders}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Khôi phục đơn mẫu
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-600">
                <thead className="bg-gray-50/70 text-[11px] font-black uppercase text-gray-500 border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4">Mã Đơn</th>
                    <th className="py-3 px-4">Khách Hàng & SĐT</th>
                    <th className="py-3 px-4">Địa Chỉ Giao</th>
                    <th className="py-3 px-4 text-right">Tổng Tiền</th>
                    <th className="py-3 px-4 text-center">Thanh Toán</th>
                    <th className="py-3 px-4 text-center">Trạng Thái</th>
                    <th className="py-3 px-4 text-right">Cập Nhật Tiến Trình</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-gray-50/70">
                      <td className="py-3 px-4 font-mono font-bold text-[#1b7dae]">
                        <Link href={`/order-tracking?code=${ord.code}`} className="hover:underline">
                          #{ord.code}
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-gray-900">
                          {ord.recipientInfo?.recipientName}
                        </div>
                        <div className="text-[11px] text-gray-400">
                          {ord.recipientInfo?.recipientPhone}
                        </div>
                      </td>
                      <td className="py-3 px-4 max-w-xs truncate font-medium text-gray-700">
                        {ord.recipientInfo?.recipientAddress}
                      </td>
                      <td className="py-3 px-4 text-right font-black text-[#df4c00]">
                        {formatPrice(ord.total)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            ord.paymentMethod === "vietqr"
                              ? "bg-blue-50 text-[#1b7dae]"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {ord.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            ord.orderStatus === "completed"
                              ? "bg-emerald-100 text-emerald-800"
                              : ord.orderStatus === "delivering"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {ord.orderStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                          className="px-2.5 py-1 text-xs border border-gray-200 rounded-lg bg-white font-semibold text-gray-700 cursor-pointer focus:outline-hidden focus:border-[#1b7dae]"
                        >
                          <option value="pending">Tiếp nhận</option>
                          <option value="preparing">Đang soạn hàng</option>
                          <option value="photo_sent">Đã xuất kho</option>
                          <option value="delivering">Đang giao</option>
                          <option value="completed">Hoàn thành</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT GROCERY PRODUCT */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-black text-lg text-gray-900 flex items-center gap-2">
                <Box className="w-5 h-5 text-[#1b7dae]" />
                {editingProduct ? "Chỉnh Sửa Mặt Hàng Tạp Hóa" : "Thêm Mặt Hàng Tạp Hóa Mới"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Tên sản phẩm tạp hóa *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Mì Hảo Hảo tôm chua cay gói 75g"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Ngành hàng
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white font-semibold cursor-pointer"
                  >
                    {GROCERY_CATEGORIES.slice(1).map((cat, i) => (
                      <option key={i} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Đơn vị tính
                  </label>
                  <select
                    value={formUnit}
                    onChange={(e) => setFormUnit(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white font-semibold cursor-pointer"
                  >
                    {GROCERY_UNITS.map((u, i) => (
                      <option key={i} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Thương hiệu
                  </label>
                  <input
                    type="text"
                    placeholder="Acecook, Masan, Simply..."
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Giá bán (VND) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1000}
                    step={500}
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae] font-bold text-[#df4c00]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Giá gốc (VND)
                  </label>
                  <input
                    type="number"
                    min={1000}
                    step={500}
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Số lượng tồn kho *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Đường dẫn hình ảnh (URL)
                </label>
                <input
                  type="url"
                  required
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                />

                {/* Preset image selector */}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="text-[10px] text-gray-400 self-center">Chọn nhanh ảnh mẫu:</span>
                  {PRESET_GROCERY_IMAGES.slice(0, 6).map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormImage(preset.url)}
                      className={`text-[10px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                        formImage === preset.url
                          ? "bg-[#1b7dae] text-white border-[#1b7dae]"
                          : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Mô tả sản phẩm
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Mô tả công dụng, thành phần, hạn sử dụng..."
                  className="w-full p-3 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#1b7dae]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#1b7dae] hover:bg-[#15638c] text-white font-bold transition-colors shadow-md cursor-pointer"
                >
                  {editingProduct ? "Lưu Thay Đổi" : "Thêm Mặt Hàng"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: CONFIRM DELETE */}
      {/* ======================================================== */}
      {deletingId && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="font-black text-base text-gray-900">
              Xác Nhận Xóa Sản Phẩm Này?
            </h3>
            <p className="text-xs text-gray-500">
              Sản phẩm sẽ bị xóa khỏi danh mục bán lẻ của Bách Hóa Như Ngọc.
            </p>
            <div className="flex gap-2 justify-center pt-2">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer"
              >
                Đồng ý xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
