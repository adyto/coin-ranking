import React, { useState, useEffect } from 'react';
import millify from 'millify';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';

import { useGetCryptosQuery } from '../../services/cryptoApi';
import { useStateContext } from '../../context/StateContext';

const CryptoCurrencies = ({ simplified }) => {
  const {
    timePeriod,
    currencyId,
    currencyLabel,
    optionsCurrency,
    optionsTimePeriod,
    handleChangeCurrency,
    handleChangePeriod,
  } = useStateContext();

  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: cryptoList, isFetching } = useGetCryptosQuery({
    count: simplified ? 10 : 100,
    currencyId,
    timePeriod,
  });

  const handleChangeInput = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  console.log(cryptos);

  console.log(cryptoList?.data?.stats);

  if (isFetching) return 'Loading ...';
  return (
    <>
      <div className="my-7">
        {!simplified && (
          <>
            <div className="flex flex-row">
              <Select
                onChange={handleChangePeriod}
                options={optionsTimePeriod}
                defaultValue={{
                  value: `${timePeriod}`,
                  label: `${timePeriod}`,
                }}
              />
              <Select
                onChange={handleChangeCurrency}
                options={optionsCurrency}
                defaultValue={{
                  value: `${currencyId}`,
                  label: `${currencyLabel}`,
                }}
              />
            </div>
            <input
              type={'text'}
              placeholder="Search Cryptocurrency"
              onChange={handleChangeInput}
              value={searchTerm}
            />
          </>
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
            <p>
              {timePeriod} Change:{' '}
              <NumericFormat
                value={currency.change}
                displayType="text"
                decimalScale={2}
                suffix={'%'}
                className={
                  currency.change < 0 ? 'text-red-500' : 'text-green-500'
                }
              />
            </p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CryptoCurrencies;
