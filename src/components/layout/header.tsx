'use client';

import { useAutenticacao } from '@/lib/autenticacao';
import { capitalize } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { MdExitToApp } from 'react-icons/md';
import { Button } from '../ui/button';

export default function Header(props: {
  expand?: React.MouseEventHandler<HTMLButtonElement>;
  collapsed?: boolean;
}) {
  const { autenticado, token, sair } = useAutenticacao();
  const username = capitalize(token?.username);

  return (
    <header className="fixed z-40 flex h-20 w-full items-center bg-primary-500 text-white-100 shadow-lg">
      <div className="flex w-full justify-center">
        <div className="w-fit items-center">
          <Link
            href="/"
            className="flex select-none items-center gap-2 text-2xl font-semibold text-white-100"
          >
            <Image
              width={40}
              height={40}
              src="/Logo.svg"
              className="max-h-10"
              alt="Logo do projeto"
            />
            ProÁgua
          </Link>
        </div>
      </div>

      {autenticado && (
        <>
          <Button onClick={sair} className={'h-full border-none'}>
            {username}
            <MdExitToApp size={24} />
          </Button>
        </>
      )}
    </header>
  );
}
