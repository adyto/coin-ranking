import React from 'react';
import { Link } from 'react-router-dom';

import icon from '../images/cryptocurrency.png';

const Navbar = () => {
  return (
    <div className="fixed left-0 m-0 h-screen bg-[#001529]">
      <div className="bg-[#001529] flex p-5 items-center w-full text-white space-x-4">
        <img src={icon} className="w-10 h-10" />
        <Link to="/" className="text-2xl">
          Coin-Ranking
        </Link>
      </div>
      <div className="flex flex-col text-white gap-8">
        <Link to="/">Home</Link>
        <Link to={'/cryptocurrencies'}>Cryptocurrencies</Link>
        <Link to={'/exchanges'}>Exchanges</Link>
        <Link to={'/news'}>News</Link>
      </div>
    </div>
  );
};

export default Navbar;
