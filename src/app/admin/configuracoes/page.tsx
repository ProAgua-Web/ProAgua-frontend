"use client";

import { ParametroReferencia, Usuario } from "@/utils/types";
import { useState } from "react";
import { useParametrosReferencia, useUsuarios } from "@/utils/api_consumer/client_side_consumer";

export default function Configuracoes() {
    const usuarios: Usuario[] = useUsuarios();
    const parametroReferencia = useParametrosReferencia();

    const [editable, setEditable] = useState(false);
    const [submiting, setSubmiting] = useState(false);

    function setDefaultValues() {
        if (parametroReferencia) {
            const minTemperaturaInput = document.getElementsByName("min_temperatura")[0] as HTMLInputElement;
            const maxTemperaturaInput = document.getElementsByName("max_temperatura")[0] as HTMLInputElement;
            const minCloroInput = document.getElementsByName("min_cloro_residual_livre")[0] as HTMLInputElement;
            const maxCloroInput = document.getElementsByName("max_cloro_residual_livre")[0] as HTMLInputElement;
            const minTurbidezInput = document.getElementsByName("min_turbidez")[0] as HTMLInputElement;
            const maxTurbidezInput = document.getElementsByName("max_turbidez")[0] as HTMLInputElement;

            minTemperaturaInput.value = parametroReferencia.min_temperatura.toString();
            maxTemperaturaInput.value = parametroReferencia.max_temperatura.toString();
            minCloroInput.value = parametroReferencia.min_cloro_residual_livre.toString();
            maxCloroInput.value = parametroReferencia.max_cloro_residual_livre.toString();
            minTurbidezInput.value = parametroReferencia.min_turbidez.toString();
            maxTurbidezInput.value = parametroReferencia.max_turbidez.toString();
        }
    }

    async function submitForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setSubmiting(true);

        const formData = new FormData(event.currentTarget);

        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/parametros_referencia/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                min_temperatura: Number(formData.get("min_temperatura")),
                max_temperatura: Number(formData.get("max_temperatura")),
                min_cloro_residual_livre: Number(formData.get("min_cloro_residual_livre")),
                max_cloro_residual_livre: Number(formData.get("max_cloro_residual_livre")),
                min_turbidez: Number(formData.get("min_turbidez")),
                max_turbidez: Number(formData.get("max_turbidez")),
                // min_cor: formData.get("min_cor"),
                // max_cor: formData.get("max_cor"),
                coliformes_totais: false,
                escherichia: false,
            }),
        });

        if (response.status === 200) {
            alert("Parâmetros de referência atualizados com sucesso");
        } else {
            alert("Erro ao atualizar parâmetros de referência");
        }

        setSubmiting(false);
        setEditable(false);

    }


    return (
        <>
            <h1 className="text-3xl font-semibold mb-2">Configurações</h1>

            <h2 className="text-2xl font-semibold mt-8 text-neutral-700">Usuários</h2>
            <div className="w-full bg-white shadow-lg rounded border border-neutral-300 p-4">
                <ul>
                    {usuarios.map(usuario => (
                        <li key={usuario.username} className="flex justify-between items-center p-4 pr-0 border-b border-neutral-300">
                            {usuario.username}
                            <a href={`/admin/configuracoes/usuarios/${usuario.username}`} className="px-4 py-2 border border-blue-500 rounded text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-600">Editar</a>
                        </li>
                    ))}
                </ul>

                <div className="w-full flex pt-4 justify-center">
                    <a href="/admin/configuracoes/usuarios/criar" className=" w-fit px-4 py-2 bg-green-500 border border-green-600 rounded text-white font-semibold">+ Adicionar usuário</a>
                </div>

            </div>

            {parametroReferencia && (<>

                <h2 className="text-2xl font-semibold mt-8 text-neutral-700">Parâmetros de referência</h2>
                <p className="text-neutral-500"> Estes valores são serão usados para análise das coletas</p>



                <form onSubmit={(e) => submitForm(e)} method="PUT"
                    className="w-full bg-white shadow-lg rounded border border-neutral-300 p-4">

                    <div className="w-full flex items-center p-4 border-b border-neutral-300">
                        <label className="flex-grow">Temperatura</label>
                        <input name="min_temperatura" defaultValue={parametroReferencia.min_temperatura} disabled={!editable}
                            className="w-48 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500 border border-r-0 border-neutral-300 rounded-lg rounded-r-none" type="number" step="0.1" placeholder="valor mínimo" />
                        <input name="max_temperatura" defaultValue={parametroReferencia.max_temperatura} disabled={!editable}
                            className="w-48 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500 border border-neutral-300 rounded-lg rounded-l-none" type="number" step="0.1" placeholder="valor máximo" />
                    </div>

                    <div className="w-full flex items-center p-4 border-b border-neutral-300">
                        <label className="flex-grow">Cloro residual livre</label>
                        <input name="min_cloro_residual_livre" defaultValue={parametroReferencia.min_cloro_residual_livre} disabled={!editable}
                            className="w-48 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500 border border-r-0 border-neutral-300 rounded-lg rounded-r-none" type="number" step="0.1" placeholder="valor mínimo" />
                        <input name="max_cloro_residual_livre" defaultValue={parametroReferencia.max_cloro_residual_livre} disabled={!editable}
                            className="w-48 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500 border border-neutral-300 rounded-lg rounded-l-none" type="number" step="0.1" placeholder="valor máximo" />
                    </div>

                    <div
                        className="w-full flex items-center p-4 border-b border-neutral-300">
                        <label className="flex-grow">Turbidez</label>
                        <input name="min_turbidez" defaultValue={parametroReferencia.min_turbidez} disabled={!editable}
                            className="w-48 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500 border border-r-0 border-neutral-300 rounded-lg rounded-r-none" type="number" step="0.1" placeholder="valor mínimo" />
                        <input name="max_turbidez" defaultValue={parametroReferencia.max_turbidez} disabled={!editable}
                            className="w-48 px-4 py-2 disabled:bg-neutral-200 disabled:text-neutral-500 border border-neutral-300 rounded-lg rounded-l-none" type="number" step="0.1" placeholder="valor máximo" />
                    </div>

                    {/* <div className="w-full flex items-center p-4 border-b border-neutral-300">
                    <label className="flex-grow">Cor</label>
                    <input className="w-48 px-4 py-2 border border-r-0 border-neutral-300 rounded-lg rounded-r-none" type="number" step="0.1" placeholder="valor mínimo" />
                    <input className="w-48 px-4 py-2 border border-neutral-300 rounded-lg rounded-l-none" type="number" step="0.1" placeholder="valor máximo" />
                </div> */}

                    <div className="w-full flex justify-center pt-4 gap-8">
                        <input
                            id="editar"
                            type="submit"
                            className={`w-44 rounded-lg border ${editable ? 'bg-green-500 hover:bg-green-600' : 'bg-rose-500 hover:bg-rose-600'}  disabled:bg-green-900 px-6 py-4 text-center font-semibold text-white`}
                            onClick={event => {
                                if (!editable) {
                                    event.preventDefault();
                                    setEditable(true);
                                }
                            }}
                            value={editable ? submiting? "Editando..." : "Salvar" : "Habilitar edição"}
                            disabled={submiting}
                        />

                        {editable && (
                            <>
                                <button
                                    type="button"
                                    className={`w-44 rounded-lg border bg-gray-500 px-6 py-4 text-center font-semibold text-white hover:bg-gray-600`}
                                    onClick={() => {
                                        setEditable(false)
                                        setDefaultValues()
                                    }}
                                >
                                    Cancelar
                                </button>
                            </>
                        )}

                    </div>
                </form>
            </>
            )}

        </>
    );
}
