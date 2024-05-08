"use client";

import React, { FormEvent, useEffect, useState } from "react";

export default function CriarEdificacao() {
    // TODO: Criar campo para múltplas imagens
    
    const [file, setFile] = useState<File | null>();
    const [preview, setPreview] = useState<string>();

    const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files?.[0]);
    };

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        
        // const target = event.target as typeof event.target & {
        //     codigo: { value: string };
        //     nome: { value: string };
        //     campus: { value: string };
        //     cronograma: { value: string };
        // };

        const data = {
            codigo: formData.get("codigo"),
            nome: formData.get("nome"),
            campus: formData.get("campus"),
            cronograma: formData.get("cronograma"),
        };

        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/edificacoes/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            
        if (file != undefined && file != null) {
            let formData = new FormData();
            formData.append("imagem", file);
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/edificacoes/${data.codigo}/imagem`,
                {
                    method: "POST",
                    body: formData,
                },
            );
        }
        
        window.location.href = "/admin/edificacoes";
    };

    // Carregar imagem de preview
    useEffect(() => {
        if (!file) {
            setPreview(undefined);
            return;
        }

        const fileURL = URL.createObjectURL(file);
        setPreview(fileURL);

        return () => URL.revokeObjectURL(fileURL);
    }, [file]);

    return (
        <>
            <h2 className="mb-4 text-3xl font-bold text-neutral-600">
                Criar Edificação
            </h2>

            <form
                method="post"
                className="flex flex-col rounded-xl border border-neutral-200 p-8 shadow-lg"
                onSubmit={submitForm}
            >
                <label htmlFor="codigo">Código:</label>
                <input
                    type="text"
                    id="codigo"
                    name="codigo"
                    className="rounded-md border border-neutral-200 px-4 py-2"
                    required
                />

                <label htmlFor="nome" className="mt-4">
                    Nome:
                </label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    className="rounded-md border border-neutral-200 px-4 py-2"
                    required
                />

                <label htmlFor="campus" className="mt-4">
                    Campus:
                </label>
                <select
                    id="campus"
                    name="campus"
                    className="rounded-md border border-neutral-200 px-4 py-2"
                    required
                >
                    <option value="LE">Leste</option>
                    <option value="OE">Oeste</option>
                </select>

                <label htmlFor="cronograma" className="mt-4">
                    Cronograma:
                </label>
                <input
                    type="number"
                    id="cronograma"
                    name="cronograma"
                    className="rounded-md border border-neutral-200 px-4 py-2"
                    required
                />

                <label htmlFor="foto" className="mt-4">
                    Foto:
                </label>

                {preview && (
                    <img
                        id="imagePreview"
                        alt="Imagem Preview"
                        src={preview}
                        className="mb-4 max-h-48 w-full rounded-lg border border-neutral-300 bg-neutral-200 object-cover"
                    />
                )}

                <input type="file" id="foto" name="foto" onChange={selectImage} />

                <input
                    id="criar"
                    type="submit"
                    className="mt-4 rounded-md border bg-green-500 px-4 py-2 text-center font-semibold text-white hover:bg-green-600"
                    value="Criar"
                />
            </form>
        </>
    );
}
