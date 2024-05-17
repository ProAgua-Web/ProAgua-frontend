"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import ImageUploadModal from "@/components/ImageUploadModal";
import MultipleImageInput from "@/components/MultipleImageInput";

type Image = {
    file: File,
    description: string
};

export default function CriarEdificacao() {
    // Page state variables
    const [submiting, setSubmiting] = useState<boolean>(false);
    const [images, setImages] = useState<Image[]>([]);
    
    async function uploadImage(codigo_edificacao: string, image: Image) {
        let formData = new FormData();
        formData.append("file", image.file);
        formData.append("description", image.description);

        let response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/edificacoes/${codigo_edificacao}/imagem`,
            {
                method: "POST",
                body: formData,
            },
        )
         
        if (!response.ok) {
            alert(`Erro ao adicionar imagem ${image.file.name}`);
        }
    }

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmiting(true);
        
        // Create "edificação" without image 
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

        if (response.status != 200) {
            alert("Erro ao criar edificação!");
            setSubmiting(false);
            return;
        } else {
            alert("Edificação criada.");
        }

        // If the creation was well succeded, then upload the images
        // and attach to the "edficação".
        await Promise.all(images.map((image) => {
            return uploadImage(data.codigo, image);
        }));
        
        alert("Imagens criadas.");
        window.location.href = "/admin/edificacoes";
    };

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

                <hr />

                <label htmlFor="foto">
                    Fotos:
                </label>
                <MultipleImageInput 
                    images={images}
                    setImages={setImages}
                    disabled={false}
                />

                <div className="w-full">
                    <input
                        id="criar"
                        type="submit"
                        className="w-full rounded-lg border border-neutral-400 px-6 py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-200 disabled:text-neutral-500 text-white font-semibold"
                        value={`${submiting ? "Criando..." : "Criar"}`}
                        disabled={submiting}
                    />
                </div>
            </form>
        </>
    );
}
