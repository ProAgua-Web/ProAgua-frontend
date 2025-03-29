import { cn } from '@/lib/utils';
import {
  faBars,
  faChevronLeft,
  faClipboardList,
  faEnvelope,
  faFileExcel,
  faGear,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createContext, type FC, useState } from 'react';

interface NavContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavContext = createContext<NavContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

export const Navbar: FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  const pathname = usePathname();
  const navbar_links = [
    {
      href: '/admin/sequencias',
      icon: <FontAwesomeIcon icon={faClipboardList} className="h-6 w-6 p-2" />,
      name: 'Coletas',
    },
    {
      href: '/admin/pontos',
      icon: <FontAwesomeIcon icon={faLocationDot} className="h-6 w-6 p-2" />,
      name: 'Pontos de coleta',
    },
    {
      href: '/admin/solicitacoes',
      icon: <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6 p-2" />,
      name: 'Solicitações',
    },
    {
      href: '/admin/configuracoes',
      icon: <FontAwesomeIcon icon={faGear} className="h-6 w-6 p-2" />,
      name: 'Configurações',
    },
    {
      href: '/admin/export',
      icon: <FontAwesomeIcon icon={faFileExcel} className="h-6 w-6 p-2" />,
      name: 'Exportar dados',
    },
  ];

  return (
    <NavContext.Provider
      value={{
        isOpen: collapsed,
        setIsOpen: setCollapsed,
      }}
    >
      <div
        className={cn(
          `fixed z-30 flex h-20 w-screen min-w-20 flex-col overflow-y-hidden lg:sticky lg:h-screen lg:max-w-60`,
          'shadow-lg transition-all duration-300 ',
          collapsed ? 'fixed h-20 w-20' : 'h-screen',
        )}
      >
        <div id="navbar-header" className="h-20 bg-primary-500 text-white">
          <button
            id="menu-button"
            onClick={() => setCollapsed(!collapsed)}
            className=" h-20 w-full bg-primary-500 p-8 text-end hover:bg-primary-600"
          >
            <FontAwesomeIcon
              icon={collapsed ? faBars : faChevronLeft}
              size="xl"
            />
          </button>
        </div>

        <div
          id="navbar-content"
          className="grow border-r border-r-neutral-300 bg-background "
        >
          <ul>
            {navbar_links.map((link) => {
              return (
                <li
                  className={`text-md m-0 hover:bg-gray-300 ${pathname === link.href ? 'border-r-4 border-primary-500 bg-gray-200' : ''}`}
                  key={'li ' + link.name}
                >
                  <Link
                    href={link.href}
                    className="box-border flex min-h-12 gap-3 rounded-md p-4 leading-6 text-[#516c79]"
                  >
                    <span className="p-auto block h-10 w-10"> {link.icon}</span>
                    <span
                      className={cn(
                        'flex items-center justify-center text-center',
                        'truncate',
                        collapsed ? 'hidden' : '',
                      )}
                    >
                      {link.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </NavContext.Provider>
  );
};
