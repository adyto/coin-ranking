import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsMoon, BsCoin } from 'react-icons/bs';
import { MdLightMode } from 'react-icons/md';

import icon from '../images/cryptocurrency.png';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { toggleDarkMode, darkMode } = useStateContext();

  return (
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
        <div onClick={toggleDarkMode}>
          {darkMode ? <MdLightMode /> : <BsMoon />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
