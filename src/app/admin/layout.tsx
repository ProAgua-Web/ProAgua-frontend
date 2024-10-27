'use client';

import { Inter } from 'next/font/google';

import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import { useState } from 'react';

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={inter.className + ' min-h-[100vh] bg-background'}>
      <Header expand={toggleCollapsed} collapsed={collapsed} />

      <Navbar collapse={toggleCollapsed} collapsed={collapsed} />

      <main className="relative m-auto flex w-[clamp(320px,90vw-2rem,1200px)] flex-col items-center gap-4 p-8 pt-[calc(clamp(50px,8vh,100px)+2rem)]">
        {children}
      </main>
    </div>
  );
}
