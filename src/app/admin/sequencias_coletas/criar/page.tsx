"use client";

import { Edificacao, Ponto, TIPOS_PONTOS } from "@/utils/types";
import { FormEvent, SyntheticEvent, useEffect, useState } from "react";

export default function Page() {
    const [edificacoes, setEdficiacoes] = useState<Edificacao[]>([]);
    const [edificacao, setEdificacao] = useState<Edificacao | null>(null)
    const [pontos, setPontos] = useState<Ponto[] | null>(null);
    const [submiting, setSubmiting] = useState<boolean>(false);

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

        setSubmiting(true);

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

        setSubmiting(false);
    };

    return (
        <>
            <h1 className="text-4xl text-neutral-700 font-bold mb-8">Criar sequencia de coletas</h1>

            <form className="w-full flex flex-col gap-4" onSubmit={(e) => submitForm(e)} method="POST">

                <label htmlFor="" >Edificação:</label>
                <div className="flex">
                    <select
                        id="edificacao"
                        name="edificacao"
                        className="w-full rounded-lg border border-neutral-400 px-6 py-4"
                        onChange={e => {
                            let index = parseInt(e.target.value);
                            setEdificacao(edificacoes[index]);
                        }}
                    >
                        <option>-</option>
                        {edificacoes.map((edificacao, index) => <option value={index}>{edificacao.codigo} - {edificacao.nome}</option>)}

                    </select >

                    <a className="flex justify-center" href={edificacao?.codigo ? "/admin/edificacoes/" + edificacao?.codigo : "#"} target={edificacao?.codigo ? "_blank" : "_self"}>
                        <svg className={edificacao?.codigo ? `w-6 mx-2 fill-primary-600` : `w-6 mx-2 fill-neutral-500`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512">
                            <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
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

                <div className="w-full">
                    <input id="criar" type="submit" className={"w-full rounded-lg border border-neutral-400 px-6 py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-200 disabled:text-neutral-500 text-white font-semibold"} value={`${submiting ? "Criando..." : "Criar"}`} disabled={submiting} />
                </div>
            </form>
        </>
    );
}
