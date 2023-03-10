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
      query: ({ count, currencyId, timePeriod, orderBy }) =>
        createRequest(
          `coins?limit=${count}&referenceCurrencyUuid=${currencyId}&timePeriod=${timePeriod}&orderBy=${orderBy}`,
        ),
    }),
    getCryptosTags: builder.query({
      query: ({ count, currencyId, timePeriod, orderBy, tagsId }) =>
        createRequest(
          `coins?limit=${count}&referenceCurrencyUuid=${currencyId}&timePeriod=${timePeriod}&orderBy=${orderBy}&tags%5B0%5D=${tagsId}`,
        ),
    }),
    getCryptosNews: builder.query({
      query: (count) => createRequest(`coins?limit=${count}`),
    }),
    getCryptosIndex: builder.query({
      query: () => createRequest(`indexes/coins`),
    }),
    getCryptosSearch: builder.query({
      query: ({ currencyId }) =>
        createRequest(`search-suggestions?referenceCurrencyUuid=${currencyId}`),
    }),
    getCryptosStats: builder.query({
      query: ({ currencyId }) =>
        createRequest(`stats?referenceCurrencyUuid=${currencyId}`),
    }),
    getCryptoDetails: builder.query({
      query: ({ coinId, timePeriod, currencyId }) =>
        createRequest(
          `coin/${coinId}?timePeriod=${timePeriod}&referenceCurrencyUuid=${currencyId}`,
        ),
    }),
    getCryptoPrices: builder.query({
      query: ({ coinId, currencyId }) =>
        createRequest(
          `coin/${coinId}/price?referenceCurrencyUuid=${currencyId}`,
        ),
    }),
    getCryptoHistorys: builder.query({
      query: ({ coinId, timePeriod, currencyId }) =>
        createRequest(
          `coin/${coinId}/history?timePeriod=${timePeriod}&referenceCurrencyUuid=${currencyId}`,
        ),
    }),
    getCryptoSupplys: builder.query({
      query: ({ coinId }) => createRequest(`coin/${coinId}/supply`),
    }),
    getCryptoIssuances: builder.query({
      query: ({ coinId }) =>
        createRequest(`coin/${coinId}/issuance-blockchains`),
    }),
    getCryptoCoinExchanges: builder.query({
      query: ({ coinId, count, currencyId }) =>
        createRequest(
          `coin/${coinId}/exchanges?limit=${count}&referenceCurrencyUuid=${currencyId}`,
        ),
    }),
    getCryptoCoinMarkets: builder.query({
      query: ({ coinId, count, currencyId }) =>
        createRequest(
          `coin/${coinId}/markets?limit=${count}&referenceCurrencyUuid=${currencyId}`,
        ),
    }),
    getCryptoReferenceCurrencies: builder.query({
      query: () => createRequest(`reference-currencies`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptosTagsQuery,
  useGetCryptosNewsQuery,
  useGetCryptosIndexQuery,
  useGetCryptosStatsQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoPricesQuery,
  useGetCryptoHistorysQuery,
  useGetCryptoSupplysQuery,
  useGetCryptoIssuancesQuery,
  useGetCryptoCoinExchangesQuery,
  useGetCryptoCoinMarketsQuery,
  useGetCryptoReferenceCurrenciesQuery,
} = cryptoApi;
