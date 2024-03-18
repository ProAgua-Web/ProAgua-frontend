'use client'

import { Edificacao, useEdificacoes, usePontos, API_BASE_URL} from "@/utils/api_consumer";
import { SyntheticEvent, useState } from "react";

export default function () {
    const edificacoes = useEdificacoes();
    const [edificacao, setEdificacao] = useState<Edificacao | null>(null)
    const pontos = usePontos(edificacao ? edificacao.pontos_url : '')

    const submitForm = (e: SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            edificacao: { value: string };
            ponto: { value: string };
            amostragem: { value: string };
        };

        const data = {
            edificacao: target.edificacao.value,
            ponto: target.ponto.value,
            amostragem: parseInt(target.amostragem.value),
        };

        fetch(API_BASE_URL + "/api/v1/sequencias/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao criar sequencia");
                }
            })
            .then(() => {
                window.location.href = "/sequencias_coletas";
            })
            .catch((err) => {
                alert(err);
            });
    };


    return (
        <>
            <>
                <h1 className="mb-4 text-3xl font-bold text-neutral-600">Criar sequencia de coletas</h1>

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
                        onChange={e => {
                            let index = parseInt(e.target.value);
                            setEdificacao(edificacoes[index]);
                        }}
                    >
                        <option>-</option>
                        {edificacoes.map((edificacao, index) => <option value={index}>{edificacao.codigo} - {edificacao.nome}</option>)}
                    </select >

                    <label htmlFor="" className="mt-4">Ponto:</label>
                    <select
                        id="ponto"
                        name="ponto"
                        className="bg-white rounded-md border border-neutral-200 px-4 py-2"
                    >
                        <option>-</option>
                        {edificacao && pontos && pontos.map(ponto => {
                            return (
                                <option value={ponto.id}>{ponto.tipo} - {ponto.ambiente}</option>
                            )
                        })}
                    </select>
                    <label htmlFor="" className="mt-4">Amostragem:</label>
                    <input
                        type="number"
                        id="amostragem"
                        name="amostragem"
                        className="bg-white rounded-md border border-neutral-200 px-4 py-2"
                    />

                    <input
                        type="submit"
                        value="Criar"
                        className="mt-8 w-full self-end rounded-md bg-green-500 px-4 py-2 font-semibold text-white"
                    />
                </form>
            </>
        </>
    );
}
