'use client';

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
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { type FC, Fragment, type JSX, useState } from 'react';
import { FaBars, FaChevronLeft } from 'react-icons/fa6';
import { Button } from '../ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';

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
  auth?: boolean;
}

export const Navbar = ({
  isOpen,
  setIsOpen,
  auth,
}: NavbarProps): JSX.Element => {
  //const { autenticado } = useAutenticacao();

  const pathname = usePathname();

  if (!auth) {
    return <></>; // Render nothing if not authenticated
  }

  return (
    <Fragment>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex">
        <div
          className={cn(
            'fixed left-0 top-0 z-40 h-screen bg-white transition-all duration-300 ease-in-out',
            isOpen ? 'w-16' : 'w-64',
          )}
        >
          <DesktopSidebar
            isCollapsed={isOpen}
            links={NAV_LINKS}
            currentPath={pathname}
            onToggle={() => setIsOpen(!isOpen)}
          />
        </div>
      </aside>

      {/* Mobile Bottom Navigation with Drawer for all items */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white lg:hidden">
        <MobileBottomNav links={NAV_LINKS} currentPath={pathname} />
      </nav>
    </Fragment>
  );
};

interface DesktopSidebarProps {
  isCollapsed: boolean;
  links: NavLink[];
  currentPath: string;
  onToggle: () => void;
}

const DesktopSidebar: FC<DesktopSidebarProps> = ({
  isCollapsed,
  links,
  currentPath,
  onToggle,
}) => (
  <div className="flex h-full flex-col bg-white">
    <div className="flex h-20 items-center justify-end bg-primary-500 px-4 text-white">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className={cn(
          'hover:bg-primary hover:text-primary h-full w-full text-white transition-all duration-200',
          isCollapsed && 'mx-auto',
        )}
      >
        {isCollapsed ? (
          <FaBars className="h-6 w-6" />
        ) : (
          <FaChevronLeft className="h-6 w-6" />
        )}
      </Button>
    </div>

    <nav className="flex-1">
      {links.map((link) => (
        <SidebarItem
          key={link.href}
          link={link}
          isActive={currentPath === link.href}
          isCollapsed={isCollapsed}
        />
      ))}
    </nav>
  </div>
);

interface SidebarItemProps {
  link: NavLink;
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarItem: FC<SidebarItemProps> = ({ link, isActive, isCollapsed }) => (
  <Link
    href={link.href}
    className={cn(
      'flex items-center gap-3 px-3 py-3 text-sm font-medium transition-all duration-200',
      isActive
        ? 'border-r-4 border-primary-500 bg-gray-200 text-[#516c79] hover:bg-gray-300'
        : 'hover:bg-primary-50 text-[#516c79] hover:bg-gray-300 hover:text-primary-600',
      isCollapsed && 'justify-center px-2',
    )}
    title={isCollapsed ? link.name : undefined}
  >
    <span className="flex-shrink-0">{link.icon}</span>
    {!isCollapsed && <span className="truncate">{link.name}</span>}
  </Link>
);

interface MobileBottomNavProps {
  links: NavLink[];
  currentPath: string;
}

const MobileBottomNav: FC<MobileBottomNavProps> = ({ links, currentPath }) => {
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false);
  const router = useRouter();

  const primaryLinks = links.slice(0, 4); // Show first 4 links directly

  const handleLinkClick = (href: string) => {
    setIsBottomDrawerOpen(false); // Close drawer on link click
    router.push(href);
  };

  return (
    <div className="flex h-16 items-stretch justify-around bg-white px-1">
      {primaryLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg p-1 text-center text-xs transition-all duration-200',
            currentPath === link.href
              ? 'bg-primary-50 text-primary-500' // Active state color
              : 'hover:bg-primary-25 text-slate-600 hover:text-primary-500', // Inactive/hover colors
          )}
        >
          <span className="flex h-6 w-6 items-center justify-center text-lg">
            {link.icon}
          </span>
          <span className="truncate text-[10px] leading-tight">
            {link.name}
          </span>
        </Link>
      ))}

      <Drawer open={isBottomDrawerOpen} onOpenChange={setIsBottomDrawerOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="ghost" // Mantém o botão minimalista, removendo fundo/borda padrão
            className={cn(
              // 1. Classes base de layout e dimensionamento dos Links:
              'flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg p-1 text-center',
              // 2. Tamanho da fonte dos Links:
              'text-xs',
              // 3. Sobrescrever o peso da fonte padrão do botão (geralmente medium/semibold):
              'font-normal',
              // 4. Permitir que a altura seja determinada pelo conteúdo (como nos Links), sobrescrevendo alturas fixas do botão:
              'h-auto',
              // 5. Cores de texto e hover (iguais aos Links inativos):
              'hover:bg-primary-25 text-slate-600 hover:text-primary-500',
              // 6. Transições (já presentes, mas bom garantir):
              'transition-all duration-200',
            )}
          >
            <span className="flex h-6 w-6 items-center justify-center text-lg">
              {' '}
              {/* Mantém o wrapper do ícone */}
              <FaBars className="h-5 w-5" /> {/* Ícone */}
            </span>
            <span className="truncate text-[10px] leading-tight">Menu</span>{' '}
            {/* Label */}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[70vh] border-t bg-white">
          {' '}
          {/* Drawer background to white */}
          <DrawerHeader className="border-b p-4">
            <DrawerTitle className="flex items-center gap-2 font-semibold text-primary-700">
              {' '}
              {/* Title color for white bg */}
              <Image
                src="/Logo.svg"
                alt="Logo do projeto"
                width={24}
                height={32}
                className="h-8"
              />
              ProÁgua - Menu
            </DrawerTitle>
            <DrawerDescription className="mt-1 text-sm text-slate-500">
              {' '}
              {/* Description color for white bg */}
              Navegue pelas seções administrativas do sistema
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto px-4 pb-6">
            <nav className="grid grid-cols-2 gap-3">
              {links.map(
                (
                  link, // All links are shown in this bottom drawer
                ) => (
                  <button
                    key={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={cn(
                      'flex transform items-center gap-3 rounded-lg p-3 text-left text-sm font-medium transition-all duration-200 hover:scale-[1.02]',
                      currentPath === link.href
                        ? 'bg-primary-100 font-medium text-primary-700 shadow-sm' // Adjusted active state for better contrast
                        : 'text-slate-700 hover:bg-slate-100 hover:text-primary-600', // Adjusted inactive/hover for better contrast
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-5 w-5 items-center justify-center',
                        currentPath === link.href
                          ? 'text-primary-700'
                          : 'text-slate-500', // Icon color contrast
                      )}
                    >
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                  </button>
                ),
              )}
            </nav>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
