import React from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { CryptoCurrencies, News, BannerCoin } from '../index';
import { Navbar } from '../../components';
import { useStateContext } from '../../context/StateContext';

const HomePage = () => {
  const { currencySign, currencySymbol, cryptoStat } = useStateContext();

  return (
    <div className="flex flex-col container mx-auto">
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">
          Today's Cryptocurrency Prices by Market Cap
        </h1>
        <h2 className="font-medium text-sm">
          The global crypto market cap is{' '}
          <span className="font-bold">
            {`${currencySign !== `null` ? currencySign : currencySymbol}`}
            {millify(cryptoStat?.totalMarketCap, {
              units: ['', 'K', 'million', 'billion', 'T', 'P', 'E'],
              space: true,
              precision: 2,
            })}
          </span>
        </h2>
      </div>
      <BannerCoin />
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
    </div>
  );
};

export default HomePage;
