export default function Navbar(props: {
  collapse: React.MouseEventHandler<HTMLButtonElement>;
  collapsed: Boolean;
}) {
  const navbar_links = [
    {
      href: "/admin/sequencias_coletas/",
      icon: <i className="bi bi-clipboard-data-fill"></i>,
      name: "Sequência Coletas",
    },
    {
      href: "/admin/edificacoes/",
      icon: <i className="bi bi-buildings-fill"></i>,
      name: "Edificações",
    },
    {
      href: "/admin/pontos/",
      icon: <i className="bi bi-geo-alt-fill"></i>,
      name: "Pontos de coleta",
    },
    {
      href: "/admin#solicitacoes",
      icon: <i className="bi bi-envelope-fill"></i>,
      name: "Solicitações",
    },
    {
      href: "/admin/configuracoes/",
      icon: <i className="bi bi-gear-fill"></i>,
      name: "Configurações",
    },
    {
      href: "/admin/export/",
      icon: <i className="bi bi-clipboard-data-fill"></i>,
      name: "Exportar dados",
    },
  ];

  return (
    <div
      id="navbar-wrapper"
      className={`fixed ${props.collapsed ? "w-0" : "w-full"} z-10 flex h-screen max-w-60 flex-col overflow-hidden shadow-lg transition-all max-sm:max-w-full`}
    >
      <div id="navbar-header" className="h-20">
        <i
          className="bi bi-chevron-left header-icon"
          onClick={props.collapse}
        ></i>
      </div>
      <div
        id="navbar-content"
        className="grow border-r border-r-neutral-300 bg-background "
      >
        <ul>
          {navbar_links.map((link) => {
            return (
              <li className="text-xl hover:bg-[#c1c2c4]">
                <a
                  href={link.href}
                  className="m-3 box-border flex min-h-12 gap-3 rounded-md p-4 leading-6 text-[#516c79]"
                >
                  {link.icon}
                  {link.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
