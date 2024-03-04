'use client'

import Filters from "@/components/sequencias/Filters";
import { useEdificacoes, Edificacao } from "@/utils/api_consumer";

export default function Edificacoes() {
    const edificacoes = useEdificacoes('http://localhost:8000/api/v1/edificacoes')

    return (
        <>
            <Filters />
            <div className="mx-auto bg-white rounded-md shadow-lg w-full p-4 border border-neutral-200 max-h-[70vh] overflow-y-auto">
                <h2 className="w-full text-2xl text-[#7a7a7a] font-medium text-center">Lista edificações</h2>
                <ul>
                    {edificacoes.map((item: Edificacao, i) => {
                        return (
                            <li key={'edif-'+i} className="group/item px-4 py-6 flex justify-between text-neutral-700 hover:font-medium hover:bg-blue-100 border-b">
                                {item.codigo} - {item.nome}
                                <a href="#" className="hidden rounded p-2 text-blue-900 group-hover/item:block hover:bg-white">Detalhes</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}