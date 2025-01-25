import { QueryProvider } from '@/app/query-provider';
import { Toaster } from '@/components/ui/toaster';
import { AutenticacaoProvider } from '@/lib/autenticacao';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ProÁgua',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <AutenticacaoProvider>
        <html lang="pt-BR">
          <body className={inter.className}>
            {children}
            <Toaster />
          </body>
        </html>
      </AutenticacaoProvider>
    </QueryProvider>
  );
}
