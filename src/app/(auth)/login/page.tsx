'use client';

import { ControlledInput } from '@/components/controlled-input';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';
import { useAutenticacao } from '@/lib/autenticacao';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
import { z } from 'zod';

const formSchema = z.object({
  username: z
    .string({ message: 'Informe o usuário' })
    .min(4, 'Usuário deve ter no mínimo 4 caracteres'),
  password: z
    .string({ message: 'Informe a senha' })
    .min(4, 'Senha deve ter no mínimo 4 caracteres'),
});
type FormSchema = z.infer<typeof formSchema>;

export default function Login() {
  const { control, formState, handleSubmit } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const [showPassword, setShowPassword] = useState(false);

  const { entrar, autenticando } = useAutenticacao();

  const router = useRouter();

  function submitForm(data: FormSchema) {
    entrar.mutate(data, {
      onSuccess: () => {
        router.push('/admin/pontos/');
      },
    });
  }
  const noErrors = Object.keys(formState.errors).length === 0;
  const disabled = !noErrors || entrar.isPending;

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex h-full w-full flex-col items-center justify-between gap-10"
    >
      <h1 className="text-center text-4xl font-medium">Login</h1>

      <div className="flex w-full flex-col justify-center gap-10">
        <ControlledInput
          control={control}
          name="username"
          label="E-mail"
          type="text"
        />

        <ControlledInput
          control={control}
          name="password"
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          icon={
            <Button
              variant="ghost"
              className="absolute right-0 top-0 hover:bg-transparent"
              size="icon"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? (
                <HiOutlineEyeSlash
                  className="text-slate-500 hover:scale-105"
                  size={20}
                />
              ) : (
                <HiOutlineEye
                  className="text-slate-500 hover:scale-105"
                  size={20}
                />
              )}
            </Button>
          }
        />

        <Button
          asChild
          variant="link"
          className="flex self-end text-primary-300"
        >
          <a href="#">Esqueceu a senha?</a>
        </Button>
      </div>

      <Button type="submit" size="lg" className="text-md" disabled={disabled}>
        {autenticando && <Spinner />} Entrar
      </Button>
    </form>
  );
}
