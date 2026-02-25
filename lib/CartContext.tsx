'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  productId: string;
  productName: string;
  denomination: number;
  quantity: number;
  platform: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string, denomination: number) => void;
  updateQuantity: (productId: string, denomination: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.productId && item.denomination === product.denomination
      );

      if (existingIndex >= 0) {
        // Item exists, increment quantity
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        // New item
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeItem = (productId: string, denomination: number) => {
    setItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.denomination === denomination))
    );
  };

  const updateQuantity = (productId: string, denomination: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, denomination);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.denomination === denomination
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.denomination * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
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
