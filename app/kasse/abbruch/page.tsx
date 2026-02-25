'use client';

import Link from 'next/link';
import TopBar from '@/components/TopBar';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <TopBar />
      
      <main className="pt-14">
        <div className="max-w-xl mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-6">❌</div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Zahlung abgebrochen
          </h1>
          
          <p className="text-slate-300 mb-8">
            Die Zahlung wurde abgebrochen. Dein Warenkorb ist noch gespeichert.
          </p>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-8">
            <p className="text-slate-300 mb-4">
              Möchtest du es erneut versuchen?
            </p>
            
            <div className="space-y-3">
              <Link 
                href="/kasse"
                className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition"
              >
                Zurück zur Kasse
              </Link>
              
              <Link 
                href="/warenkorb"
                className="inline-block w-full bg-slate-700 hover:bg-slate-600 text-white font-bold px-8 py-3 rounded-lg transition"
              >
                Warenkorb bearbeiten
              </Link>
            </div>
          </div>

          <p className="text-slate-400 text-sm">
            Fragen? Kontaktiere uns unter{' '}
            <a href="mailto:info@guthabenkarten.ch" className="text-blue-400 hover:underline">
              info@guthabenkarten.ch
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
