import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { FaCog, FaRegClock, FaRegMoneyBillAlt } from 'react-icons/fa';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import { IResponse } from 'src/shared/shared.interface';
import { saveToLocalStorage, showErrorToast } from 'src/shared/utils/utils.service';

import { IOffer } from '../interfaces/order.interface';
import { useCreateOrderIntentMutation } from '../services/order.service';
import CheckoutForm from './checkout-form/CheckoutForm';

const Checkout: FC = (): ReactElement => {
  const stripePromise = useMemo(() => loadStripe(import.meta.env.VITE_STRIPE_KEY), []);
  const [clientSecret, setClientSecret] = useState<string>('');
  const { gigId } = useParams<string>();
  const [searchParams] = useSearchParams({});
  const { state }: { state: ISellerGig } = useLocation();
  const [offer] = useState<IOffer>(JSON.parse(`${searchParams.get('offer')}`));
  const serviceFee: number = offer.price < 50 ? (5.5 / 100) * offer.price + 2 : (5.5 / 100) * offer.price;
  const [createOrderIntent] = useCreateOrderIntentMutation();

  const createBuyerOrderIntent = async (): Promise<void> => {
    try {
      const response: IResponse = await createOrderIntent(offer.price).unwrap();
      setClientSecret(`${response.clientSecret}`);
      saveToLocalStorage('paymentIntentId', JSON.stringify(`${response.paymentIntentId}`));
    } catch (error) {
      showErrorToast('Error with checkout.');
    }
  };

  useEffect(() => {
    createBuyerOrderIntent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = { clientSecret } as StripeElementsOptions;

  return (
    <div className="container mx-auto h-screen">
      <div className="flex flex-wrap">
        <div className="w-full p-4 lg:w-2/3 order-last lg:order-first">
          <div className="border border-grey">
            <div className="text-xl font-medium mb-3 pt-3 pb-4 px-4">
              <span>Payment</span>
            </div>
            {clientSecret && (
              <Elements options={options} key={clientSecret} stripe={stripePromise}>
                <CheckoutForm gigId={`${gigId}`} offer={offer} />
              </Elements>
            )}
            {/* <!-- CheckoutForm --> */}
          </div>
        </div>

        <div className="w-full p-4 lg:w-1/3">
          <div className="border border-grey mb-8">
            <div className="pt-3 pb-4 px-4 mb-2 flex flex-col border-b md:flex-row">
              <img className="object-cover w-20 h-11" src={state.coverImage} alt="Gig Cover Image" />
              <h4 className="font-bold text-sm text-[#161c2d] mt-2 md:pl-4 md:mt-0">{state.title}</h4>
            </div>
            <ul className="list-none mb-0">
              <li className="flex px-4 pt-1 pb-3 border-b border-grey">
                <div className="font-normal text-sm">{state.description}</div>
              </li>
              <li className="flex justify-between px-4 pt-2 pb-2">
                <div className="text-sm font-normal flex gap-2">
                  <FaRegClock className="self-center" /> Expected delivery time
                </div>
                <span className="text-sm">
                  {offer.deliveryInDays} day{offer.deliveryInDays > 1 ? 's' : ''}
                </span>
              </li>
              <li className="flex justify-between px-4 pt-2 pb-2">
                <div className="text-sm font-normal flex gap-2">
                  <FaRegMoneyBillAlt className="self-center" /> Price
                </div>
                <span className="text-sm">${offer.price}</span>
              </li>
              <li className="flex justify-between px-4 pt-2 pb-2">
                <div className="text-sm font-normal flex gap-2">
                  <FaCog className="self-center" /> Service fee
                </div>
                <span className="text-sm">${serviceFee.toFixed(2)}</span>
              </li>
              <div className="border-b border-grey" />
              <li className="flex justify-between px-4 py-4">
                <div className="text-sm md:text-base font-semibold flex gap-2">
                  <FaCog className="self-center" /> Total
                </div>
                <span className="text-sm md:text-base font-semibold">${offer.price + serviceFee}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
