'use client';

import { useCart } from '@/lib/CartContext';
import { useRouter } from 'next/navigation';

export default function CartIcon() {
  const { totalItems } = useCart();
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/warenkorb')}
      className="relative bg-slate-800/50 hover:bg-slate-800 backdrop-blur rounded-lg px-4 py-2 transition-all border border-slate-700"
    >
      <span className="text-2xl">🛒</span>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </button>
  );
}
