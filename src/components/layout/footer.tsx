'use client';

import { useAutenticacao } from '@/lib/autenticacao';
import { NavContext } from '@/lib/nav-context';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { Button } from '../ui/button';

export function Footer() {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith('/admin') ?? false;
  const { autenticado } = useAutenticacao();
  const { isOpen: isCollapsed } = useContext(NavContext);

  return (
    <footer
      className={cn(
        'z-30 w-full items-center justify-between bg-primary-500 p-[clamp(30px,4vw+1rem,100vw-1200px)] text-white',
        'flex flex-col gap-4 lg:flex-row',
        !isAdminPath ? 'flex' : 'hidden lg:flex',
      )}
    >
      <div
        className={cn('justify-center gap-4', {
          'lg:ml-64': isAdminPath && !isCollapsed,
          'lg:ml-16': isAdminPath && isCollapsed,
        })}
      >
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
