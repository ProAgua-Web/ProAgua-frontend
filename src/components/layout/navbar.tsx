import { cn } from '@/lib/utils';
import {
  faBars,
  faChevronLeft,
  faClipboardList,
  faEnvelope,
  faFileExcel,
  faGear,
  faLocationDot,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createContext, type FC, JSX, useState } from 'react';

interface NavContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface NavLink {
  href: string;
  icon: JSX.Element;
  name: string;
}

const NavContext = createContext<NavContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

const NAV_LINKS: NavLink[] = [
  {
    href: '/admin/sequencias',
    icon: <FontAwesomeIcon icon={faClipboardList} className="h-6 w-6 p-2" />,
    name: 'Coletas',
  },
  {
    href: '/admin/edificacoes',
    icon: <FontAwesomeIcon icon={faLocationDot} className="h-6 w-6 p-2" />,
    name: 'Edificações',
  },
  {
    href: '/admin/solicitacoes',
    icon: <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6 p-2" />,
    name: 'Solicitações',
  },
  {
    href: '/admin/usuarios',
    icon: <FontAwesomeIcon icon={faUser} className="h-6 w-6 p-2" />,
    name: 'Usuários',
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

export const Navbar: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <NavContext.Provider
      value={{
        isOpen: isCollapsed,
        setIsOpen: setIsCollapsed,
      }}
    >
      <div
        className={cn(
          'fixed z-50 flex h-20 w-screen min-w-20 flex-col overflow-y-hidden shadow-lg transition-all duration-300 lg:sticky lg:h-screen lg:max-w-60',
          isCollapsed ? 'fixed h-20 w-20' : 'h-screen',
        )}
      >
        <NavbarHeader
          isCollapsed={isCollapsed}
          onToggleCollapse={toggleCollapse}
        />

        <NavbarContent
          links={NAV_LINKS}
          isCollapsed={isCollapsed}
          currentPath={pathname}
        />
      </div>
      <div
        className={cn(
          'fixed z-50 flex h-20 w-screen min-w-20 flex-col overflow-y-hidden shadow-lg transition-all duration-300 lg:h-screen lg:max-w-60',
          isCollapsed ? 'fixed h-20 w-20' : 'h-screen',
        )}
      >
        <NavbarHeader
          isCollapsed={isCollapsed}
          onToggleCollapse={toggleCollapse}
        />

        <NavbarContent
          links={NAV_LINKS}
          isCollapsed={isCollapsed}
          currentPath={pathname}
        />
      </div>
    </NavContext.Provider>
  );
};

interface NavbarHeaderProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const NavbarHeader: FC<NavbarHeaderProps> = ({
  isCollapsed,
  onToggleCollapse,
}) => (
  <header className="h-20 bg-primary-500 text-white">
    <button
      onClick={onToggleCollapse}
      className="h-20 w-full bg-primary-500 p-8 text-end hover:bg-primary-600"
      aria-label={isCollapsed ? 'Expand menu' : 'Collapse menu'}
    >
      <FontAwesomeIcon icon={isCollapsed ? faBars : faChevronLeft} size="xl" />
    </button>
  </header>
);

interface NavbarContentProps {
  links: NavLink[];
  isCollapsed: boolean;
  currentPath: string;
}

const NavbarContent: FC<NavbarContentProps> = ({
  links,
  isCollapsed,
  currentPath,
}) => (
  <div className="grow border-r border-r-neutral-300 bg-background">
    <ul>
      {links.map((link) => (
        <NavItem
          key={link.href}
          link={link}
          isActive={currentPath === link.href}
          isCollapsed={isCollapsed}
        />
      ))}
    </ul>
  </div>
);

interface NavItemProps {
  link: NavLink;
  isActive: boolean;
  isCollapsed: boolean;
}

const NavItem: FC<NavItemProps> = ({ link, isActive, isCollapsed }) => (
  <li
    className={`text-md m-0 hover:bg-gray-300 ${
      isActive ? 'border-r-4 border-primary-500 bg-gray-200' : ''
    }`}
  >
    <Link
      href={link.href}
      className="box-border flex min-h-12 gap-3 rounded-md p-4 leading-6 text-[#516c79]"
    >
      <span className="p-auto block h-10 w-10">{link.icon}</span>
      <span
        className={cn(
          'flex items-center justify-center truncate text-center',
          isCollapsed ? 'hidden' : '',
        )}
      >
        {link.name}
      </span>
    </Link>
  </li>
);
