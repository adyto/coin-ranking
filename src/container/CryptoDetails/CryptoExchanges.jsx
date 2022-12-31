import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import Select from 'react-select';
import millify from 'millify';
import { useStateContext } from '../../context/StateContext';
import { useGetCryptoCoinExchangesQuery } from '../../services/cryptoApi';

const CryptoExchanges = ({ simplified }) => {
  const { coinId } = useParams();
  const count = simplified ? 5 : 100;

  const {
    currencyLabel,
    currencyId,
    currencySign,
    currencySymbol,
    optionsCurrency,
    handleChangeCurrency,
  } = useStateContext();

  const [coinExchanges, setCoinExchanges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: cryptoCoinExchanges, isFetching } =
    useGetCryptoCoinExchangesQuery({
      coinId,
      count,
      currencyId,
    });

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  console.log(cryptoCoinExchanges?.data?.stats);

  useEffect(() => {
    const filteredData = cryptoCoinExchanges?.data?.exchanges.filter(
      (coinExchange) =>
        coinExchange.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setCoinExchanges(filteredData);
  }, [cryptoCoinExchanges, searchTerm]);

  if (isFetching) return 'Loading...';

  return (
    <>
      <div className="my-7">
        {!simplified && (
          <>
            <div className="flex flex-row">
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
              placeholder="Find a Exchange"
              onChange={handleChangeSearch}
              value={searchTerm}
            />
          </>
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        {coinExchanges?.map((coinExchange) => (
          <Link
            to={`/exchanges/${coinExchange.uuid}`}
            key={coinExchange.uuid}
            className="flex flex-col max-w-xs w-full border"
          >
            <div className="flex flex-row justify-between items-center">
              <p>
                {coinExchange.rank}. {coinExchange.name}
              </p>
              <div className="flex flex-col">
                <p>
                  24hVolume:
                  {millify(coinExchange?.['24hVolume'], {
                    units: ['', 'K', 'million', 'billion', 'T', 'P', 'E'],
                    space: true,
                    precision: 2,
                  })}
                </p>
                <p>
                  Price :
                  <NumericFormat
                    value={coinExchange.price}
                    displayType="text"
                    decimalScale={2}
                    prefix={`${
                      currencySign !== `null` ? currencySign : currencySymbol
                    }`}
                    thousandsGroupStyle="thousand"
                    thousandSeparator=","
                  />
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {!simplified && (
        <div className="flex flex-row gap-4">
          <div className="flex flex-col">
            <p>Exchanges</p>
            <p>{cryptoCoinExchanges?.data?.stats.total}</p>
          </div>
          <div className="flex flex-col">
            <p>24h trade volume</p>
            <p>
              {`${currencySign !== `null` ? currencySign : currencySymbol}`}
              {millify(cryptoCoinExchanges?.data?.stats?.['24hVolume'], {
                units: ['', 'K', 'million', 'billion', 'T', 'P', 'E'],
                space: true,
                precision: 2,
              })}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CryptoExchanges;
