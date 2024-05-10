"use client"

import { FormEvent, useEffect, useState } from "react";

export default function Page() {

    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data = {
            username: formData.get("username"),
            first_name: formData.get("first_name"),
            last_name: formData.get("last_name"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        if (formData.get("password") !== formData.get("password_confirmation")) {
            alert("As senhas não coincidem");
            return
        }

        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/usuarios/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.status === 200) {
            alert("Usuário criado com sucesso!");
            const responseData = await response.json();
            const id = responseData.id;
            window.location.href = `/admin/configuracoes/`;
        } else {
            alert("Erro ao criar usuário");
        }
    }

    return (
        <>
            <h1 className="text-4xl text-neutral-700 font-bold mb-8">Criar Usuário</h1>
            <form className="w-full flex flex-col gap-4" onSubmit={(e) => submitForm(e)} method="POST">

                <label htmlFor="username">Apelido:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                    required
                />

                <label htmlFor="first_name">Nome:</label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                    required
                />

                <label htmlFor="last_name">Sobrenome:</label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                    required
                />

                <label htmlFor="password">Senha:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                    required
                />

                <label htmlFor="password_confirmation">Confirme a senha:</label>
                <input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    className="rounded-lg border border-neutral-400 px-6 py-4"
                    required
                />

                <div className="rounded-lg border border-neutral-400 px-6 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold text-center">
                    <input id="criar" type="submit" value="Criar" />
                </div>
            </form>
        </>
    );
}