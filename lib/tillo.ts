/**
 * Tillo Gift Cards API Client
 * Docs: https://tillo.tech/v2_docs/
 * Supports CHF products for Swiss market
 */

interface TilloConfig {
  apiKey: string;
  apiSecret: string;
  baseUrl: string;
}

interface TilloBrand {
  slug: string;
  name: string;
  type: string;
  status: { code: string };
  currency: string;
  discount: number;
  transaction_types: string[];
  delivery_methods: string[];
  countries_served: string[];
  digital_face_value_limits?: {
    lower: number;
    upper: number;
    minor_unit: number;
  };
}

interface TilloIssueResponse {
  code: string;
  status: string;
  message: string;
  data: {
    digital_code: {
      code: string;
      expiry_date?: string;
      url?: string;
      face_value: number;
      currency: string;
    };
    transaction_id: string;
  };
}

interface TilloBalanceResponse {
  code: string;
  status: string;
  data: {
    balance: number;
    currency: string;
  };
}

interface OrderItem {
  productId: string;
  productName: string;
  denomination: number;
  quantity: number;
  platform?: string;
}

// Brand mapping: our ID -> Tillo brand slug
// Tillo supports CHF products!
const TILLO_BRAND_MAP: Record<string, { slug: string; currency: string }> = {
  // Swiss products (CHF)
  'steam-50': { slug: 'steam', currency: 'CHF' },
  'steam-100': { slug: 'steam', currency: 'CHF' },
  'playstation-50': { slug: 'playstation', currency: 'CHF' },
  'xbox-50': { slug: 'xbox', currency: 'CHF' },
  'nintendo-50': { slug: 'nintendo', currency: 'CHF' },
  'netflix-30': { slug: 'netflix', currency: 'CHF' },
  'spotify-30': { slug: 'spotify', currency: 'CHF' },
  'apple-50': { slug: 'apple', currency: 'CHF' },
  'google-play-50': { slug: 'google-play', currency: 'CHF' },
  'roblox-25': { slug: 'roblox', currency: 'CHF' },
  'amazon-50': { slug: 'amazon', currency: 'CHF' },
};

// Get configuration based on environment
function getConfig(): TilloConfig {
  const isProduction = process.env.TILLO_ENV === 'production';
  
  if (isProduction) {
    if (!process.env.TILLO_API_KEY || !process.env.TILLO_API_SECRET) {
      throw new Error('TILLO_API_KEY and TILLO_API_SECRET must be set for production');
    }
    return {
      apiKey: process.env.TILLO_API_KEY,
      apiSecret: process.env.TILLO_API_SECRET,
      baseUrl: 'https://api.tillo.io/api/v2',
    };
  }
  
  // Sandbox
  if (!process.env.TILLO_SANDBOX_API_KEY || !process.env.TILLO_SANDBOX_API_SECRET) {
    // Fallback to hardcoded sandbox credentials for development
    return {
      apiKey: '9997778c5157f5a553debffad771497a6c4742365892aabd1e303defedcc28f2',
      apiSecret: 'e2c42e8feb2576996dbba78feda0ceb2924ee21e49615b813a5302fff52af770',
      baseUrl: 'https://sandbox.tillo.dev/api/v2',
    };
  }
  
  return {
    apiKey: process.env.TILLO_SANDBOX_API_KEY,
    apiSecret: process.env.TILLO_SANDBOX_API_SECRET,
    baseUrl: 'https://sandbox.tillo.dev/api/v2',
  };
}

/**
 * Generate HMAC-SHA256 signature for Tillo API
 * Format: API_KEY-HTTP_METHOD-ENDPOINT-CLIENT_REQUEST_ID-BRAND-TIMESTAMP
 */
function generateSignature(
  method: string,
  endpoint: string,
  clientRequestId: string,
  brand: string,
  timestamp: string,
  secret: string
): string {
  const signatureString = `${method}-${endpoint}-${clientRequestId}-${brand}-${timestamp}`;
  
  const hmac = require('crypto').createHmac('sha256', secret);
  hmac.update(signatureString);
  return hmac.digest('hex');
}

/**
 * Generate simple signature for GET requests (no brand/clientRequestId)
 * Format: API_KEY-HTTP_METHOD-ENDPOINT-TIMESTAMP
 */
function generateGetSignature(
  apiKey: string,
  method: string,
  endpoint: string,
  timestamp: string,
  secret: string
): string {
  const signatureString = `${apiKey}-${method}-${endpoint}-${timestamp}`;
  
  const crypto = require('crypto');
  return crypto.createHmac('sha256', secret).update(signatureString).digest('hex');
}

/**
 * Make authenticated request to Tillo API
 */
async function tilloRequest(
  method: string,
  endpoint: string,
  body?: any,
  brand?: string
): Promise<any> {
  const config = getConfig();
  const timestamp = Date.now().toString();
  const clientRequestId = `req-${timestamp}`;
  
  let signature: string;
  
  if (method === 'GET') {
    signature = generateGetSignature(config.apiKey, method, endpoint, timestamp, config.apiSecret);
  } else {
    // For POST requests with brand
    signature = generateSignature(method, endpoint, clientRequestId, brand || '', timestamp, config.apiSecret);
  }
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'API-Key': config.apiKey,
    'Signature': signature,
    'Timestamp': timestamp,
  };
  
  if (method !== 'GET') {
    headers['Client-Request-Id'] = clientRequestId;
  }
  
  const url = `${config.baseUrl}/${endpoint}`;
  
  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Tillo API error (${response.status}): ${error}`);
  }
  
  return response.json();
}

/**
 * Get all available brands
 */
export async function getBrands(): Promise<Record<string, TilloBrand>> {
  const response = await tilloRequest('GET', 'brands');
  return response.data?.brands || {};
}

/**
 * Get balance for a brand
 */
export async function getBalance(brandSlug: string): Promise<TilloBalanceResponse> {
  return tilloRequest('GET', `balance?brand=${brandSlug}`);
}

/**
 * Issue a digital gift card
 */
export async function issueDigitalCode(
  brandSlug: string,
  amount: number,
  currency: string,
  clientRequestId: string
): Promise<TilloIssueResponse> {
  return tilloRequest('POST', 'digital-issue', {
    brand: brandSlug,
    amount,
    currency,
    client_request_id: clientRequestId,
    send_digital_code_email: false, // We handle email ourselves
  }, brandSlug);
}

/**
 * Check if a product can be fulfilled via Tillo
 */
export function canFulfillViaTillo(productId: string): boolean {
  return productId in TILLO_BRAND_MAP;
}

/**
 * Get Tillo brand slug for our product
 */
export function getTilloBrand(productId: string): { slug: string; currency: string } | null {
  return TILLO_BRAND_MAP[productId] || null;
}

/**
 * Fulfill an order via Tillo
 * Returns order details with gift card codes
 */
export async function fulfillOrder(
  items: OrderItem[],
  customerEmail: string,
  orderId: string
): Promise<{
  success: boolean;
  codes: Array<{
    productName: string;
    code: string;
    expiryDate?: string;
    url?: string;
    faceValue: number;
    currency: string;
  }>;
  errors: string[];
}> {
  const codes: Array<{
    productName: string;
    code: string;
    expiryDate?: string;
    url?: string;
    faceValue: number;
    currency: string;
  }> = [];
  const errors: string[] = [];
  
  for (const item of items) {
    const brandInfo = getTilloBrand(item.productId);
    
    if (!brandInfo) {
      errors.push(`Product ${item.productId} not available via Tillo`);
      continue;
    }
    
    try {
      // Order each item
      for (let i = 0; i < item.quantity; i++) {
        const response = await issueDigitalCode(
          brandInfo.slug,
          item.denomination,
          brandInfo.currency,
          `${orderId}-${item.productId}-${i + 1}`
        );
        
        if (response.status === 'success' && response.data?.digital_code) {
          codes.push({
            productName: item.productName,
            code: response.data.digital_code.code,
            expiryDate: response.data.digital_code.expiry_date,
            url: response.data.digital_code.url,
            faceValue: response.data.digital_code.face_value,
            currency: response.data.digital_code.currency,
          });
        } else {
          errors.push(`Failed to issue code for ${item.productName}`);
        }
      }
    } catch (error: any) {
      errors.push(`Failed to order ${item.productName}: ${error.message}`);
    }
  }
  
  return {
    success: errors.length === 0,
    codes,
    errors,
  };
}

/**
 * Format gift card codes for email
 */
export function formatCodesForEmail(codes: Array<{
  productName: string;
  code: string;
  expiryDate?: string;
  url?: string;
  faceValue: number;
  currency: string;
}>): string {
  return codes.map(code => {
    const parts = [
      `🎮 ${code.productName} (${code.faceValue} ${code.currency})`,
      `   Code: ${code.code}`,
    ];
    
    if (code.url) {
      parts.push(`   URL: ${code.url}`);
    }
    
    if (code.expiryDate) {
      parts.push(`   Valid until: ${code.expiryDate}`);
    }
    
    return parts.join('\n');
  }).join('\n\n');
}

// Export types
export type { TilloBrand, TilloIssueResponse, OrderItem };
