'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSale } from './SaleContext';

export interface ReportItem {
  id: number;
  title: string;
  priceINR: string;
  priceUSD: string;
  oldPriceINR?: string;
  oldPriceUSD?: string;
  desc: string;
}

interface CartContextType {
  cart: ReportItem[];
  addToCart: (item: ReportItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  totalINR: number;
  totalUSD: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ReportItem[]>([]);
  const { isSaleActive } = useSale();

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('astro_cart');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cart');
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('astro_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: ReportItem) => {
    setCart((prev) => {
      // Prevent duplicates
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalINR = cart.reduce((sum, item) => {
    const priceStr = isSaleActive ? item.priceINR : (item.oldPriceINR || item.priceINR);
    const num = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const totalUSD = cart.reduce((sum, item) => {
    const priceStr = isSaleActive ? item.priceUSD : (item.oldPriceUSD || item.priceUSD);
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalINR, totalUSD }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
