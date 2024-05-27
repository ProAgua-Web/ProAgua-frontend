"use client";

import { Ponto, Sequencia, TIPOS_PONTOS } from "@/utils/types";
import CardSequencia from "@/components/sequencias/CardSequencia";
import Filters from "@/components/sequencias/Filters";
import { API_BASE_URL } from "@/utils/config";
import { toURLParams, useSequencias } from "@/utils/api_consumer/client_side_consumer";
import { useEffect, useState } from "react";

function formatDate(date: string) {
    const d = new Date(date);
    const hour = d.toLocaleTimeString().slice(0, 5).replace(':', 'h');
    return `${d.toLocaleDateString()} ${hour}`;
}


export default function Coletas() {
    const sequencias = useSequencias()

    const [filters, setFilters] = useState<any>({ q: "", campus: "BOTH" });
    const [checkBebedouro, setCheckBebedouro] = useState<boolean>(true);
    const [checkRPS, setCheckRPS] = useState<boolean>(true);
    const [checkRPI, setCheckRPI] = useState<boolean>(true);
    const [checkRDS, setCheckRDS] = useState<boolean>(true);
    const [checkRDI, setCheckRDI] = useState<boolean>(true);
    const [checkCAERN, setCheckCAERN] = useState<boolean>(true);

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

            const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/sequencias?limit=10000`
            let query = toURLParams(_filters);

            // http://localhost:8000/api/v1/pontos/?tipo=1&tipo=3&limit=10000&offset=0
            // if (checkBebedouro) query = query.concat("&tipo=1");
            // if (checkRPS) query = query.concat("&tipo=2");
            // if (checkRPI) query = query.concat("&tipo=3");
            // if (checkRDS) query = query.concat("&tipo=4");
            // if (checkRDI) query = query.concat("&tipo=5");
            // if (checkCAERN) query = query.concat("&tipo=6");

            const res = await fetch(`${url}&${query}`, { signal: newAbortController.signal, cache: "no-cache" });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const sequencias = await res.json();

            setFilteredSequencias(sequencias.items);
        };

        fetchData();

        return () => {
            newAbortController.abort();
        };
    }, [filters, checkBebedouro, checkRPS, checkRPI, checkRDS, checkRDI, checkCAERN]);

    return (
        <>
            <h2 className="text-3xl text-[#525252]">Sequência de Coletas</h2>
            <div className="flex w-full flex-col items-center">
                <div className="mb-4 flex w-full flex-col gap-4">
                    <div className="relative flex">
                        <i className="bi bi-search"></i>
                        <input
                            id="search-bar"
                            className="w-full rounded-md border border-[#ABABAB] bg-white px-5 py-3 text-[#525252] disabled:bg-neutral-200"
                            type="text"
                            name="search-query"
                            placeholder="Digite o termo de pesquisa"
                            onChange={(e) => {
                                setFilters({ ...filters, q: e.target.value });
                            }
                            }
                        />
                    </div>
                    <div className="w-full flex justify-between gap-3 self-end">

                        <div className="flex gap-8">
                            <div className="flex flex-row justify-center items-center">
                                {/* 
                                <label htmlFor="bebedouro" onClick={(e) => { setCheckBebedouro(!checkBebedouro); setFilters }}
                                    className={`cursor-pointer ${checkBebedouro ? "text-primary-500  hover:text-primary-800" : "hover:text-primary-400"} `}
                                > Bebedouro</label>
                                <input id="bebedouro" name="tipo" type="checkbox" value="1" defaultChecked={checkBebedouro} hidden
                                    className=""
                                    disabled />
                            </div>
                            <div className="flex flex-row justify-center items-center">
                                <label htmlFor="rps" onClick={(e) => { setCheckRPS(!checkRPS) }}
                                    className={`cursor-pointer ${checkRPS ? "text-primary-500  hover:text-primary-800" : "hover:text-primary-400"} `}
                                > RPS</label>
                                <input id="rps" name="tipo" type="checkbox" value="2" defaultChecked={checkRPS} hidden
                                    className=""
                                    disabled/>
                            </div>
                            <div className="flex flex-row justify-center items-center">
                                <label htmlFor="rpi" onClick={(e) => { setCheckRPI(!checkRPI) }}
                                    className={`cursor-pointer ${checkRPI ? "text-primary-500  hover:text-primary-800" : "hover:text-primary-400"} `}
                                > RPI</label>
                                <input id="rpi" name="tipo" type="checkbox" value="3" defaultChecked={checkRPI} hidden
                                    className=""
                                    disabled/>
                            </div>
                            <div className="flex flex-row justify-center items-center">
                                <label htmlFor="rds" onClick={(e) => { setCheckRDS(!checkRDS) }}
                                    className={`cursor-pointer ${checkRDS ? "text-primary-500" : "hover:text-primary-400"} `}
                                > RDS</label>
                                <input id="rds" name="tipo" type="checkbox" value="4" defaultChecked={checkRDS} hidden
                                    className=""
                                    disabled/>
                            </div>
                            <div className="flex flex-row justify-center items-center">
                                <label htmlFor="rdi" onClick={(e) => { setCheckRDI(!checkRDI) }}
                                    className={`cursor-pointer ${checkRDI ? "text-primary-500  hover:text-primary-800" : "hover:text-primary-400"} `}
                                > RDI</label>
                                <input id="rdi" name="tipo" type="checkbox" value="5" defaultChecked={checkRDI} hidden
                                    className="" />
                            </div>
                            <div className="flex flex-row justify-center items-center">
                                <label htmlFor="caern" onClick={(e) => { setCheckCAERN(!checkCAERN) }}
                                    className={`cursor-pointer ${checkCAERN ? "text-primary-500" : "hover:text-primary-400"} `}
                                > CAERN</label>
                                <input id="caern" name="tipo" type="checkbox" value="6" defaultChecked={checkCAERN} hidden
                                    className=""
                                    disabled/> */}
                            </div>
                        </div>

                        <select
                            name="campus"
                            className="w-36 rounded-md border border-[#ABABAB] bg-white px-3 py-2 text-[#525252]"
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
                </div>

                <div className="w-full">
                    <table className="w-full border border-slate-500 mb-8 last:mb-0">
                        <thead>
                            <tr className="bg-primary-500 text-white">
                                <th className="px-2 py-4">Amostragem</th>
                                <th className="px-2 py-4 text-center">Cód. Edificação</th>
                                <th className="px-2 py-4 text-center">Campus</th>
                                <th className="px-2 py-4">Ponto</th>
                                <th className="px-2 py-4">Ambiente ponto</th>
                                <th className="px-2 py-4">Tombo</th>
                                <th className="px-2 py-4">Ultima coleta</th>
                                <th className="px-2 py-4">Qnt. de coletas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSequencias.map((sequencia: Sequencia, i) => {
                                return (
                                    <tr 
                                        className="w-full bg-slate-200 even:bg-slate-100 hover:bg-blue-300 transition-colors duration-200 cursor-pointer select-none"
                                        onClick={() => {
                                            window.location.href = `/admin/sequencias_coletas/${sequencia.id}`;
                                        }}
                                    >
                                        <td className="text-sm px-2 py-3">{sequencia.amostragem}</td>
                                        <td className="text-sm px-2 py-3 text-center">{sequencia.ponto?.edificacao.codigo}</td>
                                        <td className="text-sm px-2 py-3 text-center">{sequencia.ponto?.edificacao.campus == "OE" ? "Oeste" : "Leste"}</td>
                                        <td className="text-sm px-2 py-3">{TIPOS_PONTOS[sequencia.ponto?.tipo]}</td>
                                        <td className="text-sm px-2 py-3">{sequencia.ponto?.ambiente || "-"}</td>
                                        <td className="text-sm px-2 py-3">{sequencia.ponto?.tombo || "N/A"}</td>
                                        <td className="text-sm px-2 py-3 text-center">{sequencia.ultima_coleta ? formatDate(sequencia.ultima_coleta) : "-"}</td>
                                        <td className="text-sm px-2 py-3 text-center">{sequencia.coletas.length}</td>
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
