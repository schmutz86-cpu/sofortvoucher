'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import TopBar from '@/components/TopBar';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState<'pending' | 'processing' | 'complete'>('pending');

  useEffect(() => {
    if (sessionId) {
      // Verify payment with backend
      fetch(`/api/verify-payment?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.paid) {
            setOrderStatus('complete');
          } else {
            setOrderStatus('processing');
          }
        })
        .catch(() => {
          setOrderStatus('processing');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <TopBar />
      
      <main className="pt-14">
        <div className="max-w-xl mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-6">🎉</div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Bestellung erfolgreich!
          </h1>
          
          <p className="text-slate-300 mb-8">
            Vielen Dank für deinen Einkauf. Deine Gift Cards werden innerhalb von 
            <span className="text-green-400 font-semibold"> 30-60 Sekunden</span> per E-Mail geliefert.
          </p>

          {loading ? (
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-slate-300">Bestellung wird verarbeitet...</p>
            </div>
          ) : (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-8">
              <div className="text-4xl mb-2">✉️</div>
              <p className="text-green-300 font-semibold">Payment Bestätigt!</p>
              <p className="text-slate-300 text-sm mt-2">
                {orderStatus === 'complete' 
                  ? 'Deine Codes werden jetzt generiert...'
                  : 'Wir bereiten deine Bestellung vor...'}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <p className="text-slate-400 text-sm">
              Bestellnummer: <span className="text-white font-mono">{sessionId?.slice(-8) || '...'}</span>
            </p>
            
            <div className="text-slate-400 text-xs">
              <p>Nichts erhalten? Prüfe deinen Spam-Ordner.</p>
              <p>Support: info@guthabenkarten.ch</p>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <Link 
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition"
            >
              Weiter einkaufen
            </Link>
            
            <div>
              <a 
                href="mailto:info@guthabenkarten.ch"
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                Hilfe benötigt? Kontaktiere uns
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
        <TopBar />
        <main className="pt-14">
          <div className="max-w-xl mx-auto px-4 py-16 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-slate-300">Laden...</p>
          </div>
        </main>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
