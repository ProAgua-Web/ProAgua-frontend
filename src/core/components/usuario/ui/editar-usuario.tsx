'use client';

import { FormContainer, FormSection } from '@/components/form/container';
import { ControlledMaskedInput } from '@/components/form/input/masked-input';
import { ControlledMultiSelect } from '@/components/form/input/multi-select';
import { ControlledSelect } from '@/components/form/input/select';
import { ControlledTextInput } from '@/components/form/input/text-input';
import { telefoneMask } from '@/lib/input-mask';
import { useRouter } from 'next/navigation';
import { useUnidadesOptions } from '../../unidade/unidade.utils';
import { type UsuarioSchema, useEditarUsuarioForm } from '../usuario.form';
import { useEditarUsuario, useUsuario } from '../usuario.service';
import { nivelUsuarioOptions } from '../usuario.utils';

interface Props {
  id: number;
}

export const EditarUsuario: React.FC<Props> = ({ id }) => {
  const usuario = useUsuario(id, { gcTime: Infinity });

  const form = useEditarUsuarioForm(usuario.data);

  const router = useRouter();

  const editarUsuario = useEditarUsuario({
    onSuccess() {
      router.push('/usuarios');
    },
    onFieldError: form.setError,
  });

  const unidadesOptions = useUnidadesOptions();

  const handleSubmit = form.handleSubmit((usuario: UsuarioSchema) => {
    editarUsuario.mutate({ id, usuario });
  });

  return (
    <FormContainer
      title="Editar usuário"
      subtitle="Altere os campos abaixo para editar um usuário do sistema"
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      isLoading={usuario.isLoading}
      isSubmitting={usuario.isPending}
    >
      <FormSection title="Informações gerais">
        <ControlledTextInput
          control={form.control}
          name="nome"
          label="Nome completo"
          placeholder="Informe o nome completo"
        />
        <ControlledSelect
          control={form.control}
          name="nivel"
          label="Nível de acesso"
          options={nivelUsuarioOptions}
        />
        <ControlledMultiSelect
          control={form.control}
          name="unidades"
          {...unidadesOptions}
          label="Unidades"
          placeholder="Selecione uma ou mais unidades"
        />
      </FormSection>
      <FormSection title="Contato">
        <ControlledTextInput
          control={form.control}
          name="email"
          label="E-mail"
          placeholder="Informe o e-mail"
        />
        <ControlledMaskedInput
          control={form.control}
          name="whatsapp"
          mask={telefoneMask}
          label="Telefone"
          placeholder="Informe o Telefone"
        />
      </FormSection>
    </FormContainer>
  );
};
