'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactNode, useLayoutEffect } from 'react';

import logo from '@/../public/images/momentiaLogoSymbol.png';
import ROUTE from '@/constants/routes';
import TokenHandler from '@/utils/tokenHandler';

interface LayoutProps {
  readonly children: ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  const route = useRouter();

  useLayoutEffect(() => {
    const token = TokenHandler.getAccessToken();

    if (token) route.push(ROUTE.home);
  }, []);

  return (
    <div className='h-full w-[420px] flex flex-col justify-center items-center gap-[25px] m-auto'>
      <Image src={logo} alt='모멘티아 로고' width={45} priority />
      {children}
    </div>
  );
};

export default layout;
