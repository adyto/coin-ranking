import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  CryptoDetails,
  CryptoCurrencies,
  HomePage,
  Exchanges,
  News,
  CryptoExchanges,
  CryptoMarkets,
} from './container';
import { useStateContext } from './context/StateContext';

const App = () => {
  const { darkMode } = useStateContext();
  return (
    <div className={`${darkMode ? 'dark' : 'light'} font-Montserrat`}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exchanges/:exchangeId" element={<Exchanges />} />
        <Route path="/cryptocurrencies" element={<CryptoCurrencies />} />
        <Route path="/crypto/:coinId" element={<CryptoDetails />} />
        <Route path="/news" element={<News />} />
        <Route path="/crypto/:coinId/exchanges" element={<CryptoExchanges />} />
        <Route path="/crypto/:coinId/markets" element={<CryptoMarkets />} />
      </Routes>
    </div>
  );
};

export default App;
