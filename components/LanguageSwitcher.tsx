'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { Language } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; flag: string; name: string }[] = [
    { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
    { code: 'en', flag: '🇬🇧', name: 'English' },
  ];

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            language === lang.code
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
          }`}
          title={lang.name}
        >
          {lang.flag} {lang.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
