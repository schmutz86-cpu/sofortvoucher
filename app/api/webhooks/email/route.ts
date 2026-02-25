import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Webhook endpoint for email notifications
// Usage: Zapier/Make/n8n connects to IMAP, sends webhook here

// Verify webhook signature (security)
function verifySignature(body: string, signature: string): boolean {
  const WEBHOOK_SECRET = process.env.EMAIL_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    console.warn('EMAIL_WEBHOOK_SECRET not set, rejecting webhook');
    return false;
  }
  const expected = crypto.createHmac('sha256', WEBHOOK_SECRET).update(body).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-webhook-signature') || '';
    
    // Security verification
    if (!verifySignature(body, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
    
    const email = JSON.parse(body);
    
    // Log for now (later: send to Telegram/WhatsApp)
    console.log('New email received:', {
      from: email.from,
      subject: email.subject,
      timestamp: new Date().toISOString(),
    });
    
    // TODO: Forward to messaging channel
    // await sendToTelegram({ ...email });
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 });
  }
}
