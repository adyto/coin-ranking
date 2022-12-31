import React from 'react';
import millify from 'millify';
import Select from 'react-select';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useStateContext } from '../../context/StateContext';
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistorysQuery,
  useGetCryptoPricesQuery,
} from '../../services/cryptoApi';

import {
  CryptoExchanges,
  CryptoMarkets,
  CryptoValue,
  CryptoSupply,
  CryptoDescription,
  CryptoLinks,
} from '../index';
import { LineChart } from '../../components';

const CryptoDetails = () => {
  const { coinId } = useParams();
  const {
    timePeriod,
    currencyId,
    currencyLabel,
    currencySymbol,
    currencySign,
    optionsCurrency,
    optionsTimePeriod,
    handleChangeCurrency,
    handleChangePeriod,
  } = useStateContext();

  const { data: cryptoDetails, isFetching } = useGetCryptoDetailsQuery({
    coinId,
    timePeriod,
    currencyId,
  });
  const { data: cryptoPrices } = useGetCryptoPricesQuery({
    coinId,
    currencyId,
  });
  const { data: cryptoHistorys } = useGetCryptoHistorysQuery({
    coinId,
    timePeriod,
    currencyId,
  });

  const cryptoDetail = cryptoDetails?.data?.coin;
  const cryptoPrice = cryptoPrices?.data;
  const cryptoHistory = cryptoHistorys?.data;

  if (isFetching) return 'Loading..';

  return (
    <>
      <div className="flex flex-col items-center">
        <p>{cryptoDetail.name} Price</p>
        <p>
          {cryptoDetail.name} live price in {currencyLabel}
        </p>
      </div>
      <div className="flex flex-row">
        <Select
          onChange={handleChangePeriod}
          options={optionsTimePeriod}
          defaultValue={{ value: `${timePeriod}`, label: `${timePeriod}` }}
          placeholder="Select time period"
        />
        <Select
          onChange={handleChangeCurrency}
          options={optionsCurrency}
          defaultValue={{ value: `${currencyId}`, label: `${currencyLabel}` }}
        />
      </div>
      <LineChart
        cryptoHistory={cryptoHistory}
        currenctPrice={millify(cryptoDetail.price)}
        coinName={cryptoDetail.name}
      />
      <div className="flex flex-col">
        <div className="flex flex-row my-4 items-center gap-2">
          <img src={cryptoDetail.iconUrl} className="w-16 h-16 " />
          <p>{cryptoDetail.name}</p>
          <p>{cryptoDetail.symbol}</p>
          <p>{cryptoDetail.rank}</p>
        </div>
        <div className="flex flex-row">
          <NumericFormat
            value={cryptoPrice?.price}
            displayType="text"
            thousandsGroupStyle="thousand"
            thousandSeparator=","
            prefix={`${
              currencySign !== `null` ? currencySign : currencySymbol
            }`}
            decimalScale={2}
            decimalSeparator="."
          />
        </div>
      </div>
      <CryptoValue
        cryptoDetail={cryptoDetail}
        currencySign={currencySign}
        currencySymbol={currencySymbol}
      />
      <CryptoSupply cryptoDetail={cryptoDetail} coinId={coinId} />

      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center mt-10">
          <h2>Best exchanges to buy {cryptoDetail?.name}</h2>
          <h3>
            <Link to={`/crypto/${coinId}/exchanges`}>
              All {cryptoDetail?.symbol} exchanges
            </Link>
          </h3>
        </div>
        <p>
          The top crypto exchanges that have {cryptoDetail?.name} available for
          trading, ranked by 24h trading volume and the current price.
        </p>
      </div>
      <CryptoExchanges simplified cryptoDetail={cryptoDetail} />

      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center mt-10">
          <h2>Markets of {cryptoDetail?.name}</h2>
          <h3>
            <Link to={`/crypto/${coinId}/markets`}>
              All {cryptoDetail?.symbol} markets
            </Link>
          </h3>
        </div>
        <p>
          A list of the top {cryptoDetail?.name} markets across all crypto
          exchanges based on the highest 24h trading volume, with their current
          price.
        </p>
      </div>
      <CryptoMarkets simplified />

      <CryptoDescription cryptoDetail={cryptoDetail} />
      <CryptoLinks cryptoDetail={cryptoDetail} />
    </>
  );
};

export default CryptoDetails;
