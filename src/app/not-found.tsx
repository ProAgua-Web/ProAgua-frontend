function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-[clamp(50px,8vh,100px)] w-full items-center justify-between bg-primary-500 pe-[clamp(20px,4vw+1rem,100vw-1200px)] pl-12 text-white">
      <a className="flex items-center gap-2 text-2xl uppercase" href="/">
        <img
          src="/Logo.svg"
          alt="Logo do projeto"
          className="h-[clamp(2rem,1.8571rem+0.7143vw,2.5rem)]"
        />
        ProÁgua
      </a>
      <nav>
        <ul className="nav-list flex list-none gap-8">
          <li>
            <a href="/#inicio">Início</a>
          </li>
          <li>
            <a href="/#pesquise">Pesquise</a>
          </li>
          <li>
            <a href="/#sobre">Sobre</a>
          </li>
        </ul>
      </nav>
      <a
        href="/login"
        className="w-fit items-center justify-center rounded border border-white px-3 py-1"
      >
        Login
      </a>
    </header>
  );
}

export default function NotFound() {
  return (
      <main className="w-full h-screen flex flex-col">
          <Header/>
          <div className="w-full flex flex-grow justify-center items-center">
              <h1 className="text-xl">404 - Not Found!</h1>
          </div>
      </main>
  );
}