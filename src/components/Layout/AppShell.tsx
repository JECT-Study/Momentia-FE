'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';

import ModalProvider from '@/app/providers/ModalProvider';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

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
          <div className='box-border h-full'>
            <Navbar />
            <main className='pt-[90px] min-h-full'>{children}</main>
            <Footer />
          </div>
          <ModalProvider />
        </NextThemesProvider>
      </NextUIProvider>
    </>
  );
};

export default AppShell;
