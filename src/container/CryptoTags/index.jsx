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

const CryptoTags = () => {
  let { tagsId } = useParams();
  const {
    timePeriod,
    orderBy,
    currencyId,
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
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    setPageOffset(newOffset);
  };

  useEffect(() => {
    const filteredData = cryptoListTags?.data?.coins?.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setCryptosTags(filteredData);
  }, [cryptoListTags, searchTerm]);

  return (
    <div>
      <Navbar />
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
  );
};

export default CryptoTags;