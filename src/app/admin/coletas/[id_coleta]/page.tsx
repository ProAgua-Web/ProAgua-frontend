"use client";

import { Coleta, ColetaIn, Ponto, Sequencia, TIPOS_PONTOS } from "@/utils/types"
import { useColeta, usePontos, usePontosAmontante, useSequencias, useUsuarios } from "@/utils/api/client_side_consumer";
import { consumerColeta } from "@/utils/api/consumerColeta";
import { FormEvent, useEffect, useState } from "react";

export default function Page({ params }: {
    params: {
        id_coleta: number
    }
}) {
    const { id_coleta } = params;
    const coleta: Coleta | null = useColeta(id_coleta);
    const sequencias = useSequencias();
    const pontos: Ponto[] = usePontos();
    const [currentPontoId, setCurrentPontoId] = useState<number>();
    const [currentSequenciaId, setCurrentSequenciaId] = useState<number>(-1);
    const responsaveis = useUsuarios();

    const [editable, setEditable] = useState<boolean>(false);
    const [submiting, setSubmiting] = useState<boolean>(false);

    useEffect(() => {
        if (pontos.length > 0) {
            if (coleta) {
                setCurrentPontoId(coleta.ponto.id);
                setCurrentSequenciaId(coleta.sequencia_id);
                const date = new Date(coleta.data);
            }
        }
    }, [pontos]);


    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setSubmiting(true);

        const formData = new FormData(event.currentTarget);

        const data: ColetaIn = {
            sequencia_id: Number(currentSequenciaId),
            ponto_id: Number(formData.get("ponto")),
            temperatura: Number(formData.get("temperatura")),
            cloro_residual_livre: Number(formData.get("cloro_residual_livre")),
            turbidez: Number(formData.get("turbidez")),
            coliformes_totais: formData.has("coliformes_totais"),
            escherichia: formData.has("escherichia"),
            cor: Number(formData.get("cor")),
            data: formData.get("data") + "T" + formData.get("hora"),
            responsavel: (formData.getAll("responsaveis") as unknown as number[]),
            ordem: String(formData.get("ordem")),
        };

        const response = await consumerColeta.put(id_coleta.toString(), data);
  
        if (response.status === 200) {
            alert("Coleta atualizada com sucesso!");
            window.location.href = `/admin/sequencias_coletas/${currentSequenciaId}`;
        } else {
            alert("Erro ao atualizar coleta!");
        }

        setSubmiting(false);
    }

    return (
        <>
            <h2 className="text-4xl text-neutral-700 font-bold mb-8">
                {editable ? "Editar" : "Visualizar"} Coleta
            </h2>
            {
                currentPontoId && coleta && (
                    <form onSubmit={submitForm} onReset={() => setEditable(false)} method="PUT"
                        className="w-full flex flex-col gap-4">

                        <label htmlFor="sequencia">Sequência:</label>
                        <select
                            name="sequencia"
                            id="sequencia"
                            className="w-full rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                            disabled={!editable}
                            defaultValue={coleta.sequencia_id}
                            onChange={(e) => setCurrentSequenciaId(parseInt(e.currentTarget.value))}
                            required
                        >
                            {sequencias.map((sequencia: Sequencia) => {
                                return <option value={sequencia.id} key={ sequencia.id } >{sequencia.id} - Ciclo de Amostragem {sequencia.amostragem} - Ponto {TIPOS_PONTOS[sequencia.ponto?.tipo || 0]}</option>
                            })}
                        </select>

                        <label htmlFor="ponto">Ponto de Coleta:</label>
                        <div className="flex">
                            <select
                                name="ponto"
                                className="w-full rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                                disabled={!editable}
                                defaultValue={currentPontoId}
                                onChange={(e) => setCurrentPontoId(parseInt(e.currentTarget.value))}
                            >
                                {pontos.map(ponto => <option value={ponto.id} key={"ponto " + ponto.id}>{ponto.id} - {TIPOS_PONTOS[ponto.tipo]}, {ponto.localizacao}</option>)}
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
                            className="w-full rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                            step={0.1}
                            disabled={!editable}
                            defaultValue={coleta.temperatura}
                            required
                        />

                        <label htmlFor="cloro_residual_livre">Cloro Residual Livre:</label>
                        <input
                            type="number"
                            id="cloro_residual_livre"
                            name="cloro_residual_livre"
                            className="w-full rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                            step={0.1}
                            disabled={!editable}
                            defaultValue={coleta.cloro_residual_livre}
                            required
                        />

                        <label htmlFor="turbidez">Turbidez:</label>
                        <input
                            type="number"
                            id="turbidez"
                            name="turbidez"
                            className="w-full rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                            step={0.1}
                            disabled={!editable}
                            defaultValue={coleta.turbidez}
                            required
                        />

                        <label htmlFor="cor">Cor:</label>
                        <input
                            type="number"
                            id="cor"
                            name="cor"
                            className="w-full rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                            step={0.1}
                            disabled={!editable}
                            defaultValue={coleta.cor}
                            required
                        />

                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="coliformes_totais"
                                name="coliformes_totais"
                                className="w-6 h-6 rounded-lg border border-neutral-400 px-6 py-4"
                                disabled={!editable}
                                defaultChecked={coleta.coliformes_totais}
                            />
                            <label htmlFor="coliformes">Coliformes Totais</label>
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="escherichia"
                                name="escherichia"
                                className="w-6 h-6 rounded-lg border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                                disabled={!editable}
                                defaultChecked={coleta.escherichia}
                            />
                            <label htmlFor="escherichia">Escherichia</label>
                        </div>

                        <div className="flex gap-4">
                            <label htmlFor="data" className="flex self-center">Data e hora:</label>
                            <input
                                type="date"
                                id="data"
                                name="data"
                                className="rounded-lg border border-neutral-200 px-6 py-4 flex-grow disabled:bg-neutral-200 disabled:text-neutral-500   "
                                disabled={!editable}
                                defaultValue={coleta.data.split("T")[0]}
                                required
                            />

                            <input
                                type="time"
                                id="hora"
                                name="hora"
                                className="rounded-lg border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                                disabled={!editable}
                                defaultValue={
                                    (() => {
                                        const date = new Date(coleta.data);
                                        date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
                                        return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                                    })()
                                }
                                required
                            />
                        </div>

                        <label htmlFor="responsaveis">Responsáveis:</label>
                        <select
                            name="responsaveis"
                            id="responsaveis"
                            className="rounded-lg border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                            disabled={!editable}
                            multiple
                        >
                            {responsaveis.map((usuario) => {
                                return (
                                    <option
                                        value={usuario.id}
                                        key={"usuario" + usuario.id}
                                        selected={coleta.responsaveis_id && coleta.responsaveis_id.includes(usuario.id)}
                                    >
                                        {usuario.username}
                                    </option>
                                );
                            })}
                        </select>

                        <label htmlFor="ordem">Ordem:</label>
                        <select
                            name="ordem"
                            id="ordem"
                            className="w-full rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                            disabled={!editable}
                            defaultValue={coleta.ordem == "C" ? "Coleta" : "Recoleta"}
                            required
                        >
                            <option value="Coleta">Coleta</option>
                            <option value="Recoleta">Recoleta</option>
                        </select>
                        <input
                            id="editar"
                            type="submit"
                            className={`rounded-lg border ${editable ? 'bg-green-500 hover:bg-green-600' : 'bg-primary-500 hover:bg-primary-600'} px-6 py-4 text-center font-semibold text-white`}
                            onClick={event => {
                                if (!editable) {
                                    event.preventDefault();
                                    setEditable(true);
                                }
                            }}

                            disabled={submiting}
                            value={editable ? submiting ? "Salvando..." : "Salvar" : "Habilitar edição"}
                        />

                        <button
                            type="button"
                            className={`rounded-lg border bg-red-500 px-6 py-4 text-center font-semibold text-white hover:bg-red-600 disabled:bg-gray-400 disabled:text-gray-300 ${editable ? '' : 'hidden'}`}
                            disabled={!editable}
                        >
                            Excluir
                        </button>

                        {editable && (
                            <>
                                <input
                                    type="reset"
                                    className={`rounded-lg border bg-gray-500 px-6 py-4 text-center font-semibold text-white hover:bg-gray-600`}
                                    value="Cancelar"
                                >
                                </input>
                            </>
                        )}
                    </form>
                )
            }
        </>
    );

}
