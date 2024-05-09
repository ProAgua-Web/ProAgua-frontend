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
            <h2 className="text-4xl text-neutral-700 font-bold mb-8">
                {editable ? "Editar" : "Visualizar"} Ponto
            </h2>

            <form className="w-full flex flex-col gap-4" onSubmit={(e) => submitForm(e)} method="POST">

                <label htmlFor="id">Id:</label>
                <input
                    type="text"
                    id="id"
                    name="id"
                    className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                    defaultValue={params.id_ponto}
                    disabled
                />

                <label htmlFor="ambiente">Ambiente:</label>
                <input
                    type="text"
                    id="ambiente"
                    name="ambiente"
                    className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                    defaultValue={ponto?.ambiente}
                    disabled={!editable}
                />

                <label htmlFor="tombo">tombo:</label>
                <input
                    type="text"
                    id="tombo"
                    name="tombo"
                    className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                    defaultValue={ponto?.tombo}
                    disabled={!editable}
                />

                {
                    edificacoes.length > 0 && (
                        <>
                            <label htmlFor="">Edificação:</label>

                            <select
                                id="edificacao"
                                name="edificacao"
                                className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
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

                <label htmlFor="tipo">
                    Tipo:
                </label>
                <select
                    id="tipo"
                    name="tipo"
                    className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
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
                        <><label htmlFor="amontante">Amontante:</label><select
                            id="amontante"
                            name="amontante"
                            className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
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

                <label>QR code:</label>
                <QRCode data={process.env.NEXT_PUBLIC_BASE_URL + "/pontos/" + params.id_ponto} width={150} />

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
                    value={editable ? "Salvar" : "Habilitar edição"}
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
                        <button
                            type="button"
                            className={`rounded-lg border bg-gray-500 px-6 py-4 text-center font-semibold text-white hover:bg-gray-600`}
                            onClick={() => setEditable(false)}
                        >
                            Cancelar
                        </button>
                    </>
                )}
            </form>
        </>
    );
}