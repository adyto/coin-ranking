import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'X-RapidAPI-Key': '7aa74687b6msh4433449b45b4ecfp11f2cajsnd2251e98fd32',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
};

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://coinranking1.p.rapidapi.com' }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: ({ coinId }) => createRequest(`coin/${coinId}`),
    }),
    getCryptoHistorys: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`coin/${coinId}/history?timePeriod=${timePeriod}`),
    }),
    getCryptoSupplys: builder.query({
      query: ({ coinId }) => createRequest(`coin/${coinId}/supply`),
    }),
    getCryptoIssuances: builder.query({
      query: ({ coinId }) =>
        createRequest(`coin/${coinId}/issuance-blockchains`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistorysQuery,
  useGetCryptoSupplysQuery,
  useGetCryptoIssuancesQuery,
} = cryptoApi;
