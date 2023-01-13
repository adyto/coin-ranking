import React from 'react';
import {
  BsCoin,
  BsFillHouseFill,
  BsGithub,
  BsLinkedin,
  BsTelegram,
  BsInstagram,
} from 'react-icons/bs';

const Footer = () => {
  const socials = [
    {
      name: 'portfolio',
      link: 'https://adyto-portofolio.vercel.app',
    },
    {
      name: 'github',
      link: 'https://github.com/adyto',
    },
    {
      name: 'linkedln',
      link: 'https://www.linkedin.com/in/adi-yulianto-300486163',
    },
    {
      name: 'telegram',
      link: 'https://t.me/adiyulianto61',
    },
    {
      name: 'instagram',
      link: 'https://www.instagram.com/ady.to/',
    },
  ];
  return (
    <div className="container mx-auto h-full py-20">
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center">
          <BsCoin />
          <h1>Cryptoread</h1>
        </div>
        <h2>© 2023 CoinMarketCap. All rights reserved</h2>
        <div className="flex justify-between w-full">
          <div>Ha</div>
          <div className="flex flex-col">
            <p>Social</p>
            {socials.map((value) => (
              <a
                href={value.link}
                target="_blank"
                rel="noreferrer"
                className="flex flex-row items-center"
              >
                {value.name === 'portfolio' ? (
                  <BsFillHouseFill />
                ) : value.name === 'github' ? (
                  <BsGithub />
                ) : value.name === 'linkedln' ? (
                  <BsLinkedin />
                ) : value.name === 'telegram' ? (
                  <BsTelegram />
                ) : value.name === 'instagram' ? (
                  <BsInstagram />
                ) : null}

                {value.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
