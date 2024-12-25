'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import logo from '../../../public/images/momentiaLogoSymbol.png';
import Icon from '../Icon/Icon';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className='fixed top-0 w-full bg-black text-white z-50'>
        <div className='max-w-[1640px] mx-auto flex justify-between items-center px-[32px] lg:px-[140px] py-[29px] h-[90px] lg:h-[60px]'>
          <div className='flex-shrink-0'>
            <Link href='/'>
              <Image src={logo} alt='모멘티아 로고' width={45} priority />
            </Link>
          </div>

          <div className='hidden lg:flex justify-center w-full'>
            <ul className='button-m flex gap-20 text-gray-100'>
              <li className='hover:text-gray-300 cursor-pointer'>작품</li>
              <li className='hover:text-gray-300 cursor-pointer'>전시회</li>
              <li className='hover:text-gray-300 cursor-pointer'>커뮤니티</li>
            </ul>
          </div>

          <div className='flex items-center gap-7 flex-shrink-0'>
            {/* TODO: 로그인 상태에 따라 Notification 버튼, 로그인/회원가입 버튼 다르게 보이도록 처리 */}
            <Icon name='Notification' size='l' className='text-white' />
            <div className='hidden lg:flex items-center gap-7'>
              <div className='rounded-full bg-white w-8 h-8 flex-shrink-0'></div>
              <button className='button-m bg-main px-6 py-2 rounded-full text-white flex-shrink-0'>
                작품 업로드
              </button>
              {/* <button className='button-m text-white' >로그인/회원가입</button> */}
            </div>
            <Icon
              name='Menu'
              size='l'
              onClick={toggleMenu}
              className='lg:hidden text-white focus:outline-none'
            />
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-85 backdrop-blur-md z-40'
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className='absolute top-0 right-0 bg-background-base text-white w-3/4 h-full p-8 flex flex-col justify-between'
            onClick={(e) => e.stopPropagation()}
          >
            <Icon
              name='Close'
              size='l'
              onClick={toggleMenu}
              className='absolute top-6 left-6 text-white'
            />

            <div className='ml-10'>
              <div className='flex-col space-y-1'>
                {/* <button className='button-m text-white' >로그인/회원가입</button> */}
                <p className='button-m text-white'>닉네임</p>
                <p className='button-m text-gray-500'>momentia@gmail.com</p>
                <button className='button-m text-main pt-3'>작품 업로드</button>
              </div>

              <div className='border-t border-gray-800 my-6'></div>

              <ul className='button-m space-y-6 text-lg mt-6 text-gray-100'>
                <li className='hover:text-gray-300 cursor-pointer'>작품</li>
                <li className='hover:text-gray-300 cursor-pointer'>전시회</li>
                <li className='hover:text-gray-300 cursor-pointer'>커뮤니티</li>
              </ul>
            </div>

            <div className='ml-10'>
              <button className='text-gray-300'>로그아웃</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
