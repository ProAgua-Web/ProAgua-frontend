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
            <h1 className="text-4xl text-neutral-700 font-bold mb-8">Criar ponto de coleta</h1>

            <form className="w-full flex flex-col gap-4" onSubmit={(e) => submitForm(e)} method="POST">

                <label htmlFor="">Edificação:</label>
                <select 
                    id="edificacao"
                    name="edificacao"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                >
                    <option value="">-</option>
                    {edificacoes.map((edificacao: Edificacao) => {
                        return <option value={edificacao.codigo} >{edificacao.codigo} - {edificacao.nome}</option>
                    })}
                </select >

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
                    return <option className="" value={ponto.id}>{TIPOS_PONTOS[ponto.tipo -1]} {ponto.ambiente.trim() != "-" && ponto.ambiente.trim() != "nan"  && ponto.ambiente.trim() != "" ? "- " + ponto.ambiente : ""} {ponto.tombo.trim() != "-" && ponto.tombo.trim() != "nan" && ponto.tombo.trim() ? "- " + ponto.tombo: ""}</option>
                })}
                </select>

                <div className="rounded-lg border border-neutral-400 px-6 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold text-center">
                    <input id="criar" type="submit" value="Criar" />
                </div>
            </form>
        </>
    );
}

