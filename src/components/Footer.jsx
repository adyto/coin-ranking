import React from 'react';
import {
  BsCoin,
  BsFillHouseFill,
  BsGithub,
  BsLinkedin,
  BsTelegram,
  BsInstagram,
  BsTwitter,
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
    {
      name: 'twitter',
      link: 'https://twitter.com/adiyulianto61',
    },
  ];
  return (
    <div className="container mx-auto h-full py-10">
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center space-x-3">
          <BsCoin className="w-9 h-9 text-green-400" />
          <h1 className="text-2xl font-semibold text-green-400">Cryptoread</h1>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-8 mb-4">
          {socials.map((value) => (
            <a
              href={value.link}
              target="_blank"
              rel="noreferrer"
              className="flex flex-row items-center capitalize gap-1 font-semibold"
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
              ) : value.name === 'twitter' ? (
                <BsTwitter />
              ) : null}
              {value.name}
            </a>
          ))}
        </div>
        <h2 className="text-sm font-medium">
          © 2023 Cryptoread. All rights reserved
        </h2>
      </div>
    </div>
  );
};

export default Footer;
