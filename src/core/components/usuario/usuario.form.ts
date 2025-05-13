'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateUsuarioSchemaToDto } from './usuario.mapper';
import { type UsuarioDto } from './usuario.model';

export const usuarioSchemaBase = z.object({
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
  is_superuser: z.boolean().default(false),
});

export const criarUsuarioSchema = usuarioSchemaBase.extend({
  password: z
    .string({ message: 'Informe a senha do usuário' })
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export const editarUsuarioSchema = usuarioSchemaBase;

export type CriarUsuarioSchema = z.infer<typeof criarUsuarioSchema>;
export type EditarUsuarioSchema = z.infer<typeof editarUsuarioSchema>;

export const useUsuarioForm = (dto?: UsuarioDto) => {
  const form = useForm<CriarUsuarioSchema | EditarUsuarioSchema>({
    resolver: zodResolver(dto ? editarUsuarioSchema : criarUsuarioSchema),
    defaultValues: dto ? updateUsuarioSchemaToDto(dto) : undefined,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (dto) {
      form.reset(updateUsuarioSchemaToDto(dto));
    }
  }, [dto, form]);

  return form;
};
