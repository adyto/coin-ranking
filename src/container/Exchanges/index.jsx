import React from 'react';
import { Navbar } from '../../components';

const Exchanges = () => {
  return (
    <div className="h-screen w-screen">
      <Navbar exchangesSimplified />
      <div className=" mt-96 flex flex-col justify-center items-center gap-4">
        <div className="flex flex-row items-center space-x-2">
          <h1 className="border-none py-2 px-4 rounded-xl bg-blue-600 text-white font-bold shadow-md">
            pro
          </h1>
          <h2> This endpoint requires the pro plan or higher</h2>
        </div>
        <a
          href="https://developers.coinranking.com/api/documentation/exchanges"
          target="_blank"
          className="text-blue-500"
        >
          API Documentation
        </a>
      </div>
    </div>
  );
};

export default Exchanges;
