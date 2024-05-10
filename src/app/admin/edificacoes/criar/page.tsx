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

        if (response.status === 200) {
            if (file != undefined && file != null) {
                let formData = new FormData();
                formData.append("imagem", file);
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/edificacoes/${data.codigo}/imagem`,
                    {
                        method: "POST",
                        body: formData,
                    },
                ).then((response) => {
                    if (!response.ok) {
                        alert("Erro ao adicionar imagem");
                    } else {
                        alert("Edificação criada com sucesso!");
                        window.location.href = "/admin/edificacoes";
                    }
                }
                );
            }
        } else {
            alert("Erro ao criar edificação");
        }
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
            <h1 className="text-4xl text-neutral-700 font-bold mb-8">Criar edificação</h1>

            <form className="w-full flex flex-col gap-4" onSubmit={(e) => submitForm(e)} method="POST">
                <label htmlFor="codigo">Código:</label>
                <input
                    type="text"
                    id="codigo"
                    name="codigo"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                    required
                />

                <label htmlFor="nome">
                    Nome:
                </label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                    required
                />

                <label htmlFor="campus">
                    Campus:
                </label>
                <select
                    id="campus"
                    name="campus"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                    required
                >
                    <option value="LE">Leste</option>
                    <option value="OE">Oeste</option>
                </select>

                <label htmlFor="cronograma">
                    Cronograma:
                </label>
                <input
                    type="number"
                    id="cronograma"
                    name="cronograma"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                    required
                />

                <label htmlFor="foto">
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

                <div className="rounded-lg border border-neutral-400 px-6 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold text-center">
                    <input id="criar" type="submit" value="Criar" />
                </div>
            </form>
        </>
    );
}
