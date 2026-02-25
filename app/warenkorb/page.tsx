'use client';

import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import TopBar from '@/components/TopBar';
import Image from 'next/image';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice, totalItems } = useCart();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <TopBar />

      <main className="pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-white mb-8">Warenkorb</h1>

          {items.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-12 border border-slate-700 text-center">
              <svg className="w-24 h-24 mx-auto mb-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-white text-xl mb-6">Dein Warenkorb ist leer</p>
              <Link
                href="/"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all"
              >
                Jetzt einkaufen
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.denomination}`} className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
                    <div className="flex gap-4">
                      <div className="w-24 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white/60 font-bold text-sm">{item.platform}</span>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg mb-1">{item.productName}</h3>
                        <p className="text-blue-400 font-bold text-xl mb-2">{item.denomination.toFixed(2)} CHF</p>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.productId, item.denomination, item.quantity - 1)}
                              className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold"
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.denomination, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.productId, item.denomination)}
                            className="ml-auto text-red-400 hover:text-red-300 text-sm"
                          >
                            Entfernen
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Warenkorb leeren
                  </button>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700 sticky top-20">
                  <h2 className="text-xl font-semibold text-white mb-4">Zusammenfassung</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-slate-300">
                      <span>Artikel</span>
                      <span>{totalItems}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Zwischensumme</span>
                      <span>{totalPrice.toFixed(2)} CHF</span>
                    </div>
                    <div className="border-t border-slate-700 pt-3 flex justify-between text-white text-xl font-bold">
                      <span>Total</span>
                      <span>{totalPrice.toFixed(2)} CHF</span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all">
                    Zur Kasse
                  </button>

                  <Link href="/" className="block text-center text-blue-400 hover:text-blue-300 text-sm mt-4">
                    ← Weiter einkaufen
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
