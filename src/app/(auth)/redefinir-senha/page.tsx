'use client';

import { TextInput } from '@/components/form/input/text-input';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';
import { type FormEvent, useState } from 'react';

export default function ResetPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // const formData = new FormData(event.currentTarget);

    setIsSubmitting(true);
    alert('Redefinir senha não implementado ainda!');
    setIsSubmitting(false);
  }

  return (
    <form
      onSubmit={submitForm}
      className="flex h-full w-full flex-col items-center justify-between gap-6"
    >
      <h1 className="text-center text-4xl font-medium">Recuperar acesso</h1>

      <div className="flex w-full flex-grow flex-col justify-center gap-12">
        <TextInput
          label="E-mail"
          name="email"
          type="email"
          required={true}
          className="w-full"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="primary"
          className="flex min-h-16 w-full justify-center"
        >
          {isSubmitting ? (
            <>
              {' '}
              <Spinner /> Enviando...{' '}
            </>
          ) : (
            'Enviar código de recuperação'
          )}
        </Button>
      </div>
    </form>
  );
}
