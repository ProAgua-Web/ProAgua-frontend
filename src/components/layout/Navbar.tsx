"use client";

/*
#navbar-content ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

#navbar-content ul li a {
    height: 50px;
    box-sizing: border-box;
    padding: 1rem;
    text-decoration: none;
    color: #516c79;
    display: flex;
    gap: 12px;
    
    margin: 0.8rem;
    border-radius: 6px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
}

#navbar-content ul li a i {
    font-size: 20px;
}

#navbar-content ul li a:hover {
    background-color: #c1c2c4;
}

#navbar-content ul li a:active{
    background-color: #8e8e8e;
    border-bottom: 1px solid #717171;
    color: white;
}

#navbar-header {
    height: var(--header-height);
    background-color: var(--navbar-header-bg);
    border-right: 1px solid #00000020;

    align-items: center;
    display: flex;
    justify-content: flex-end;
    padding-right: 1rem;
}

#navbar-wrapper {
    width: 240px;
    display: flex;
    flex-direction: column;
    grid-area: navbar;
    transition: width 0.4s ease;
    overflow: hidden;
    box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.15);
}

#navbar-wrapper.collapsed {
    width: 0px;
}

#navbar-content {
    background-color: var(--navbar-bg);
    border-right: 1px solid #00000020;
    flex-grow: 1;
}

*/

export default function Navbar(props: {
  collapse: React.MouseEventHandler<HTMLButtonElement>;
  collapsed: Boolean;
}) {
  const navbar_links = [
    {
      href: "/sequencias_coletas/",
      icon: <i className="bi bi-clipboard-data-fill"></i>,
      name: "Sequência Coletas",
    },
    {
      href: "/edificacoes/",
      icon: <i className="bi bi-buildings-fill"></i>,
      name: "Edificações",
    },
    {
      href: "/pontos/",
      icon: <i className="bi bi-geo-alt-fill"></i>,
      name: "Pontos de coleta",
    },
    {
      href: "#solicitacoes",
      icon: <i className="bi bi-envelope-fill"></i>,
      name: "Solicitações",
    },
    {
      href: "/configuracoes/",
      icon: <i className="bi bi-gear-fill"></i>,
      name: "Configurações",
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
