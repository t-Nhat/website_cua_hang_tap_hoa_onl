"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { DEFAULT_GROCERY_PRODUCTS } from "@/data/groceryData";

const ProductContext = createContext(undefined);

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9 -]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(DEFAULT_GROCERY_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/products");
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          setProducts(json.data);
          try {
            localStorage.setItem("bachhoanhungoc_products", JSON.stringify(json.data));
          } catch (e) {}
          return;
        }
      }
    } catch (e) {
      console.warn("API /api/products unreachable, fallback to localStorage:", e);
    } finally {
      setIsLoading(false);
    }

    // Fallback to localStorage if API fails or is offline
    try {
      const saved = localStorage.getItem("bachhoanhungoc_products");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
          return;
        }
      }
      localStorage.setItem("bachhoanhungoc_products", JSON.stringify(DEFAULT_GROCERY_PRODUCTS));
    } catch (e) {}
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const saveProducts = (updated) => {
    setProducts(updated);
    try {
      localStorage.setItem("bachhoanhungoc_products", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save products to storage:", e);
    }
  };

  const addProduct = async (data) => {
    const id = `sp-${Date.now()}`;
    const slug = `${slugify(data.name)}-${id.slice(-4)}`;
    const newProduct = {
      ...data,
      id,
      slug,
      soldCount: 0,
      rating: 5,
      reviewsCount: 1,
    };

    // Optimistic UI update
    saveProducts([newProduct, ...products]);

    // Send to MongoDB API
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data?._id) {
          const updatedWithMongoId = [
            { ...newProduct, id: json.data._id.toString() },
            ...products.filter((p) => p.id !== id),
          ];
          saveProducts(updatedWithMongoId);
        }
      }
    } catch (e) {
      console.warn("Error syncing addProduct with MongoDB:", e);
    }
  };

  const updateProduct = async (id, updated) => {
    const updatedList = products.map((item) => {
      if (item.id === id || item._id === id) {
        const nameChanged = updated.name && updated.name !== item.name;
        const slug = nameChanged ? slugify(updated.name) : item.slug;
        return { ...item, ...updated, slug };
      }
      return item;
    });
    saveProducts(updatedList);

    // Sync to MongoDB
    try {
      await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } catch (e) {
      console.warn("Error syncing updateProduct with MongoDB:", e);
    }
  };

  const deleteProduct = async (id) => {
    const updated = products.filter((item) => item.id !== id && item._id !== id);
    saveProducts(updated);

    // Sync to MongoDB
    try {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.warn("Error syncing deleteProduct with MongoDB:", e);
    }
  };

  const resetProducts = async () => {
    saveProducts(DEFAULT_GROCERY_PRODUCTS);
    try {
      await fetch("/api/seed", { method: "POST" });
    } catch (e) {}
  };

  const getProductBySlug = (slug) => {
    return products.find((p) => p.slug === slug || p.id === slug || p._id === slug);
  };

  const getProductById = (id) => {
    return products.find((p) => p.id === id || p._id === id);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProducts,
        getProductBySlug,
        getProductById,
        refreshProducts: fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
