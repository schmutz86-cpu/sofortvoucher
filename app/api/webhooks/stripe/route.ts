import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(secretKey, {
    apiVersion: '2024-12-18.acacia' as any,
  });
}

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature') || '';

  let event: Stripe.Event;
  const stripe = getStripe();

  try {
    if (!endpointSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not set');
    }
    event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    try {
      // Get order details
      const metadata = session.metadata || {};
      const orderItems = JSON.parse(metadata.orderItems || '[]');
      const customerEmail = session.customer_email;
      
      console.log('✅ Payment confirmed for:', customerEmail);
      console.log('🛒 Order items:', orderItems);
      console.log('💰 Amount:', session.amount_total, 'CHF');
      
      // TODO: Process order with Reloadly
      // TODO: Send gift codes via email
      // TODO: Save order to database
      
    } catch (error) {
      console.error('Failed to process order:', error);
    }
  }

  if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    console.log('❌ Payment failed:', paymentIntent.id);
  }

  return NextResponse.json({ received: true });
}
