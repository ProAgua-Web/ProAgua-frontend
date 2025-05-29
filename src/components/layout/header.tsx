'use client';

import { useAutenticacao } from '@/lib/autenticacao';
import { NavContext } from '@/lib/nav-context';
import { capitalize, cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { MdExitToApp } from 'react-icons/md';
import { Button } from '../ui/button';

export default function Header() {
  const { autenticado, token, sair } = useAutenticacao();
  const username = capitalize(token?.username);
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith('/admin');
  const { isOpen } = useContext(NavContext);
  const isMobile = window.innerWidth < 1024;

  return (
    <header
      className={cn(
        'fixed z-40 flex h-20 w-full items-center justify-between bg-primary-500 px-4 text-white-100 shadow-lg transition-all duration-200',
      )}
    >
      <div
        className={cn('flex h-full items-center gap-4', {
          'lg:ml-64': isAdminPath && !isOpen,
          'lg:ml-16': isAdminPath && isOpen,
          'ml-0': isMobile,
        })}
      >
        <Link href="/" className="flex items-center gap-2 text-2xl">
          <Image
            src="/Logo.svg"
            alt="Logo do projeto"
            width={28}
            height={40}
            className="h-[clamp(2rem,1.8571rem+0.7143vw,2.5rem)]"
          />
          PROÁGUA
        </Link>
      </div>
      <nav className={cn({ hidden: isAdminPath })}>
        <ul className="hidden gap-8 lg:flex">
          <li>
            <Link href="/">Início</Link>
          </li>
          <li>
            <Link href="/#sobre">Sobre</Link>
          </li>
        </ul>
      </nav>

      {autenticado && (
        <div className="flex h-full items-center gap-4">
          <span className="text-nowrap">Olá, {username}</span>
          <Button
            onClick={sair}
            size="full"
            className="aspect-square border-none"
          >
            <MdExitToApp size={24} />
          </Button>
        </div>
      )}
    </header>
  );
}
