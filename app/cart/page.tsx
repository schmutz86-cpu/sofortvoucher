'use client';

import { useCart } from '@/lib/CartContext';
import { useLanguage } from '@/lib/LanguageContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const { t } = useLanguage();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="text-4xl font-bold text-white mb-4">Cart Empty</h1>
          <p className="text-slate-300 mb-8">Add some gift cards to get started!</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            {t.common.backToHome}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="text-blue-300 hover:text-blue-200 mb-4 flex items-center gap-2"
          >
            ← {t.common.backToHome}
          </button>
          <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>
          <p className="text-slate-300 mt-2">{totalItems} items</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.denomination}`}
                className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-4xl">{getPlatformEmoji(item.platform)}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">{item.productName}</h3>
                      <p className="text-slate-300 mt-1">
                        {t.common.currency} {item.denomination}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.productId, item.denomination, item.quantity - 1)}
                      className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded text-white font-bold"
                    >
                      −
                    </button>
                    <span className="text-white font-semibold w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.denomination, item.quantity + 1)}
                      className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded text-white font-bold"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.productId, item.denomination)}
                      className="ml-4 text-red-400 hover:text-red-300"
                      title="Remove"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center">
                  <span className="text-slate-300">Subtotal:</span>
                  <span className="text-xl font-bold text-white">
                    {t.common.currency} {(item.denomination * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-300">
                  <span>Items ({totalItems}):</span>
                  <span>{t.common.currency} {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Processing:</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <div className="border-t border-slate-700 pt-3 flex justify-between">
                  <span className="text-xl font-bold text-white">Total:</span>
                  <span className="text-2xl font-bold text-white">
                    {t.common.currency} {totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-bold text-lg transition-all"
              >
                Proceed to Checkout →
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-2xl mb-1">⚡</div>
                    <div className="text-xs text-slate-400">Instant</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-1">🔒</div>
                    <div className="text-xs text-slate-400">Secure</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-1">✓</div>
                    <div className="text-xs text-slate-400">Valid</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getPlatformEmoji(platform: string): string {
  const emojiMap: Record<string, string> = {
    steam: '🎮',
    playstation: '🎮',
    xbox: '🎮',
    nintendo: '🎮',
    mobile: '📱',
    other: '🎁',
  };
  return emojiMap[platform] || '🎁';
}
