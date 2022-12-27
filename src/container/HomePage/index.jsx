import React from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';

import { useGetCryptosHomeQuery } from '../../services/cryptoApi';
import { CryptoCurrencies, News } from '../index';

const HomePage = () => {
  const { data, isFetching } = useGetCryptosHomeQuery();
  const globalStats = data?.data?.stats;

  if (isFetching) return 'Loading...';
  return (
    <>
      <h1 className="text-2xl font-bold">Global Crypto Stats</h1>
      <div className="flex flex-row">
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col">
            <span>Total Cryptocurrencies</span>
            <span>{globalStats?.total}</span>
          </div>
          <div className="flex flex-col">
            <span>Total Exchanges</span>
            <span>{millify(globalStats?.totalExchanges)}</span>
          </div>
          <div className="flex flex-col">
            <span>Total Market Cap</span>
            <span>{millify(globalStats?.totalMarketCap)}</span>
          </div>
          <div className="flex flex-col">
            <span>Total Markets</span>
            <span>{millify(globalStats?.totalMarkets)}</span>
          </div>
          <div className="flex flex-col">
            <span>Total 24h Volume</span>
            <span>{millify(globalStats?.total24hVolume)}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-10">
        <h2>Top 10 Cryptocurrencies in the world</h2>
        <h3>
          <Link to={'/cryptocurrencies'}>Show more</Link>
        </h3>
      </div>
      <CryptoCurrencies simplified />
      <div className="flex justify-between items-center mt-10">
        <h2>Latest Crypto News</h2>
        <h3>
          <Link to={'/news'}>Show more</Link>
        </h3>
      </div>
      <News simplified />
    </>
  );
};

export default HomePage;
