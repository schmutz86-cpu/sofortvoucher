import { NextRequest, NextResponse } from 'next/server';

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

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID required' },
      { status: 400 }
    );
  }

  try {
    const stripe = await getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    return NextResponse.json({
      paid: session.payment_status === 'paid',
      status: session.status,
      paymentStatus: session.payment_status,
    });
  } catch (error) {
    console.error('Failed to verify payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
