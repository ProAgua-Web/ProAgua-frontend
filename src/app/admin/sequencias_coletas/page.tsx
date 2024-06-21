"use client";

import { Ponto, Sequencia, TIPOS_PONTOS } from "@/utils/types";
import { apiUrl, formatDate, toURLParams } from "@/utils/api_consumer/client_side_consumer";
import { useEffect, useState } from "react";
import OkIcon from "@/components/icons/OkIcon";
import DangerIcon from "@/components/icons/DangerIcon";

export default function Coletas() {
    const [sequencias, setSequencias] = useState<Sequencia[]>([]);

    const [filters, setFilters] = useState<any>({ q: "", campus: "BOTH" });
    const [checkPendentes, setCheckPendentes] = useState<boolean>(false);
    const [checkConcluidas, setCheckConcluidas] = useState<boolean>(false);

    const [pontos, setPontos] = useState<Ponto[]>([]);
    const [abortController, setAbortController] = useState(new AbortController());

    const [filteredSequencias, setFilteredSequencias] = useState<Sequencia[]>(sequencias);

    useEffect(() => {
        if (abortController) {
            abortController.abort();
        }

        const newAbortController = new AbortController();
        setAbortController(newAbortController);

        const fetchData = async () => {
            const _filters = { ...filters };
            if (_filters.campus === "BOTH") {
                delete _filters.campus;
            }

            const url = `${apiUrl}/api/v1/sequencias?limit=10000`
            let query = toURLParams(_filters);

            const res = await fetch(`${url}&${query}`, { signal: newAbortController.signal, cache: "no-cache", 'credentials': 'include' });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const response = await res.json();
            let filtered = response.items;
            filtered = filtered.filter((sequencia: Sequencia) => {
                if (checkConcluidas && checkPendentes) {
                    return true;
                }
                return !(checkConcluidas && !sequencia.status) && !(checkPendentes && sequencia.status);
            });

            setFilteredSequencias(filtered);
        };

        fetchData();
    }, [filters, checkPendentes, checkConcluidas]);

    return (
        <>
            <h2 className="text-3xl text-[#525252]">Sequência de Coletas</h2>
            <div className="flex w-full flex-col items-center">
                <div className="mb-4 flex w-full flex-col gap-4">
                    <div className="relative flex gap-2">
                        {/* <i className="bi bi-search"></i> */}
                        <input
                            id="search-bar"
                            className="w-full rounded-md border bg-white px-5 py-3 text-[#525252]"
                            type="text"
                            name="search-query"
                            placeholder="Digite o termo de pesquisa"
                            onChange={(e) => {
                                setFilters({ ...filters, q: e.target.value });
                            }
                            }
                        />

                        <select
                            name="campus"
                            className="w-36 rounded-md border bg-white px-3 py-2 text-[#525252]"
                            onChange={(e) => { setFilters({ ...filters, campus: e.target.value }) }}
                        >
                            <option value="" disabled selected hidden>
                                Campus
                            </option>
                            <option value="BOTH">Leste/Oeste</option>
                            <option value="LE">Leste</option>
                            <option value="OE">Oeste</option>
                        </select>
                    </div>
                    <div className="w-full flex justify-between gap-3 self-end">

                        <div className="flex">
                            <div
                                onClick={(e) => { setCheckConcluidas(!checkConcluidas); setFilters }}
                                className={`flex flex-row justify-center items-center px-3 py-2 bg-white border border-r-0 rounded-lg rounded-r-none cursor-pointer ${checkConcluidas ? "text-green-500" : "text-gray-400 bg-slate-100"} hover:bg-slate-100`}>
                                <label htmlFor="concluidas"
                                    className="w-full h-full cursor-pointer select-none"
                                > Concluídas</label>
                                <input id="concluidas" name="concluidas" type="checkbox" value="0" defaultChecked={checkConcluidas} hidden
                                    className=""
                                    disabled />
                            </div>


                            <div
                                onClick={(e) => { setCheckPendentes(!checkPendentes); setFilters }}
                                className={`flex flex-row justify-center items-center px-3 py-2 bg-white border rounded-lg rounded-l-none cursor-pointer ${checkPendentes ? "text-red-500" : "text-gray-400 bg-slate-100"} hover:bg-slate-100`}>
                                <label htmlFor="pendentes"
                                    className="cursor-pointer select-none"
                                > Pendentes </label>
                                <input id="pendentes" name="pendentes" type="checkbox" value="1" defaultChecked={checkPendentes} hidden
                                    disabled />
                            </div>

                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <table className="w-full border border-slate-500 mb-8 last:mb-0">
                        <thead>
                            <tr className="bg-primary-500 text-white">
                                <th className="px-2 py-4">Ciclo de Amostragem</th>
                                <th className="px-2 py-4 text-center">Cód. Edificação</th>
                                <th className="px-2 py-4 text-center">Campus</th>
                                <th className="px-2 py-4">Ponto</th>
                                <th className="px-2 py-4">Ambiente ponto</th>
                                <th className="px-2 py-4">Tombo</th>
                                <th className="px-2 py-4">Ultima coleta</th>
                                <th className="px-2 py-4">Qnt. de coletas</th>
                                <th className="px-2 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSequencias.map((sequencia: Sequencia, i) => {
                                const tipo = sequencia.ponto && TIPOS_PONTOS[sequencia.ponto?.tipo];
                                return (
                                    <tr
                                        title={sequencia.status ? "Concluída" : sequencia.status_message}
                                        key={sequencia.id}
                                        className="w-full bg-slate-200 even:bg-slate-100 hover:bg-blue-300 transition-colors duration-200 cursor-pointer select-none"
                                        onClick={() => {
                                            window.location.href = `/admin/sequencias_coletas/${sequencia.id}`;
                                        }}
                                    >
                                        <td className="text-sm px-2 py-3">{sequencia.amostragem}</td>
                                        <td className="text-sm px-2 py-3 text-center">{sequencia.ponto?.edificacao.codigo}</td>
                                        <td className="text-sm px-2 py-3 text-center">{sequencia.ponto?.edificacao.campus == "OE" ? "Oeste" : "Leste"}</td>
                                        <td className="text-sm px-2 py-3">{tipo}</td>
                                        <td className="text-sm px-2 py-3">{sequencia.ponto?.ambiente || "-"}</td>
                                        <td className="text-sm px-2 py-3">{sequencia.ponto?.tombo || "N/A"}</td>
                                        <td className="text-sm px-2 py-3 text-center">{sequencia.ultima_coleta ? formatDate(sequencia.ultima_coleta) : "-"}</td>
                                        <td className="text-sm px-2 py-3 text-center">{sequencia.quantidade_coletas}</td>
                                        <td className="text-sm px-2 py-3 text-center">
                                            <span className="w-full flex justify-center">
                                                {sequencia.status ? <OkIcon width="1.5rem" /> : <DangerIcon width="1.5rem" />}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* <div id="paginator" className="pagination flex">
                    <button id="pagination-prev" className="hidden">
                        &lt; Anterior
                    </button>
                    <span id="page-info">Página 1 de 1</span>
                    <button id="pagination-next" className="hidden">
                        Próxima &gt;
                    </button>
                </div> */}

                <a
                    href="sequencias_coletas/criar"
                    className="w-[320px] h-fit fixed bottom-4 left-1/2 transform -translate-x-1/2 mt-4 p-4 flex justify-center items-center px-6 py-4 bg-green-500 hover:bg-green-600 border border-green-600 rounded text-white font-semibold"
                >
                    + Criar Sequência de Coleta
                </a>

                {/* <input
                            type="submit"
                            value="Exportar"
                            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 p-4 h-fit w-[320px] rounded-lg hover:bg-blue-600 text-white font-semibold border border-blue-600 shadow-lg"
                        /> */}
            </div>
        </>
    );
}
