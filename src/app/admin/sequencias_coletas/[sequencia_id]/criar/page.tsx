'use client'

import { Coleta, Ponto, TIPOS_PONTOS } from "@/utils/types"
import { useSequencia, useUsuarios, usePontosAmontante, consumerColeta } from "@/utils/api_consumer/client_side_consumer";
import { FormEvent, useEffect, useState } from "react";

export default function CriarColeta({ params }: {
    params: {
        sequencia_id: number
    }
}) {
    const { sequencia_id } = params;
    const sequencia = useSequencia(sequencia_id);
    const pontos: Ponto[] = usePontosAmontante(sequencia?.ponto ? sequencia.ponto : null);
    const usuarios = useUsuarios();
    const [currentPontoId, setCurrentPontoId] = useState<number>(pontos[0]?.id);

    const [submiting, setSubmiting] = useState<boolean>(false);

    useEffect(() => {
        if (pontos.length > 0) {
            setCurrentPontoId(pontos[0].id);
        }
    }, [pontos]);

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmiting(true);

        const formData = new FormData(event.currentTarget);

        const data: Coleta = {
            sequencia_id: sequencia_id,
            ponto_id: formData.get("ponto"),
            temperatura: formData.get("temperatura"),
            cloro_residual_livre: formData.get("cloro_residual_livre"),
            turbidez: formData.get("turbidez"),
            coliformes_totais: formData.has("coliformes_totais"),
            escherichia: formData.has("escherichia"),
            cor: formData.get("cor"),
            data: formData.get("data") + "T" + formData.get("hora"),
            responsavel: formData.getAll("responsaveis"),
            ordem: formData.get("ordem"),
        };
        
        const response = await consumerColeta.post(data);

        if (response.status === 200) {
            alert("Coleta criada com sucesso!");
            const responseData = await response.json();
            const id = responseData.id;
            window.location.href = `/admin/sequencias_coletas/${sequencia_id}`;
        } else {
            alert("Erro ao criar coleta");
        }

        setSubmiting(false);
    };

    return (
        <>
            <h1 className="text-4xl text-neutral-700 font-bold mb-8">Criar nova coleta</h1>
            <form className="w-full flex flex-col gap-4" onSubmit={(e) => submitForm(e)} method="POST">
                <label htmlFor="ponto">Ponto de Coleta:</label>
                <div className="flex">
                    <select
                        name="ponto"
                        className="w-full rounded-lg border border-neutral-400 px-6 py-4"
                        onChange={(e) => setCurrentPontoId(parseInt(e.currentTarget.value))}
                    >
                        {pontos.map(ponto => <option value={ponto.id} key={"ponto " + ponto.id}>{ponto.id} - {TIPOS_PONTOS[ponto.tipo]}, {ponto.ambiente}</option>)}
                    </select>

                    <a className="flex justify-center" href={currentPontoId ? "/admin/pontos/" + currentPontoId : "#"} target={currentPontoId ? "_blank" : "_self"}>
                        <svg className={currentPontoId ? `w-6 mx-2 fill-primary-600` : `w-6 mx-2 fill-neutral-500`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512">
                            <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.
                        2 3.3 20.3z" />
                        </svg>
                    </a>

                    <a className="flex justify-center" href="/admin/pontos/criar" target="_blank">
                        <svg className="w-6 mx-2 fill-primary-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512">
                            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                        </svg>
                    </a>
                </div>

                <label htmlFor="temperatura">Temperatura:</label>
                <input
                    type="number"
                    id="temperatura"
                    name="temperatura"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                    step={0.1}
                    required
                />

                <label htmlFor="cloro_residual_livre">Cloro Residual Livre:</label>
                <input
                    type="number"
                    id="cloro_residual_livre"
                    name="cloro_residual_livre"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                    step={0.1}
                    required
                />

                <label htmlFor="turbidez">Turbidez:</label>
                <input
                    type="number"
                    id="turbidez"
                    name="turbidez"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                    step={0.1}
                    required
                />

                <label htmlFor="cor">Cor:</label>
                <input
                    type="number"
                    id="cor"
                    name="cor"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                    step={0.1}
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

                <div className="flex gap-4">
                    <label htmlFor="data" className="flex self-center">Data e hora:</label>
                    <input
                        type="date"
                        id="data"
                        name="data"
                        className="rounded-lg border border-neutral-400 px-6 py-4 flex-grow"
                        defaultValue={new Date().toISOString().split("T")[0]}
                        required
                    />

                    <input
                        type="time"
                        id="hora"
                        name="hora"
                        className="rounded-lg border border-neutral-400 px-6 py-4"
                        defaultValue={new Date().toISOString().split("T")[1].split(".")[0].slice(0, -3)}
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

                <div className="w-full">
                    <input id="criar" type="submit" className={"w-full rounded-lg border border-neutral-400 px-6 py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-200 disabled:text-neutral-500 text-white font-semibold"} value={`${submiting ? "Criando..." : "Criar"}`} disabled={submiting} />
                </div>
            </form>
        </>
    )
}