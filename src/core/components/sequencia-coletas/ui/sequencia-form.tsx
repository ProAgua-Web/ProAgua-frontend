'use client';

import {
  FormContainer,
  FormSection,
  type FormProps,
} from '@/components/form/container';
import { ControlledCombobox } from '@/components/form/input/combobox';
import { ControlledNumberInput } from '@/components/form/input/number-input';
import { useEdificacoesOptions } from '../../edificacao/edificacao.utils';
import { usePontosOptions } from '../../ponto/ponto.utils';
import { type SequenciaSchema } from '../sequencia.form';

export const SequenciaForm: React.FC<FormProps<SequenciaSchema>> = ({
  form,
  ...props
}) => {
  const edificacaoOptions = useEdificacoesOptions();
  const edificacao = form.watch('edificacao');
  const pontosOptions = usePontosOptions({ q: edificacao });

  return (
    <FormContainer {...props}>
      <FormSection>
        <ControlledCombobox
          control={form.control}
          name="edificacao"
          label="Edificação"
          placeholder={
            edificacaoOptions.isLoading
              ? 'Carregando...'
              : 'Selecione a edificação'
          }
          disabled={edificacaoOptions.isLoading}
          {...edificacaoOptions}
        />
        <ControlledCombobox
          control={form.control}
          name="ponto_id"
          label="Ponto"
          placeholder={
            pontosOptions.isLoading ? 'Carregando...' : 'Selecione o ponto'
          }
          disabled={typeof edificacao !== 'string' || pontosOptions.isLoading}
          {...pontosOptions}
        />

        <ControlledNumberInput
          control={form.control}
          name="amostragem"
          label="Amostragem"
          placeholder="Informe a amostragem"
        />
      </FormSection>
    </FormContainer>
  );
};
