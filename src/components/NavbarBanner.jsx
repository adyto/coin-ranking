import React from 'react';
import { NavLink } from 'react-router-dom';

const NavbarBanner = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-row space-x-1">
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
            className={({ isActive }) =>
              isActive
                ? 'text-green-600  border-none bg-green-100 px-2 py-2 rounded-md'
                : 'px-2 py-2 hover:text-green-600 hover:bg-green-100 hover:rounded-md'
            }
          >
            <span
              className={
                `${value}` === 'nft'
                  ? 'uppercase font-bold text-sm'
                  : 'capitalize font-bold text-sm'
              }
            >
              {value}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default NavbarBanner;
