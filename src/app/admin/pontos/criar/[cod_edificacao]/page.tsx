"use client"

import { usePontos } from "@/utils/api_consumer/client_side_consumer";
import { Edificacao, Ponto, TIPOS_PONTOS } from "@/utils/types";
import { FormEvent, useEffect, useState } from "react";

export default function Pontos({ params }: { params: { cod_edificacao: string } }) {
    const [edificacoes, setEdificacoes] = useState<Edificacao[]>([]);
    const pontos = usePontos();
    console.log(pontos);

    const [currentAmontante, setCurrentAmontante] = useState<string>('');
    const [currentEdificacao, setCurrentEdificacao] = useState<string>('');
    const [currentTipo, setCurrentTipo] = useState<string>('1');
    const pontosAmontantes = pontos.filter(ponto => ponto.tipo > Number(currentTipo));
    const pontosAssociados = pontos.filter(ponto => ponto.tipo == Number(currentTipo));

    const [file, setFile] = useState<File | null>();
    const [preview, setPreview] = useState<string>();
    const [submiting, setSubmiting] = useState<boolean>(false);

    function updateAmontante() {
        const amontante = document.getElementById("amontante") as HTMLSelectElement;
        setCurrentAmontante(amontante.value);
    }

    function updateEdificacao() {
        const edificacao = document.getElementById("edificacao") as HTMLSelectElement;
        setCurrentEdificacao(edificacao.value);
    }

    const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files?.[0]);
    };


    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setSubmiting(true);

        const formData = new FormData(event.currentTarget);

        const data = {
            codigo_edificacao: formData.get("edificacao"),
            ambiente: formData.get("ambiente"),
            tombo: formData.get("tombo"),
            tipo: Number(formData.get("tipo")),
            amontante: Number(formData.get("amontante")),
            associados: formData.getAll("associados").map(Number),
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
            } else {
                alert("Ponto de coleta criado com sucesso!");
                window.location.href = "/admin/pontos";
            }
        } else {
            alert("Erro ao criar ponto de coleta");
        }

        setSubmiting(false);
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
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/edificacoes?limit=10000");
            setEdificacoes((await response.json()).items);
        })();
    }, []);


    return (
        <>
            <h1 className="text-4xl text-neutral-700 font-bold mb-8">Criar ponto de coleta</h1>

            <form className="w-full flex flex-col gap-4" onSubmit={(e) => submitForm(e)} method="POST">

                {
                    edificacoes.length > 0 && (
                        <>
                            <label htmlFor="">Edificação:</label>


                            <div className="flex">
                                <select
                                    id="edificacao"
                                    name="edificacao"
                                    className="w-full rounded-lg border border-neutral-400 px-6 py-4"
                                    onChange={updateEdificacao}
                                    defaultValue={params.cod_edificacao}
                                >
                                    <option value="">-</option>
                                    {edificacoes.map((edificacao: Edificacao) => {
                                        return <option value={edificacao.codigo} >{edificacao.codigo} - {edificacao.nome}</option>
                                    })}
                                </select >

                                <a className="flex justify-center" href={currentEdificacao ? "/admin/edificacoes/" + currentEdificacao : "#"} target={currentEdificacao ? "_blank" : "_self"}>
                                    <svg className={currentEdificacao ? `w-6 mx-2 fill-primary-600` : `w-6 mx-2 fill-neutral-500`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 576 512">
                                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.
                        2 3.3 20.3z" />
                                    </svg>
                                </a>
                                <a className="flex justify-center" href="/admin/edificacoes/criar" target="_blank">
                                    <svg className="w-6 mx-2 fill-primary-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512">
                                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                                    </svg>
                                </a>

                            </div>

                        </>
                    )

                }



                <label htmlFor="">Ambiente:</label>
                <input
                    type="text"
                    id="ambiente"
                    name="ambiente"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                />

                <label htmlFor="">Tipo:</label>
                <select
                    id="tipo"
                    name="tipo"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                    onChange={currentTipo => setCurrentTipo(currentTipo.target.value)}
                >
                    <option value="1">Bebedouro</option>
                    <option value="2">RPS - Reservatório predial superior</option>
                    <option value="3">RPI - Reservatório predial inferior</option>
                    <option value="4">RDS - Reservatório de destribuição superior</option>
                    <option value="5">RDI - Reservatório de destribuição inferior</option>
                    <option value="6">CAERN</option>
                </select>

                {
                    currentTipo == "1" && (
                        <>
                            <label htmlFor="">Tombo:</label>
                            <input
                                type="text"
                                id="tombo"
                                name="tombo"
                                className="rounded-lg border border-neutral-400 px-6 py-4"
                            />
                        </>
                    )
                }


                {
                    currentTipo != "1" && (
                        <>
                            <label htmlFor="associados"> Reservatórios Associados: </label>
                            <select
                                id="associados"
                                name="associados"
                                className="w-full rounded-lg border border-neutral-400 px-6 py-4"
                                multiple
                            >
                                <option value="" disabled>-</option>
                                {pontosAssociados.map((ponto: Ponto) => {
                                    return (
                                        <option className="" value={ponto.id}>
                                            {ponto.id} - {TIPOS_PONTOS[ponto.tipo]}
                                            {ponto.ambiente && ponto.ambiente.trim() != "-" && ponto.ambiente.trim() != "nan" && ponto.ambiente.trim() != "" ? "- " + ponto.ambiente : ""}
                                            {ponto.tombo && ponto.tombo.trim() != "-" && ponto.tombo.trim() != "nan" && ponto.tombo.trim() ? "- " + ponto.tombo : ""}
                                        </option>
                                    )
                                })}
                            </select>
                        </>
                    )

                }

                <label htmlFor="">Ponto a montante:</label>
                <div className="flex">

                    <select
                        id="amontante"
                        name="amontante"
                        className="w-full rounded-lg border border-neutral-400 px-6 py-4"
                        onChange={updateAmontante}
                    >
                        <option value="">-</option>
                        {pontosAmontantes.map((ponto: Ponto) => {
                            return (
                                <option className="" value={ponto.id}>
                                    {ponto.id} - {TIPOS_PONTOS[ponto.tipo]}
                                    {ponto.ambiente && ponto.ambiente.trim() != "-" && ponto.ambiente.trim() != "nan" && ponto.ambiente.trim() != "" ? "- " + ponto.ambiente : ""}
                                    {ponto.tombo && ponto.tombo.trim() != "-" && ponto.tombo.trim() != "nan" && ponto.tombo.trim() ? "- " + ponto.tombo : ""}
                                </option>
                            )
                        })}
                    </select>

                    <a className="flex justify-center" href={currentAmontante ? "/admin/pontos/" + currentAmontante : "#"} target={currentAmontante ? "_blank" : "_self"}>
                        <svg className={currentAmontante ? `w-6 mx-2 fill-primary-600` : `w-6 mx-2 fill-neutral-500`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512">
                            <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                        </svg>
                    </a>

                    <a className="flex justify-center" href="/admin/pontos/criar" target="_blank">
                        <svg className="w-6 mx-2 fill-primary-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512">
                            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                        </svg>
                    </a>

                </div>

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

                <div className="w-full">
                    <input id="criar" type="submit" className={"w-full rounded-lg border border-neutral-400 px-6 py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-200 disabled:text-neutral-500 text-white font-semibold"} value={`${submiting ? "Criando..." : "Criar"}`} disabled={submiting} />
                </div>
            </form>
        </>
    );
}

