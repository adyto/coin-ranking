import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import millify from 'millify';
import { useStateContext } from '../../context/StateContext';
import { useGetCryptoCoinExchangesQuery } from '../../services/cryptoApi';

const CryptoExchanges = ({ simplified }) => {
  const { coinId } = useParams();
  const count = simplified ? 5 : 100;

  const { currencyId, currencySign } = useStateContext();

  const [coinExchanges, setCoinExchanges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: cryptoCoinExchanges, isFetching } =
    useGetCryptoCoinExchangesQuery({
      coinId,
      count,
      currencyId,
    });

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
