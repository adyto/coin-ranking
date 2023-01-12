import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  CryptoDetails,
  CryptoCurrencies,
  HomePage,
  Exchanges,
  ExchangesDetails,
  News,
  CryptoExchanges,
  CryptoMarkets,
  CryptoTags,
} from './container';
import { useStateContext } from './context/StateContext';

const App = () => {
  const { darkMode } = useStateContext();
  return (
    <div className={`${darkMode ? 'dark' : 'light'} font-Montserrat`}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/exchanges/:exchangeId" element={<ExchangesDetails />} />
        <Route path="/cryptocurrencies" element={<CryptoCurrencies />} />
        <Route path="/cryptocurrencies/:tagsId" element={<CryptoTags />} />
        <Route path="/crypto/:coinId" element={<CryptoDetails />} />
        <Route path="/news" element={<News />} />
        <Route path="/crypto/:coinId/exchanges" element={<CryptoExchanges />} />
        <Route path="/crypto/:coinId/markets" element={<CryptoMarkets />} />
      </Routes>
    </div>
  );
};

export default App;
