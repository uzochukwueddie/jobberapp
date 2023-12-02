import { IResponse } from 'src/shared/shared.interface';
import { api } from 'src/store/api';

import { IReviewDocument } from '../interfaces/review.interface';

export const reviewApi = api.injectEndpoints({
  endpoints: (build) => ({
    getReviewsByGigId: build.query<IResponse, string>({
      query: (gigId: string) => `review/gig/${gigId}`,
      providesTags: ['Review']
    }),
    getReviewsBySellerId: build.query<IResponse, string>({
      query: (sellerId: string) => `review/seller/${sellerId}`,
      providesTags: ['Review']
    }),
    addReview: build.mutation<IResponse, { body: IReviewDocument }>({
      query({ body }) {
        return {
          url: 'review',
          method: 'POST',
          body
        };
      },
      invalidatesTags: ['Review']
    })
  })
});

export const { useGetReviewsByGigIdQuery, useGetReviewsBySellerIdQuery, useAddReviewMutation } = reviewApi;
