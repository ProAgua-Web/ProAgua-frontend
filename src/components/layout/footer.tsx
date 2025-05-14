'use client';

import { useAutenticacao } from '@/lib/autenticacao';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

export function Footer() {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith('/admin') ?? false;
  const { autenticado } = useAutenticacao();

  return (
    <footer className="z-[60] flex w-full items-center justify-between bg-primary-500 p-[clamp(30px,4vw+1rem,100vw-1200px)] text-white">
      <div className="justify-center gap-4">
        <h1 className="mb-2 text-3xl font-bold">
          ProÁgua <span className="text-base font-normal">- © 2023</span>
        </h1>
        <h5>Todos os direitos reservados.</h5>
        {!isAdminPath ? (
          <Button asChild variant="link" className="p-0 text-white-200">
            <Link
              href={autenticado ? '/admin/' : '/login/'}
              className="flex items-center gap-2"
            >
              Acessar ambiente administrativo
            </Link>
          </Button>
        ) : (
          <Button asChild variant="link" className="p-0 text-white-200">
            <Link href={'/'} className="flex items-center gap-2">
              Acessar página inicial
            </Link>
          </Button>
        )}
      </div>

      <div className="logo-container">
        <Image
          src="/Logo_ufersa.svg"
          alt="Logo UFERSA"
          width={480}
          height={86}
        />
      </div>
    </footer>
  );
}
