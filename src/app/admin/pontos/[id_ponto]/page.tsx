"use client";

import { useEffect, useState } from "react";

import QRCode from "@/utils/qr_code";
import { Edificacao } from "@/utils/api_consumer";

export default function VisualizarPonto({ params }: {
    params: {
        id_ponto: string
    }
}) {
    const [edificacoes, setEdificacoes] = useState<Edificacao[]>([]);
    const [editable, setEditable] = useState<boolean>(false);
    
    const [ambiente, setAmbiente] = useState<string>("");
    const [tombo, setTombo] = useState<string>("");
    const [edificacao, setEdificacao] = useState<string>("");
    const [tipo, setTipo] = useState<number>(-1);

    const submitForm = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            edificacao: { value: string };
            ambiente: { value: string };
            tombo: { value: string };
            tipo: { value: string };
        };

        const data = {
            codigo_edificacao: target.edificacao.value,
            ambiente: target.ambiente.value,
            tombo: target.tombo.value,
            tipo: parseInt(target.tipo.value),
        };

        fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/pontos/" + params.id_ponto, {
            method: "PUT",
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
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/pontos/' + params.id_ponto);
            const ponto = await response.json();
            
            setAmbiente(ponto.ambiente);
            setTombo(ponto.tombo);
            setEdificacao(ponto.edificacao.codigo);
            setTipo(ponto.tipo);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/edificacoes");
            setEdificacoes((await response.json()).items);
        })();
    }, []);

    return (
        <>
            <h2 className="mb-4 text-3xl font-bold text-neutral-600">
                Visualizar Ponto
            </h2>

            <form
                method="none"
                className="flex flex-col rounded-xl border border-neutral-200 p-8 shadow-lg"
                onSubmit={submitForm}
            >
                <label htmlFor="id">Id:</label>
                <input
                    type="text"
                    id="id"
                    name="id"
                    className="rounded-md border border-neutral-200 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                    value={params.id_ponto}
                    disabled
                />

                <label htmlFor="ambiente" className="mt-4">
                    Ambiente:
                </label>
                <input
                    type="text"
                    id="ambiente"
                    name="ambiente"
                    className="rounded-md border border-neutral-200 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                    value={ambiente}
                    onChange={(e) => setAmbiente(e.target.value)}
                    disabled={!editable}
                />

                <label htmlFor="tombo" className="mt-4">
                    tombo:
                </label>
                <input
                    type="text"
                    id="tombo"
                    name="tombo"
                    className="rounded-md border border-neutral-200 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                    value={tombo}
                    onChange={(e) => setTombo(e.target.value)}
                    disabled={!editable}
                />

                <label htmlFor="" className="mt-4">Edificação:</label>
                <select 
                    id="edificacao"
                    name="edificacao"
                    className="bg-white rounded-md border border-neutral-200 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                    value={edificacao}
                    disabled={!editable}
                    onChange={(e) => setEdificacao(e.target.value)}
                >
                    {edificacoes.map((edificacao: Edificacao) => {
                        return <option value={edificacao.codigo} >{edificacao.codigo} - {edificacao.nome}</option>
                    })}
                </select >

                <label htmlFor="tipo" className="mt-4">
                    Tipo:
                </label>
                <select
                    id="tipo"
                    name="tipo"
                    className="rounded-md border border-neutral-200 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500"
                    value={tipo}
                    onChange={(e) => setTipo(parseInt(e.target.value))}
                    disabled={!editable}
                >
                    <option value="1">Bebedouro</option>
                    <option value="2">Reservatório predial superior</option>
                    <option value="3">Reservatório predial inferior</option>
                    <option value="4">Reservatório de distribuição superior</option>
                    <option value="5">Reservatório de distribuição inferior</option>
                    <option value="6">CAERN</option>
                </select>

                <label className="mt-4">QR code:</label>
                <QRCode data={ process.env.NEXT_PUBLIC_BASE_URL + "/pontos/" + params.id_ponto} width={150}/>                 

                <input
                    id="editar"
                    type="submit"
                    className="mt-4 rounded-md border bg-green-500 px-4 py-2 text-center font-semibold text-white hover:bg-green-600"
                    value={ editable ? "Salvar" : "Alterar" }
                    onClick={(e) => {
                        if (!editable) {
                            setEditable(true);
                            e.preventDefault();
                        }
                    }}
                />
                
            </form>
        </>
    );
}