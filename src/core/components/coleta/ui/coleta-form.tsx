'use client';

import {
  FormContainer,
  FormSection,
  type FormProps,
} from '@/components/form/container';
import { ControlledCheckbox } from '@/components/form/input/checkbox';
import { ControlledCombobox } from '@/components/form/input/combobox';
import { ControlledDatePicker } from '@/components/form/input/date-picker';
import { ControlledMaskedInput } from '@/components/form/input/masked-input';
import { ControlledMultiSelect } from '@/components/form/input/multi-select';
import { ControlledNumberInput } from '@/components/form/input/number-input';
import { ControlledSelect } from '@/components/form/input/select';
import {
  cloroMask,
  corMask,
  temperaturaMask,
  turbidezMask,
} from '@/lib/input-mask';
import { useEffect } from 'react';
import { useEdificacoesOptionsBySequenciaId } from '../../edificacao/edificacao.utils';
import { usePontosOptionsBySequenciaIdEdificacao } from '../../ponto/ponto.utils';
import { useUsuariosOptions } from '../../usuario/usuario.utils';
import { type ColetaSchema } from '../coleta.form';
import { ordemColetasOptions } from '../coleta.utils';

interface Props {
  sequencia_id?: number;
}

export const ColetaForm: React.FC<FormProps<ColetaSchema> & Props> = ({
  form,
  sequencia_id,
  ...props
}) => {
  const edificacaoOptions = useEdificacoesOptionsBySequenciaId(sequencia_id);
  const edificacao = form.watch('edificacao');
  const pontosOptions = usePontosOptionsBySequenciaIdEdificacao(
    sequencia_id,
    edificacao,
  );
  const responsaveisOptions = useUsuariosOptions();

  useEffect(() => {
    if (sequencia_id) {
      form.setValue('sequencia_id', Number(sequencia_id));
    }
  }, [sequencia_id, form]);

  return (
    <FormContainer {...props}>
      <FormSection>
        <ControlledNumberInput
          control={form.control}
          name="sequencia_id"
          label="Sequência"
          placeholder="Informe a sequência"
          disabled
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
          name="pontoId"
          label="Ponto"
          placeholder={
            pontosOptions.isLoading ? 'Carregando...' : 'Selecione o ponto'
          }
          disabled={typeof edificacao !== 'string' || pontosOptions.isLoading}
          {...pontosOptions}
        />
        <ControlledMaskedInput
          control={form.control}
          name="temperatura"
          label="Temperatura"
          placeholder="Informe a temperatura"
          mask={temperaturaMask}
        />
        <ControlledMaskedInput
          control={form.control}
          name="cloro_residual_livre"
          label="Cloro residual livre"
          placeholder="Informe o cloro residual livre"
          mask={cloroMask}
        />
        <ControlledMaskedInput
          control={form.control}
          name="turbidez"
          label="Turbidez"
          placeholder="Informe a turbidez da água"
          mask={turbidezMask}
        />
        <ControlledMaskedInput
          control={form.control}
          name="cor"
          label="Cor"
          placeholder="Informe a cor da água"
          mask={corMask}
        />
        <ControlledDatePicker
          control={form.control}
          name="data"
          label="Data"
          placeholder="Informe a data"
        />
        <ControlledMultiSelect
          control={form.control}
          name="responsaveis_id"
          label="Responsáveis"
          placeholder={
            responsaveisOptions.isLoading
              ? 'Carregando...'
              : 'Selecione os responsáveis'
          }
          disabled={responsaveisOptions.isLoading}
          {...responsaveisOptions}
        />
        <ControlledSelect
          control={form.control}
          name="ordem"
          label="Ordem"
          placeholder="Informe a ordem da coleta"
          options={ordemColetasOptions}
        />
      </FormSection>
      <FormSection>
        <div className="flex items-center">
          <ControlledCheckbox
            control={form.control}
            name="coliformes_totais"
            label="Presença de coliformes totais em 100 mL"
          />
        </div>
        <div className="flex items-center">
          <ControlledCheckbox
            control={form.control}
            name="escherichia"
            label="Presença de escherichia em 100 mL"
            className="text-lg"
          />
        </div>
      </FormSection>
    </FormContainer>
  );
};
