'use client';

import { useRouter } from 'next/navigation';
import { type UseFormReturn } from 'react-hook-form';
import { type CriarUsuarioSchema, useUsuarioForm } from '../usuario.form';
import { usuarioSchemaToDto } from '../usuario.mapper';
import { useCriarUsuario } from '../usuario.service';
import { UsuarioForm } from './usuario-form';

export const CriarUsuario: React.FC = () => {
  const form = useUsuarioForm() as UseFormReturn<CriarUsuarioSchema>;

  const router = useRouter();

  const criarUsuario = useCriarUsuario({
    onSuccess() {
      router.push('/admin/usuarios');
    },
    onFieldError(field, error) {
      form.setError(field, error);
    },
  });

  const handleSubmit = form.handleSubmit((form) => {
    criarUsuario.mutate(usuarioSchemaToDto(form) as CriarUsuarioSchema);
  });

  return (
    <UsuarioForm
      title="Criar novo usuário"
      subtitle="Preencha os campos abaixo para criar um novo usuário no sistema"
      form={form}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      isSubmitting={criarUsuario.isPending}
      isLoading={false}
    />
  );
};
