import React from 'react';
import HTMLReactParser from 'html-react-parser';

const CryptoDescription = ({ cryptoDetail }) => {
  return (
    <div className="coin-desc-link">
      <h3>What is {cryptoDetail.name}</h3>
      {HTMLReactParser(cryptoDetail?.description)}
    </div>
  );
};

export default CryptoDescription;
