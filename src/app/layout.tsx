import { QueryProvider } from '@/app/query-provider';
import { Toaster } from '@/components/ui/toaster';
import { AutenticacaoProvider } from '@/lib/autenticacao';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ProÁgua',
  description: 'Sistema de gestão de coletas de água',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <NuqsAdapter>
        <AutenticacaoProvider>
          <html lang="pt-BR" suppressHydrationWarning>
            <body className={inter.className}>
              {children}
              <Toaster />
            </body>
          </html>
        </AutenticacaoProvider>
      </NuqsAdapter>
    </QueryProvider>
  );
}
