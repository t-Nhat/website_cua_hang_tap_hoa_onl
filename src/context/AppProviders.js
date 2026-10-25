"use client";
import React from "react";
import { AuthProvider } from "./AuthContext";
import { ProductProvider } from "./ProductContext";
import { OrderProvider } from "./OrderContext";
import { CartProvider } from "./CartContext";
export function AppProviders({ children }) {
    return (<AuthProvider>
      <ProductProvider>
        <OrderProvider>
          <CartProvider>{children}</CartProvider>
        </OrderProvider>
      </ProductProvider>
    </AuthProvider>);
}
