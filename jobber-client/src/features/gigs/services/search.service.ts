import { IResponse } from 'src/shared/shared.interface';
import { api } from 'src/store/api';

export const searchGigsApi = api.injectEndpoints({
  endpoints: (build) => ({
    searchGigs: build.query<IResponse, { query: string; from: string; size: string; type: string }>({
      query: ({ query, from, size, type }) => `gig/search/${from}/${size}/${type}?${query}`,
      providesTags: ['Search']
    })
  })
});

export const { useSearchGigsQuery } = searchGigsApi;
