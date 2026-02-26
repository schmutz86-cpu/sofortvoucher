// German-only translations for sofortvoucher.de

export type Language = 'de' | 'en';

export interface Translations {
  common: {
    siteName: string;
    tagline: string;
    instantDelivery: string;
    eurPrices: string;
    available247: string;
    addToCart: string;
    selectDenomination: string;
    deliveryTime: string;
    secure: string;
    backToHome: string;
    currency: string;
  };
  product: {
    description: string;
    denominations: string;
    examples: string;
    deliveryInfo: string;
    deliveryMethod: string;
    region: string;
    paymentMethods: string;
    howItWorks: string;
    step1: string;
    step2: string;
    step3: string;
    features: string;
    instantDeliveryDesc: string;
    securePaymentDesc: string;
    validCodesDesc: string;
  };
  home: {
    hero: string;
    heroSubtitle: string;
    featuredProducts: string;
    allProducts: string;
  };
  features: {
    instantTitle: string;
    instantDesc: string;
    supportTitle: string;
    supportDesc: string;
    secureTitle: string;
    secureDesc: string;
  };
  footer: {
    tagline: string;
    support: string;
    faq: string;
    contact: string;
    refund: string;
    legal: string;
    terms: string;
    privacy: string;
    impressum: string;
    copyright: string;
  };
}

export const translations: Record<Language, Translations> = {
  de: {
    common: {
      siteName: 'sofortvoucher.de',
      tagline: 'Gaming Guthabenkarten - Sofort per E-Mail - 100% Sicher',
      instantDelivery: 'Sofortlieferung (30 Sek.)',
      eurPrices: 'EUR Preise - Keine Gebühren',
      available247: '24/7 Verfügbar',
      addToCart: 'In den Warenkorb',
      selectDenomination: 'Wähle einen Betrag',
      deliveryTime: '30-60 Sekunden',
      secure: 'Sicher',
      backToHome: 'Startseite',
      currency: 'EUR',
    },
    product: {
      description: 'Beschreibung',
      denominations: 'Wofür kann ich es verwenden?',
      examples: 'Beispiele:',
      deliveryInfo: 'Lieferung & Sicherheit',
      deliveryMethod: 'Zustellung: Per E-Mail mit Anleitung',
      region: 'Region',
      paymentMethods: 'Zahlung: Kreditkarte, PayPal, SOFORT, Giropay',
      howItWorks: 'So funktioniert\'s',
      step1: 'Wähle Menge und lege in den Warenkorb',
      step2: 'Bezahle sicher mit PayPal, SOFORT oder Karte',
      step3: 'Code kommt sofort in deine E-Mail',
      features: 'Garantie',
      instantDeliveryDesc: 'Code innerhalb von 30-60 Sekunden per E-Mail',
      securePaymentDesc: 'Sichere Zahlung mit SSL-Verschlüsselung',
      validCodesDesc: 'Geprüfte und gültige Gift Card Codes',
    },
    home: {
      hero: '🎮 sofortvoucher.de',
      heroSubtitle: 'Gaming, Streaming & Shopping Cards: Sofort per E-Mail. 100% Sicher.',
      featuredProducts: 'Beliebteste Cards',
      allProducts: 'Alle Guthabenkarten',
    },
    features: {
      instantTitle: 'Sofortlieferung',
      instantDesc: 'Code per E-Mail in 30-60 Sekunden. Kein Warten.',
      supportTitle: 'Deutscher Support',
      supportDesc: 'EUR Preise, deutsche Zahlungsmethoden, kein Währungsumtausch.',
      secureTitle: '100% Sicher',
      secureDesc: 'Sichere Zahlung, geprüfte Codes, Geld-zurück-Garantie.',
    },
    footer: {
      tagline: 'Ihr deutscher Online-Shop für Gaming Guthabenkarten. Sofortlieferung, sicher und einfach.',
      support: 'Support',
      faq: 'FAQ',
      contact: 'Kontakt',
      refund: 'Widerruf',
      legal: 'Rechtliches',
      terms: 'AGB',
      privacy: 'Datenschutz',
      impressum: 'Impressum',
      copyright: '© 2026 sofortvoucher.de',
    },
  },
  
  en: {
    common: {
      siteName: 'sofortvoucher.de',
      tagline: 'Gaming Gift Cards - Instant Email Delivery - 100% Secure',
      instantDelivery: 'Instant Delivery (30 Sec.)',
      eurPrices: 'EUR Prices - No Fees',
      available247: '24/7 Available',
      addToCart: 'Add to Cart',
      selectDenomination: 'Select an Amount',
      deliveryTime: '30-60 seconds',
      secure: 'Secure',
      backToHome: 'Home',
      currency: 'EUR',
    },
    product: {
      description: 'Description',
      denominations: 'What can I use it for?',
      examples: 'Examples:',
      deliveryInfo: 'Delivery & Security',
      deliveryMethod: 'Delivery: Via email with instructions',
      region: 'Region',
      paymentMethods: 'Payment: Credit card, PayPal, SOFORT, Giropay',
      howItWorks: 'How it works',
      step1: 'Choose quantity and add to cart',
      step2: 'Pay securely with PayPal, SOFORT or card',
      step3: 'Code arrives instantly via email',
      features: 'Guarantee',
      instantDeliveryDesc: 'Code delivered via email within 30-60 seconds',
      securePaymentDesc: 'Secure payment with SSL encryption',
      validCodesDesc: 'Verified and valid gift card codes',
    },
    home: {
      hero: '🎮 sofortvoucher.de',
      heroSubtitle: 'Gaming, Streaming & Shopping Cards: Instant Email Delivery. 100% Secure.',
      featuredProducts: 'Popular Cards',
      allProducts: 'All Gift Cards',
    },
    features: {
      instantTitle: 'Instant Delivery',
      instantDesc: 'Code via email in 30-60 seconds. No waiting.',
      supportTitle: 'German Support',
      supportDesc: 'EUR prices, German payment methods, no currency conversion.',
      secureTitle: '100% Secure',
      secureDesc: 'Secure payment, verified codes, money-back guarantee.',
    },
    footer: {
      tagline: 'Your German online shop for gaming gift cards. Instant delivery, secure and easy.',
      support: 'Support',
      faq: 'FAQ',
      contact: 'Contact',
      refund: 'Refund Policy',
      legal: 'Legal',
      terms: 'Terms & Conditions',
      privacy: 'Privacy Policy',
      impressum: 'Imprint',
      copyright: '© 2026 sofortvoucher.de',
    },
  },
};

export function getTranslations(lang: Language): Translations {
  return translations[lang] || translations.de;
}

// Simplified for single-domain site
export function getDomainSpecificContent(domain: string, lang: Language = 'de') {
  return translations[lang] || translations.de;
}
