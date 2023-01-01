import React, { useState, useEffect } from 'react';
import millify from 'millify';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import ReactPaginate from 'react-paginate';

import { useGetCryptosQuery } from '../../services/cryptoApi';
import { useStateContext } from '../../context/StateContext';

const CryptoCurrencies = ({ simplified }) => {
  const {
    timePeriod,
    currencyId,
    currencyLabel,
    optionsCurrency,
    optionsTimePeriod,
    handleChangeCurrency,
    handleChangePeriod,
  } = useStateContext();

  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: cryptoList, isFetching } = useGetCryptosQuery({
    count: simplified ? 10 : 5000,
    currencyId,
    timePeriod,
  });

  const handleChangeInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortedDates = cryptos?.map((obj) => {
    return { ...obj };
  });

  console.log(sortedDates);

  const [pageOffset, setPageOffset] = useState(0);
  const perPage = 50;

  const endOffset = pageOffset + perPage;
  const currentItems = sortedDates?.slice(pageOffset, endOffset);
  const pageCount = Math.ceil(sortedDates?.length / perPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * perPage) % sortedDates.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    setPageOffset(newOffset);
  };

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  if (isFetching) return 'Loading ...';
  return (
    <>
      <div className="my-7">
        {!simplified && (
          <>
            <div className="flex flex-row">
              <Select
                onChange={handleChangePeriod}
                options={optionsTimePeriod}
                defaultValue={{
                  value: `${timePeriod}`,
                  label: `${timePeriod}`,
                }}
              />
              <Select
                onChange={handleChangeCurrency}
                options={optionsCurrency}
                defaultValue={{
                  value: `${currencyId}`,
                  label: `${currencyLabel}`,
                }}
              />
            </div>
            <input
              type={'text'}
              placeholder="Search Cryptocurrency"
              onChange={handleChangeInput}
              value={searchTerm}
            />
          </>
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        {currentItems?.map((currency, i) => (
          <Link
            to={`/crypto/${currency.uuid}`}
            className="flex flex-col max-w-xs w-full border"
            key={currency.uuid}
          >
            <div className="flex flex-row justify-between items-center">
              <span>
                {++i + pageOffset}. {currency.name}
              </span>
              <img src={currency.iconUrl} className="w-9" />
            </div>
            <p>Price: {millify(currency.price)}</p>
            <p>Market Cap: {millify(currency.marketCap)}</p>
            <p>
              {timePeriod} Change:{' '}
              <NumericFormat
                value={currency.change}
                displayType="text"
                decimalScale={2}
                suffix={'%'}
                className={
                  currency.change < 0 ? 'text-red-500' : 'text-green-500'
                }
              />
            </p>
          </Link>
        ))}
      </div>
      {!simplified && (
        <ReactPaginate
          className="flex flex-row  w-full justify-center"
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          containerClassName="container mx-auto"
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          activeLinkClassName="bg-[#596E79]"
          pageClassName="bg-[#DFD3C3] px-3 py-2"
          activeClassName="text-white !bg-[#596E79] px-3 py-2"
          breakClassName="px-3 py-2 bg-[#F0ECE3]"
          previousClassName="bg-[#F0ECE3]  py-2 px-5 rounded-l-lg"
          nextClassName="bg-[#F0ECE3]  py-2 px-5 rounded-r-lg"
        />
      )}
    </>
  );
};

export default CryptoCurrencies;
