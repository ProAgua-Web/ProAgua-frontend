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
            <a href="#inicio">Início</a>
          </li>
          <li>
            <a href="#pesquise">Pesquise</a>
          </li>
          <li>
            <a href="#sobre">Sobre</a>
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

function Footer() {
  return (
    <footer className="flex w-full items-center justify-between bg-primary-500 p-[clamp(30px,4vw+1rem,100vw-1200px)] text-white">
      <div className="justify-center">
        <h1 className="mb-2 text-2xl">ProÁgua</h1>
        <h5 className="font-normal">© 2023 - Bom dia.</h5>
        <h5>Todos os direitos reservados.</h5>
      </div>
      <div className="logo-container">
        <img src="../static/images/Logo_ufersa.svg" alt="Logo UFERSA" />
      </div>
    </footer>
  );
}

export default function Home() {
  const sectionClassName =
    'flex flex-col min-h-[calc(100vh-clamp(50px,8vh,100px))] w-full justify-center';

  return (
    <>
      <Header />

      <main>
        <section
          id="inicio"
          className={
            sectionClassName +
            ' color-white gap-6 text-balance bg-primary-500 pl-[max(30px,4vh+1rem)] text-white'
          }
        >
          <p className="text-xs uppercase">BOAS-VINDAS AO PROÁGUA</p>
          <h1 className="max-w-[1000px] text-[clamp(1.75rem,1.458vw+1.458rem,2.625rem)]">
            A verificação da sua água simplificada para você
          </h1>
          <div className="outlined-btn flex w-fit items-center justify-center rounded border border-white px-3 py-1">
            <i className="fa-solid fa-magnifying-glass"></i>
            {/* <a href="#pesquise">Procure por um ponto</a> */}
            <a href="/pontos">Procure por um ponto</a>
          </div>
        </section>

        <section
          id="pesquise"
          className={sectionClassName + ' w-full items-center justify-center'}
        >
          <p className="mb-8 text-xs font-semibold text-neutral-600">
            PESQUISA
          </p>
          <h1 className="mb-6 text-center text-4xl font-bold text-neutral-700">
            Deseja verificar a qualidade
            <br />
            da água de qual ponto?
          </h1>
          <form
            className="search-field relative flex"
            action="lista_pontos"
            method="GET"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              className="w-[clamp(200px,25vw,1000px)] rounded-2xl bg-neutral-200 py-2 pl-3 pr-10"
              name="search-query"
              placeholder="Laboratório"
              required
            />
          </form>
        </section>

        <section
          id="sobre"
          className={sectionClassName + ' py-12 pl-[max(30px,6vh+1rem)]'}
        >
          <h2 className="text-xs font-semibold text-primary-500">SOBRE NÓS</h2>
          <h1 className="max-w-[95%] text-balance">
            Um projeto construído por diversas mãos, sempre buscando melhorar.
          </h1>
          <p className="word-wrap w-[60vw] text-balance text-justify">
            O ProÁgua estuda a qualidade da água para consumo humano da
            Universidade Federal Rural do Semi-Árido, campus Mossoró (UFERSA
            campus Mossoró) com o objetivo de obter embasamento para contribuir
            com a proteção da saúde da comunidade universitária.
          </p>
          <p className="word-wrap w-[60vw] text-balance text-justify">
            O projeto foi concebido com três linhas de ação: • conhecer a
            qualidade da água para consumo humano da UFERSA campus Mossoró •
            divulgar resultados de qualidade da água para os usuários do sistema
            • orientar o Setor de Manutenção da instituição
          </p>
          <p className="word-wrap w-[60vw] text-balance text-justify">
            A metodologia utilizada para monitorar a qualidade da água foi
            construída levando em conta, dentre outros, a diretriz nacional do
            plano de ciclo de amostragem da vigilância da qualidade da água para
            consumo humano e especificidades do sistema de distribuição da água
            da UFERSA, incluindo seus sistemas prediais de água fria.
          </p>
          <a href="/">Saiba mais</a>
        </section>
      </main>

      <Footer />
    </>
  );
}
