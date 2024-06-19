"use client";

import { FormEvent, use, useEffect, useState } from "react";

import QRCode from "@/utils/qr_code";
import { Edificacao, Ponto, PontoIn, TIPOS_PONTOS } from "@/utils/types";
import { consumerPonto, delPonto, useEdificacoes, usePonto, usePontos } from "@/utils/api_consumer/client_side_consumer";

export default function VisualizarPonto({ params }: { params: { id_ponto: string } }) {
    const edificacoes = useEdificacoes();
    const pontos = usePontos();
    const ponto = usePonto(parseInt(params.id_ponto));

    const [currentAmontante, setCurrentAmontante] = useState<string>(ponto?.amontante?.id?.toString() || '');
    const [currentEdificacao, setCurrentEdificacao] = useState<string>(ponto?.edificacao.codigo || '');
    const [currentTipo, setCurrentTipo] = useState<string>(ponto?.tipo.toString() || '1');
    const pontosAmontantes = pontos.filter(p => p.tipo > Number(currentTipo));
    const pontosAssociados = pontos.filter(p => p.tipo == Number(currentTipo) && p.id != parseInt(params.id_ponto));

    const [editable, setEditable] = useState<boolean>(false);

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const data: PontoIn = {
            tombo: String(formData.get("tombo")),
            ambiente: String(formData.get("ambiente")),
            tipo: Number(formData.get("tipo")),
            codigo_edificacao: String(formData.get("edificacao")),
            amontante: formData.get("amontante") ? Number(formData.get("amontante")) : null,
            imagem: String(formData.get("imagem")),
            associados: (formData.getAll("associados") as unknown as number[]),
        }
        const response = await consumerPonto.put(params.id_ponto, data)

        if (response.ok) {
            alert("Ponto atualizado com sucesso!");
            window.location.href = "/admin/pontos";
        }
        else {
            alert("Erro ao atualizar ponto!");
        }

    }

    async function deletePonto() {
        const response = await delPonto(parseInt(params.id_ponto));
        if (response?.ok) {
            window.location.href = "/admin/pontos";
        }
    }

    useEffect(() => {
        setCurrentTipo(ponto?.tipo.toString() || '1');
    }, [ponto, editable]);

    return (
        <>
            <h2 className="text-4xl text-neutral-700 font-bold mb-8">
                {editable ? "Editar" : "Visualizar"} Ponto
            </h2>

            <form onSubmit={(e) => submitForm(e)} onReset={() => setEditable(false)} method="POST"
                className="w-full flex flex-col gap-4"
            >

                <label htmlFor="id">Id:</label>
                <input
                    type="text"
                    id="id"
                    name="id"
                    className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                    defaultValue={params.id_ponto}
                    disabled
                />

                {
                    edificacoes.length > 0 && (
                        <>
                            <label htmlFor="">Edificação:</label>

                            <div className="flex">
                                <select
                                    id="edificacao"
                                    name="edificacao"
                                    className="w-full rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                                    onChange={ e => setCurrentEdificacao(e.target.value) }
                                    defaultValue={ponto?.edificacao.codigo}
                                    disabled={!editable}
                                >
                                    {edificacoes.map((edificacao: Edificacao) => {
                                        return <option value={edificacao.codigo} key={edificacao.codigo} >{edificacao.codigo} - {edificacao.nome}</option>
                                    })}
                                </select >

                                <a className="flex justify-center" href={currentEdificacao ? "/admin/edificacoes/" + currentEdificacao : "#"} target={currentEdificacao ? "_blank" : "_self"}>
                                    <svg className={currentEdificacao ? `w-6 mx-4 fill-primary-600` : `w-6 mx-4 fill-neutral-500`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 576 512">
                                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.
                        2 3.3 20.3z" />
                                    </svg>
                                </a>

                            </div>

                        </>
                    )
                }

                <label htmlFor="ambiente">Ambiente:</label>
                <input
                    type="text"
                    id="ambiente"
                    name="ambiente"
                    className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                    defaultValue={ponto?.ambiente}
                    disabled={!editable}
                />

                {pontos.length > 0 && (
                    <>
                        <label htmlFor="tipo">
                            Tipo:
                        </label>

                        <select
                            id="tipo"
                            name="tipo"
                            className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                            defaultValue={ponto?.tipo}
                            onChange={currentTipo => setCurrentTipo(currentTipo.target.value)}
                            disabled={!editable}
                        >
                            <option value="1">Bebedouro</option>
                            <option value="2">Reservatório predial superior</option>
                            <option value="3">Reservatório predial inferior</option>
                            <option value="4">Reservatório de distribuição superior</option>
                            <option value="5">Reservatório de distribuição inferior</option>
                            <option value="6">CAERN</option>
                        </select>
                    </>
                )}

                {currentTipo && currentTipo == "1" && (
                    <>
                        <label htmlFor="tombo">Tombo:</label>
                        <input
                            type="text"
                            id="tombo"
                            name="tombo"
                            className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                            defaultValue={ponto?.tombo}
                            disabled={!editable}
                        />
                    </>
                )}

                {
                    currentTipo != "1" && (
                        <>
                            <label htmlFor="associados"> Reservatórios Associados: </label>
                            <select
                                id="associados"
                                name="associados"
                                className="w-full rounded-lg border border-neutral-400 px-6 py-4"
                                multiple
                                disabled={!editable}
                            >
                                <option value="" disabled>-</option>
                                {pontosAssociados.map((point: Ponto) => {
                                    return (
                                        <option
                                            value={point.id}
                                            key={"associado-" + point.id}
                                            selected={ponto?.associados.includes(point.id)}
                                        >
                                            {point.id} - {point.edificacao.codigo} - {point.edificacao.nome} - {TIPOS_PONTOS[point.tipo]}
                                            {point.ambiente && point.ambiente.trim() != "-" && point.ambiente.trim() != "nan" && point.ambiente.trim() != "" ? "- " + point.ambiente : ""}
                                            {point.tombo && point.tombo.trim() != "-" && point.tombo.trim() != "nan" && point.tombo.trim() ? "- " + point.tombo : ""}
                                        </option>
                                    )
                                })}
                            </select>
                        </>
                    )

                }

                {
                    pontos.length > 0 && (
                        <>
                            <label htmlFor="amontante">Amontante:</label>
                            <div className="flex">

                                <select
                                    id="amontante"
                                    name="amontante"
                                    className="w-full rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                                    defaultValue={pontos.length > 0 ? ponto?.amontante?.id : undefined}
                                    disabled={!editable}
                                    onChange={ e => {setCurrentAmontante(e.target.value);}}
                                >
                                    <option value="">-</option>
                                    {pontosAmontantes.map((ponto: Ponto) => {
                                        return (
                                            <option className="" value={ponto.id} key={ponto.id}>
                                                {TIPOS_PONTOS[ponto.tipo]}
                                                {ponto.ambiente && ponto.ambiente.trim() != "-" && ponto.ambiente.trim() != "nan" && ponto.ambiente.trim() != "" ? "- " + ponto.ambiente : ""}
                                                {ponto.tombo && ponto.tombo.trim() != "-" && ponto.tombo.trim() != "nan" && ponto.tombo.trim() ? "- " + ponto.tombo : ""}
                                            </option>
                                        );
                                    })}
                                </select>

                                <a className="flex justify-center" href={currentAmontante ? "/admin/pontos/" + currentAmontante : "#"} target={currentAmontante ? "_blank" : "_self"}>
                                    <svg className={currentAmontante ? `w-6 mx-4 fill-primary-600` : `w-6 mx-4 fill-neutral-500`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 576 512">
                                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                    </svg>
                                </a>

                            </div>
                        </>)
                }

                <label htmlFor="foto">Imagem:</label>
                {ponto?.imagem
                    ? <img
                        id="imagePreview"
                        alt="Imagem Preview"
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${ponto?.imagem}`}
                        className="mb-4 max-h-48 w-full rounded-lg border border-neutral-300 bg-neutral-200 object-cover"
                    />
                    : <span className="text-neutral-500 text-sm">Sem imagem</span>
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
                    onClick={deletePonto}
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
            </form >
        </>
    );
}