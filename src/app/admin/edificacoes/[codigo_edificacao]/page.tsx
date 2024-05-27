"use client";

import { delEdificacao, useEdificacao } from "@/utils/api_consumer/client_side_consumer";
import { FormEvent, useEffect, useState } from "react";
import { Image } from "@/utils/types";
import ImageUploadModal from "@/components/ImageUploadModal";
import MultipleImageInput from "@/components/MultipleImageInput";

export default function VisualizarEdificacao({ params }: { params: { codigo_edificacao: string } }) {
    const edificacao = useEdificacao(params.codigo_edificacao);
    const [images, setImages] = useState([]);
    const [editable, setEditable] = useState<Boolean>(false);

    useEffect(() => {
        if (edificacao)
            setImages(edificacao?.imagens);
    }, [edificacao]);

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/edificacoes/${params.codigo_edificacao}`, {
            method: 'PUT',
            body: JSON.stringify({
                codigo: formData.get('codigo'),
                nome: formData.get('nome'),
                campus: formData.get('campus'),
                cronograma: Number(formData.get('cronograma'))
            })
        });

        if (response.status == 200) {
            alert("Edificação atualizada com sucesso!");
            window.location.href = "/admin/pontos";
        } else {
            alert("Erro ao atualizar edificação!");
        }

    }

    async function deleteEdificacao() {
        delEdificacao(params.codigo_edificacao);
    }

    return (
        <>
            <h2 className="text-4xl text-neutral-700 font-bold mb-8">
                {editable ? "Editar" : "Visualizar"} Edificação
            </h2>
            <form onSubmit={(e) => submitForm(e)} onReset={() => {setEditable(false); }} method="PUT"
                className="w-full flex flex-col gap-4"
            >
                <label htmlFor="codigo">Código:</label>
                <input
                    type="text"
                    id="codigo"
                    name="codigo"
                    className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                    defaultValue={edificacao?.codigo}
                    disabled={!editable}
                />

                <label htmlFor="nome">Nome:</label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                    defaultValue={edificacao?.nome}
                    disabled={!editable}
                />

                <label htmlFor="campus">Campus:</label>
                <select
                    id="campus"
                    name="campus"
                    className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                    defaultValue={edificacao?.campus}
                    disabled={!editable}
                >
                    <option value="LE">Leste</option>
                    <option value="OE">Oeste</option>
                </select>

                <label htmlFor="cronograma">Cronograma:</label>
                <input
                    type="number"
                    id="cronograma"
                    name="cronograma"
                    className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                    defaultValue={edificacao?.cronograma}
                    disabled={!editable}
                />

                <label htmlFor="foto">Imagem:</label>
                <MultipleImageInput images={images} setImages={setImages} />

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
                    onClick={deleteEdificacao}
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
        </>
    );
}