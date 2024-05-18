"use client"

import { useUsuario } from "@/utils/api_consumer/client_side_consumer"
import { FormEvent, useState } from "react";

export default function Page({ params }: { params: { username: string } }) {
    const usuario = useUsuario(params.username);
    const [editable, setEditable] = useState<Boolean>(false);

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/usuarios/${params.username}`, {
            method: 'PUT',
            body: JSON.stringify({
                username: formData.get('username'),
                first_name: formData.get('first_name'),
                last_name: formData.get('last_name'),
                email: formData.get('email'),
            })
        });

        if (response.status === 200) {
            alert("Usuário editado com sucesso!");
            window.location.href = "/admin/configuracoes";
        } else {
            alert("Erro ao editar usuário");
        }
    }

    return (
        <>
            <h2 className="text-4xl text-neutral-700 font-bold mb-8">
                {editable ? "Editar" : "Visualizar"} Usuário
            </h2>

            <form onSubmit={(e) => submitForm(e)} onReset={() => setEditable(false)} method="POST"
            className="w-full flex flex-col gap-4" 
            >
                <label htmlFor="id">Id:</label>
                <input
                    type="text"
                    id="id"
                    name="id"
                    className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                    defaultValue={usuario?.id}
                    disabled={!editable}
                />

                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                    defaultValue={usuario?.username}
                    disabled={!editable}
                />

                <label htmlFor="nome">Nome:</label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                    defaultValue={usuario?.first_name}
                    disabled={!editable}
                />

                <label htmlFor="sobrenome">Sobrenome:</label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                    defaultValue={usuario?.last_name}
                    disabled={!editable}
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    className="rounded-md border border-neutral-200 px-6 py-4 disabled:bg-neutral-200 disabled:text-neutral-500"
                    defaultValue={usuario?.email}
                    disabled={!editable}
                />

                <input
                    id="editar"
                    type="submit"
                    className={`rounded-lg border ${editable ? 'bg-green-500 hover:bg-green-600' : 'bg-primary-500 hover:bg-primary-600'} px-6 py-4 text-center font-semibold text-white`}
                    onClick={event => {
                        if (!editable) {
                            event.preventDefault();
                            setEditable(true);
                        }
                    }}
                    value={editable ? "Salvar" : "Habilitar edição"}
                />

                <button
                    type="button"
                    className={`rounded-lg border bg-red-500 px-6 py-4 text-center font-semibold text-white hover:bg-red-600 disabled:bg-gray-400 disabled:text-gray-300 ${editable ? '' : 'hidden'}`}
                    disabled={!editable}
                >
                    Excluir
                </button>

                {editable && (
                    <>
                        <input
                            type="reset"
                            className={`rounded-lg border bg-gray-500 px-6 py-4 text-center font-semibold text-white hover:bg-gray-600`}
                            value="Cancelar"
                        >
                        </input>
                    </>
                )}

            </form>
        </>
    )
}
