'use client'

import { useEffect, useState } from "react"

import { useSequencia, Sequencia, useSequencias } from "./utils"
import CardSequencia from "./CardSequencia"

const API_URL = 'http://localhost:8000/'

function Filters() {
    return (
        <div className="w-full flex flex-col gap-4 mb-4">
            <div className="flex relative">
                <i className="bi bi-search"></i>
                <input
                    id="search-bar"
                    className="w-full bg-white border border-[#ABABAB] text-[#525252] px-5 py-3 rounded-md"
                    type="text"
                    name="search-query"
                    placeholder="Digite o termo de pesquisa"
                />
            </div>
            <div className="flex flex-col-reverse gap-3 self-end">
                <select name="campus" className="w-36 bg-white border border-[#ABABAB] text-[#525252] px-3 py-2 rounded-md">
                    <option value="" disabled selected hidden>Campus</option>
                    <option value="BOTH">Leste/Oeste</option>
                    <option value="LE">Leste</option>
                    <option value="OE">Oeste</option>
                </select>
            </div>
        </div>
    )
}

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

                    <div id="paginator" className="flex pagination">
                        <button id="pagination-prev" className="hidden">&lt; Anterior</button>
                        <span id="page-info">Página 1 de 1</span>
                        <button id="pagination-next" className="hidden">Próxima &gt;</button>
                    </div>

                </div>

                <button className="floating-bt bg-primary-500 text-white p-4 rounded-md max-w-fit hover:bg-primary-600" onClick={() => "goTo('sequencias_coletas/criar')"}>
                    <i className="bi bi-plus-lg"></i> Adicionar sequência
                </button>
            </div>
        </>

    )
}