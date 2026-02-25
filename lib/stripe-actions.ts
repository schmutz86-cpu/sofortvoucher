"use server";

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-01-28.clover',
});

export async function createCheckoutSession(
  items: Array<{ id: string; name: string; price: number; quantity: number }>,
  email: string
) {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    customer_email: email,
    return_url: `${process.env.NEXT_PUBLIC_URL || 'https://sofortvoucher.de'}/bestellung/erfolgreich?session_id={CHECKOUT_SESSION_ID}`,
  });

  return { clientSecret: session.client_secret };
}
