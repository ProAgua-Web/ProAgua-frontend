'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LabeledInput } from '@/components/widgets/labeled-input';
import Spinner from '@/components/widgets/spinner';

async function getCSRFToken() {
  const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v1/csrf', {
    method: 'GET',
    credentials: 'include',
  });

  const data = await resp.json();

  return data['csrftoken'];
}

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setIsSubmitting(true);

    try {
      const csrftoken = await getCSRFToken();
      const data = {
        username: formData.get('email'),
        password: formData.get('password'),
      };

      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/api/v1/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
          },
          credentials: 'include',
          body: JSON.stringify(data),
        },
      );

      const responseData = await response.json();

      setIsSubmitting(false);
      if (response.status != 200 || responseData == null) {
        alert(`Erro ao fazer login!`);
      } else {
        alert('Login efetuado com sucesso!');

        let token = responseData.access_token;
        localStorage.setItem('token', token);

        window.location.href = '/admin/pontos';
      }
    } catch (err) {
      alert('Houve um erro durante a autenticação');
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={submitForm}
      className="flex h-full w-full flex-col items-center justify-between gap-10"
    >
      <h1 className="text-center text-4xl font-medium">Login</h1>

      <div className="flex w-full flex-col justify-center gap-10">
        <LabeledInput
          name="email"
          type="text"
          label="Email"
          required={true}
          className="w-full"
        />

        <LabeledInput
          name="password"
          type="password"
          label="Senha"
          required={true}
          className="w-full"
        />

        <Button asChild variant="link" className="flex self-end text-[#1098F7]">
          <a href="">Esqueceu a senha?</a>
        </Button>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        variant="primary"
        className="flex min-h-16 w-full justify-center"
      >
        {isSubmitting ? (
          <>
            {' '}
            <Spinner /> Entrando...{' '}
          </>
        ) : (
          'Entrar'
        )}
      </Button>
    </form>
  );
}
