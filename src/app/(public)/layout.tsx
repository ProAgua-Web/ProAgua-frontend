'use client';

import { Inter } from 'next/font/google';

import { Footer } from '@/components/layout/footer';
import Header from '@/components/layout/header';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className + 'relative min-h-screen bg-background'}>
      <Header />

      <div className="flex flex-row">
        {/* <Navbar /> */}

        <main className="container gap-4 overflow-hidden p-8 pt-[calc(clamp(50px,8vh,100px)+2rem)]">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
