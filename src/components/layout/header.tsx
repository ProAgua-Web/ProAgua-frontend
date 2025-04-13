'use client';

import { useAutenticacao } from '@/lib/autenticacao';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function Header(props: {
  expand?: React.MouseEventHandler<HTMLButtonElement>;
  collapsed?: boolean;
}) {
  const { sair } = useAutenticacao();

  return (
    <header className="fixed z-50 flex h-20 w-full items-center bg-primary-500 text-white-100 shadow-lg">
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

      <Button
        onClick={sair}
        className="h-full border-none bg-primary-500 hover:bg-primary-600"
      >
        <FontAwesomeIcon icon={faRightFromBracket} className="mr-1" />
        Sair
      </Button>
    </header>
  );
}
