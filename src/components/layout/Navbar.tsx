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
import { usePathname } from 'next/navigation';

export default function Navbar(props: {
  collapse: React.MouseEventHandler<HTMLButtonElement>;
  collapsed: boolean;
}) {
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
    <div
      id="navbar-wrapper"
      className={`fixed ${props.collapsed ? 'w-20' : 'w-full'} z-30 flex h-screen max-w-60 flex-col overflow-hidden shadow-lg transition-all duration-300 max-sm:max-w-full`}
    >
      <div id="navbar-header" className="h-20 bg-primary-500 text-white">
        <button
          id="menu-button"
          onClick={props.collapse}
          className=" h-20 w-full bg-primary-500 p-8 text-end hover:bg-primary-600"
        >
          <FontAwesomeIcon
            icon={props.collapsed ? faBars : faChevronLeft}
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
                className={`m-0 text-xl hover:bg-gray-300 ${pathname === link.href ? 'border-r-4 border-primary-500 bg-gray-200' : ''}`}
                key={'li ' + link.name}
              >
                <a
                  href={link.href}
                  className="box-border flex min-h-12 gap-3 rounded-md p-4 leading-6 text-[#516c79]"
                >
                  <span className="p-auto block h-10 w-10"> {link.icon}</span>
                  <span className="flex items-center">
                    {!props.collapsed && link.name}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
