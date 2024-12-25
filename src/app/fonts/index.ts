import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    { path: './Pretendard-Regular.woff', weight: '400', style: 'normal' },
    { path: './Pretendard-Medium.woff', weight: '500', style: 'normal' },
    {
      path: './Pretendard-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
  ],
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});
