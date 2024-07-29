"use client";

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styles from '../styles/PaymentPage.module.css';

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setError(error.message ?? 'An error occurred');
        setIsLoading(false);
      } else {
        // Replace with your backend endpoint to handle the payment
        const response = await fetch('/api/charge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            payment_method: paymentMethod.id,
          }),
        });

        const paymentResponse = await response.json();

        if (paymentResponse.error) {
          setError(paymentResponse.error);
          setIsLoading(false);
        } else {
          setSuccess('Payment successful!');
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button className={styles.button} type="submit" disabled={!stripe || isLoading}>
        {isLoading ? 'Processing...' : 'Pay $14.99'}
      </button>
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.error}>{success}</div>}
    </form>
  );
};

export default CheckoutForm;