"use client";

import { Usuario } from "@/utils/types";
import { FormEvent } from "react";

export default function ColetaForm(props: {users: Usuario[], api_url: string | undefined, sequencia_id: number }) {
    const { users, api_url } = props;

    const submitForm = (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log("HI")
        const target = e.target as typeof e.target & {
            // sequencia_id: { value: number }
            ponto: { value: string};
            temperatura: { value: string };
            cloro_residual_livre: { value: string };
            turbidez: { value: string };
            coliformes_totais: { value: string };
            escherichia: { value: string };
            cor: { value: string };
            data: { value: string };
            // data: { value: Date };
            responsaveis: { value: string };
            ordem: { value: string };
        };

        const data = {
            sequencia_id: props.sequencia_id,
            ponto_id: parseInt(target.ponto.value),
            temperatura: parseInt(target.temperatura.value),
            cloro_residual_livre: parseInt(target.cloro_residual_livre.value),
            turbidez: parseInt(target.turbidez.value),
            coliformes_totais: target.coliformes_totais.value == "on",
            escherichia: target.escherichia.value == "on",
            cor: parseInt(target.cor.value),
            responsavel: [parseInt(target.responsaveis.value)],
            data: new Date(target.data.value),
            ordem: target.ordem.value,
        };

        fetch(api_url + "/api/v1/coletas/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao criar coleta");
                }
            })
            .then(() => {
                // window.location.href = "/pontos";
                alert("Success!");
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <form className="w-full flex flex-col gap-4" onSubmit={submitForm} method="post" action="/api/v1/coletas/">
            <label htmlFor="ponto">Ponto de Coleta:</label>                        
            <input 
                list="ponto"
                id="ponto_value"
                name="ponto"
                className="rounded-lg border border-neutral-400 px-6 py-4"
                required
            />

            <datalist id="ponto">
                {/* <!-- Os pontos serão adicionados aqui --> */}
            </datalist>

            <label htmlFor="temperatura">Temperatura:</label>
            <input
                type="number"
                id="temperatura"
                name="temperatura"
                className="rounded-lg border border-neutral-400 px-6 py-4"
                required
            />

            <label htmlFor="cloro_residual_livre">Cloro Residual Livre:</label>
            <input
                type="number"
                id="cloro_residual_livre"
                name="cloro_residual_livre"
                className="rounded-lg border border-neutral-400 px-6 py-4"
                required
            />

            <label htmlFor="turbidez">Turbidez:</label>
            <input
                type="number"
                id="turbidez"
                name="turbidez"
                className="rounded-lg border border-neutral-400 px-6 py-4"
                required
            />

            <div className="flex gap-2">
                <input
                    type="checkbox"
                    id="coliformes_totais"
                    name="coliformes_totais"
                    className="w-6 h-6 rounded-lg border border-neutral-400 px-6 py-4"
                    required
                />
                <label htmlFor="coliformes">Coliformes Totais</label>
            </div>
            

            <div className="flex gap-2">
                <input
                    type="checkbox"
                    id="escherichia"
                    name="escherichia"
                    className="w-6 h-6 rounded-lg border border-neutral-400 px-6 py-4"
                    required
                />
                <label htmlFor="escherichia">Escherichia</label>
            </div>
            

            <label htmlFor="cor">Cor:</label>
            <input
                type="number"
                id="cor"
                name="cor"
                className="rounded-lg border border-neutral-400 px-6 py-4"
                required
            />

            <div className="flex gap-4">
                <label htmlFor="data">Data e hora:</label>
                <input
                    type="date"
                    id="data"
                    name="data"
                    className="rounded-lg border border-neutral-400 px-6 py-4 flex-grow"
                    required
                />

                <input
                    type="time"
                    id="hora"
                    name="hora"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                    required
                />
            </div>

            <label htmlFor="responsaveis">Responsáveis:</label>
            <select 
                name="responsaveis"
                id="responsaveis"
                className="rounded-lg border border-neutral-400 px-6 py-4"
                multiple
            >
                {users.map(user => {
                    return <option value={user.id}>{user.username}</option>
                })}
            </select>

            <label htmlFor="ordem">Ordem:</label>
            <select
                name="ordem"
                id="ordem"
                className="rounded-lg border border-neutral-400 px-6 py-4"
            >
                <option value="Coleta">Coleta</option>
                <option value="Recoleta">Recoleta</option>
            </select>

            <div className="rounded-lg border border-neutral-400 px-6 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold text-center">
                <input id="criar" type="submit" value="Criar" />
            </div>
        </form>
    )
}