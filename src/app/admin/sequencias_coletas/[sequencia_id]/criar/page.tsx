'use client'

import { TIPOS_PONTOS } from "@/utils/types"
import { useSequencia, usePontos, useUsuarios } from "@/utils/api_consumer/client_side_consumer";
import { FormEvent, useState } from "react";

export default function Page({ params }: {
    params: {
        sequencia_id: number
    }
}) {
    const { sequencia_id } = params;
    const sequencia = useSequencia(sequencia_id);
    const pontos = usePontos(
        sequencia ? sequencia.ponto_url : null
    );

    const usuarios = useUsuarios();

    const [submiting, setSubmiting] = useState<boolean>(false);

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setSubmiting(true);

        const formData = new FormData(event.currentTarget);

        const data = {
            sequencia_id: sequencia_id,
            ponto_id: Number(formData.get("ponto")),
            temperatura: Number(formData.get("temperatura")),
            cloro_residual_livre: Number(formData.get("cloro_residual_livre")),
            turbidez: Number(formData.get("turbidez")),
            coliformes_totais: formData.get("coliformes_totais") == "on",
            escherichia: formData.get("escherichia") == "on",
            cor: Number(formData.get("cor")),
            responsavel: [Number(formData.get("responsaveis"))],
            data: new Date(String(formData.get("data"))),
            ordem: formData.get("ordem"),
        };

        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/coletas/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.status === 200) {
            alert("Sequência de coleta criada com sucesso!");
            const responseData = await response.json();
            const id = responseData.id;
            window.location.href = `/admin/sequencias_coletas/${sequencia_id}`;
        } else {
            alert("Erro ao criar Sequência de coleta");
        }

        setSubmiting(false);
    };

    return (
        <>
            <h1 className="text-4xl text-neutral-700 font-bold mb-8">Criar nova coleta</h1>
            <form className="w-full flex flex-col gap-4" onSubmit={(e) => submitForm(e)} method="POST">
                <label htmlFor="ponto">Ponto de Coleta:</label>
                <select
                    name="ponto"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                >
                    {/* <!-- Os pontos serão adicionados aqui --> */}
                    <option>-</option>
                    {pontos.map(ponto => <option value={ponto.id} key={"ponto " + ponto.id}>{ponto.id} - {TIPOS_PONTOS[ponto.tipo]}, {ponto.ambiente}</option>)}
                </select>

                <label htmlFor="temperatura">Temperatura:</label>
                <input
                    type="number"
                    id="temperatura"
                    name="temperatura"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                    required
                />

                <label htmlFor="cloro_residual_livre">Cloro Residual Livre:</label>
                <input
                    type="number"
                    id="cloro_residual_livre"
                    name="cloro_residual_livre"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                    required
                />

                <label htmlFor="turbidez">Turbidez:</label>
                <input
                    type="number"
                    id="turbidez"
                    name="turbidez"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                    required
                />

                <div className="flex gap-2">
                    <input
                        type="checkbox"
                        id="coliformes_totais"
                        name="coliformes_totais"
                        className="w-6 h-6 rounded-lg border border-neutral-400 px-6 py-4"
                    />
                    <label htmlFor="coliformes">Coliformes Totais</label>
                </div>

                <div className="flex gap-2">
                    <input
                        type="checkbox"
                        id="escherichia"
                        name="escherichia"
                        className="w-6 h-6 rounded-lg border border-neutral-400 px-6 py-4"
                    />
                    <label htmlFor="escherichia">Escherichia</label>
                </div>

                <label htmlFor="cor">Cor:</label>
                <input
                    type="number"
                    id="cor"
                    name="cor"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                    required
                />

                <div className="flex gap-4">
                    <label htmlFor="data" className="flex self-center">Data e hora:</label>
                    <input
                        type="date"
                        id="data"
                        name="data"
                        className="rounded-lg border border-neutral-400 px-6 py-4 flex-grow"
                        required
                    />

                    <input
                        type="time"
                        id="hora"
                        name="hora"
                        className="rounded-lg border border-neutral-400 px-6 py-4"
                        required
                    />
                </div>

                <label htmlFor="responsaveis">Responsáveis:</label>
                <select
                    name="responsaveis"
                    id="responsaveis"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                    multiple
                >
                    {usuarios.map(usuario => {
                        return <option value={usuario.id} key={"usuario" + usuario.id}>{usuario.username}</option>
                    })}
                </select>

                <label htmlFor="ordem">Ordem:</label>
                <select
                    name="ordem"
                    id="ordem"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                >
                    <option value="Coleta">Coleta</option>
                    <option value="Recoleta">Recoleta</option>
                </select>

                <div className="rounded-lg border border-neutral-400 px-6 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold text-center">
                    <input id="criar" type="submit" value="Criar" />
                </div>
            </form>
        </>
    )
}