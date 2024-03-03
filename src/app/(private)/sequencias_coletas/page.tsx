'use client'

import { useSequencia, Sequencia, useSequencias } from "@/utils/api_consumer"
import CardSequencia from "@/components/sequencias/CardSequencia"
import Filters from "@/components/sequencias/Filters"

const API_URL = 'http://localhost:8000/'

function Card(props: { sequencia: Sequencia }) {
    let sequencia = useSequencia(props.sequencia, API_URL);
    return (
        (sequencia &&
            <CardSequencia
                sequencia={ sequencia }
            />
        )
    )
}

export default function Coletas() {
    const sequencias = useSequencias(API_URL)

    return (
        <>
            <h2 className="text-3xl text-[#525252]">Sequências de Coletas</h2>
            <div className="flex flex-col w-full items-center">
                <Filters />

                <div id="result-list"
                    className="w-full grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] justify-center gap-8"
                >
                    {/* Os resultados da pesquisa serão adicionados aqui */}
                    {sequencias.map((item: Sequencia, i) => <Card sequencia={ item }/> )}
                </div>
                
                <div id="paginator" className="flex pagination">
                    <button id="pagination-prev" className="hidden">&lt; Anterior</button>
                    <span id="page-info">Página 1 de 1</span>
                    <button id="pagination-next" className="hidden">Próxima &gt;</button>
                </div>
                
                <button className="floating-bt bg-primary-500 text-white p-4 rounded-md max-w-fit hover:bg-primary-600" onClick={() => "goTo('sequencias_coletas/criar')"}>
                    <i className="bi bi-plus-lg"></i> Adicionar sequência
                </button>
            </div>
        </>

    )
}