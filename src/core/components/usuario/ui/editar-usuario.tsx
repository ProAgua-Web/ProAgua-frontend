'use client';

import { FormContainer, FormSection } from '@/components/form/container';
import { ControlledCheckbox } from '@/components/form/input/checkbox';
import { ControlledTextInput } from '@/components/form/input/text-input';
import { useRouter } from 'next/navigation';
import { type EditarUsuarioSchema, useUsuarioForm } from '../usuario.form';
import { useEditarUsuario, useUsuario } from '../usuario.service';

interface Props {
  username: string;
}

export const EditarUsuario: React.FC<Props> = ({ username }) => {
  const usuario = useUsuario(username, { gcTime: Infinity });

  const form = useUsuarioForm(usuario.data);

  const router = useRouter();

  const editarUsuario = useEditarUsuario({
    onSuccess() {
      router.push('/admin/usuarios');
    },
    onFieldError(field, error) {
      form.setError(field, error);
    },
  });

  const handleSubmit = form.handleSubmit((usuario: EditarUsuarioSchema) => {
    editarUsuario.mutate({ username, usuario });
  });

  return (
    <FormContainer
      title="Editar usuário"
      subtitle="Preencha os campos abaixo para editar o usuário"
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      isSubmitting={editarUsuario.isPending}
      isLoading={usuario.isLoading}
    >
      <FormSection>
        <ControlledTextInput
          control={form.control}
          name="first_name"
          label="Primeiro nome"
          placeholder="Digite o primeiro nome"
        />
        <ControlledTextInput
          control={form.control}
          name="last_name"
          label="Sobrenome"
          placeholder="Digite o sobrenome"
        />
        <ControlledTextInput
          control={form.control}
          name="username"
          label="Nome de usuário"
          placeholder="Digite o nome de usuário"
        />
        <ControlledTextInput
          control={form.control}
          name="email"
          label="Email"
          placeholder="Digite o email"
        />
      </FormSection>
      <FormSection>
        <ControlledCheckbox
          control={form.control}
          name="is_superuser"
          label="Administrador"
        />
      </FormSection>
    </FormContainer>
  );
};
