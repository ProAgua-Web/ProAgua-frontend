import { telefoneSchema } from '@/core/common/telefone';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUnidades } from '../unidade/unidade.service';
import { usuarioToSchema } from './usuario.mapper';
import { type Usuario } from './usuario.model';
import { NivelUsuario } from './usuario.utils';

export const usuarioSchema = z.object({
  nome: z
    .string({ message: 'Informe o nome do usuário' })
    .min(1, 'Informe o nome do usuário'),
  nivel: z.nativeEnum(NivelUsuario, {
    message: 'Informe o nível de acesso do usuário',
  }),
  unidades: z
    .array(z.number({ message: 'Unidade inválida' }), {
      message: 'Informe ao menos uma unidade',
    })
    .min(1, 'Informe ao menos uma unidade'),
  email: z
    .string({ message: 'Informe o e-mail do usuário' })
    .email('E-mail inválido'),
  whatsapp: telefoneSchema,
});

export type UsuarioSchema = z.infer<typeof usuarioSchema>;

export const useCriarUsuarioForm = () => {
  const unidades = useUnidades();

  const form = useForm<UsuarioSchema>({
    resolver: zodResolver(usuarioSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (unidades.data) {
      form.setValue(
        'unidades',
        unidades.data.map((unidade) => unidade.id),
      );
    }
  }, [unidades, form]);

  return form;
};

export const useEditarUsuarioForm = (usuario?: Usuario) => {
  const unidades = useUnidades();

  const form = useForm<UsuarioSchema>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: usuario ? usuarioToSchema(usuario) : undefined,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (unidades.data) {
      form.setValue(
        'unidades',
        unidades.data.map((unidade) => unidade.id),
      );
    }
  }, [unidades, form]);

  useEffect(() => {
    if (usuario) {
      form.setValue('nome', usuario.nome);
      form.setValue('nivel', usuario.nivel);
      form.setValue(
        'unidades',
        usuario.unidades.map((unidade) => unidade.id),
      );
      form.setValue('email', usuario.email);
      form.setValue('whatsapp', usuario.whatsapp);
    }
  }, [usuario, form]);

  return form;
};
