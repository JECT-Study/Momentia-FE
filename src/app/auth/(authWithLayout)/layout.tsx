'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactNode, useLayoutEffect } from 'react';

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
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full flex flex-col justify-center items-center gap-[25px] m-auto overflow-y-scroll'>
      <Image
        src='/images/momentiaLogoSymbol.png'
        alt='모멘티아 로고'
        width={64}
        height={31}
        priority
      />
      {children}
    </div>
  );
};

export default layout;
