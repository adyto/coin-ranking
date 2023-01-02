import React from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { CryptoCurrencies, News } from '../index';
import { Navbar } from '../../components';
import { useStateContext } from '../../context/StateContext';

const HomePage = () => {
  const { currencySign, currencySymbol, cryptoStat } = useStateContext();

  return (
    <div className="flex flex-col container mx-auto">
      <Navbar cryptoStat={cryptoStat} />
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
      <div className="flex flex-row gap-4 justify-center mt-8">
        <div className="border-none shadow-md w-60 rounded-md p-4 bg-[#ffffff] dark:bg-[#323546]">
          <div className="flex flex-col">
            <p className="font-semibold text-center mb-2">Best Coins</p>
            {cryptoStat?.bestCoins.map((res, i) => (
              <Link
                to={`/crypto/${res.uuid}`}
                key={res.uuid}
                className="flex flex-row items-center gap-4 justify-right my-2"
              >
                <p className="text-xs w-4 text-center">{++i}</p>
                <div className="flex flex-row space-x-2">
                  <img src={res.iconUrl} className="w-4 h-4" />
                  <span className="text-xs font-bold">{res.name}</span>
                  <span className="text-xs">{res.symbol}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="border-none shadow-md w-60 rounded-md p-4 bg-[#ffffff] dark:bg-[#323546]">
          <div className="flex flex-col">
            <p className="font-semibold text-center mb-2">Newest Coins</p>
            {cryptoStat?.newestCoins.map((res, i) => (
              <Link
                to={`/crypto/${res.uuid}`}
                key={res.uuid}
                className="flex flex-row items-center gap-4 justify-right my-2"
              >
                <p className="text-xs w-4 text-center">{++i}</p>
                <div className="flex flex-row space-x-2">
                  <img src={res.iconUrl} className="w-4 h-4" />
                  <span className="text-xs font-bold">{res.name}</span>
                  <span className="text-xs">{res.symbol}</span>
                </div>
              </Link>
            ))}
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
    </div>
  );
};

export default HomePage;
