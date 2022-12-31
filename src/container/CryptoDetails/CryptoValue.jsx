import React from 'react';
import { NumericFormat } from 'react-number-format';
import millify from 'millify';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { CiBitcoin, CiTimer } from 'react-icons/ci';
import { IoMdPodium } from 'react-icons/io';
import { IoWaterOutline } from 'react-icons/io5';
import { BiWater } from 'react-icons/bi';
import moment from 'moment/moment';
import timestamp from 'unix-timestamp';

const CryptoValue = ({ cryptoDetail, currencySign, currencySymbol }) => {
  const statistics = [
    {
      title: `Price to ${currencySymbol}`,
      value: (
        <NumericFormat
          value={cryptoDetail?.price}
          displayType="text"
          suffix={` ${currencySign !== `null` ? currencySign : currencySymbol}`}
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
          decimalScale={7}
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
        `${millify(cryptoDetail?.['24hVolume'], {
          units: ['', 'K', 'M', 'billion', 'T', 'P', 'E'],
          space: true,
          precision: 2,
        })} ${currencySign !== `null` ? currencySign : currencySymbol}`
      }`,
      icon: <IoWaterOutline />,
    },
    {
      title: 'Market Cap',
      value: `${millify(cryptoDetail?.marketCap, {
        units: ['', 'K', 'M', 'billion', 'T', 'P', 'E'],
        space: true,
        precision: 2,
      })} ${currencySign !== `null` ? currencySign : currencySymbol}`,
      icon: <BiWater />,
    },

    {
      title: 'All-time-high(daily avg)',
      value: (
        <NumericFormat
          value={cryptoDetail?.allTimeHigh?.price}
          displayType="text"
          suffix={` ${currencySign !== `null` ? currencySign : currencySymbol}`}
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
  return (
    <div className="flex flex-col">
      <p>Value statistics</p>
      <p>
        An overview showing the statistics of {cryptoDetail?.name}, such as the
        base and quote currency, the rank, and trading volume.
      </p>
      {statistics.map((result) => (
        <div key={result.title} className="flex flex-row w-96 justify-between">
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
  );
};

export default CryptoValue;
