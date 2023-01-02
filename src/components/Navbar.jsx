import React from 'react';
import { Link } from 'react-router-dom';
import { BsMoon, BsCoin } from 'react-icons/bs';
import Select from 'react-select';
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

  return (
    <div className="flex flex-col lg:flex-col-reverse">
      <div className="flex flex-row justify-between container mx-auto py-3">
        <div className="flex flex-row items-center lg:gap-2">
          <BsCoin className="lg:w-7 lg:h-7 text-green-500" />
          <Link to={'/'} className="font-semibold lg:text-2xl">
            Cryptoread
          </Link>
        </div>
        <div className="flex flex-row lg:gap-8 items-center max-lg:hidden">
          <div className="flex flex-row space-x-4">
            <Link to="/">Home</Link>
            <Link to={'/cryptocurrencies'}>Cryptocurrencies</Link>
            <Link to={'/exchanges'}>Exchanges</Link>
            <Link to={'/news'}>News</Link>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between container mx-auto py-2">
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
        <div className="flex flex-row max-lg:hidden">
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
    </div>
  );
};

export default Navbar;
