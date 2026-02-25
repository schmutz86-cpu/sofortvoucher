'use client';

import { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { useLanguage } from '@/lib/LanguageContext';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { t } = useLanguage();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      // Call our API to create Stripe Checkout Session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.productId,
            productName: item.productName,
            platform: item.platform || 'Guthabenkarte',
            denomination: item.denomination,
            quantity: item.quantity,
          })),
          email: formData.email,
          successUrl: `${window.location.origin}/bestellung/erfolgreich?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/checkout?cancelled=true`,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Checkout failed');
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          throw error;
        }
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(`Checkout fehlgeschlagen: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/warenkorb')}
            className="text-blue-300 hover:text-blue-200 mb-4 flex items-center gap-2"
          >
            ← Zurück zum Warenkorb
          </button>
          <h1 className="text-4xl font-bold text-white">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Info */}
              <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6">Kundeninformationen</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      E-Mail-Adresse *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="ihre@email.ch"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                    )}
                    <p className="text-slate-400 text-sm mt-1">
                      Die Guthabenkarten werden an diese E-Mail gesendet
                    </p>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Vollständiger Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Max Mustermann"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-6">Zahlungsmethode</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <span className="text-3xl">💳</span>
                    <div>
                      <p className="text-white font-semibold">Kreditkarte / Debitkarte</p>
                      <p className="text-slate-400 text-sm">Visa, Mastercard, American Express</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <span className="text-3xl">🇨🇭</span>
                    <div>
                      <p className="text-white font-semibold">TWINT</p>
                      <p className="text-slate-400 text-sm">Schweizer Mobile Payment</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-6">
                  <span className="text-slate-300 text-sm">Sichere Zahlung durch</span>
                  <div className="bg-white rounded px-3 py-1 text-purple-600 font-bold text-sm">
                    Stripe
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                    className="mt-1 w-5 h-5 rounded border-slate-600"
                  />
                  <span className="text-slate-300 text-sm">
                    Ich akzeptiere die <a href="/agb" className="text-blue-400 hover:underline">AGB</a> und die <a href="/datenschutz" className="text-blue-400 hover:underline">Datenschutzerklärung</a>. Ich verstehe, dass digitale Guthabenkarten nach der Lieferung nicht erstattet werden können.
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="text-red-400 text-sm mt-2 ml-8">{errors.acceptTerms}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Wird weitergeleitet...
                  </>
                ) : (
                  <>Zur Zahlung – CHF {totalPrice.toFixed(2)} →</>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">Bestellübersicht</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.denomination}`}
                    className="flex justify-between text-sm"
                  >
                    <div>
                      <div className="text-white font-semibold">{item.productName}</div>
                      <div className="text-slate-400">
                        CHF {item.denomination.toFixed(0)} × {item.quantity}
                      </div>
                    </div>
                    <div className="text-white font-semibold">
                      CHF {(item.denomination * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-700 pt-4 space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Zwischensumme:</span>
                  <span>CHF {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Bearbeitungsgebühr:</span>
                  <span className="text-green-400">KOSTENLOS</span>
                </div>
                <div className="border-t border-slate-700 pt-3 flex justify-between">
                  <span className="text-xl font-bold text-white">Total:</span>
                  <span className="text-2xl font-bold text-white">
                    CHF {totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚡</span>
                    <span className="text-sm text-slate-300">Lieferung in 30-60 Sekunden</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔒</span>
                    <span className="text-sm text-slate-300">Sichere Zahlung mit Stripe</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✓</span>
                    <span className="text-sm text-slate-300">100% gültige Codes garantiert</span>
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
