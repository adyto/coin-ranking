import React from 'react';
import { FiLink2 } from 'react-icons/fi';
import {
  FaBtc,
  FaFacebookSquare,
  FaGithub,
  FaReddit,
  FaTwitter,
  FaYoutube,
  FaTelegram,
  FaMedium,
  FaInstagram,
  FaDiscord,
  FaLinkedin,
} from 'react-icons/fa';
import { SiBlockchaindotcom, SiWechat, SiSinaweibo } from 'react-icons/si';
import { SlSocialVkontakte } from 'react-icons/sl';
import { HiOutlineNewspaper } from 'react-icons/hi';

const CryptoLinks = ({ cryptoDetail }) => {
  return (
    <div>
      <p>Links</p>
      {cryptoDetail?.links.map((res) => (
        <a
          key={res.url}
          href={res?.url}
          target="_blank"
          className="flex flex-row justify-between items-center w-96"
        >
          <div className="flex flex-row items-center">
            <div>
              {res.type === 'website' ? (
                <FiLink2 />
              ) : res.type === 'bitcointalk' ? (
                <FaBtc />
              ) : res.type === 'facebook' ? (
                <FaFacebookSquare />
              ) : res.type === 'github' ? (
                <FaGithub />
              ) : res.type === 'reddit' ? (
                <FaReddit />
              ) : res.type === 'twitter' ? (
                <FaTwitter />
              ) : res.type === 'youtube' ? (
                <FaYoutube />
              ) : res.type === 'explorer' ? (
                <SiBlockchaindotcom />
              ) : res.type === 'telegram' ? (
                <FaTelegram />
              ) : res.type === 'whitepaper' ? (
                <HiOutlineNewspaper />
              ) : res.type === 'medium' ? (
                <FaMedium />
              ) : res.type === 'instagram' ? (
                <FaInstagram />
              ) : res.type === 'discord' ? (
                <FaDiscord />
              ) : res.type === 'wechat' ? (
                <SiWechat />
              ) : res.type === 'sina-weibo' ? (
                <SiSinaweibo />
              ) : res.type === 'vkontakte' ? (
                <SlSocialVkontakte />
              ) : res.type === 'linkedin' ? (
                <FaLinkedin />
              ) : null}
            </div>
            <p>{res.type}</p>
          </div>
          <div>{res.name}</div>
        </a>
      ))}
    </div>
  );
};

export default CryptoLinks;
