'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import { ReactNode } from 'react';

const AppShell = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NextUIProvider>
        <NextThemesProvider
          attribute='class'
          defaultTheme='dark'
          value={{
            dark: 'custom-dark',
          }}
        >
          <div className='h-screen box-border'>
            <Navbar />
            <main className='pt-[60px] min-h-screen h-full'>{children}</main>
            <Footer />
          </div>
        </NextThemesProvider>
      </NextUIProvider>
    </>
  );
};

export default AppShell;
