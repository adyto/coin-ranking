import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsMoon, BsCoin } from 'react-icons/bs';
import Select from 'react-select';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { MdLightMode } from 'react-icons/md';
import { useStateContext } from '../context/StateContext';
import { NumericFormat } from 'react-number-format';

const Navbar = () => {
  const {
    toggleDarkMode,
    darkMode,
    currencyId,
    currencyLabel,
    currencySign,
    currencySymbol,
    optionsCurrency,
    handleChangeCurrency,
    cryptoStat,
  } = useStateContext();

  const [toggle, setToggle] = useState(false);

  return (
    <div className="bg-transparent flex flex-col w-full">
      <div className="flex flex-row justify-between container mx-auto py-2 max-lg:hidden">
        <div className="flex flex-row space-x-4 max-lg:flex-wrap max-lg:justify-center max-lg:space-x-0 max-lg:gap-x-2 max-lg:mx-auto">
          <span className="text-xs font-semibold">
            Cryptos:{' '}
            <NumericFormat
              value={cryptoStat?.totalCoins}
              thousandSeparator=","
              displayType="text"
              className="text-green-500"
            />
          </span>
          <span className="text-xs font-semibold">
            Exchanges:{' '}
            <span className="text-green-500">{cryptoStat?.totalExchanges}</span>
          </span>
          <span className="text-xs font-semibold">
            Market Cap:{' '}
            <NumericFormat
              value={cryptoStat?.totalMarketCap}
              prefix={`${
                currencySign !== `null` ? currencySign : currencySymbol
              }`}
              thousandsGroupStyle="thousand"
              thousandSeparator=","
              displayType="text"
              decimalScale={0}
              className="text-green-500"
            />
          </span>
          <span className="text-xs font-semibold">
            24h Volume:{' '}
            <NumericFormat
              value={cryptoStat?.total24hVolume}
              prefix={`${
                currencySign !== `null` ? currencySign : currencySymbol
              }`}
              thousandsGroupStyle="thousand"
              thousandSeparator=","
              displayType="text"
              decimalScale={0}
              className="text-green-500"
            />
          </span>
          <span className="text-xs font-semibold">
            BTC Dominance:{' '}
            <NumericFormat
              value={cryptoStat?.btcDominance}
              displayType="text"
              decimalScale={1}
              suffix={'%'}
              className="text-green-500"
            />
          </span>
        </div>
        <div className="flex flex-row">
          <Select
            onChange={handleChangeCurrency}
            options={optionsCurrency}
            defaultValue={{
              value: `${currencyId}`,
              label: `${currencyLabel}`,
            }}
          />
          <button onClick={toggleDarkMode}>
            {darkMode ? <MdLightMode /> : <BsMoon />}
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-between container mx-auto items-center max-lg:hidden">
        <div className="flex flex-row items-center">
          <BsCoin className="w-7 h-7 text-green-500" />
          <Link to={'/'} className="font-semibold text-2xl">
            Cryptoread
          </Link>
        </div>
        <div className="flex flex-row gap-8 items-center">
          <div className="flex flex-row space-x-4">
            <Link to="/">Home</Link>
            <Link to={'/cryptocurrencies'}>Cryptocurrencies</Link>
            <Link to={'/exchanges'}>Exchanges</Link>
            <Link to={'/news'}>News</Link>
          </div>
        </div>
      </div>
      <div className="fixed inset-x-0 top-0 z-50 bg-white/25 backdrop-blur-sm border-b-2 py-4 border-white/20 lg:hidden ">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-row items-center">
            <BsCoin className="w-7 h-7 text-green-500" />
            <Link to={'/'} className="font-semibold text-2xl">
              Cryptoread
            </Link>
          </div>
          <div className="flex mr-4">
            <HiMenuAlt4
              onClick={() => setToggle(true)}
              className="w-9 h-9 text-black"
            />
            {toggle && (
              <div className="fixed z-20 w-3/4 h-screen right-0 top-0 flex flex-col items-end justify-start bg-white py-4">
                <HiX
                  onClick={() => setToggle(false)}
                  className="w-9 h-9 text-black mr-4"
                />
                <div className="flex flex-col  w-full">123</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
