import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import Select from 'react-select';

import { useGetCryptoNewsQuery } from '../services/cryptoNews';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { data } from 'autoprefixer';

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Crypto');

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data: crytoList } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return 'Loading...';

  const handleChangeSelect = (value) => {
    setNewsCategory(value.value);
  };

  const options = crytoList?.data?.coins?.map((item) => ({
    value: item.name,
    label: item.name,
  }));

  console.log(cryptoNews.value);
  return (
    <>
      <div className="my-7">
        {!simplified && (
          <div className="flex flex-col">
            <Select onChange={handleChangeSelect} options={options} />
          </div>
        )}
      </div>
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
    </>
  );
};

export default News;
