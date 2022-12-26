import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import Select from 'react-select';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { CiBitcoin } from 'react-icons/ci';
import { IoWaterOutline } from 'react-icons/io5';
import { IoMdPodium } from 'react-icons/io';
import { BiWater } from 'react-icons/bi';
import { CiTimer } from 'react-icons/ci';
import { NumericFormat } from 'react-number-format';
import timestamp from 'unix-timestamp';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistorysQuery,
  useGetCryptoIssuancesQuery,
  useGetCryptoPricesQuery,
  useGetCryptoSupplysQuery,
} from '../services/cryptoApi';
import CryptoExchanges from './CryptoExchanges';
import { useStateContext } from '../context/StateContext';

const CryptoDetails = () => {
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
  const { coinId } = useParams();

  const { data: cryptoPrices } = useGetCryptoPricesQuery({
    coinId,
    currencyId,
  });
  const { data: cryptoDetails, isFetching } = useGetCryptoDetailsQuery({
    coinId,
    timePeriod,
    currencyId,
  });
  const { data: cryptoHistorys } = useGetCryptoHistorysQuery({
    coinId,
    timePeriod,
    currencyId,
  });

  const { data: cryptoSupplys } = useGetCryptoSupplysQuery({
    coinId,
  });

  const { data: cryptoIssuances } = useGetCryptoIssuancesQuery({
    coinId,
  });

  const cryptoDetail = cryptoDetails?.data?.coin;
  const cryptoPrice = cryptoPrices?.data;
  const cryptoHistory = cryptoHistorys?.data;
  const cryptoSupply = cryptoSupplys?.data?.supply;
  const cryptoIssuance = cryptoIssuances?.data?.issuanceBlockchains;

  const statistics = [
    {
      title: 'Price to USD',
      value: (
        <NumericFormat
          value={cryptoDetail?.price}
          displayType="text"
          prefix={currencySign}
          decimalScale={2}
          thousandsGroupStyle="thousand"
          thousandSeparator=","
        />
      ),

      icon: <AiOutlineDollarCircle />,
    },
    {
      title: 'Price to BTC',
      value: (
        <NumericFormat
          value={cryptoDetail?.btcPrice}
          displayType="text"
          decimalScale={4}
          suffix={' BTC'}
        />
      ),
      icon: <CiBitcoin />,
    },
    {
      title: 'Coin Rank',
      value: `${cryptoDetail?.rank}`,
      icon: <IoMdPodium />,
    },
    {
      title: '24h Volume',
      value: `${
        cryptoDetail?.['24hVolume'] &&
        `${currencySign} ${millify(cryptoDetail?.['24hVolume'], {
          units: ['', 'K', 'M', 'billion', 'T', 'P', 'E'],
          space: true,
          precision: 2,
        })}`
      }`,
      icon: <IoWaterOutline />,
    },
    {
      title: 'Market Cap',
      value: `${currencySign} ${millify(cryptoDetail?.marketCap, {
        units: ['', 'K', 'M', 'billion', 'T', 'P', 'E'],
        space: true,
        precision: 2,
      })}`,
      icon: <BiWater />,
    },

    {
      title: 'All-time-high(daily avg)',
      value: (
        <NumericFormat
          value={cryptoDetail?.allTimeHigh?.price}
          displayType="text"
          prefix={currencySign}
          thousandsGroupStyle="thousand"
          thousandSeparator=","
          decimalScale={2}
        />
      ),
      icon: <CiTimer />,
      time: `${
        cryptoDetail?.allTimeHigh?.timestamp &&
        moment(
          timestamp.toDate(cryptoDetail?.allTimeHigh?.timestamp),
        ).calendar()
      }`,
    },
  ];
  const supply = [
    {
      title: 'Circulating supply',
      desc: "Circulating supply is the number of coins or tokens that's been mined or generated. It's the number of coins that's currently in public hands and circulating in the market.",
      value: `${
        cryptoSupply?.circulatingAmount &&
        `${millify(cryptoSupply?.circulatingAmount, {
          units: ['', 'K', 'million', 'billion', 'T', 'P', 'E'],
          space: true,
          precision: 2,
        })} ${cryptoDetail?.symbol}`
      }`,
    },
    {
      title: 'Total supply',
      desc: 'Total supply is the total number of coins that exist today',
      value: cryptoSupply?.totalAmount || cryptoSupply?.circulatingAmount,
    },
  ];

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
            prefix={currencySign}
            decimalScale={2}
            decimalSeparator="."
          />
        </div>
      </div>
      <div className="flex flex-col">
        <p>Value statistics</p>
        <span>
          An overview showing the statistics of {cryptoDetail?.name}, such as
          the base and quote currency, the rank, and trading volume.
        </span>
        {statistics.map((result) => (
          <div
            key={result.title}
            className="flex flex-row w-96 justify-between"
          >
            <div className="flex flex-row items-center">
              <span>{result.icon}</span>
              <p>{result.title}</p>
            </div>
            <div className="flex flex-col text-end">
              <span>{result.value}</span>
              {result?.time && result?.time}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <p>Supply information</p>
        <span>
          View the total and circulating supply of {cryptoDetail?.name},
          including details on how the supplies are calculated.
        </span>
        <div className="flex flex-col max-w-lg">
          {supply.map((result) => (
            <div key={result.title} className="flex flex-row justify-between">
              <div className="flex flex-row">
                <span>{result.title}</span>
              </div>
              <span>{result.value}</span>
            </div>
          ))}
          <div className="flex flex-row justify-between">
            <p>Issuance blockchain</p>
            <div className="flex flex-wrap">
              {cryptoIssuance?.map((res) => (
                <span key={res.name}>{res.name}</span>
              ))}
            </div>
            {/* <span>
            </span> */}
          </div>
        </div>
        <div className="flex justify-between items-center mt-10">
          <h2>Best exchanges to buy {cryptoDetail?.name}</h2>
          <h3>
            <Link to={`/crypto/${coinId}/exchanges`}>
              All {cryptoDetail?.symbol} exchanges
            </Link>
          </h3>
        </div>
        <CryptoExchanges simplified />
      </div>
    </>
  );
};

export default CryptoDetails;
