import React from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../../context/StateContext';

const BannerCoin = () => {
  const { cryptoStat } = useStateContext();

  return (
    <div className="flex max-lg:flex-wrap flex-row gap-1 justify-center mt-8 sm:gap-2">
      <div className="border-none shadow-md w-52 rounded-md px-2 py-4 bg-[#ffffff] dark:bg-[#323546] sm:w-60 sm:px-3">
        <div className="flex flex-col">
          <p className="font-semibold text-center mb-2">Best Coins</p>
          {cryptoStat?.bestCoins.map((res, i) => (
            <Link
              to={`/crypto/${res.uuid}`}
              key={res.uuid}
              className="flex flex-row items-center gap-2 my-2 sm:gap-3"
            >
              <p className="text-xs w-4 text-center">{++i}</p>
              <div className="flex justify-between w-full items-center">
                <div className="flex flex-row space-x-2 items-center">
                  <img src={res.iconUrl} className="w-4 h-4" />
                  <span className="text-xs font-bold">{res.name}</span>
                </div>
                <p className="text-xs">{res.symbol}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="border-none shadow-md w-52 rounded-md px-2 py-4 bg-[#ffffff] dark:bg-[#323546] sm:w-60 sm:px-3">
        <div className="flex flex-col">
          <p className="font-semibold text-center mb-2">Newest Coins</p>
          {cryptoStat?.newestCoins.map((res, i) => (
            <Link
              to={`/crypto/${res.uuid}`}
              key={res.uuid}
              className="flex flex-row items-center gap-2 my-2 sm:gap-3"
            >
              <p className="text-xs w-4 text-center">{++i}</p>
              <div className="flex justify-between w-full items-center">
                <div className="flex flex-row space-x-2 items-center">
                  <img src={res.iconUrl} className="w-4 h-4" />
                  <p className="text-xs font-bold w-full">{res.name}</p>
                </div>
                <p className="text-xs">{res.symbol}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerCoin;
