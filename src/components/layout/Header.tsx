import { useAutenticacao } from '@/lib/autenticacao';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ProAguaLogo from '/public/ProAguaLogo.svg';

export default function Header(props: {
  expand?: React.MouseEventHandler<HTMLButtonElement>;
  collapsed?: Boolean;
}) {
  const { sair, autenticando } = useAutenticacao();

  const router = useRouter();

  return (
    <header>
      <div
        id="header-bar"
        className="fixed z-20 flex h-20 w-full items-center bg-primary-500 text-white-100 shadow-lg"
      >
        <i className="bi bi-list header-icon"></i>

        <div id="header-content" className="flex w-full justify-center">
          <div id="proagua-logo" className="w-fit items-center">
            <a
              href="/"
              className="flex select-none items-center gap-2 text-2xl font-semibold text-white-100"
            >
              <Image
                src={ProAguaLogo}
                className="max-h-10"
                alt="Logo do projeto"
              />
              ProÁgua
            </a>
          </div>
        </div>

        <button
          onClick={sair}
          className="h-[clamp(50px,8vh,100px)] w-[clamp(50px,8vh,100px)] bg-primary-500 hover:bg-primary-600"
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="mr-1" />
          Sair
        </button>
      </div>
    </header>
  );
}
