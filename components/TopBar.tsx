'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Language } from '@/lib/i18n';
import CartIcon from './CartIcon';

export default function TopBar() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; flag: string; name: string }[] = [
    { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
    { code: 'fr', flag: '🇫🇷', name: 'Français' },
    { code: 'it', flag: '🇮🇹', name: 'Italiano' },
    { code: 'en', flag: '🇬🇧', name: 'English' },
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="/" className="text-white font-bold text-lg">
            Guthabenkarten.ch
          </a>

          {/* Right side: Cart + Language */}
          <div className="flex items-center gap-4">
            <CartIcon />

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors"
              >
                <span className="text-lg">{currentLang.flag}</span>
                <span className="hidden sm:inline">{currentLang.name}</span>
                <span className="sm:hidden">{currentLang.code.toUpperCase()}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 w-40 bg-slate-800 rounded-lg shadow-xl border border-slate-700 z-50 overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-slate-700 transition-colors ${
                          language === lang.code ? 'bg-blue-600/20 text-blue-400' : 'text-slate-300'
                        }`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
