import React from 'react';
import millify from 'millify';
import {
  useGetCryptoSupplysQuery,
  useGetCryptoIssuancesQuery,
} from '../../services/cryptoApi';

const CryptoSupply = ({ cryptoDetail, coinId }) => {
  const { data: cryptoSupplys } = useGetCryptoSupplysQuery({
    coinId,
  });
  const { data: cryptoIssuances } = useGetCryptoIssuancesQuery({
    coinId,
  });
  const cryptoSupply = cryptoSupplys?.data?.supply;
  const cryptoIssuance = cryptoIssuances?.data?.issuanceBlockchains;

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

  return (
    <div className="flex flex-col">
      <p>Supply information</p>
      <p>
        View the total and circulating supply of {cryptoDetail?.name}, including
        details on how the supplies are calculated.
      </p>
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
        </div>
      </div>
    </div>
  );
};

export default CryptoSupply;
