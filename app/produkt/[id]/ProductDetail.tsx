'use client';

import Link from 'next/link';
import { AddToCartButton } from '@/components/AddToCartButton';
import { useLanguage } from '@/lib/LanguageContext';
import { siteConfig } from '@/lib/config';

// Brand images - using real logos from Wikipedia (PNG format)
const brandImages: Record<string, string> = {
  'Steam': '/brands/steam.png',
  'PlayStation': '/brands/playstation.png',
  'Xbox': '/brands/xbox.png',
  'Nintendo': '/brands/nintendo.png',
  'Netflix': '/brands/netflix.png',
  'Spotify': '/brands/spotify.png',
  'Apple': '/brands/apple.png',
  'Google': '/brands/google.png',
  'Roblox': '/brands/roblox.svg',
  'Amazon': '/brands/amazon.png',
};

// Extended product info with translations
const productInfo: Record<string, Record<string, { usage: string; examples: string[] }>> = {
  de: {
    'steam-50': { usage: 'Steam Guthaben wird direkt in deinem Steam Wallet eingelöst. Kaufe damit PC-Spiele, DLCs, In-Game-Items und Software im Steam Store.', examples: ['Counter-Strike 2 Skins', 'Neue PC-Spiele', 'Spiel-DLCs', 'Steam-Software'] },
    'playstation-50': { usage: 'PlayStation Store Guthaben lädt deine PSN Wallet auf. Kaufe PS5/PS4/PS3 Spiele, Abos und Add-ons direkt im PlayStation Store.', examples: ['PS5 Exklusivtitel', 'PlayStation Plus', 'Spiel-DLCs', 'In-Game-Währung'] },
    'xbox-50': { usage: 'Xbox Live Guthaben wird deinem Microsoft Account gutgeschrieben. Kaufe Xbox Series X|S Spiele, Game Pass und Inhalte im Microsoft Store.', examples: ['Xbox Game Pass', 'Xbox Series X Games', 'Xbox Live Gold', 'In-Game-Items'] },
    'nintendo-50': { usage: 'Nintendo eShop Guthaben lädt deinen Nintendo Account auf. Kaufe Switch-Spiele, Indie-Games und DLCs im Nintendo eShop.', examples: ['Super Mario Spiele', 'Zelda: BOTW/TOTK', 'Nintendo Switch Online', 'Indie-Games'] },
    'netflix-30': { usage: 'Netflix Geschenkkarten können für jedes Netflix-Abo eingelöst werden. Perfekt zum Verschenken oder für dein eigenes Abo.', examples: ['Netflix Standard mit Werbung', 'Netflix Standard', 'Netflix Premium 4K', 'Geschenk für Freunde'] },
    'spotify-30': { usage: 'Spotify Premium Guthaben schenkt dir werbefreies Musik-Streaming. Einlösbar für Spotify Premium Abos in der Schweiz.', examples: ['Spotify Premium Individual', 'Spotify Duo', 'Spotify Family', 'Spotify Student'] },
    'apple-50': { usage: 'Apple Guthaben lädt deine Apple ID auf. Kaufe Apps, Spiele, Musik, Filme, iCloud+ und mehr im App Store und iTunes.', examples: ['iPhone/iPad Apps', 'Apple Music', 'iCloud+ Speicher', 'Apple TV+ Filme'] },
    'google-play-50': { usage: 'Google Play Guthaben wird deinem Google Account gutgeschrieben. Kaufe Android Apps, Spiele, Filme und Bücher im Play Store.', examples: ['Android Apps', 'Mobile Games', 'YouTube Premium', 'Google One Speicher'] },
    'roblox-25': { usage: 'Roblox Guthaben wird in Robux umgewandelt. Kaufe damit In-Game-Items, Avatar-Accessoires und Premium-Funktionen in Roblox.', examples: ['Robux (In-Game-Währung)', 'Avatar-Kleidung', 'Game-Passes', 'Roblox Premium'] },
    'amazon-50': { usage: 'Amazon.de Gutscheine können für Millionen Produkte auf Amazon.de eingelöst werden. Vom Büroklammer bis zum Fernseher.', examples: ['Elektronik', 'Bücher & Hörbücher', 'Haushaltswaren', 'Prime-Mitgliedschaft'] },
  },
  en: {
    'steam-50': { usage: 'Steam Credit is redeemed directly into your Steam Wallet. Buy PC games, DLCs, in-game items and software in the Steam Store.', examples: ['Counter-Strike 2 skins', 'New PC games', 'Game DLCs', 'Steam software'] },
    'playstation-50': { usage: 'PlayStation Store Credit loads your PSN Wallet. Buy PS5/PS4/PS3 games, subscriptions and add-ons directly in the PlayStation Store.', examples: ['PS5 exclusives', 'PlayStation Plus', 'Game DLCs', 'In-game currency'] },
    'xbox-50': { usage: 'Xbox Live Credit is credited to your Microsoft Account. Buy Xbox Series X|S games, Game Pass and content in the Microsoft Store.', examples: ['Xbox Game Pass', 'Xbox Series X games', 'Xbox Live Gold', 'In-game items'] },
    'nintendo-50': { usage: 'Nintendo eShop Credit loads your Nintendo Account. Buy Switch games, indie games and DLCs in the Nintendo eShop.', examples: ['Super Mario games', 'Zelda: BOTW/TOTK', 'Nintendo Switch Online', 'Indie games'] },
    'netflix-30': { usage: 'Netflix Gift Cards can be redeemed for any Netflix subscription. Perfect for gifting or for your own subscription.', examples: ['Netflix Standard with Ads', 'Netflix Standard', 'Netflix Premium 4K', 'Gift for friends'] },
    'spotify-30': { usage: 'Spotify Premium Credit gives you ad-free music streaming. Redeemable for Spotify Premium subscriptions in Switzerland.', examples: ['Spotify Premium Individual', 'Spotify Duo', 'Spotify Family', 'Spotify Student'] },
    'apple-50': { usage: 'Apple Credit loads your Apple ID. Buy apps, games, music, movies, iCloud+ and more in the App Store and iTunes.', examples: ['iPhone/iPad apps', 'Apple Music', 'iCloud+ storage', 'Apple TV+ movies'] },
    'google-play-50': { usage: 'Google Play Credit is credited to your Google Account. Buy Android apps, games, movies and books in the Play Store.', examples: ['Android apps', 'Mobile games', 'YouTube Premium', 'Google One storage'] },
    'roblox-25': { usage: 'Roblox Credit is converted to Robux. Buy in-game items, avatar accessories and premium features in Roblox.', examples: ['Robux (in-game currency)', 'Avatar clothing', 'Game passes', 'Roblox Premium'] },
    'amazon-50': { usage: 'Amazon.de vouchers can be redeemed for millions of products on Amazon.de. From paperclips to TVs.', examples: ['Electronics', 'Books & audiobooks', 'Household items', 'Prime membership'] },
  },
  fr: {
    'steam-50': { usage: 'Le crédit Steam est directement ajouté à votre Steam Wallet. Achetez des jeux PC, DLC, objets en jeu et logiciels dans le Steam Store.', examples: ['Skins Counter-Strike 2', 'Nouveaux jeux PC', 'DLC de jeux', 'Logiciels Steam'] },
    'playstation-50': { usage: 'Le crédit PlayStation Store charge votre PSN Wallet. Achetez jeux PS5/PS4/PS3, abonnements et contenus dans le PlayStation Store.', examples: ['Exclusivités PS5', 'PlayStation Plus', 'DLC de jeux', 'Monnaie en jeu'] },
    'xbox-50': { usage: 'Le crédit Xbox Live est crédité à votre Microsoft Account. Achetez jeux Xbox Series X|S, Game Pass et contenus dans le Microsoft Store.', examples: ['Xbox Game Pass', 'Jeux Xbox Series X', 'Xbox Live Gold', 'Objets en jeu'] },
    'nintendo-50': { usage: 'Le crédit Nintendo eShop charge votre Nintendo Account. Achetez jeux Switch, jeux indépendants et DLCs dans le Nintendo eShop.', examples: ['Jeux Super Mario', 'Zelda: BOTW/TOTK', 'Nintendo Switch Online', 'Jeux indépendants'] },
    'netflix-30': { usage: 'Les cartes cadeau Netflix peuvent être utilisées pour tout abonnement Netflix. Parfait pour offrir ou pour votre propre abonnement.', examples: ['Netflix Standard avec pubs', 'Netflix Standard', 'Netflix Premium 4K', 'Cadeau pour amis'] },
    'spotify-30': { usage: 'Le crédit Spotify Premium vous offre du streaming musical sans publicité. Utilisable pour les abonnements Spotify Premium en Suisse.', examples: ['Spotify Premium Individual', 'Spotify Duo', 'Spotify Family', 'Spotify Student'] },
    'apple-50': { usage: 'Le crédit Apple charge votre Apple ID. Achetez apps, jeux, musique, films, iCloud+ et plus dans l\'App Store et iTunes.', examples: ['Apps iPhone/iPad', 'Apple Music', 'Stockage iCloud+', 'Films Apple TV+'] },
    'google-play-50': { usage: 'Le crédit Google Play est crédité à votre Google Account. Achetez apps Android, jeux, films et livres dans le Play Store.', examples: ['Apps Android', 'Jeux mobiles', 'YouTube Premium', 'Stockage Google One'] },
    'roblox-25': { usage: 'Le crédit Roblox est converti en Robux. Achetez objets en jeu, accessoires avatar et fonctions premium dans Roblox.', examples: ['Robux (monnaie en jeu)', 'Vêtements avatar', 'Game passes', 'Roblox Premium'] },
    'amazon-50': { usage: 'Les bons Amazon.de peuvent être utilisés pour des millions de produits sur Amazon.de. Des trombones aux téléviseurs.', examples: ['Électronique', 'Livres & audiobooks', 'Articles ménagers', 'Adhésion Prime'] },
  },
  it: {
    'steam-50': { usage: 'Il credito Steam viene riscattato direttamente nel tuo Steam Wallet. Acquista giochi PC, DLC, oggetti in-game e software nello Steam Store.', examples: ['Skin Counter-Strike 2', 'Nuovi giochi PC', 'DLC di giochi', 'Software Steam'] },
    'playstation-50': { usage: 'Il credito PlayStation Store carica il tuo PSN Wallet. Acquista giochi PS5/PS4/PS3, abbonamenti e contenuti nel PlayStation Store.', examples: ['Esclusivi PS5', 'PlayStation Plus', 'DLC di giochi', 'Valuta in-game'] },
    'xbox-50': { usage: 'Il credito Xbox Live è accreditato al tuo Microsoft Account. Acquista giochi Xbox Series X|S, Game Pass e contenuti nel Microsoft Store.', examples: ['Xbox Game Pass', 'Giochi Xbox Series X', 'Xbox Live Gold', 'Oggetti in-game'] },
    'nintendo-50': { usage: 'Il credito Nintendo eShop carica il tuo Nintendo Account. Acquista giochi Switch, giochi indipendenti e DLC nel Nintendo eShop.', examples: ['Giochi Super Mario', 'Zelda: BOTW/TOTK', 'Nintendo Switch Online', 'Giochi indie'] },
    'netflix-30': { usage: 'Le carte regalo Netflix possono essere riscattate per qualsiasi abbonamento Netflix. Perfette per regalare o per il tuo abbonamento.', examples: ['Netflix Standard con pub', 'Netflix Standard', 'Netflix Premium 4K', 'Regalo per amici'] },
    'spotify-30': { usage: 'Il credito Spotify Premium ti offre streaming musicale senza pubblicità. Riscattabile per abbonamenti Spotify Premium in Svizzera.', examples: ['Spotify Premium Individual', 'Spotify Duo', 'Spotify Family', 'Spotify Student'] },
    'apple-50': { usage: 'Il credito Apple carica il tuo Apple ID. Acquista app, giochi, musica, film, iCloud+ e altro nell\'App Store e iTunes.', examples: ['App iPhone/iPad', 'Apple Music', 'Archiviazione iCloud+', 'Film Apple TV+'] },
    'google-play-50': { usage: 'Il credito Google Play è accreditato al tuo Google Account. Acquista app Android, giochi, film e libri nel Play Store.', examples: ['App Android', 'Giochi mobile', 'YouTube Premium', 'Archiviazione Google One'] },
    'roblox-25': { usage: 'Il credito Roblox viene convertito in Robux. Acquista oggetti in-game, accessori avatar e funzioni premium in Roblox.', examples: ['Robux (valuta in-game)', 'Abbigliamento avatar', 'Game passes', 'Roblox Premium'] },
    'amazon-50': { usage: 'I buoni Amazon.de possono essere riscattati per milioni di prodotti su Amazon.de. Dalle graffette ai televisori.', examples: ['Elettronica', 'Libri & audiolibri', 'Articoli domestici', 'Abbonamento Prime'] },
  },
};

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: Record<string, string>;
  inStock: boolean;
  deliveryTime: string;
  region: string;
}

export default function ProductDetail({ product }: { product: Product }) {
  const { language, t } = useLanguage();
  const info = productInfo[language]?.[product.id] || productInfo['de'][product.id];
  
  const getDescription = () => {
    return product.description[language] || product.description.de;
  };

  return (
    <main className="pt-14">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <nav className="flex text-xs sm:text-sm text-slate-400 flex-wrap gap-1">
          <Link href="/" className="hover:text-white transition-colors">{t.common.backToHome}</Link>
          <span className="mx-1">/</span>
          <span className="text-white truncate">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="bg-slate-800/50 backdrop-blur rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-700">
            <div className="relative bg-white rounded-lg sm:rounded-xl aspect-[4/3] overflow-hidden flex items-center justify-center p-6 sm:p-8 lg:p-12">
              {brandImages[product.brand] ? (
                <img 
                  src={brandImages[product.brand]} 
                  alt={product.brand}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <span className="text-6xl sm:text-7xl lg:text-8xl font-bold text-slate-800">
                  {product.brand.slice(0, 2)}
                </span>
              )}
            </div>
            
            {/* Trust badges */}
            <div className="mt-4 sm:mt-6 grid grid-cols-4 gap-2 sm:gap-3">
              <div className="bg-green-500/10 rounded-lg p-2 sm:p-3 text-center border border-green-500/20">
                <div className="text-green-400 text-lg sm:text-xl">⚡</div>
                <div className="text-green-400 text-[10px] sm:text-xs">{t.common.instantDelivery.split(' ')[0]}</div>
              </div>
              <div className="bg-blue-500/10 rounded-lg p-2 sm:p-3 text-center border border-blue-500/20">
                <div className="text-blue-400 text-lg sm:text-xl">✉️</div>
                <div className="text-blue-400 text-[10px] sm:text-xs">E-Mail</div>
              </div>
              <div className="bg-purple-500/10 rounded-lg p-2 sm:p-3 text-center border border-purple-500/20">
                <div className="text-purple-400 text-lg sm:text-xl">🔒</div>
                <div className="text-purple-400 text-[10px] sm:text-xs">{t.common.secure}</div>
              </div>
              <div className="bg-yellow-500/10 rounded-lg p-2 sm:p-3 text-center border border-yellow-500/20">
                <div className="text-yellow-400 text-lg sm:text-xl">↩️</div>
                <div className="text-yellow-400 text-[10px] sm:text-xs">{t.product.features}</div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="text-white space-y-4 sm:space-y-6">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 leading-tight">{product.name}</h1>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{getDescription()}</p>
            </div>

            {/* Price */}
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 sm:p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div>
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold">€{product.price.toFixed(2)}</span>
                  <span className="text-lg sm:text-xl lg:text-2xl ml-1 sm:ml-2">EUR</span>
                </div>
                {product.inStock && (
                  <span className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 bg-green-500/20 text-green-300 rounded-lg border border-green-500/30 text-xs sm:text-sm">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="hidden sm:inline">{t.common.available247}</span>
                    <span className="sm:hidden">✓</span>
                  </span>
                )}
              </div>
              <AddToCartButton 
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  currency: siteConfig.currency,
                  image: '',
                  brand: product.brand,
                }} 
              />
            </div>

            {/* What you can buy */}
            {info && (
              <div className="bg-slate-800/30 rounded-xl p-4 sm:p-6 border border-slate-700">
                <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">{t.product.denominations}</h2>
                <p className="text-slate-300 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">{info.usage}</p>
                <h3 className="text-xs sm:text-sm font-semibold mb-2 text-slate-400">{t.product.examples || 'Beispiele:'}</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {info.examples.map((example, i) => (
                    <span key={i} className="bg-blue-500/10 text-blue-300 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs border border-blue-500/20">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery info */}
            <div className="bg-slate-800/30 rounded-xl p-4 sm:p-6 border border-slate-700 space-y-2 sm:space-y-3">
              <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">{t.product.deliveryInfo}</h2>
              
              <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-slate-300 text-xs sm:text-sm">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>{t.common.deliveryTime}: {product.deliveryTime}</span>
              </div>

              <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-slate-300 text-xs sm:text-sm">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{t.product.deliveryMethod}</span>
              </div>

              <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-slate-300 text-xs sm:text-sm">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{t.product.region}: {product.region}</span>
              </div>

              <div className="flex items-start sm:items-center gap-2 sm:gap-3 text-slate-300 text-xs sm:text-sm">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>{t.product.paymentMethods}</span>
              </div>
            </div>

            {/* How it works */}
            <div className="bg-slate-800/30 rounded-xl p-4 sm:p-6 border border-slate-700">
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t.product.howItWorks}</h2>
              <ol className="space-y-2 sm:space-y-3 text-slate-300 text-xs sm:text-sm">
                <li className="flex gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span>{t.product.step1}</span>
                </li>
                <li className="flex gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span>{t.product.step2}</span>
                </li>
                <li className="flex gap-2 sm:gap-3">
                  <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span>{t.product.step3}</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
