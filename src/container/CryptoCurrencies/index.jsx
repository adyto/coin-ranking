import React, { useState, useEffect } from 'react';
import millify from 'millify';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import ReactPaginate from 'react-paginate';
import PacmanLoader from 'react-spinners/PacmanLoader';

import { Navbar, NavbarBanner } from '../../components';

import { useGetCryptosQuery } from '../../services/cryptoApi';
import { useStateContext } from '../../context/StateContext';

const CryptoCurrencies = ({ simplified }) => {
  const {
    timePeriod,
    orderBy,
    currencyId,
    optionsTimePeriod,
    optionsOrderBy,
    handleChangePeriod,
    handleChangeOrderBy,
  } = useStateContext();

  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: cryptoList, isFetching } = useGetCryptosQuery({
    count: simplified ? 10 : 5000,
    currencyId,
    timePeriod,
    orderBy,
  });

  const handleChangeInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortedDates = cryptos?.map((obj) => {
    return { ...obj };
  });

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

  console.log(cryptos);

  return (
    <>
      {!simplified ? (
        <div className="container mx-auto">
          <Navbar />
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Cryptocurrency price list</h1>
            <h2>All cryptocurrencies ranked by {orderBy}.</h2>
          </div>
          <NavbarBanner />
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
              onChange={handleChangeOrderBy}
              options={optionsOrderBy}
              defaultValue={{
                value: `${orderBy}`,
                label: `${orderBy}`,
              }}
            />
          </div>
          <input
            type={'text'}
            placeholder="Search Cryptocurrency"
            onChange={handleChangeInput}
            value={searchTerm}
          />
          {isFetching && (
            <div className="h-screen w-screen">
              <div className="flex justify-center mt-20">
                <PacmanLoader
                  color="#22C55E"
                  size={100}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            </div>
          )}
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
          <ReactPaginate
            className="flex flex-wrap  w-full justify-center"
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
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 justify-center lg:grid lg:grid-cols-5 lg:mx-2 xl:mx-4 xl:gap-4 2xl:gap-5">
          {cryptos?.map((currency) => (
            <Link
              to={`/crypto/${currency.uuid}`}
              className="flex flex-col w-40 border items-center py-3 px-2 rounded-md text-center lg:w-48 xl:w-60 xl:py-4 2xl:w-72"
              key={currency.uuid}
            >
              <img src={currency.iconUrl} className="w-9 h-9 xl:w-11 xl:h-11" />
              <p className="font-semibold">{currency.name}</p>
              <p className="border-none px-2 py-1 bg-slate-300 rounded-lg text-xs my-2 dark:bg-slate-500">
                {currency.rank}
              </p>
              <p className="text-sm font-medium">
                <span className="font-semibold">Price : </span>
                {millify(currency.price)}
              </p>
              <p className="text-sm font-medium">
                <span className="font-semibold">Market Cap : </span>{' '}
                {millify(currency.marketCap)}
              </p>
              <p className="text-sm font-medium">
                <span className="font-semibold">{timePeriod} Change : </span>
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
      )}
    </>
  );
};

export default CryptoCurrencies;
