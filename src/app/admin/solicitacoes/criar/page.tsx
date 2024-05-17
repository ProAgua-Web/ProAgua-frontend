'use client'

import { useEdificacoes, usePontos } from "@/utils/api_consumer/client_side_consumer"
import { TIPOS_PONTOS } from "@/utils/types";

export default function Page() {
    const edificacoes = useEdificacoes();
    const pontos = usePontos();

    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Criar solicitação</h1>
            <form className="w-full flex flex-col gap-2">
                <label>Tipo de solicitação</label>
                <select className="w-full border border-neutral-300 rounded px-4 py-2">
                    <option>-</option>
                    <option>Solicitação de limpeza de reservatório</option>
                    <option>Solicitação de instalação de ponto de coleta</option>
                    <option>Solicitação de conserto de tampa de reservatório</option>
                </select>

                <label className="mt-4">Edificação</label>
                <select className="w-full border border-neutral-300 rounded px-4 py-2">
                    <option>-</option>
                    {edificacoes.map(edificacao => (
                        <option value={edificacao.codigo}> {edificacao.codigo} - {edificacao.nome} </option>
                    ))}
                </select>

                <label className="mt-4">Ponto</label>
                <select className="w-full border border-neutral-300 rounded px-4 py-2">
                    <option>-</option>
                    {pontos.map(ponto => (
                        <option value={ponto.id}> {TIPOS_PONTOS[ponto.tipo]}, {ponto.ambiente} </option>
                    ))}
                </select>
                
                
                <label className="mt-4">Objetivo do serviço solicitado</label>
                <textarea rows={8} className="w-full border border-neutral-300 rounded px-4 py-2" />

                <label className="mt-4">Justificativa da solicitação</label>
                <textarea rows={8} className="w-full border border-neutral-300 rounded px-4 py-2" />

                <label className="mt-4">Imagens</label>
                <input className="w-full" type="file" name="" id="" accept="image/png, image/jpeg"/>

                <button className="text-white bg-blue-500 rounded px-4 py-2">Criar e salvar em PDF</button>
                <input
                    className="border text-white bg-green-500 rounded px-4 py-2" type="submit"
                    value="Criar solicitação"
                />
            </form>
            
        </>
    )
}