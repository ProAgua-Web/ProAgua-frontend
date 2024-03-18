'use client'

import { usePonto, useEdificacao } from "@/utils/api_consumer";

export default function VisualizarPonto({ params }: {
    params: {
        id_ponto: string
    }
}) {

    const { ponto } = usePonto(params.id_ponto);
    const edificacao_cod = ponto?.edificacao_url.split("/").pop();
    const { edificacao } = useEdificacao(edificacao_cod);

    return (
        <>
            <h2 className="mb-4 text-3xl font-bold text-neutral-600">
                Visualizar Ponto
            </h2>

            <form
                method="none"
                className="flex flex-col rounded-xl border border-neutral-200 p-8 shadow-lg"
            >
                <label htmlFor="id">Id:</label>
                <input
                    type="text"
                    id="id"
                    name="id"
                    className="rounded-md border border-neutral-200 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                    value={params.id_ponto}
                    disabled
                />

                <label htmlFor="ambiente" className="mt-4">
                    Ambiente:
                </label>
                <input
                    type="text"
                    id="ambiente"
                    name="ambiente"
                    className="rounded-md border border-neutral-200 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                    value={ponto?.ambiente || ""}
                    disabled
                />

                <label htmlFor="edificacao" className="mt-4">
                    Edificação:
                </label>
                <input
                    type="text"
                    id="edificacao"
                    name="edificacao"
                    className="rounded-md border border-neutral-200 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                    value= {edificacao?.nome || ""}
                    disabled
                />

                <label htmlFor="tipo" className="mt-4">
                    Tipo:
                </label>
                <select
                    id="tipo"
                    name="tipo"
                    className="rounded-md border border-neutral-200 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                    value={ponto?.tipo || 0}
                    disabled
                >
                    <option value="1">Bebedouro</option>
                    <option value="2">Reservatório predial superior</option>
                    <option value="3">Reservatório predial inferior</option>
                    <option value="4">Reservatório de distribuição superior</option>
                    <option value="5">Reservatório de distribuição inferior</option>
                    <option value="6">CAERN</option>
                </select>

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