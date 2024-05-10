"use client"

import { Edificacao, Ponto, TIPOS_PONTOS } from "@/utils/types";
import { FormEvent, useEffect, useState } from "react";

export default function Pontos({ params }: { params: { cod_edificacao: string } }) {
    const [edificacoes, setEdificacoes] = useState<Edificacao[]>([]);
    const [pontos, setPontos] = useState<Ponto[]>([]);

    const [file, setFile] = useState<File | null>();
    const [preview, setPreview] = useState<string>();

    const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files?.[0]);
    };


    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data = {
            codigo_edificacao: formData.get("edificacao"),
            ambiente: formData.get("ambiente"),
            tombo: formData.get("tombo"),
            tipo: Number(formData.get("tipo")),
            amontante: Number(formData.get("amontante")),
        };


        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/pontos/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.status === 200) {
            const responseData = await response.json();
            const id = responseData.id;

            if (file != undefined && file != null) {
                let formData = new FormData();
                formData.append("imagem", file);
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/pontos/${id}/imagem`,
                    {
                        method: "POST",
                        body: formData,
                    },
                ).then((response) => {
                    if (!response.ok) {
                        alert("Erro ao adicionar imagem");
                    } else {
                        alert("Ponto de coleta criado com sucesso!");
                        window.location.href = "/admin/pontos";
                    }

                })
                    .catch((err) => {
                        alert(err);
                    });
            }
        } else {
            alert("Erro ao criar ponto de coleta");
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

    useEffect(() => {
        (async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/edificacoes");
            setEdificacoes((await response.json()).items);
        })();
    }, []);


    useEffect(() => {
        (async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/pontos");
            setPontos((await response.json()).items);
        })();
    }, []);

    return (
        <>
            <h1 className="text-4xl text-neutral-700 font-bold mb-8">Criar ponto de coleta</h1>

            <form className="w-full flex flex-col gap-4" onSubmit={(e) => submitForm(e)} method="POST">

                <label htmlFor="">Edificação:</label>

                {
                    edificacoes.length > 0 && (
                        <select
                            id="edificacao"
                            name="edificacao"
                            className="rounded-lg border border-neutral-400 px-6 py-4"
                            defaultValue={params.cod_edificacao}
                        >
                            <option value="">-</option>
                            {edificacoes.map((edificacao: Edificacao) => {
                                return <option value={edificacao.codigo} >{edificacao.codigo} - {edificacao.nome}</option>
                            })}
                        </select >
                    )

                }



                <label htmlFor="">Ambiente:</label>
                <input
                    type="text"
                    id="ambiente"
                    name="ambiente"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                />

                <label htmlFor="">Tombo:</label>
                <input
                    type="text"
                    id="tombo"
                    name="tombo"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                />

                <label htmlFor="">Tipo:</label>
                <select
                    id="tipo"
                    name="tipo"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                >
                    <option value="1">Bebedouro</option>
                    <option value="2">RPS - Reservatório predial superior</option>
                    <option value="3">RPI - Reservatório predial inferior</option>
                    <option value="4">RDS - Reservatório de destribuição superior</option>
                    <option value="5">RDI - Reservatório de destribuição inferior</option>
                </select>

                <label htmlFor="">Ponto a montante:</label>
                <select
                    id="amontante"
                    name="amontante"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                >
                    <option value="">-</option>
                    {pontos.map((ponto: Ponto) => {
                        return <option className="" value={ponto.id}>{TIPOS_PONTOS[ponto.tipo - 1]} {ponto.ambiente.trim() != "-" && ponto.ambiente.trim() != "nan" && ponto.ambiente.trim() != "" ? "- " + ponto.ambiente : ""} {ponto.tombo.trim() != "-" && ponto.tombo.trim() != "nan" && ponto.tombo.trim() ? "- " + ponto.tombo : ""}</option>
                    })}
                </select>

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

