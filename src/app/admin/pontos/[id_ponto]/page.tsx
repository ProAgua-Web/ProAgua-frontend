"use client";

import { FormEvent, use, useEffect, useState } from "react";

import QRCode from "@/utils/qr_code";
import { Edificacao, Ponto, TIPOS_PONTOS } from "@/utils/types";
import { useEdificacoes, usePonto } from "@/utils/api_consumer/client_side_consumer";

export default function VisualizarPonto({ params }: { params: { id_ponto: string } }) {
    const edificacoes = useEdificacoes();
    const [pontos, setPontos] = useState<Ponto[]>([]);
    const ponto = usePonto(parseInt(params.id_ponto));
    const [editable, setEditable] = useState<boolean>(false);

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/pontos/" + params.id_ponto, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tombo: formData.get("tombo"),
                ambiente: formData.get("ambiente"),
                tipo: Number(formData.get("tipo")),
                codigo_edificacao: formData.get("edificacao"),
                amontante: formData.get("amontante"),
            }),
        })

        window.location.href = "/admin/pontos";
    }

    useEffect(() => {
        (async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/pontos?limit=10000");
            setPontos((await response.json()).items);
        })();
    }, []);

    return (
        <>
            <h2 className="mb-4 text-3xl font-bold text-neutral-600">
                {editable ? "Editar" : "Visualizar"} Ponto
            </h2>

            <form
                method="none"
                // className="flex flex-col rounded-xl border border-neutral-200 p-8 shadow-lg"
                className="flex flex-col max-w-600px w-full"
                onSubmit={submitForm}
            >
                <label htmlFor="id">Id:</label>
                <input
                    type="text"
                    id="id"
                    name="id"
                    className="rounded-md border border-neutral-300 mb-4 px-4 py-3 mt-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                    defaultValue={params.id_ponto}
                    disabled
                />

                <label htmlFor="ambiente" className="mt-4">Ambiente:</label>
                <input
                    type="text"
                    id="ambiente"
                    name="ambiente"
                    className="rounded-md border border-neutral-300 mb-4 px-4 py-3 mt-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                    defaultValue={ponto?.ambiente}
                    disabled={!editable}
                />

                <label htmlFor="tombo" className="mt-4">tombo:</label>
                <input
                    type="text"
                    id="tombo"
                    name="tombo"
                    className="rounded-md border border-neutral-300 mb-4 px-4 py-3 mt-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                    defaultValue={ponto?.tombo}
                    disabled={!editable}
                />

                {
                    edificacoes.length > 0 && (
                        <>
                            <label htmlFor="" className="mt-4">Edificação:</label>

                            <select
                                id="edificacao"
                                name="edificacao"
                                className="bg-white rounded-md border border-neutral-300 mb-4 px-4 py-3 mt-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                                defaultValue={ponto?.edificacao.codigo}
                                disabled={!editable}
                            >
                                {edificacoes.map((edificacao: Edificacao) => {
                                    return <option value={edificacao.codigo} >{edificacao.codigo} - {edificacao.nome}</option>
                                })}
                            </select >

                        </>
                    )
                }

                <label htmlFor="tipo" className="mt-4">
                    Tipo:
                </label>
                <select
                    id="tipo"
                    name="tipo"
                    className="bg-white rounded-md border border-neutral-300 mb-4 px-4 py-3 mt-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                    defaultValue={ponto?.tipo}
                    disabled={!editable}
                >
                    <option value="1">Bebedouro</option>
                    <option value="2">Reservatório predial superior</option>
                    <option value="3">Reservatório predial inferior</option>
                    <option value="4">Reservatório de distribuição superior</option>
                    <option value="5">Reservatório de distribuição inferior</option>
                    <option value="6">CAERN</option>
                </select>


                {
                    pontos.length > 0 && (
                        <><label htmlFor="amontante" className="mt-4">Amontante:</label><select
                            id="amontante"
                            name="amontante"
                            className="bg-white rounded-md border border-neutral-300 mb-4 px-4 py-3 mt-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                            defaultValue={pontos.length > 0 ? ponto?.amontante?.id : undefined}
                            // value={ponto?.amontante?.id}
                            disabled={!editable}
                        >
                            <option value="">-</option>
                            {pontos.map((ponto: Ponto) => {
                                return <option className="" value={ponto.id}>{TIPOS_PONTOS[ponto.tipo - 1]} {ponto.ambiente.trim() != "-" && ponto.ambiente.trim() != "nan" && ponto.ambiente.trim() != "" ? "- " + ponto.ambiente : ""} {ponto.tombo.trim() != "-" && ponto.tombo.trim() != "nan" && ponto.tombo.trim() ? "- " + ponto.tombo : ""}</option>;
                            })}
                        </select></>)
                }

                <label className="mt-4">QR code:</label>
                <QRCode data={process.env.NEXT_PUBLIC_BASE_URL + "/pontos/" + params.id_ponto} width={150} />

                <input
                    id="editar"
                    type="submit"
                    className="mt-4 rounded-md border bg-green-500 px-4 py-3 mt-2 text-center font-semibold text-white hover:bg-green-600"
                    value={editable ? "Salvar" : "Habilitar edição"}
                    onClick={(e) => {
                        if (!editable) {
                            setEditable(true);
                            e.preventDefault();
                        }
                    }}
                />

                <button
                    type="button"
                    className="mt-4 rounded-md border bg-red-500 px-4 py-3 mt-2 text-center font-semibold text-white hover:bg-red-600 disabled:bg-gray-400 disabled:text-gray-300"
                    disabled={!editable}
                >
                    Excluir
                </button>

                {editable && (
                    <button
                        type="button"
                        className="mt-4 rounded-md border bg-gray-500 px-4 py-3 mt-2 text-center font-semibold text-white hover:bg-gray-600"
                        onClick={() => setEditable(false)}
                    >
                        Cancelar
                    </button>
                )}
            </form>
        </>
    );
}