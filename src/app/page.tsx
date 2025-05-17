import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-[clamp(50px,8vh,100px)] w-full items-center justify-between bg-primary-500 pe-[clamp(20px,4vw+1rem,100vw-1200px)] pl-12 text-white">
      <Link className="flex items-center gap-2 text-2xl uppercase" href="/">
        <Image
          src="/Logo.svg"
          alt="Logo do projeto"
          width={28}
          height={40}
          className="h-[clamp(2rem,1.8571rem+0.7143vw,2.5rem)]"
        />
        ProÁgua
      </Link>
      <nav>
        <ul className="flex gap-8">
          <li>
            <Link href="#inicio">Início</Link>
          </li>
          <li>
            <Link href="#sobre">Sobre</Link>
          </li>
        </ul>
      </nav>
    </header>
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
          <p className="uppercase">BOAS-VINDAS AO PROÁGUA</p>
          <h1 className="max-w-[1000px] text-[clamp(1.75rem,1.458vw+1.458rem,2.625rem)]">
            A verificação da sua água simplificada para você
          </h1>
          <Button size="wide" className="w-fit px-12 py-8" asChild>
            <Link href="/edificacoes" className="font-mono text-xl">
              Procure por um ponto
            </Link>
          </Button>
        </section>

        <section
          id="sobre"
          className={sectionClassName + ' py-12 pl-[max(30px,6vh+1rem)]'}
        >
          <h2 className="font-semibold text-primary-500">SOBRE NÓS</h2>
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
          <Link href="/">Saiba mais</Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
