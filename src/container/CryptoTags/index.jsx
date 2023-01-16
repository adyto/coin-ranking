import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { Link } from 'react-router-dom';
import millify from 'millify';
import ReactPaginate from 'react-paginate';
import { NumericFormat } from 'react-number-format';
import { Navbar, NavbarBanner } from '../../components';
import { useParams } from 'react-router-dom';
import { useStateContext } from '../../context/StateContext';
import { useGetCryptosTagsQuery } from '../../services/cryptoApi';
import { BsInfo } from 'react-icons/bs';
import { Tooltip } from 'react-tooltip';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const CryptoTags = () => {
  let { tagsId } = useParams();
  const {
    timePeriod,
    orderBy,
    currencyId,
    currencySign,
    optionsTimePeriod,
    optionsOrderBy,
    handleChangePeriod,
    handleChangeOrderBy,
  } = useStateContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [cryptosTags, setCryptosTags] = useState([]);

  const { data: cryptoListTags, isFetching } = useGetCryptosTagsQuery({
    count: 5000,
    currencyId,
    timePeriod,
    orderBy,
    tagsId,
  });

  const handleChangeInput = (event) => {
    setSearchTerm(event.target.value);
  };

  console.log(cryptoListTags?.data?.coins.length);

  const sortedDates = cryptosTags?.map((obj) => {
    return { ...obj };
  });

  const [pageOffset, setPageOffset] = useState(0);
  const perPage = 50;

  const endOffset = pageOffset + perPage;
  const currentItems = sortedDates?.slice(pageOffset, endOffset);
  const pageCount = Math.ceil(sortedDates?.length / perPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * perPage) % sortedDates.length;
    setPageOffset(newOffset);
  };

  useEffect(() => {
    const filteredData = cryptoListTags?.data?.coins?.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setCryptosTags(filteredData);
  }, [cryptoListTags, searchTerm]);

  console.log(currentItems);

  console.log(cryptoListTags?.data?.stats);

  return (
    <>
      <Navbar />
      <div className="flex flex-col mt-24 px-4 mb-10 lg:mt-0 lg:px-0 container mx-auto">
        <h1 className="text-xl font-bold">
          <span className="capitalize">
            {tagsId === 'defi'
              ? 'DeFi'
              : tagsId === 'nft'
              ? 'NFT'
              : tagsId[0].toUpperCase() + tagsId.substring(1)}
          </span>{' '}
          tokens
        </h1>
        <h2>
          A list of all <span className="capitalize">{tagsId}</span> coins and
          tokens ranked by {orderBy} and total{' '}
          {tagsId === 'defi'
            ? 'DeFi'
            : tagsId === 'nft'
            ? 'NFT'
            : tagsId[0].toUpperCase() + tagsId.substring(1)}{' '}
          tokens is : {isFetching ? '-' : cryptoListTags?.data?.stats?.total}
        </h2>
      </div>
      <NavbarBanner />
      <div className="flex flex-col w-full items-center gap-4 my-4">
        <div className="flex flex-row space-x-4">
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
          placeholder={`Search ${
            tagsId === 'defi'
              ? 'DeFi'
              : tagsId === 'nft'
              ? 'NFT'
              : tagsId[0].toUpperCase() + tagsId.substring(1)
          }`}
          onChange={handleChangeInput}
          value={searchTerm}
          className="border-2 px-4 py-1"
        />
      </div>
      {currentItems?.length === 0 && searchTerm !== '' && (
        <h1 className="h-screen  w-full text-center mt-40">No Found Coins </h1>
      )}
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
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-2 justify-center">
          {currentItems?.map((currency, i) => (
            <Link
              to={`/crypto/${currency.uuid}`}
              className="flex flex-col w-40 border items-center py-3 px-2 rounded-md text-center"
              key={currency.uuid}
            >
              <img src={currency.iconUrl} className="w-9 h-9" />
              <p className="font-semibold">{currency.name}</p>
              <p className="border-none font-semibold px-2 py-1 bg-slate-300 rounded-lg text-xs my-2 dark:bg-slate-500">
                {++i + pageOffset}
              </p>
              <p className="text-sm font-medium">
                <span lassName="font-semibold">Price: </span>
                <NumericFormat
                  value={currency.price}
                  decimalScale={2}
                  prefix={`${currencySign} `}
                  displayType="text"
                  thousandsGroupStyle="thousand"
                  thousandSeparator=","
                />
              </p>
              <p className="text-sm font-semibold">
                Rank : <span className="font-medium">{currency.rank}</span>
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
      </div>
      <ReactPaginate
        className="flex flex-wrap  w-full justify-center py-20 items-center font-bold"
        breakLabel="..."
        nextLabel={<GrFormNext className="w-5 h-5" />}
        onPageChange={handlePageClick}
        containerClassName="container mx-auto"
        pageCount={pageCount}
        previousLabel={<GrFormPrevious className="w-5 h-5" />}
        renderOnZeroPageCount={null}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        activeLinkClassName="bg-[#002358]"
        pageClassName="px-3 py-2 hover:text-green-500"
        activeClassName="text-white !bg-[#002358] px-3 py-2 rounded-md hover:text-white"
        breakClassName="px-3 py-2"
        previousClassName="bg-[#Ffffff] border-2  py-3 px-7 rounded-full mr-5 dark:bg-slate-400 dark:border-slate-700"
        nextClassName="bg-[#Ffffff] border-2  py-3 px-7 rounded-full ml-5 dark:bg-slate-400 dark:border-slate-700"
      />
    </>
  );
};

export default CryptoTags;
