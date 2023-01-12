import React, { createContext, useContext, useState } from 'react';
import {
  useGetCryptoReferenceCurrenciesQuery,
  useGetCryptosStatsQuery,
} from '../services/cryptoApi';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [timePeriod, setTimePeriod] = useState('24h');
  const [orderBy, setOrderBy] = useState('marketCap');
  const [currencyId, setCurrencyId] = useState('yhjMzLPhuIDl');
  const [currencyLabel, setCurrencyLabel] = useState('USD Dollar');
  const [currencySymbol, setCurrencySymbol] = useState('USD');
  const [currencySign, setCurrencySign] = useState('$');

  const { data: currencies } = useGetCryptoReferenceCurrenciesQuery();
  const { data: cryptoStats } = useGetCryptosStatsQuery({ currencyId });

  const optionsCurrency = currencies?.data?.currencies.map((item) => ({
    value: `${item.uuid}`,
    label: ` ${item.name}`,
    symbol: `${item.symbol}`,
    sign: `${item.sign}`,
  }));
  const cryptoStat = cryptoStats?.data;
  const optionsTimePeriod = [
    {
      value: '3h',
      label: '3h',
    },
    {
      value: '24h',
      label: '24h',
    },
    {
      value: '7d',
      label: '7d',
    },
    {
      value: '30d',
      label: '30d',
    },
    {
      value: '1y',
      label: '1y',
    },
    {
      value: '3m',
      label: '3m',
    },
    {
      value: '3y',
      label: '3y',
    },
    {
      value: '5y',
      label: '5y',
    },
  ];
  const optionsOrderBy = [
    {
      value: 'marketCap',
      label: 'marketCap',
    },
    {
      value: 'price',
      label: 'price',
    },
    {
      value: '24hVolume',
      label: '24hVolume',
    },
    {
      value: 'change',
      label: 'change',
    },
    {
      value: 'listedAt',
      label: 'listedAt',
    },
  ];

  const handleChangePeriod = (value) => {
    setTimePeriod(value.value);
  };
  const handleChangeOrderBy = (value) => {
    setOrderBy(value.value);
  };
  const handleChangeCurrency = (value) => {
    setCurrencyId(value.value);
    setCurrencyLabel(value.label);
    setCurrencySymbol(value.symbol);
    setCurrencySign(value.sign);
  };

  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <Context.Provider
      value={{
        timePeriod,
        orderBy,
        currencyId,
        currencyLabel,
        currencySymbol,
        currencySign,
        optionsCurrency,
        optionsTimePeriod,
        optionsOrderBy,
        handleChangePeriod,
        handleChangeOrderBy,
        handleChangeCurrency,
        darkMode,
        setDarkMode,
        toggleDarkMode,
        cryptoStat,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
