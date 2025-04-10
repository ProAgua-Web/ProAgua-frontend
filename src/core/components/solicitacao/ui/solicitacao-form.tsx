'use client';

import {
  FormContainer,
  FormSection,
  type FormProps,
} from '@/components/form/container';
import { ControlledCombobox } from '@/components/form/input/combobox';
import { ControlledImageInput } from '@/components/form/input/image-input';
import { ControlledSelect } from '@/components/form/input/select';
import { ControlledTextArea } from '@/components/form/input/text-area';
import { useEdificacoesOptions } from '../../edificacao/edificacao.utils';
import { usePontosOptions } from '../../ponto/ponto.utils';
import { type SolicitacaoSchema } from '../solicitacao.form';
import {
  statusSolicitacaoOptions,
  tipoSolicitacaoOptions,
} from '../solicitacao.utils';

export const SolicitacaoForm: React.FC<FormProps<SolicitacaoSchema>> = ({
  form,
  ...props
}) => {
  const edificacaoOptions = useEdificacoesOptions();
  const edificacao = form.watch('edificacao');
  const pontosOptions = usePontosOptions({ q: edificacao });

  return (
    <FormContainer {...props}>
      <FormSection>
        <ControlledSelect
          control={form.control}
          name="tipo"
          label="Tipo de solicitação"
          placeholder="Selecione o tipo de solicitação"
          options={tipoSolicitacaoOptions}
        />
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
      </FormSection>
      <FormSection className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-1">
        <ControlledTextArea
          control={form.control}
          name="objetivo"
          label="Objetivo"
          placeholder="Descreva o objetivo da solicitação"
        />
        <ControlledTextArea
          control={form.control}
          name="justificativa"
          label="Justificativa"
          placeholder="Descreva a justificativa da solicitação"
        />
        <ControlledSelect
          control={form.control}
          name="status"
          label="Status"
          options={statusSolicitacaoOptions}
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
