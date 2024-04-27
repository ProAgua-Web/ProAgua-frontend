import TableColetas from "@/components/coletas/TabelaColetas";
import type { Sequencia, Coleta } from "@/utils/types";
import { API_BASE_URL } from "@/utils/config";

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

export default async function Sequencia({ params }: { params : {sequencia_id: number} }) {
    const { sequencia_id } = params;

    let resp = await fetch(API_BASE_URL + '/api/v1/sequencias/' + sequencia_id);
    const sequencia: Sequencia | null = await resp.json();

    resp = await fetch(`${API_BASE_URL}/api/v1/sequencias/${sequencia_id}/coletas`, { cache: 'no-store'})
    const coletas: Coleta[] = await resp.json();

    const groups: Coleta[][] = groupColetas(coletas);

    return (
        <>
            <span className="text-4xl">Sequência de coletas</span>
            
            <div 
                id="container"
                className="flex flex-col card min-w-fit w-full p-8 gap-4 h-fit"
            >
                <div className="flex gap-4">
                    <p>Id: {sequencia?.id} </p>
                    <p>Edificação: {sequencia?.ponto?.edificacao.nome}</p>
                    <p>Código edificação: {sequencia?.ponto?.edificacao.codigo}</p>
                    <p>Ambiente: {sequencia?.ponto?.ambiente}</p>
                <a className="px-6 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-md" href={`${sequencia_id}/criar`}>
                        <i className="bi bi-plus-lg"></i> Adicionar coleta
                    </a>
                </div>
                <div className="w-fit ">
                    {groups?.map(group => {
                        return <TableColetas coletas={group} />
                    })}
                </div>
            </div>
        </>
    )
}

