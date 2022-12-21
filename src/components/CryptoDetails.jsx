import React, { useEffect, useState } from 'react';
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

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistorysQuery,
  useGetCryptoIssuancesQuery,
  useGetCryptoSupplysQuery,
} from '../services/cryptoApi';

const CryptoDetails = () => {
  const { coinId } = useParams();

  const { data: cryptoDetails, isFetching } = useGetCryptoDetailsQuery({
    coinId,
  });

  const [timePeriod, setTimePeriod] = useState('7d');
  const { data: cryptoHistorys } = useGetCryptoHistorysQuery({
    coinId,
    timePeriod,
  });
  const { data: cryptoSupplys } = useGetCryptoSupplysQuery({
    coinId,
  });
  const { data: cryptoIssuances } = useGetCryptoIssuancesQuery({
    coinId,
  });

  const cryptoDetail = cryptoDetails?.data?.coin;
  const cryptoHistory = cryptoHistorys?.data;
  const cryptoSupply = cryptoSupplys?.data?.supply;

  const cryptoIssuance = cryptoIssuances?.data?.issuanceBlockchains;
  console.log(cryptoSupply);
  const options = [
    {
      value: '3h',
      label: '3h',
    },
    {
      value: '24h',
      label: '24h',
    },
    {
      value: '7d',
      label: '7d',
    },
    {
      value: '30d',
      label: '30d',
    },
    {
      value: '1y',
      label: '1y',
    },
    {
      value: '3m',
      label: '3m',
    },
    {
      value: '3y',
      label: '3y',
    },
    {
      value: '5y',
      label: '5y',
    },
  ];

  const statistics = [
    {
      title: 'Price to USD',
      value: (
        <NumericFormat
          value={cryptoDetail?.price}
          displayType="text"
          prefix={'$'}
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
        `$ ${millify(cryptoDetail?.['24hVolume'], {
          units: ['', 'K', 'M', 'billion', 'T', 'P', 'E'],
          space: true,
          precision: 2,
        })}`
      }`,
      icon: <IoWaterOutline />,
    },
    {
      title: 'Market Cap',
      value: `$ ${millify(cryptoDetail?.marketCap, {
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
          prefix={'$'}
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
      value: `${cryptoSupply?.circulatingAmount}`,
    },
    {
      title: 'Total supply',
      desc: 'Total supply is the total number of coins that exist today',
      value: cryptoSupply?.totalAmount || cryptoSupply?.circulatingAmount,
    },
  ];

  if (isFetching) return 'Loading..';

  const handleChangeSelect = (value) => {
    setTimePeriod(value.value);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <p>{cryptoDetail.name} Price</p>
        <p>{cryptoDetail.name} live price in US DOLAR</p>
      </div>
      <Select
        onChange={handleChangeSelect}
        options={options}
        defaultValue={options[2]}
        placeholder="Select time period"
      />
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
            <div className="flex flex-col">
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
            <div className="flex flex-row justify-between">
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
                <span>{res.name}</span>
              ))}
            </div>
            {/* <span>
            </span> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CryptoDetails;
