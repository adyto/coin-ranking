import React, { useEffect, useState } from 'react';
import { useGetCryptoCoinExchangesQuery } from '../services/cryptoApi';
import { Link, useParams } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { useStateContext } from '../context/StateContext';
import millify from 'millify';

const CryptoExchanges = ({ simplified }) => {
  const count = simplified ? 5 : 100;

  const { currencyId, currencySign } = useStateContext();

  const { coinId } = useParams();

  const { data: cryptoCoinExchanges, isFetching } =
    useGetCryptoCoinExchangesQuery({
      coinId,
      count,
      currencyId,
    });

  const [coinExchanges, setCoinExchanges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  console.log(coinExchanges);

  const handleChangeInput = (event) => {
    setSearchTerm(event.target.value);
  };

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
    </>
  );
};

export default CryptoExchanges;
