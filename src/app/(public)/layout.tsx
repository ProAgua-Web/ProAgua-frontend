'use client';

import { Inter } from 'next/font/google';

import { Footer } from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        inter.className,
        'relative flex min-h-screen flex-col bg-background',
      )}
    >
      <Header />
      <main className="container w-full flex-1 overflow-y-auto p-8 pt-[calc(clamp(50px,8vh,100px)+2rem)]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
