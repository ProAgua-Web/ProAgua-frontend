"use client";

import { Edificacao, Ponto, TIPOS_PONTOS } from "@/utils/types";
import { FormEvent, SyntheticEvent, useEffect, useState } from "react";

export default function Page() {
    const [edificacoes, setEdficiacoes] = useState<Edificacao[]>([]);
    const [edificacao, setEdificacao] = useState<Edificacao | null>(null)
    const [pontos, setPontos] = useState<Ponto[] | null>(null);

    useEffect(() => {
        (async () => {
            const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/edificacoes');
            const edificacoes: Edificacao[] = (await resp.json()).items;
            setEdficiacoes(edificacoes);
        })()
    }, [])

    useEffect(() => {
        (async () => {
            if (edificacao != null) {
                const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + edificacao.pontos_url);
                const pontos: Ponto[] = (await resp.json()).items;
                setPontos(pontos);
            }
        })()
    }, [edificacao])

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = {
            amostragem: Number(formData.get("amostragem")),
            ponto: Number(formData.get("ponto")),
        };

        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/sequencias/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if (response.status === 200) {
            alert("Sequencia de coleta criada com sucesso!");
            const responseData = await response.json();
            const id = responseData.id;
            window.location.href = `/admin/sequencias_coletas`;
        } else {
            alert("Erro ao criar Sequencia de coleta");
        }
    };

    return (
        <>
            <h1 className="text-4xl text-neutral-700 font-bold mb-8">Criar sequencia de coletas</h1>

            <form className="w-full flex flex-col gap-4" onSubmit={(e) => submitForm(e)} method="POST">

                <label htmlFor="" >Edificação:</label>
                <select
                    id="edificacao"
                    name="edificacao"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                    onChange={e => {
                        let index = parseInt(e.target.value);
                        setEdificacao(edificacoes[index]);
                    }}
                >
                    <option>-</option>
                    {edificacoes.map((edificacao, index) => <option value={index}>{edificacao.codigo} - {edificacao.nome}</option>)}
                </select >

                <label htmlFor="" >Ponto:</label>
                <select
                    id="ponto"
                    name="ponto"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                >
                    <option>-</option>
                    {edificacao && pontos && pontos.map(ponto => {
                        return (
                            <option value={ponto.id}>{TIPOS_PONTOS[ponto.tipo - 1]} - {ponto.ambiente}</option>
                        )
                    })}
                </select>
                <label htmlFor="" >Amostragem:</label>
                <input
                    type="number"
                    id="amostragem"
                    name="amostragem"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                />

                <div className="rounded-lg border border-neutral-400 px-6 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold text-center">
                    <input id="criar" type="submit" value="Criar" />
                </div>
            </form>
        </>
    );
}
