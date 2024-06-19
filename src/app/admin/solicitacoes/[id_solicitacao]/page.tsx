"use client";

import MultipleImageInput from "@/components/MultipleImageInput";
import { consumerSolicitacao, useEdificacao, useEdificacoes, usePontos, useSolicitacao, downloadSolictacao} from "@/utils/api_consumer/client_side_consumer";
import { ImageIn, ImageOut } from "@/utils/types";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id_solicitacao: string } }) {
    const { id_solicitacao } = params;
    const solicitacao = useSolicitacao(parseInt(id_solicitacao));
    const edificacoes = useEdificacoes();
    const pontos = usePontos();
    const [idPonto, setidPonto] = useState(solicitacao?.ponto.id ?? 0);
    const [codEdificacao, setCodEdificacao] = useState<string>("");
    const edificacao = useEdificacao(codEdificacao);
    const filteredPontos = pontos.filter(ponto => ponto.edificacao.codigo === edificacao?.codigo);

    const [existingImages, setExistingImages] = useState<ImageOut[]>([]);
    const [images, setImages] = useState<ImageIn[]>([]);

    const [editable, setEditable] = useState(false);
    const [submiting, setSubmiting] = useState(false);

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmiting(true);

        const formData = new FormData(event.currentTarget);

        const data = {
            ponto_id: formData.get('ponto'),
            tipo: formData.get('tipo'),
            objetivo: formData.get('objetivo'),
            justificativa: formData.get('justificativa'),
            status: formData.get('status'),
        }

        const response = await consumerSolicitacao.put(id_solicitacao, data);

        if (response.ok) {
            alert("Solicitação atualizada com sucesso!");
            window.location.href = "/admin/solicitacoes";
        } else {
            alert("Erro ao atualizar solicitação!");
        }

        setSubmiting(false);
        setEditable(false);
    }

    async function deleteSolicitacao() {
        const response = await consumerSolicitacao.delete(id_solicitacao);
        
        if (response.ok) {
            alert("Solicitação deletada.");
            window.location.href = "/admin/solicitacoes";
        } else {
            alert("Erro ao deletar solicitação!");
        }
    }
    useEffect(() => {
        if (solicitacao) {
            setCodEdificacao(solicitacao.ponto.edificacao.codigo);
            setidPonto(solicitacao.ponto.id);
            setExistingImages(solicitacao.imagens);
        }
    }, [solicitacao]);

    useEffect(() => {
        if (edificacao?.imagens) {
            setExistingImages(edificacao?.imagens);
        }
    }, [edificacao]);

    return (
        <>
            <h2 className="text-4xl text-neutral-700 font-bold mb-8">
                {editable ? "Editar" : "Visualizar"} Solicitação
            </h2>

            {
                solicitacao && pontos.length > 0 && (
                    <>
                        <form onSubmit={submitForm} onReset={() => setEditable(false)} method="PUT"
                            className="w-full flex flex-col gap-2">

                            <label htmlFor="tipo">Tipo de solicitação</label>
                            <select required
                                name="tipo"
                                disabled={!editable}
                                defaultValue={solicitacao.tipo}
                                className="w-full rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                            >
                                <option>-</option>
                                <option value="Limpeza de reservatório">Solicitação de limpeza de reservatório</option>
                                <option value="Instalação de ponto de coleta">Solicitação de instalação de ponto de coleta</option>
                                <option value="Conserto de reservatório">Solicitação de conserto de tampa de reservatório</option>
                            </select>

                            <label htmlFor="edificacao">Edificação</label>
                            <div className="flex">
                                <select required
                                    name="edificacao"
                                    disabled={!editable}
                                    defaultValue={solicitacao.ponto.edificacao.codigo}
                                    onChange={(e) => setCodEdificacao(e.target.value)}
                                    className="w-full rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                                >
                                    <option>-</option>
                                    {edificacoes.map(edificacao => (
                                        <option key={edificacao.codigo} value={edificacao.codigo}>{edificacao.codigo} - {edificacao.nome}</option>
                                    ))}

                                </select>

                                <a className="flex justify-center" href={codEdificacao ? "/admin/pontos/" + codEdificacao : "#"} target={codEdificacao ? "_blank" : "_self"}>
                                    <svg className={codEdificacao ? `w-6 mx-4 fill-primary-600` : `w-6 mx-4 fill-neutral-500`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 576 512">
                                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.
                        2 3.3 20.3z" />
                                    </svg>
                                </a>
                            </div>

                            <label htmlFor="ponto">Ponto</label>
                            <div className="flex">
                                <select required
                                    name="ponto"
                                    disabled={!editable}
                                    defaultValue={solicitacao.ponto.id.toString()}
                                    onChange={(e) => setidPonto(parseInt(e.target.value))}
                                    className="w-full rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                                >
                                    <option>-</option>
                                    {filteredPontos.map(ponto => (
                                        <option key={ponto.id} value={ponto.id}>{ponto.ambiente}</option>
                                    ))}


                                </select>

                                <a className="flex justify-center" href={idPonto ? "/admin/pontos/" + idPonto : "#"} target={idPonto ? "_blank" : "_self"}>
                                    <svg className={idPonto ? `w-6 mx-4 fill-primary-600` : `w-6 mx-4 fill-neutral-500`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 576 512">
                                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.
                        2 3.3 20.3z" />
                                    </svg>
                                </a>

                            </div>


                            <label htmlFor="objetivo">Objetivo do serviço solicitado</label>
                            <textarea
                                name="objetivo"
                                rows={8}
                                disabled={!editable}
                                defaultValue={solicitacao.objetivo}
                                className="w-full px-4 py-2 border border-neutral-300 rounded disabled:bg-neutral-200 disabled:text-neutral-500"
                            />

                            <label htmlFor="justificativa">Justificativa da solicitação</label>
                            <textarea
                                name="justificativa"
                                rows={8}
                                disabled={!editable}
                                defaultValue={solicitacao.justificativa}
                                className="w-full px-4 py-2 border border-neutral-300 rounded disabled:bg-neutral-200 disabled:text-neutral-500"
                            />


                            <label htmlFor="status">Status: </label>
                            <select required
                                name="status"
                                disabled={!editable}
                                defaultValue={solicitacao.status}
                                className="w-full rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                            >
                                <option>-</option>
                                <option value="Pendente">Pendente</option>
                                <option value="Em andamento">Em andamento</option>
                                <option value="Concluído">Concluído</option>
                            </select>

                            <label>Imagens: </label>
                            <MultipleImageInput 
                                images={images}
                                setImages={setImages}
                                existingImages={existingImages}
                                disabled={false}
                            />
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
                                onClick={deleteSolicitacao}
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
                        <button onClick={() => downloadSolictacao(parseInt(id_solicitacao))}
                            className="w-full rounded-lg border bg-primary-500 px-6 py-4 text-center font-semibold text-white hover:bg-primary-700">Baixar documento</button>
                    </>
                )
            }
        </>
    )
}