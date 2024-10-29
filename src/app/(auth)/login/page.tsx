'use client';

import { ControlledInput } from '@/components/controlled-input';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/widgets/spinner';
import { entrar } from '@/services/api/autenticacao-service';
import { zodResolver } from '@hookform/resolvers/zod';
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

  async function submitForm(data: FormSchema) {
    setIsSubmitting(true);
    await entrar(data);
    setIsSubmitting(false);
  }

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const noErrors = Object.keys(formState.errors).length === 0;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        handleSubmit((data) => {
          submitForm(data);
        })(e);
      }}
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

      <Button
        type="submit"
        disabled={isSubmitting || !noErrors}
        variant="primary"
        className="flex min-h-16 w-full justify-center"
      >
        {isSubmitting ? (
          <>
            <Spinner /> Entrando...
          </>
        ) : (
          'Entrar'
        )}
      </Button>
    </form>
  );
}
