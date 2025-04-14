'use client';

import { useRouter } from 'next/navigation';
import { useUsuarioForm } from '../usuario.form';
import { useCriarUsuario } from '../usuario.service';
import { UsuarioForm } from './usuario-form';

export const CriarUsuario: React.FC = () => {
  const form = useUsuarioForm();

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
    criarUsuario.mutate(form);
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
