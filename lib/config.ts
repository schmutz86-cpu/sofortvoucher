// sofortvoucher.de configuration - German market only

export const siteConfig = {
  domain: 'sofortvoucher.de',
  name: 'sofortvoucher.de',
  currency: 'EUR' as const,
  locale: 'de-DE',
  supplier: 'reloadly',
  email: 'info@sofortvoucher.de',
  legal: {
    company: 'sofortvoucher.de',
    address: 'Deutschland',
    country: 'Deutschland',
  },
  paymentMethods: ['Kreditkarte', 'PayPal', 'SOFORT', 'Giropay'],
  flag: '🇩🇪',
  tagline: 'Ihr deutscher Online-Shop für Gaming Guthabenkarten',
};

export function useSiteConfig() {
  return siteConfig;
}

export function getSiteConfig() {
  return siteConfig;
}
