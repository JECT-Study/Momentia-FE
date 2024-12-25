import type { Metadata } from 'next';
import { ReactNode } from 'react';

import '../styles/globals.css';

import KakaoProvider from './providers/KakaoProvider';
import MSWProvider from './providers/MSWProvider';
import ReactQueryProvider from './providers/ReactQueryProvider';

import AppShell from '../components/Layout/AppShell';

import { montserrat, pretendard } from './fonts';

export const metadata: Metadata = {
  title: '',
  description: '',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang='ko'>
      <body className={`${pretendard} ${montserrat.variable}`}>
        <MSWProvider>
          <ReactQueryProvider>
            <AppShell>{children}</AppShell>
          </ReactQueryProvider>
        </MSWProvider>
        <KakaoProvider />
      </body>
    </html>
  );
};

export default RootLayout;
