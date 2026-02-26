'use client';

import Link from 'next/link';
import products from '@/data/products.json';
import TopBar from '@/components/TopBar';
import { useLanguage } from '@/lib/LanguageContext';
import { siteConfig } from '@/lib/config';

// Brand images - using local SVG files for reliability
const brandImages: Record<string, string> = {
  'Steam': '/brands/steam.svg',
  'PlayStation': '/brands/playstation.svg',
  'Xbox': '/brands/xbox.svg',
  'Nintendo': '/brands/nintendo.svg',
  'Netflix': '/brands/netflix.svg',
  'Spotify': '/brands/spotify.svg',
  'Apple': '/brands/apple.svg',
  'Google': '/brands/google.svg',
  'Roblox': '/brands/roblox.svg',
  'Amazon': '/brands/amazon.svg',
};

export default function HomePage() {
  const { language, t } = useLanguage();
  const featured = products.filter(p => p.tags.includes('beliebt')).slice(0, 4);

  const getProductDescription = (product: typeof products[0]) => {
    return product.description[language] || product.description.de;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <TopBar />

      {/* Under Construction Banner */}
      <div className="bg-amber-500/90 text-black px-4 py-3 text-center font-medium text-sm sm:text-base">
        🚧 <span className="font-bold">{language === 'de' ? 'Hinweis:' : 'Notice:'}</span> {language === 'de' ? 'Diese Website befindet sich im Aufbau. Bestellungen sind aktuell noch nicht möglich.' : 'This site is under construction. Orders are not yet possible.'} {language === 'de' ? 'Bei Fragen:' : 'Questions?'} <a href={`mailto:${siteConfig.email}`} className="underline font-semibold">{siteConfig.email}</a>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12 sm:pb-16 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {siteConfig.name}
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
          {t.home.heroSubtitle}
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <span className="bg-green-500/20 text-green-300 px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold border border-green-500/30">
            ✓ {t.common.instantDelivery}
          </span>
          <span className="bg-blue-500/20 text-blue-300 px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold border border-blue-500/30">
            ✓ {siteConfig.currency} {language === 'de' ? 'Preise' : 'Prices'}
          </span>
          <span className="bg-purple-500/20 text-purple-300 px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold border border-purple-500/30">
            ✓ {t.common.available247}
          </span>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
          🔥 {t.home.featuredProducts}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {featured.map((product) => (
            <Link
              key={product.id}
              href={`/produkt/${product.id}`}
              className="group bg-slate-800/50 backdrop-blur rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 hover:bg-slate-700/50 transition-all border border-slate-700 hover:border-blue-500/50"
            >
              {/* Product Image */}
              <div className="relative bg-white rounded-lg sm:rounded-xl h-28 sm:h-36 lg:h-40 mb-3 sm:mb-4 flex items-center justify-center overflow-hidden p-2 sm:p-4">
                {brandImages[product.brand] ? (
                  <img 
                    src={brandImages[product.brand]} 
                    alt={product.brand}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-2xl sm:text-3xl font-bold text-slate-800">
                    {product.brand.slice(0, 2)}
                  </span>
                )}
                {product.tags.includes('beliebt') && (
                  <span className="absolute top-2 right-2 bg-yellow-500 text-yellow-900 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold">
                    ★
                  </span>
                )}
              </div>
              
              <h3 className="text-sm sm:text-base font-bold text-white mb-1 sm:mb-2 line-clamp-2 leading-tight">
                {product.name}
              </h3>
              
              <p className="text-slate-400 text-xs line-clamp-2 mb-2 hidden sm:block">
                {getProductDescription(product)}
              </p>
              
              <div className="flex items-center justify-end">
                <span className="text-green-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></span>
                  <span className="hidden sm:inline">{t.common.secure}</span>
                  <span className="sm:hidden">✓</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
          {t.home.allProducts}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/produkt/${product.id}`}
              className="group bg-slate-800/30 backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-slate-700/30 transition-all border border-slate-700/50"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0 p-1.5 sm:p-2 overflow-hidden">
                  {brandImages[product.brand] ? (
                    <img 
                      src={brandImages[product.brand]} 
                      alt={product.brand}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-slate-800 font-bold text-xs sm:text-sm">{product.brand.slice(0, 2)}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-xs sm:text-sm truncate">{product.name}</h3>
                  <p className="text-slate-400 text-[10px] sm:text-xs capitalize">{product.category}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-end">
                {product.inStock && (
                  <span className="text-green-400 text-[10px] sm:text-xs">✓ {language === 'de' ? 'Verfügbar' : 'Available'}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="bg-slate-800/50 backdrop-blur rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 border border-slate-700 text-center">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">⚡</div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{t.features.instantTitle}</h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              {t.features.instantDesc}
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 border border-slate-700 text-center">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🇩🇪</div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{t.features.supportTitle}</h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              {t.features.supportDesc}
            </p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 border border-slate-700 text-center">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🔒</div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{t.features.secureTitle}</h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              {t.features.secureDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-white font-bold text-base sm:text-lg mb-2 sm:mb-3">{siteConfig.name}</h4>
              <p className="text-slate-400 text-xs sm:text-sm">
                {t.footer.tagline}
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs sm:text-sm mb-2 sm:mb-3">{t.footer.support}</h4>
              <ul className="text-slate-400 text-xs sm:text-sm space-y-1 sm:space-y-2">
                <li><Link href="/faq" className="hover:text-white">{t.footer.faq}</Link></li>
                <li><Link href="/kontakt" className="hover:text-white">{t.footer.contact}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-xs sm:text-sm mb-2 sm:mb-3">{t.footer.legal}</h4>
              <ul className="text-slate-400 text-xs sm:text-sm space-y-1 sm:space-y-2">
                <li><Link href="/impressum" className="hover:text-white">Impressum</Link></li>
                <li><Link href="/agb" className="hover:text-white">{t.footer.terms}</Link></li>
                <li><Link href="/datenschutz" className="hover:text-white">{t.footer.privacy}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-4 sm:pt-6 text-center text-slate-500 text-xs">
            {t.footer.copyright} | <span className="text-blue-400 font-semibold">v2.2-2026.02.26</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
