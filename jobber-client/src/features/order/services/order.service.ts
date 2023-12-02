import { IResponse } from 'src/shared/shared.interface';
import { api } from 'src/store/api';

import { IDeliveredWork, IExtendedDelivery, IOrderDocument, IOrderMessage } from '../interfaces/order.interface';

export const ordersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOrderByOrderId: build.query<IResponse, string>({
      query: (orderId: string) => `order/${orderId}`,
      providesTags: ['Order']
    }),
    getOrdersBySellerId: build.query<IResponse, string>({
      query: (sellerId: string) => `order/seller/${sellerId}`,
      providesTags: ['Order']
    }),
    getOrdersByBuyerId: build.query<IResponse, string>({
      query: (buyerId: string) => `order/buyer/${buyerId}`,
      providesTags: ['Order']
    }),
    createOrderIntent: build.mutation<IResponse, number>({
      query(price: number) {
        return {
          url: 'order/create-payment-intent',
          method: 'POST',
          body: { price }
        };
      },
      invalidatesTags: ['Order']
    }),
    createOrder: build.mutation<IResponse, IOrderDocument>({
      query(body: IOrderDocument) {
        return {
          url: 'order',
          method: 'POST',
          body
        };
      },
      invalidatesTags: ['Order']
    }),
    cancelOrder: build.mutation<IResponse, { paymentIntentId: string; orderId: string; body: IOrderMessage }>({
      query({ paymentIntentId, orderId, body }) {
        return {
          url: `order/cancel/${orderId}`,
          method: 'PUT',
          body: { paymentIntentId, orderData: body }
        };
      },
      invalidatesTags: ['Order']
    }),
    requestDeliveryDateExtension: build.mutation<IResponse, { orderId: string; body: IExtendedDelivery }>({
      query({ orderId, body }) {
        return {
          url: `order/extension/${orderId}`,
          method: 'PUT',
          body
        };
      },
      invalidatesTags: ['Order']
    }),
    updateDeliveryDate: build.mutation<IResponse, { orderId: string; type: string; body: IExtendedDelivery }>({
      query({ orderId, type, body }) {
        return {
          url: `order/gig/${type}/${orderId}`,
          method: 'PUT',
          body
        };
      },
      invalidatesTags: ['Order']
    }),
    deliverOrder: build.mutation<IResponse, { orderId: string; body: IDeliveredWork }>({
      query({ orderId, body }) {
        return {
          url: `order/deliver-order/${orderId}`,
          method: 'PUT',
          body
        };
      },
      invalidatesTags: ['Order']
    }),
    approveOrder: build.mutation<IResponse, { orderId: string; body: IOrderMessage }>({
      query({ orderId, body }) {
        return {
          url: `order/approve-order/${orderId}`,
          method: 'PUT',
          body
        };
      },
      invalidatesTags: ['Order']
    })
  })
});

export const {
  useGetOrderByOrderIdQuery,
  useGetOrdersBySellerIdQuery,
  useGetOrdersByBuyerIdQuery,
  useCreateOrderIntentMutation,
  useCreateOrderMutation,
  useCancelOrderMutation,
  useRequestDeliveryDateExtensionMutation,
  useUpdateDeliveryDateMutation,
  useDeliverOrderMutation,
  useApproveOrderMutation
} = ordersApi;
