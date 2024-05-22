import { Sequencia, TIPOS_PONTOS } from "@/utils/types";
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

    return (
        <>
            <h2 className="text-3xl text-[#525252]">Sequência de Coletas</h2>
            <div className="flex w-full flex-col items-center">
                <Filters />

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
                            </tr>
                        </thead>
                        <tbody>
                            {sequencias.map((sequencia: Sequencia, i) => {
                                return (
                                    <tr className="w-full bg-slate-200 even:bg-slate-100 hover:bg-blue-300 transition-colors duration-200 cursor-pointer select-none"
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
                                        <td className="px-2 py-3 text-nowrap">{sequencia.ultima_coleta ? formatDate(sequencia.ultima_coleta) : "-"}</td>
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
