'use client';

import { FormContainer, FormSection } from '@/components/form/container';
import { ControlledMaskedInput } from '@/components/form/input/masked-input';
import { ControlledMultiSelect } from '@/components/form/input/multi-select';
import { ControlledSelect } from '@/components/form/input/select';
import { ControlledTextInput } from '@/components/form/input/text-input';
import { telefoneMask } from '@/lib/input-mask';
import { useRouter } from 'next/navigation';
import { useUnidadesOptions } from '../../unidade/unidade.utils';
import { useCriarUsuarioForm } from '../usuario.form';
import { useCriarUsuario } from '../usuario.service';
import { nivelUsuarioOptions } from '../usuario.utils';

export const CriarUsuario: React.FC = () => {
  const form = useCriarUsuarioForm();

  const router = useRouter();

  const criarUsuario = useCriarUsuario({
    onSuccess() {
      router.push('/usuarios');
    },
    onFieldError(field, error) {
      form.setError(field, error);
    },
  });

  const unidadesOptions = useUnidadesOptions();

  const handleSubmit = form.handleSubmit((form) => {
    criarUsuario.mutate(form);
  });

  return (
    <FormContainer
      title="Criar novo usuário"
      subtitle="Preencha os campos abaixo para criar um novo usuário no sistema"
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      isSubmitting={criarUsuario.isPending}
      isLoading={false}
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
