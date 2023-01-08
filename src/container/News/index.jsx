import React, { useState } from 'react';
import moment from 'moment/moment';
import Select from 'react-select';

import { useGetCryptoNewsQuery } from '../../services/cryptoNews';
import { useGetCryptosNewsQuery } from '../../services/cryptoApi';
import { Navbar } from '../../components';

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Crypto');

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data: crytoList } = useGetCryptosNewsQuery(100);

  if (!cryptoNews?.value) return 'Loading...';

  const handleChangeSelect = (value) => {
    setNewsCategory(value.value);
  };

  const resultCryptoList = crytoList?.data?.coins?.map((item) => ({
    value: item.name,
    label: item.name,
  }));
  const defaultCrypto = {
    value: 'Crypto',
    label: 'Crypto',
  };
  let arrayOptionsNews = [];
  const resultArrayOptionsNews = arrayOptionsNews.concat(
    defaultCrypto,
    resultCryptoList,
  );

  const optionNews = resultArrayOptionsNews.map((item) => ({
    value: item?.value,
    label: item?.label,
  }));

  console.log(cryptoNews.value);

  return (
    <>
      {!simplified ? (
        <>
          {/* <Navbar /> */}
          <div className="flex flex-col">
            <Select
              onChange={handleChangeSelect}
              options={optionNews}
              defaultValue={{
                value: `${newsCategory}`,
                label: `${newsCategory}`,
              }}
            />
            <div className="flex flex-wrap gap-4">
              {cryptoNews.value.map((news) => (
                <a
                  href={news.url}
                  target="_blank"
                  rel="noreferrer"
                  key={news.name}
                  className={'max-w-xs w-full flex flex-col border'}
                >
                  <div className="flex flex-row">
                    <span>{news.name}</span>
                    <img
                      src={
                        news?.image?.thumbnail?.contentUrl ||
                        'https://miro.medium.com/max/2000/0*XrGPb93cPlgUzEch'
                      }
                      className={'w-24 h-24'}
                    />
                  </div>
                  <p>
                    {news.description.length > 100
                      ? `${news.description.substring(0, 100)}...`
                      : news.description}
                  </p>
                  <div className="flex flex-row items-center">
                    <img
                      src={
                        news?.provider[0]?.image?.thumbnail?.contentUrl ||
                        'https://miro.medium.com/max/2000/0*XrGPb93cPlgUzEch'
                      }
                      className="w-10 h-10 rounded-full"
                    />
                    <span>{news?.provider[0]?.name}</span>
                    <span>
                      {moment(news.datePublished).startOf('second').fromNow()}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center mx-auto divide-y-2 space-y-4 mb-10 px-2 sm:px-0">
          {cryptoNews.value.map((news) => (
            <a
              href={news.url}
              target="_blank"
              rel="noreferrer"
              key={news.name}
              className={'max-w-sm pt-4 sm:max-w-lg md:max-w-2xl lg:max-w-4xl'}
            >
              <div className="flex flex-row gap-2 sm:gap-4">
                <img
                  src={
                    news?.image?.thumbnail?.contentUrl ||
                    'https://miro.medium.com/max/2000/0*XrGPb93cPlgUzEch'
                  }
                  className={'w-24 h-24 md:w-32 md:h-32'}
                />
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-1 text-xs">
                    <p className="font-bold">{news?.provider[0]?.name}</p>
                    <span className="font-bold">-</span>
                    <span>
                      {moment(news.datePublished).startOf('second').fromNow()}
                    </span>
                  </div>
                  <p className="text-sm font-bold">{news?.name}</p>
                  <p className="max-lg:hidden">
                    {news.description.length > 100
                      ? `${news.description.substring(0, 100)}...`
                      : news.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default News;
