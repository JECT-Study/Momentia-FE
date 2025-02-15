import '../styles/globals.css';

import type { Metadata } from 'next';
import { ReactNode } from 'react';

import AppShell from '../components/Layout/AppShell';
import { montserrat, pretendard } from './fonts';
import KakaoProvider from './providers/KakaoProvider';
import MSWProvider from './providers/MSWProvider';
import TanStackQueryProvider from './providers/TanStackQueryProvider';

export const metadata: Metadata = {
  title: '모멘티아',
  description: '무명 작가들을 위한 전시 플랫폼',
};

interface LayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: Readonly<LayoutProps>) => {
  return (
    <html lang='ko'>
      <body className={`${pretendard} ${montserrat.variable}`}>
        <MSWProvider>
          <TanStackQueryProvider>
            <AppShell>{children}</AppShell>
          </TanStackQueryProvider>
        </MSWProvider>
        <KakaoProvider />
      </body>
    </html>
  );
};

export default RootLayout;
