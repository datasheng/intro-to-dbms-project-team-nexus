import React, { ReactNode } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Replace with your own publishable key from Stripe
const stripePromise = loadStripe('pk_test_51PhHCpRoX12iLnjXjk5cwUrJMkLp8DCseaZLOzffxv7YkeowGxn5b2RUvufhurlEj9OZR0JSvQbMQs7zQ25lsz1T00NY28q9za');

interface StripeContextProps {
  children: ReactNode;
}

const StripeContext: React.FC<StripeContextProps> = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeContext;
