'use client';

import { useState } from 'react';
import { useCart } from '@/lib/CartContext';

type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  brand: string;
};

type Props = {
  product: Product;
};

export function AddToCartButton({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, items, updateQuantity, removeItem } = useCart();

  const addToCart = () => {
    // Check if product already exists in cart
    const existingItem = items.find(item => item.productId === product.id);
    
    if (existingItem) {
      // Update quantity
      updateQuantity(product.id, product.price, existingItem.quantity + quantity);
    } else {
      // Add new item using CartContext
      addItem({
        productId: product.id,
        productName: product.name,
        denomination: product.price,
        platform: product.brand,
      });
      
      // If quantity > 1, update it
      if (quantity > 1) {
        updateQuantity(product.id, product.price, quantity);
      }
    }
    
    // Show confirmation
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-gray-300">Menge:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-colors flex items-center justify-center text-xl font-bold"
            aria-label="Menge verringern"
          >
            −
          </button>
          <span className="w-12 text-center text-xl font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-colors flex items-center justify-center text-xl font-bold"
            aria-label="Menge erhöhen"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={addToCart}
        disabled={added}
        className={`w-full py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
          added
            ? 'bg-green-500 text-white'
            : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg shadow-purple-500/50'
        }`}
      >
        {added ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            In den Warenkorb gelegt!
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            In den Warenkorb – {(product.price * quantity).toFixed(2)} CHF
          </span>
        )}
      </button>
    </div>
  );
}
