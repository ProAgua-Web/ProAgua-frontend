'use client'

import { useEdificacao } from "@/utils/api_consumer";

export default function VisualizarEdificacao({ params }:{ params: {
    codigo_edificacao: string
} }) {
    const { edificacao } = useEdificacao(params.codigo_edificacao);
    
    return (
        <>
            <h2 className="mb-4 text-3xl font-bold text-neutral-600">
                Criar Edificação
            </h2>

            <form
                method="none"
                className="flex flex-col rounded-xl border border-neutral-200 p-8 shadow-lg"
            >
                <label htmlFor="codigo">Código:</label>
                <input
                    type="text"
                    id="codigo"
                    name="codigo"
                    className="rounded-md border border-neutral-200 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                    value={edificacao?.codigo}
                    disabled
                />

                <label htmlFor="nome" className="mt-4">
                    Nome:
                </label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    className="rounded-md border border-neutral-200 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                    value={edificacao?.nome}
                    disabled
                />

                <label htmlFor="campus" className="mt-4">
                    Campus:
                </label>
                <select
                    id="campus"
                    name="campus"
                    className="rounded-md border border-neutral-200 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                    value={edificacao?.campus}
                    disabled
                >
                    <option value="LE">Leste</option>
                    <option value="OE">Oeste</option>
                </select>

                <label htmlFor="cronograma" className="mt-4">
                    Cronograma:
                </label>
                <input
                    type="number"
                    id="cronograma"
                    name="cronograma"
                    className="rounded-md border border-neutral-200 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                    value={edificacao?.cronograma}
                    disabled
                />

                <label htmlFor="foto" className="mt-4">
                    Imagem:
                </label>

                {edificacao?.imagem 
                    ? <img
                        id="imagePreview"
                        alt="Imagem Preview"
                        src={`http://127.0.0.1:8000/${edificacao?.imagem}`}
                        className="mb-4 max-h-48 w-full rounded-lg border border-neutral-300 bg-neutral-200 object-cover"
                    />
                    : <span className="text-neutral-500 text-sm">Sem imagem</span>
                }

                <input
                    id="editar"
                    type="submit"
                    className="mt-4 rounded-md border bg-green-500 px-4 py-2 text-center font-semibold text-white hover:bg-green-600"
                    value="Alterar"
                />
            </form>
        </>
    );
}