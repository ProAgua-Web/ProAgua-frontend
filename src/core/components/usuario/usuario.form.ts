'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { usuarioDtoToSchema } from './usuario.mapper';
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

export const usuarioSchema = z.union([criarUsuarioSchema, editarUsuarioSchema]);

export type CriarUsuarioSchema = z.infer<typeof criarUsuarioSchema>;
export type EditarUsuarioSchema = z.infer<typeof editarUsuarioSchema>;
export type UsuarioSchema = z.infer<typeof usuarioSchema>;

export const useUsuarioForm = (dto?: UsuarioDto) => {
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
