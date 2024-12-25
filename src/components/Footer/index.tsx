import Image from 'next/image';
import Link from 'next/link';

import logo from '../../../public/images/momentiaLogoSymbol.png';

const Footer = () => {
  return (
    <footer className='bg-black text-white px-[32px] lg:px-[140px] py-24'>
      <Link href='/'>
        <Image src={logo} alt='모멘티아 로고' width={45} priority />
      </Link>

      <div className='flex flex-wrap wrap-reverse items-center mt-10'>
        <div className='w-full'>
          <p className='font-sans body1 mb-2 text-gray-300'>
            Exhibitions, for Artists' Moments
          </p>
          <div className='flex flex-col justify-between md:flex-row'>
            <p className='body1 text-gray-300'>
              예술가들을 위한 순간, 모멘티아
            </p>
            <div className='button-m flex md:gap-16 gap-10 md:mt-0 mt-8 text-gray-400'>
              <button>이용약관</button>
              <button>개인정보처리방침</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
