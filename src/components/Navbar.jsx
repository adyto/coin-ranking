import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BsMoon,
  BsCoin,
  BsTelegram,
  BsTwitter,
  BsLinkedin,
  BsGithub,
} from 'react-icons/bs';
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
    <div className=" bg-transparent flex flex-col w-full">
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
              className="w-9 h-9 text-black dark:text-zinc-50"
            />
            {toggle && (
              <div className="fixed z-20 w-3/4 h-screen right-0 top-0 flex flex-col items-end justify-start bg-white dark:bg-gray-800 py-4">
                <HiX
                  onClick={() => setToggle(false)}
                  className="w-9 h-9 text-black mr-4 dark:text-zinc-50"
                />
                <div className="flex flex-col w-full px-4 py-2">
                  {['home', 'cryptocurrencies', 'exchanges', 'news'].map(
                    (result) => (
                      <Link
                        to={`/${result}` === '/home' ? '/' : `/${result}`}
                        className="text-base border-b-[1px] py-4 font-bold capitalize"
                      >
                        {result}
                      </Link>
                    ),
                  )}
                  <div className="flex flex-row w-full mt-4 gap-4 ">
                    <div className="w-4/5">
                      <Select
                        onChange={handleChangeCurrency}
                        options={optionsCurrency}
                        defaultValue={{
                          value: `${currencyId}`,
                          label: `${currencyLabel}`,
                        }}
                      />
                    </div>
                    <div className="w-1/5">
                      <button
                        onClick={toggleDarkMode}
                        className="border-[1px] w-full h-full rounded-lg"
                      >
                        <div className=" flex justify-center">
                          {darkMode ? <MdLightMode /> : <BsMoon />}
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="py-4 text-center font-semibold text-sm border-b-[1px] dark:text-zinc-50 text-gray-500">
                    <a
                      href="https://rapidapi.com/Coinranking/api/coinranking1/"
                      target="_blank"
                    >
                      API Crypto
                    </a>
                  </div>
                  <div className="flex flex-row gap-4 justify-center my-4 text-gray-500 dark:text-zinc-50">
                    <a href="https://twitter.com/adiyulianto61" target="_blank">
                      <BsTwitter className="w-6 h-6" />
                    </a>
                    <a href="https://t.me/adiyulianto61" target="_blank">
                      <BsTelegram className="w-6 h-6" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/adi-yulianto-300486163/"
                      target={'_blank'}
                    >
                      <BsLinkedin className="w-6 h-6" />
                    </a>
                    <a href="https://github.com/adyto" target={'_blank'}>
                      <BsGithub className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
