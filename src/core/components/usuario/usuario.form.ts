import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { usuarioDtoToSchema } from './usuario.mapper';
import { type UsuarioDto } from './usuario.model';

export const usuarioSchema = z.object({
  first_name: z
    .string({ message: 'Informe o nome do usuário' })
    .min(1, 'Informe o nome do usuário'),
  last_name: z
    .string({ message: 'Informe o sobrenome do usuário' })
    .min(1, 'Informe o sobrenome do usuário'),
  username: z
    .string({ message: 'Informe o nome de usuário' })
    .min(1, 'Informe o nome de usuário'),
  email: z
    .string({ message: 'Informe o e-mail do usuário' })
    .email('E-mail inválido'),
  password: z
    .string({ message: 'Informe a senha do usuário' })
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export type UsuarioSchema = z.infer<typeof usuarioSchema>;

export const useCriarUsuarioForm = (dto: UsuarioDto) => {
  const form = useForm<UsuarioSchema>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: dto ? usuarioDtoToSchema(dto) : undefined,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (dto) {
      form.reset(usuarioDtoToSchema(dto));
    }
  }, [dto, form]);

  return form;
};
