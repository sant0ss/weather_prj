import React from "react";
import Image from 'next/image'
import santosWhiteImage from '../images/sant0ss-white.png';

const Footer = () => {
  return (
    <div className='m-auto w-max p-4 mt-40 mb-10 text-gray-800'>
      <p className="text-center drop-shadow-lg text-sm font-semibold text-gray-200 mb-4 tracking-widest">POWERED BY</p>
      <Image className="drop-shadow-lg animate-bounce w-24" src={santosWhiteImage} alt="imagem logo"/>  
    </div>
  );
}

export default Footer;
