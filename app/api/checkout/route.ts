import { NextRequest, NextResponse } from 'next/server';

// Stripe initialized inside handler to avoid build-time errors
async function getStripe() {
  const { default: Stripe } = await import('stripe');
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(secretKey, {
    apiVersion: '2024-12-18.acacia' as any,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, email, successUrl, cancelUrl } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'chf',
        product_data: {
          name: item.productName,
          description: `${item.platform} Guthabenkarte`,
        },
        unit_amount: Math.round(item.denomination * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe Checkout Session
    const stripe = await getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'twint'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: email,
      metadata: {
        orderItems: JSON.stringify(items.map((i: any) => ({
          productId: i.productId,
          quantity: i.quantity,
          denomination: i.denomination,
        }))),
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
