'use client';

import { consumerUsuario } from '@/utils/api/consumerUsuario';
import { UsuarioIn } from '@/utils/types';
import { FormEvent, useState } from 'react';

export default function Page() {
  const [submiting, setSubmiting] = useState<boolean>(false);

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmiting(true);

    const formData = new FormData(event.currentTarget);

    const data: UsuarioIn = {
      username: String(formData.get('username')),
      first_name: String(formData.get('first_name')),
      last_name: String(formData.get('last_name')),
      email: String(formData.get('email')),
      password: String(formData.get('password')),
    };

    if (formData.get('password') !== formData.get('password_confirmation')) {
      alert('As senhas não coincidem');
      return;
    }

    const response = await consumerUsuario.post(data);

    if (response.status === 200) {
      alert('Usuário criado com sucesso!');
      const responseData = await response.json();
      const id = responseData.id;
      window.location.href = `/admin/configuracoes`;
    } else {
      alert('Erro ao criar usuário');
    }

    setSubmiting(false);
  }

  return (
    <>
      <h1 className="mb-8 text-4xl font-bold text-neutral-700">
        Criar Usuário
      </h1>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={(e) => submitForm(e)}
        method="POST"
      >
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

        <div className="w-full">
          <input
            id="criar"
            type="submit"
            className={
              'w-full rounded-lg border border-neutral-400 bg-primary-500 px-6 py-4 font-semibold text-white hover:bg-primary-600 disabled:bg-neutral-200 disabled:text-neutral-500'
            }
            value={`${submiting ? 'Criando...' : 'Criar'}`}
            disabled={submiting}
          />
        </div>
      </form>
    </>
  );
}
