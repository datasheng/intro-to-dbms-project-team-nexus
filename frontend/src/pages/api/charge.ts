import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Update to the latest API version if needed
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20', // Use the latest version
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { payment_method } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1499,
        currency: 'usd',
        payment_method,
        confirmation_method: 'manual',
        confirm: true,
      });

      res.status(200).json(paymentIntent);
    } catch (err) {
      if (err instanceof Error) { // Type guard to handle unknown type
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};
