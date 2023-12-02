import './CheckoutForm.scss';

import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Stripe, StripeElements, StripePaymentElement } from '@stripe/stripe-js';
import { FC, FormEvent, ReactElement, useEffect, useState } from 'react';
import { createSearchParams } from 'react-router-dom';
import Button from 'src/shared/button/Button';

import { ICheckoutProps } from '../../interfaces/order.interface';
import CheckoutFormSkeleton from './CheckoutFormSkeleton';

const CLIENT_ENDPOINT = import.meta.env.VITE_CLIENT_ENDPOINT;

const CheckoutForm: FC<ICheckoutProps> = ({ gigId, offer }): ReactElement => {
  const [isStripeLoading, setIsStripeLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const stripe: Stripe | null = useStripe();
  const elements: StripeElements | null = useElements();

  useEffect(() => {
    if (elements) {
      const element = elements.getElement(PaymentElement) as StripePaymentElement;
      if (element) {
        setIsStripeLoading(false);
      }
    }
  }, [elements]);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret: string = new URLSearchParams(window.location.search).get('payment_intent_client_secret') as string;
    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${CLIENT_ENDPOINT}/gig/order/requirement/${gigId}?${createSearchParams({
          offer: JSON.stringify(offer),
          order_date: `${new Date()}`
        })}`
      }
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(`${error.message}`);
    } else {
      setMessage('An unexpected error occurred');
    }
    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {isStripeLoading && <CheckoutFormSkeleton />}
      <PaymentElement id="payment-element" onReady={() => setIsStripeLoading(false)} />
      <Button
        id="submit"
        className={`w-full rounded px-6 py-3 text-center text-sm font-bold text-white focus:outline-none md:px-4 md:py-2 md:text-base ${
          isLoading || !stripe || !elements ? 'cursor-not-allowed bg-sky-200' : 'bg-sky-500 hover:bg-sky-400'
        }`}
        label={<span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : 'Confirm & Pay'}</span>}
      />
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
