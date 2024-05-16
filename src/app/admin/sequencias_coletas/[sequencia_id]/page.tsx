"use client"

import TableColetas from "@/components/coletas/TabelaColetas";
import { type Sequencia, type Coleta, TIPOS_PONTOS } from "@/utils/types";
import { API_BASE_URL } from "@/utils/config";
import { useColetaBySequencia, useSequencia } from "@/utils/api_consumer/client_side_consumer";

function groupColetas(coletas: Coleta[]) {
    let groups = [];
    let ultimo_ponto = coletas[0]?.ponto_url;
    let current_group: Coleta[] = [];
    
    coletas.forEach((coleta: Coleta) => {
        if (ultimo_ponto != coleta.ponto_url) {
            groups.push(current_group);
            ultimo_ponto = coleta.ponto_url;
            current_group = [];
        }
        current_group.push(coleta);
    });

    groups.push(current_group);
    
    return groups;
}

export default function Sequencia({ params }: { params : {sequencia_id: number} }) {
    // TODO: Filtrar pontos
    // Primeiro você deve selecionar em qual edificação o ponto está / onde a sequencia deve começar

    // TODO: Evitar a criação de sequências de coletas iguais
    // Por exemplo, não deve ser possível a criação de duas sequências de coletas no bebedouro
    // do hall de entrada do LCC com a mesma amostragem
    
    // TODO: Decidir como que deve ser a lógica de sequências referentes ao mesmo fluxo
    // Por exemplo, se temos um bebedouro, temos também seu ponto a montante
    // dessa forma, se houver uma sequencia para o bebedouro e outra para a torneira
    // suas coletas serão identicas
    
    const { sequencia_id } = params;

    const sequencia: Sequencia | null = useSequencia(sequencia_id);
    const coletas: Coleta[] = useColetaBySequencia(sequencia_id);
    const groups: Coleta[][] = groupColetas(coletas);
    
    return (
        <>
            <span className="text-3xl font-bold text-neutral-700">Sequência de coleta</span>
            <div 
                id="container"
                className="flex flex-col card min-w-fit w-full mt-4 gap-4 h-fit"
            >
                <div className="flex w-full p-4 border border-slate-400 bg-slate-200">
                    <div className="flex-grow font-medium gap-2 flex flex-col">
                        <h3 className="text-xl">Informações da edificação:</h3>
                        <p className="text-neutral-700 ml-4">Edificação: {sequencia?.ponto?.edificacao.nome}</p>
                        <p className="text-neutral-700 ml-4">Código edificação: {sequencia?.ponto?.edificacao.codigo}</p>
                        <p className="text-neutral-700 ml-4">Ambiente: {sequencia?.ponto?.ambiente}</p>
                    </div>
                    <div>
                        <a className="block w-fit h-fit px-6 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-md" href={`${sequencia_id}/criar`}>
                            <i className="bi bi-plus-lg"></i> Adicionar coleta
                        </a>
                    </div>
                </div>
                <div className="w-fit">
                    {groups?.map((group: Coleta[]) => {
                        if (group.length == 0) {
                            return null;
                        }
                        
                        const ponto = group[0].ponto;

                        return (
                            <div className="mb-4">
                                <div className="p-4 border border-b-0 w-full border-slate-400 bg-primary-500 text-white font-semibold">
                                    <p>Ponto: {TIPOS_PONTOS[ponto.tipo - 1]}</p>
                                    <p>Ambiente: {ponto.ambiente}</p>
                                    {ponto.tipo == 1 && (
                                        <p>Tombo: {ponto.tombo}</p>
                                    )}
                                </div>

                                <TableColetas coletas={group} />
                            </div>
                        )
                    })}
                </div>
                <div className="mt-8 w-full flex justify-end">
                    <a className="block w-full text-center h-fit px-6 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md" href={`${sequencia_id}/criar`}>
                        <span className="text-1xl">+</span> Adicionar coleta
                    </a>
                </div>
            </div>
        </>
    )
}

