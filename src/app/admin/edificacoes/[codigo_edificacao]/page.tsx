"use client";

import { useEdificacao } from "@/utils/api_consumer/client_side_consumer";
import { FormEvent, useState } from "react";

export default function VisualizarEdificacao({ params }:{ params: { codigo_edificacao: string } }) {
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
            <h2 className="mb-4 text-3xl font-bold text-neutral-600">
                Criar Edificação
            </h2>

            <form
                method="none"
                className="flex flex-col rounded-xl border border-neutral-200 p-8 shadow-lg"
                onSubmit={submitForm}
            >
                <label htmlFor="codigo">Código:</label>
                <input
                    type="text"
                    id="codigo"
                    name="codigo"
                    className="rounded-md border border-neutral-200 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                    defaultValue={edificacao?.codigo}  
                    disabled={!editable}
                />

                <label htmlFor="nome" className="mt-4">Nome:</label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    className="rounded-md border border-neutral-200 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                    defaultValue={edificacao?.nome}
                    disabled={!editable}
                />

                <label htmlFor="campus" className="mt-4">Campus:</label>
                <select
                    id="campus"
                    name="campus"
                    className="rounded-md border border-neutral-200 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                    defaultValue={edificacao?.campus}
                    disabled={!editable}
                >
                    <option value="LE">Leste</option>
                    <option value="OE">Oeste</option>
                </select>

                <label htmlFor="cronograma" className="mt-4">Cronograma:</label>
                <input
                    type="number"
                    id="cronograma"
                    name="cronograma"
                    className="rounded-md border border-neutral-200 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                    defaultValue={edificacao?.cronograma}
                    disabled={!editable}
                />

                <label htmlFor="foto" className="mt-4">Imagem:</label>
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
                    className="mt-4 rounded-md border bg-green-500 px-4 py-2 text-center font-semibold text-white hover:bg-green-600"
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
                    className="mt-4 rounded-md border bg-red-500 px-4 py-3 mt-2 text-center font-semibold text-white hover:bg-red-600 disabled:bg-gray-400 disabled:text-gray-300"
                    disabled={!editable}
                    >
                    Excluir
                </button>

                {editable && (
                    <>
                        <button
                            type="button"
                            className="mt-4 rounded-md border bg-gray-500 px-4 py-2 text-center font-semibold text-white hover:bg-gray-600"
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