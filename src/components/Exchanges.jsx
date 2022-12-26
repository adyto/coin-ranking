import React from 'react';
import { useParams } from 'react-router-dom';

const Exchanges = () => {
  const { exchangeId } = useParams();
  console.log(exchangeId);

  return <div>Exchanges</div>;
};

export default Exchanges;
