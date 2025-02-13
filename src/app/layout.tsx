import '../styles/globals.css';

import type { Metadata } from 'next';
import { ReactNode } from 'react';

import AppShell from '../components/Layout/AppShell';
import { montserrat, pretendard } from './fonts';
import KakaoProvider from './providers/KakaoProvider';
import MSWProvider from './providers/MSWProvider';
import TanStackQueryProvider from './providers/TanStackQueryProvider';

export const metadata: Metadata = {
  title: '',
  description: '',
};

interface LayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const RootLayout = ({ children, modal }: Readonly<LayoutProps>) => {
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
