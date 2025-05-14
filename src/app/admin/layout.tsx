'use client';

import { Inter } from 'next/font/google';

import { Footer } from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { Navbar } from '@/components/layout/navbar';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { createContext, useState } from 'react';
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

interface NavContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const NavContext = createContext<NavContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={inter.className + 'relative min-h-screen bg-background'}>
      <NavContext.Provider
        value={{
          isOpen,
          setIsOpen,
        }}
      >
        <Header />

        <div className="flex flex-row">
          <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

          <main className="container gap-4 overflow-hidden p-8 pt-[calc(clamp(50px,8vh,100px)+2rem)]">
            {children}
          </main>
        </div>
        <Footer />
      </NavContext.Provider>
    </div>
  );
}
