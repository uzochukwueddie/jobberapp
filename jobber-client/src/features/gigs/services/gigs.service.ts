import { IResponse } from 'src/shared/shared.interface';
import { api } from 'src/store/api';

import { ICreateGig, ISellerGig } from '../interfaces/gig.interface';

export const gigsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getGigById: build.query<IResponse, string>({
      query: (gigId: string) => `gig/${gigId}`,
      providesTags: ['Gigs']
    }),
    getGigsBySellerId: build.query<IResponse, string>({
      query: (sellerId: string) => `gig/seller/${sellerId}`,
      providesTags: ['Gigs']
    }),
    getSellerPausedGigs: build.query<IResponse, string>({
      query: (sellerId: string) => `gig/seller/pause/${sellerId}`,
      providesTags: ['Gigs']
    }),
    getGigsByCategory: build.query<IResponse, string>({
      query: (username: string) => `gig/category/${username}`,
      providesTags: ['Gigs']
    }),
    getMoreGigsLikeThis: build.query<IResponse, string>({
      query: (gigId: string) => `gig/similar/${gigId}`,
      providesTags: ['Gigs']
    }),
    getTopRatedGigsByCategory: build.query<IResponse, string>({
      query: (username: string) => `gig/top/${username}`,
      providesTags: ['Gigs']
    }),
    createGig: build.mutation<IResponse, ICreateGig>({
      query(body: ICreateGig) {
        return {
          url: 'gig/create',
          method: 'POST',
          body
        };
      },
      invalidatesTags: ['Gigs']
    }),
    updateGig: build.mutation<IResponse, { gigId: string; gig: ISellerGig }>({
      query({ gigId, gig }) {
        return {
          url: `gig/${gigId}`,
          method: 'PUT',
          body: gig
        };
      },
      invalidatesTags: ['Gigs']
    }),
    updateActiveGig: build.mutation<IResponse, { gigId: string; active: boolean }>({
      query({ gigId, active }) {
        return {
          url: `gig/active/${gigId}`,
          method: 'PUT',
          body: { active }
        };
      },
      invalidatesTags: ['Gigs']
    }),
    deleteGig: build.mutation<IResponse, { gigId: string; sellerId: string }>({
      query({ gigId, sellerId }) {
        return {
          url: `gig/${gigId}/${sellerId}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['Gigs']
    })
  })
});

export const {
  useGetGigByIdQuery,
  useGetGigsBySellerIdQuery,
  useGetSellerPausedGigsQuery,
  useGetGigsByCategoryQuery,
  useGetMoreGigsLikeThisQuery,
  useGetTopRatedGigsByCategoryQuery,
  useCreateGigMutation,
  useUpdateGigMutation,
  useUpdateActiveGigMutation,
  useDeleteGigMutation
} = gigsApi;
