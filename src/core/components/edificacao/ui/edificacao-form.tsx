'use client';

import {
  FormContainer,
  FormSection,
  type FormProps,
} from '@/components/form/container';
import { ControlledImageInput } from '@/components/form/input/image-input';
import { ControlledNumberInput } from '@/components/form/input/number-input';
import { ControlledSelect } from '@/components/form/input/select';
import { ControlledTextArea } from '@/components/form/input/text-area';
import { ControlledTextInput } from '@/components/form/input/text-input';
import { campusOptions } from '@/lib/utils';
import { type EdificacaoSchema } from '../edificacao.form';

export const EdificacaoForm: React.FC<FormProps<EdificacaoSchema>> = ({
  form,
  ...props
}) => {
  return (
    <FormContainer {...props}>
      <FormSection>
        <ControlledTextInput
          control={form.control}
          name="codigo"
          label="Código"
          placeholder="Informe o código da edificação"
        />
        <ControlledTextInput
          control={form.control}
          name="nome"
          label="Nome"
          placeholder="Informe o nome da edificação"
        />
        <ControlledSelect
          control={form.control}
          name="campus"
          label="Campus"
          options={campusOptions}
          placeholder="Selecione o campus"
        />
        <ControlledNumberInput
          control={form.control}
          name="cronograma"
          label="Cronograma"
          placeholder="Informe o cronograma"
        />
      </FormSection>
      <FormSection className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-1">
        <ControlledTextArea
          control={form.control}
          name="informacoes_gerais"
          label="Informações Gerais"
          placeholder="Informe informações adicionais"
        />
        <ControlledImageInput
          control={form.control}
          name="imagens"
          label="Imagens"
          multiple
        />
      </FormSection>
    </FormContainer>
  );
};
