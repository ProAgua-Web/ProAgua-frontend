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
import { mergeImagens } from '@/core/common/imagem/imagem.api';
import { useEffect } from 'react';
import { useEdificacao } from '../../edificacao/edificacao.service';
import { useEdificacoesOptions } from '../../edificacao/edificacao.utils';
import { usePonto } from '../../ponto/ponto.service';
import { usePontosOptions } from '../../ponto/ponto.utils';
import { type SolicitacaoSchema } from '../solicitacao.form';
import {
  SolicitacaoDefaultValues,
  statusSolicitacaoOptions,
  TipoSolicitacao,
  tipoSolicitacaoOptions,
} from '../solicitacao.utils';
import { ExportarButton } from './button.exportar';

export const SolicitacaoForm: React.FC<FormProps<SolicitacaoSchema>> = ({
  form,
  ...props
}) => {
  const codigo_edificacao = form.watch('edificacao');
  const idPonto = form.watch('ponto_id');
  const { data: edificacao } = useEdificacao(codigo_edificacao);
  const { data: ponto } = usePonto(idPonto);
  const edificacaoOptions = useEdificacoesOptions();
  const pontosOptions = usePontosOptions({ q: codigo_edificacao });
  const solicitacaoId = form.watch('id') || 0;

  function handleTipoChange(tipo: TipoSolicitacao) {
    form.setValue('objetivo', SolicitacaoDefaultValues[tipo].objetivo);
    form.setValue(
      'justificativa',
      SolicitacaoDefaultValues[tipo].justificativa,
    );
  }

  function handleEdificacaoChange() {
    form.setValue('ponto_id', 0);
  }

  useEffect(() => {
    const { setValue, getValues } = form;
    const touchedFields = form.formState.touchedFields;
    const imagensPrev = getValues('imagens') || [];

    if (edificacao && touchedFields?.edificacao) {
      setValue('imagens', mergeImagens(imagensPrev, edificacao?.imagens || []));
    }

    if (ponto && touchedFields?.ponto_id) {
      setValue('imagens', mergeImagens(imagensPrev, ponto?.imagens || []));
    }
  }, [
    edificacao,
    ponto,
    codigo_edificacao,
    form.setValue,
    form.getValues,
    form.formState.touchedFields,
  ]);

  return (
    <FormContainer {...props} subChildren={ExportarButton(solicitacaoId)}>
      <FormSection>
        <ControlledSelect
          control={form.control}
          name="tipo"
          label="Tipo de solicitação"
          placeholder="Selecione o tipo de solicitação"
          options={tipoSolicitacaoOptions}
          onChange={handleTipoChange}
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
          onChange={handleEdificacaoChange}
        />
        <ControlledCombobox
          control={form.control}
          name="ponto_id"
          label="Ponto"
          placeholder={
            pontosOptions.isLoading ? 'Carregando...' : 'Selecione o ponto'
          }
          disabled={
            typeof codigo_edificacao !== 'string' || pontosOptions.isLoading
          }
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
