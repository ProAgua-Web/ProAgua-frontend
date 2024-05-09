"use client";

import { useEdificacao } from "@/utils/api_consumer/client_side_consumer";
import { FormEvent, useState } from "react";

export default function VisualizarEdificacao({ params }: { params: { codigo_edificacao: string } }) {
    const edificacao = useEdificacao(params.codigo_edificacao);
    const [editable, setEditable] = useState<Boolean>(false);

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

        window.location.href = "/admin/edificacoes";
    }

    return (
        <>
            <h2 className="text-4xl text-neutral-700 font-bold mb-8">
                {editable ? "Editar" : "Visualizar"} Edificação
            </h2>
            <form className="w-full flex flex-col gap-4" onSubmit={(e) => submitForm(e)} method="POST">
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
                {edificacao?.imagem
                    ? <img
                        id="imagePreview"
                        alt="Imagem Preview"
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${edificacao?.imagem}`}
                        className="mb-4 max-h-48 w-full rounded-lg border border-neutral-300 bg-neutral-200 object-cover"
                    />
                    : <span className="text-neutral-500 text-sm">Sem imagem</span>
                }

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