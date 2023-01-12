import React from 'react';
import { NavLink } from 'react-router-dom';

const NavbarBanner = () => {
  return (
    <div className="flex flex-row">
      {[
        'all',
        'defi',
        'stablecoin',
        'nft',
        'dex',
        'exchange',
        'staking',
        'dao',
        'meme',
        'privacy',
      ].map((value) => (
        <NavLink
          key={value}
          end
          to={
            `/${value}` === '/all'
              ? '/cryptocurrencies'
              : `/cryptocurrencies/${value}`
          }
          className={({ isActive }) => (isActive ? 'text-blue-400' : null)}
        >
          {value}
        </NavLink>
      ))}
    </div>
  );
};

export default NavbarBanner;
