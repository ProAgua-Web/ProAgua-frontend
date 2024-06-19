"use client";

import { useEffect, useState } from "react";
import { Solicitacao } from "@/utils/types";
import { consumerSolicitacao, formatDate } from "@/utils/api_consumer/client_side_consumer";

export default function Solicitacoes() {
    const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
    useEffect(() => {
        consumerSolicitacao.list()
            .then(data => setSolicitacoes(data))
            .catch(err => alert("Ocorreu um erro durante a requisição."))
    }, [])

    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Solicitações</h1>
            <div className="w-full bg-white rounded border border-neutral-300 shadow-lg p-4">
                <ul>

                    {solicitacoes.length > 0 && solicitacoes.map(solicitacao => (
                        <li key={solicitacao.id} className="flex justify-between p-2 items-center border-b border-neutral-300 last:border-b-0">
                            {solicitacao.id} - Solicitação {solicitacao.tipo} - {formatDate(solicitacao.data)} - {solicitacao.status}
                            <a className="px-4 py-2 rounded border border-blue-500 text-blue-500" href={"/admin/solicitacoes/" + solicitacao.id}>Acessar</a>
                        </li>
                    ))}

                </ul>
            </div>
            <a
                href="/admin/solicitacoes/criar"
                className="w-full flex justify-center items-center px-6 py-4 bg-green-500 border border-green-600 rounded text-white font-semibold"
            >
                + Criar Solicitação
            </a>
        </>
    );
}