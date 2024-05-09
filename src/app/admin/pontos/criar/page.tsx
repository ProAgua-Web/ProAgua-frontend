"use client"

import { Edificacao, Ponto, TIPOS_PONTOS } from "@/utils/types";
import { useEffect, useState } from "react";

export default function Pontos() {
    // TODO: adicionar campo para adição de imagem

    const [edificacoes, setEdificacoes] = useState<Edificacao[]>([]);
    const [pontos, setPontos] = useState<Ponto[]>([]);

    const submitForm = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            edificacao: { value: string };
            ambiente: { value: string };
            tombo: { value: string };
            tipo: { value: string };
            amontante: { value: string };
        };

        const data = {
            codigo_edificacao: target.edificacao.value,
            ambiente: target.ambiente.value,
            tombo: target.tombo.value,
            tipo: parseInt(target.tipo.value),
            amontante: parseInt(target.amontante.value),
        };

        fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/pontos/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao criar ponto");
                }
            })
            .then(() => {
                window.location.href = "/admin/pontos";
            })
            .catch((err) => {
                alert(err);
            });
    };

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
            <h1 className="mb-4 text-3xl font-bold text-neutral-600">Criar ponto</h1>

            <form
                method="post"
                className="flex flex-col rounded-xl border border-neutral-200 p-8 shadow-lg"
                onSubmit={submitForm}
            >
                <label htmlFor="" className="mt-4">Edificação:</label>
                <select 
                    id="edificacao"
                    name="edificacao"
                    className="bg-white rounded-md border border-neutral-200 px-4 py-2"
                >
                    {edificacoes.map((edificacao: Edificacao) => {
                        return <option value={edificacao.codigo} >{edificacao.codigo} - {edificacao.nome}</option>
                    })}
                </select >

                <label htmlFor="" className="mt-4">Ambiente:</label>
                <input
                    type="text"
                    id="ambiente"
                    name="ambiente"
                    className="bg-white rounded-md border border-neutral-200 px-4 py-2"
                />

                <label htmlFor="" className="mt-4">Tombo:</label>
                <input
                    type="text"
                    id="tombo"
                    name="tombo"
                    className="bg-white rounded-md border border-neutral-200 px-4 py-2"
                />

                <label htmlFor="" className="mt-4">Tipo:</label>
                <select
                    id="tipo"
                    name="tipo"
                    className="bg-white rounded-md border border-neutral-200 px-4 py-2"
                >
                    <option value="1">Bebedouro</option>
                    <option value="2">RPS - Reservatório predial superior</option>
                    <option value="3">RPI - Reservatório predial inferior</option>
                    <option value="4">RDS - Reservatório de destribuição superior</option>
                    <option value="5">RDI - Reservatório de destribuição inferior</option>
                </select>

                <label htmlFor="" className="mt-4">Ponto a montante:</label>
                <select
                    id="amontante"
                    name="amontante"
                    className="bg-white rounded-md border border-neutral-200 px-4 py-2"
                >
                <option value="">-</option>
                {pontos.map((ponto: Ponto) => {
                    console.log(ponto)
                    return <option className="" value={ponto.id}>{TIPOS_PONTOS[ponto.tipo -1]} {ponto.ambiente.trim() != "-" && ponto.ambiente.trim() != "nan"  && ponto.ambiente.trim() != "" ? "- " + ponto.ambiente : ""} {ponto.tombo.trim() != "-" && ponto.tombo.trim() != "nan" && ponto.tombo.trim() ? "- " + ponto.tombo: ""}</option>
                })}
                </select>

                <input
                    type="submit"
                    value="Criar"
                    className="mt-8 w-full self-end rounded-md bg-green-500 px-4 py-2 font-semibold text-white"
                />
            </form>
        </>
    );
}

