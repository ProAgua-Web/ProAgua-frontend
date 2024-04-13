import Header from "@/components/layout/Header";
import TablePontos from "@/components/pontos/TabelaColetas";
import { Ponto } from "@/utils/api_consumer";
import { API_BASE_URL } from "@/utils/config"

export default async function Page() {
    const resp = await fetch(`${API_BASE_URL}/api/v1/pontos`);
    const pontos: Ponto[] = (await resp.json()).items;

    return (
        <>
            <Header />
            <main className="pt-[calc(clamp(50px,8vh,100px)+2rem)]">
                <div className="p-4 flex gap-4">
                    <input className="py-2 px-4 rounded w-full border border-neutral-400"type="text" placeholder="Pesquisar por pontos"/>
                    <button className="rounded bg-primary-500 text-white font-bold px-4 py-2 border border-primary-600 hover:bg-primary-600">Pesquisar</button>
                </div>
                <div className="w-full px-4">
                    {/* {pontos.map(ponto => {
                        return (
                            <div className="mb-4 w-1/2 border border-neutral-400 rounded p-4">
                                ID ponto: {ponto.id}<br />
                                Tombo: {ponto.tombo}<br />
                                Ambiente da edificação: {ponto.ambiente}<br />
                                Edificação: {ponto.edificacao.nome}<br />
                                Campus: {ponto.edificacao.campus}<br />
                                Tipo do ponto: {ponto.tipo}<br />
                                Status: {ponto.status ? "Em conformidade" : "Não conforme"}<br />
                                <a href={`/pontos/${ponto.id}`} className="text-blue-900 font-medium underline">Detalhes</a>
                            </div>
                        )
                    })} */}

                    <TablePontos pontos={pontos} />
                </div>
            </main>
            
        </>
    )
}