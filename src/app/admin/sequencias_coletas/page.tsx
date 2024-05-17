import { Sequencia, TIPOS_PONTOS } from "@/utils/types";
import CardSequencia from "@/components/sequencias/CardSequencia";
import Filters from "@/components/sequencias/Filters";
import { API_BASE_URL } from "@/utils/config";


export default async function Coletas() {
    let resp = await fetch(API_BASE_URL + '/api/v1/sequencias', {cache: 'no-cache'});
    const sequencias: Sequencia[] = (await resp.json()).items;

    return (
        <>
            <h2 className="text-3xl text-[#525252]">Sequência de Coletas</h2>
            <div className="flex w-full flex-col items-center">
                <Filters />

                <div className="w-full">
                    <table className="w-full border border-gray-400 mb-8">
                        <thead className="bg-neutral-800 text-white">
                            <tr>
                                <th className="pl-12 px-2 py-3 text-left">Cód. Edificação</th>
                                <th className="px-2 py-3 text-left">Ambiente ponto</th>
                                <th className="px-2 py-3 text-left">Ponto</th>
                                <th className="px-2 py-3 text-left">Tombo</th>
                                <th className="px-2 py-3 text-left">Amostragem</th>
                                <th className="pr-8 px-2 py-3 text-left">Acessar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sequencias.map((sequencia: Sequencia, i) => {
                                return (
                                    <tr className="bg-sky-100 even:bg-sky-200">
                                        <td className="text-sm pl-12 px-2 py-3">{sequencia.ponto?.edificacao.codigo}</td>
                                        <td className="text-sm px-2 py-3">{sequencia.ponto?.ambiente || "-"}</td>
                                        <td className="text-sm px-2 py-3">{TIPOS_PONTOS[sequencia.ponto?.tipo]}</td>
                                        <td className="text-sm px-2 py-3">{sequencia.ponto?.tombo || "N/A"}</td>
                                        <td className="text-sm px-2 py-3">{sequencia.amostragem}</td>
                                        <td className="text-sm pr-8 px-2 py-3"><a className="textext-smt-sm text-blue-800 underline" href={"/admin/sequencias_coletas/" + sequencia.id}>Acessar</a></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div id="paginator" className="pagination flex">
                    <button id="pagination-prev" className="hidden">
                        &lt; Anterior
                    </button>
                    <span id="page-info">Página 1 de 1</span>
                    <button id="pagination-next" className="hidden">
                        Próxima &gt;
                    </button>
                </div>

                <a
                    className="floating-bt max-w-fit rounded-md bg-primary-500 p-4 text-white hover:bg-primary-600"
                    href="sequencias_coletas/criar"
                >
                    <i className="bi bi-plus-lg"></i> Adicionar sequência
                </a>
            </div>
        </>
    );
}
