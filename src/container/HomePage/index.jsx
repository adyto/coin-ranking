import React from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { CryptoCurrencies, News, BannerCoin } from '../index';
import { Navbar, Footer } from '../../components';
import { useStateContext } from '../../context/StateContext';

const HomePage = () => {
  const { currencySign, currencySymbol, cryptoStat } = useStateContext();

  return (
    <>
      <Navbar />
      <div className="flex flex-col container mt-24 lg:mt-10 mx-auto">
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <h1 className="text-xl font-bold lg:text-2xl">
            Today's Cryptocurrency Prices by Market Cap
          </h1>
          <h2 className="font-medium text-xs lg:text-sm">
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
        <div className="flex flex-col items-center mt-8 mb-5 gap-2">
          <h2 className="text-xl font-bold text-center">
            Top 10 Cryptocurrencies in the world
          </h2>
          <Link
            to={'/cryptocurrencies'}
            className="border-none px-4 py-2 rounded-md bg-slate-200 capitalize font-semibold text-sm shadow-md dark:bg-slate-500"
          >
            Show more
          </Link>
        </div>
        <CryptoCurrencies simplified />
        <div className="flex flex-col items-center mt-8 mb-5 gap-2">
          <h2 className="text-xl font-bold text-center">Latest Crypto News</h2>
          <h3>
            <Link
              to={'/news'}
              className="border-none px-4 py-2 rounded-md bg-slate-200 capitalize font-semibold text-sm shadow-md dark:bg-slate-500"
            >
              Show more
            </Link>
          </h3>
        </div>
        <News simplified />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
