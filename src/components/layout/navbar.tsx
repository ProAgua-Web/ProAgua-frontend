import { cn } from '@/lib/utils';
import {
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
import { type FC, Fragment, JSX } from 'react';
import { FaBars, FaChevronLeft } from 'react-icons/fa6';
import { Button } from '../ui/button';

interface NavLink {
  href: string;
  icon: JSX.Element;
  name: string;
}

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
    href: '/admin/referencia',
    icon: <FontAwesomeIcon icon={faGear} className="h-6 w-6 p-2" />,
    name: 'Referência',
  },
  {
    href: '/admin/exportar',
    icon: <FontAwesomeIcon icon={faFileExcel} className="h-6 w-6 p-2" />,
    name: 'Exportar dados',
  },
];

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children?: React.ReactNode;
}

export const Navbar = (props: NavbarProps): JSX.Element => {
  const pathname = usePathname();
  const { isOpen, setIsOpen } = props;

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <div
        className={cn(
          'fixed z-50 flex h-20 w-screen min-w-20 flex-col overflow-y-hidden lg:sticky lg:h-screen lg:max-w-60',
          isOpen ? 'fixed h-20 w-20' : 'h-screen',
        )}
      ></div>
      <div
        className={cn(
          'fixed z-50 flex h-20 w-screen min-w-20 flex-col overflow-y-hidden shadow-lg transition-all duration-300 lg:h-screen lg:max-w-60',
          isOpen ? 'fixed h-20 w-20' : 'h-screen',
        )}
      >
        <NavbarHeader isOpen={isOpen} onToggleCollapse={toggleCollapse} />

        <NavbarContent
          links={NAV_LINKS}
          isCollapsed={isOpen}
          currentPath={pathname}
        />
      </div>
    </Fragment>
  );
};

interface NavbarHeaderProps {
  isOpen: boolean;
  onToggleCollapse: () => void;
}

const NavbarHeader: FC<NavbarHeaderProps> = ({ isOpen, onToggleCollapse }) => (
  <header className="h-20 bg-primary-500 text-white">
    <Button
      className="flex h-20 w-full justify-end border-none bg-primary-500 p-8 text-end hover:bg-primary-600"
      onClick={onToggleCollapse}
    >
      {isOpen ? <FaBars /> : <FaChevronLeft />}
    </Button>
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
  <div className="grow bg-white">
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
        className={cn('flex items-center justify-center truncate text-center', {
          hidden: isCollapsed,
        })}
      >
        {link.name}
      </span>
    </Link>
  </li>
);
