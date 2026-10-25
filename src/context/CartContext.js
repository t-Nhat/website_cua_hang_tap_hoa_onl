"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
const CartContext = createContext(undefined);
export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem("cart_items");
            if (savedCart)
                setCart(JSON.parse(savedCart));
            const savedWishlist = localStorage.getItem("wishlist_items");
            if (savedWishlist)
                setWishlist(JSON.parse(savedWishlist));
        }
        catch {
            // ignore
        }
    }, []);
    useEffect(() => {
        try {
            localStorage.setItem("cart_items", JSON.stringify(cart));
        }
        catch {
            // ignore
        }
    }, [cart]);
    useEffect(() => {
        try {
            localStorage.setItem("wishlist_items", JSON.stringify(wishlist));
        }
        catch {
            // ignore
        }
    }, [wishlist]);
    const addToCart = (product, quantity = 1) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) => item.product.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item);
            }
            return [...prev, { product, quantity }];
        });
        setIsCartOpen(true);
    };
    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.product.id !== productId));
    };
    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart((prev) => prev.map((item) => item.product.id === productId ? { ...item, quantity } : item));
    };
    const clearCart = () => {
        setCart([]);
        try {
            localStorage.removeItem("cart_items");
        }
        catch {
            // ignore
        }
    };
    const toggleWishlist = (productId) => {
        setWishlist((prev) => prev.includes(productId)
            ? prev.filter((id) => id !== productId)
            : [...prev, productId]);
    };
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    return (<CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice,
            isCartOpen,
            setIsCartOpen,
            wishlistCount: wishlist.length,
            toggleWishlist,
            wishlist,
        }}>
      {children}
    </CartContext.Provider>);
}
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
