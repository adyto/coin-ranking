import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import {
  Navbar,
  Cryptocurrencies,
  CryptoDetails,
  HomePage,
  News,
  Exchanges,
} from './components';

const App = () => {
  return (
    <div className="flex flex-row overflow-hidden">
      <div className="flex-[0.2] bg-[#001529]">
        <Navbar />
      </div>

      <div className="flex-[0.8]">
        <div className="p-5">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
            <Route path="/crypto/:coinId" element={<CryptoDetails />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </div>
        <div className="flex flex-col p-5 items-center bg-[#001529] ">
          <h1 className="text-white text-center">
            CoinRanking <br /> All right reserverd{' '}
          </h1>
          <div>
            <Link to={'/'}>Home</Link>
            <Link to={'/exchanges'}>Exchanges</Link>
            <Link to="/news">News</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
