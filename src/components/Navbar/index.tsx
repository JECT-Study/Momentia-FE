'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import ROUTE from '@/constants/routes';
import TokenHandler from '@/utils/tokenHandler';

import logo from '../../../public/images/momentiaLogoSymbol.png';
import Icon from '../Icon/Icon';
import NavbarNoticeDetail from './NavbarNoticeDetail';
import NavbarUserOption from './NavbarUserOption';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(
    TokenHandler.getAccessToken() !== '',
  );
  const router = useRouter();

  const moveToSignIn = () => {
    router.push(ROUTE.signIn);

    if (isMenuOpen) toggleMenu();
  };
  const moveToArtworkList = () => router.push(ROUTE.artworkList);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const clickSignOut = () => {
    TokenHandler.removeToken();
    router.push(ROUTE.signIn);
    if (isMenuOpen) toggleMenu();
  };

  useEffect(() => {
    const handleLoginEvent = () => {
      setIsSignedIn(TokenHandler.getAccessToken() !== '');
    };

    window.addEventListener('authEvent', handleLoginEvent);

    handleLoginEvent();

    return () => {
      window.removeEventListener('authEvent', handleLoginEvent);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav className='fixed top-0 w-full bg-black text-white z-40'>
        <div
          className='max-w-[1640px] mx-auto tablet:grid tablet:grid-cols-3 flex justify-between items-center 
        px-[32px] tablet:px-[140px]  h-[90px] tablet:h-[60px]'
        >
          <div className='justify-items-start'>
            <Link href={ROUTE.home}>
              <Image src={logo} alt='모멘티아 로고' width={45} priority />
            </Link>
          </div>
          <ul className='button-m hidden tablet:grid grid-cols-3 items-center gap-[70px] text-gray-100 w-full justify-items-center'>
            <li
              className='hover:text-gray-300 cursor-pointer w-content'
              onClick={moveToArtworkList}
            >
              작품
            </li>
            <li className='hover:text-gray-300 cursor-pointer'>전시회</li>
            <li className='hover:text-gray-300 cursor-pointer'>커뮤니티</li>
          </ul>
          <div className='flex justify-end item-center gap-[50px] justify-items-end'>
            {isSignedIn && <NavbarNoticeDetail />}
            <div className='hidden tablet:flex items-center gap-[35px]'>
              {isSignedIn ? (
                <>
                  <NavbarUserOption />
                  <button className='button-m bg-main px-6 py-2 rounded-full text-white flex-shrink-0'>
                    작품 업로드
                  </button>
                </>
              ) : (
                <button className='button-m text-white' onClick={moveToSignIn}>
                  로그인/회원가입
                </button>
              )}
            </div>
            <Icon
              name='Menu'
              size='l'
              onClick={toggleMenu}
              className='tablet:hidden text-white focus:outline-none '
            />
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div
          className='fixed inset-0 bg-opacity-85 backdrop-blur-md z-50'
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className='absolute top-0 right-0  text-white w-3/4 h-full flex'
            onClick={(e) => e.stopPropagation()}
          >
            <Icon
              name='Close'
              size='l'
              onClick={toggleMenu}
              className='mx-4 my-[30px] text-white'
            />

            <div className='flex flex-col w-full  h-full bg-background-base'>
              <div className='flex-1'>
                <div className=' space-y-1 bg-black'>
                  {isSignedIn ? (
                    <>
                      <p className='button-m text-white px-10 py-8'>닉네임</p>
                      <button className='button-m text-main px-10 py-8'>
                        작품 업로드
                      </button>
                    </>
                  ) : (
                    <button
                      className='button-m text-white px-10 py-8'
                      onClick={moveToSignIn}
                    >
                      로그인/회원가입
                    </button>
                  )}
                </div>

                <hr className='border-t border-gray-800' />

                <ul className='button-m space-y-6 text-lg mt-6 text-gray-100'>
                  <li
                    className='hover:text-gray-300 cursor-pointer px-10 py-8'
                    onClick={moveToArtworkList}
                  >
                    작품
                  </li>
                  <li className='hover:text-gray-300 cursor-pointer px-10 py-8'>
                    전시회
                  </li>
                  <li className='hover:text-gray-300 cursor-pointer px-10 py-8'>
                    커뮤니티
                  </li>
                </ul>
              </div>
              {isSignedIn && (
                <div className='px-10 py-8'>
                  <button className='text-gray-300 ' onClick={clickSignOut}>
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
