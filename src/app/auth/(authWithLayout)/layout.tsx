import Image from 'next/image';
import { ReactNode } from 'react';

import logo from '@/../public/images/momentiaLogoSymbol.png';

interface LayoutProps {
  readonly children: ReactNode;
}

export default function layout({ children }: LayoutProps) {
  return (
    <div className='m-auto h-full w-[420px] flex flex-col justify-center items-center gap-[25px]'>
      <Image src={logo} alt='모멘티아 로고' width={45} priority />
      {children}
    </div>
  );
}
