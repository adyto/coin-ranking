import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleChangeInput = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  if (isFetching) return 'Loading ...';
  return (
    <>
      <div className="my-7">
        {!simplified && (
          <input
            type={'text'}
            placeholder="Search Cryptocurrency"
            onChange={handleChangeInput}
            value={searchTerm}
          />
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        {cryptos?.map((currency) => (
          <Link
            to={`/crypto/${currency.uuid}`}
            className="flex flex-col max-w-xs w-full border"
            key={currency.uuid}
          >
            <div className="flex flex-row justify-between items-center">
              <span>
                {currency.rank}. {currency.name}
              </span>
              <img src={currency.iconUrl} className="w-9" />
            </div>
            <p>Price: {millify(currency.price)}</p>
            <p>Market Cap: {millify(currency.marketCap)}</p>
            <p>Daily Change: {millify(currency.change)}%</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Cryptocurrencies;
