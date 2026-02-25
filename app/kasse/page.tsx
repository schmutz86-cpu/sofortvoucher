'use client';

import { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import TopBar from '@/components/TopBar';
import DemoBanner from '@/components/DemoBanner';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function KassePage() {
  const { items, totalPrice, clearCart } = useCart();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          email,
          successUrl: `${window.location.origin}/bestellung/erfolg`,
          cancelUrl: `${window.location.origin}/kasse`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (stripe) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
        <TopBar />
        <main className="pt-14">
          <div className="max-w-xl mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Warenkorb leer</h1>
            <a href="/" className="text-blue-400 hover:underline">← Zurück zum Shop</a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <TopBar />
      <DemoBanner />
      
      <main className="pt-14">
        <div className="max-w-xl mx-auto px-4 py-12">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">💳 Bezahlung</h1>
            <p className="text-slate-300">
              Gib deine E-Mail ein. Du wirst zu Stripe weitergeleitet für sichere Bezahlung.
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-6">
            <h2 className="text-white font-semibold mb-4">Deine Bestellung</h2>
            {items.map(item => (
              <div key={item.productId} className="flex justify-between text-slate-300 text-sm mb-2">
                <span>{item.productName} x{item.quantity}</span>
                <span>€{(item.denomination * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-slate-700 mt-4 pt-4 flex justify-between text-white font-bold">
              <span>Total</span>
              <span>€{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-300 mb-2">E-Mail Adresse</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine@email.ch"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500"
              />
              <p className="text-slate-400 text-xs mt-1">
                Gift Codes werden an diese E-Mail gesendet
              </p>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-bold py-3 rounded-lg transition"
            >
              {loading ? 'Lade...' : `Jetzt bezahlen - ${totalPrice.toFixed(2)} CHF`}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            🔒 Sichere Bezahlung mit Stripe
          </p>
        </div>
      </main>
    </div>
  );
}
