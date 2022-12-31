import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import millify from 'millify';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useStateContext } from '../../context/StateContext';
import { useGetCryptoCoinMarketsQuery } from '../../services/cryptoApi';

const CryptoMarkets = ({ simplified }) => {
  const { coinId } = useParams();
  const count = simplified ? 5 : 100;

  const {
    currencyLabel,
    currencyId,
    currencySign,
    optionsCurrency,
    handleChangeCurrency,
  } = useStateContext();

  const [coinMarkets, setCoinMarkets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: cryptoCoinMarkets, isFetching } = useGetCryptoCoinMarketsQuery({
    coinId,
    count,
    currencyId,
  });

  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  console.log(cryptoCoinMarkets?.data?.markets);
  useEffect(() => {
    const filteredData = cryptoCoinMarkets?.data?.markets.filter((coinMarket) =>
      coinMarket.exchange.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setCoinMarkets(filteredData);
  }, [cryptoCoinMarkets, searchTerm]);

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
              placeholder="Find a Markets"
              onChange={handleChangeSearch}
              value={searchTerm}
            />
          </>
        )}
        <div className="flex flex-wrap gap-4">
          {coinMarkets?.map((coinMarket) => (
            <Link
              to={`/market/${coinMarket.uuid}`}
              key={coinMarket.uuid}
              className="flex flex-col max-w-xs w-full border"
            >
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center">
                  <p>{coinMarket.rank}</p>
                  <img
                    src={coinMarket.exchange.iconUrl}
                    className="w-20 h-20"
                  />
                  <div className="flex flex-col">
                    <p>
                      {coinMarket.base.symbol} / {coinMarket.quote.symbol}
                    </p>
                    <p>{coinMarket.exchange.name}</p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p>
                    {millify(coinMarket?.['24hVolume'], {
                      units: ['', 'K', 'milion', 'bilion', 'T', 'P', 'E'],
                      space: true,
                      precision: 2,
                    })}
                  </p>
                  <p>
                    <NumericFormat
                      value={coinMarket.price}
                      displayType="text"
                      decimalScale={2}
                      prefix={currencySign}
                      thousandsGroupStyle="thousand"
                      thousandSeparator=","
                    />
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default CryptoMarkets;
