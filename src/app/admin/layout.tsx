'use client';

import { Inter } from 'next/font/google';

import { Footer } from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { Navbar } from '@/components/layout/sidebar';
import { NavContext } from '@/lib/nav-context';
import { cn } from '@/lib/utils';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useState } from 'react';


config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn(inter.className, 'relative min-h-screen bg-background')}>
      <NavContext.Provider
        value={{
          isOpen,
          setIsOpen,
        }}
      >
        <Header />

        <div className="flex min-h-screen">
          <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

          <main
            className={cn(
              'flex-1 overflow-hidden pb-20 transition-all duration-300 lg:pb-0',
              'lg:ml-16',
              !isOpen && 'lg:ml-64',
            )}
          >
            <div className="container w-full flex-1 overflow-y-auto p-8 pt-[calc(clamp(50px,8vh,100px)+2rem)]">
              {children}
            </div>
          </main>
        </div>
        <Footer />
      </NavContext.Provider>
    </div>
  );
}
