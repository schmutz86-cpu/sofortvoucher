'use client';

import { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { useLanguage } from '@/lib/LanguageContext';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { createCheckoutSession } from '@/lib/stripe-actions';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

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
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'E-Mail erforderlich';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }

    if (!formData.name) {
      newErrors.name = 'Name erforderlich';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Bitte akzeptieren Sie die AGB';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { clientSecret } = await createCheckoutSession(
        items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        formData.email
      );

      setClientSecret(clientSecret || null);
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(`Checkout fehlgeschlagen: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Show embedded checkout if we have a client secret
  if (clientSecret) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-white mb-8">Checkout</h1>
          <div className="max-w-2xl mx-auto">
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ clientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </div>
      </div>
    );
  }

  // Show form if no client secret yet
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
                      placeholder="ihre@email.de"
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

              {/* Terms */}
              <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                    className="mt-1 w-5 h-5 rounded border-slate-600 bg-slate-900 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-slate-300 text-sm">
                    Ich akzeptiere die{' '}
                    <a href="/agb" className="text-blue-400 hover:underline">AGB</a>
                    {' '}und{' '}
                    <a href="/datenschutz" className="text-blue-400 hover:underline">Datenschutzbestimmungen</a>
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="text-red-400 text-sm mt-2">{errors.acceptTerms}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || items.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-bold py-4 px-6 rounded-xl transition-colors"
              >
                {loading ? 'Wird geladen...' : `Zur Zahlung (€${totalPrice.toFixed(2)})`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700 sticky top-4">
              <h2 className="text-2xl font-bold text-white mb-4">Bestellübersicht</h2>

              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-slate-300">
                    <span>{item.name} (×{item.quantity})</span>
                    <span>€{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-600 pt-4">
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Gesamt</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
