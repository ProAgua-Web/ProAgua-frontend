'use client';

import {
  FormContainer,
  FormSection,
  type FormProps,
} from '@/components/form/container';
import { ControlledCombobox } from '@/components/form/input/combobox';
import { ControlledImageInput } from '@/components/form/input/image-input';
import { ControlledMaskedInput } from '@/components/form/input/masked-input';
import { ControlledSelect } from '@/components/form/input/select';
import { ControlledTextArea } from '@/components/form/input/text-area';
import { ControlledTextInput } from '@/components/form/input/text-input';
import { litroMask } from '@/lib/input-mask';
import { useEffect } from 'react';
import { useEdificacoesOptions } from '../../edificacao/edificacao.utils';
import { type PontoSchema } from '../ponto.form';
import { tipoPontosOptions, usePontosOptions } from '../ponto.utils';

interface Props {
  codigo?: string;
}

export const ReservatorioForm: React.FC<FormProps<PontoSchema> & Props> = ({
  form,
  codigo: codigo,
  ...props
}) => {
  const tipo = form.watch('tipo');
  const edificacaoOptions = useEdificacoesOptions();
  const codigo_edificacao_amontante = form.watch('amontante_codigo_edificacao');
  const pontosOptions = usePontosOptions({
    tipo: [tipo + 1],
    limit: 0,
    q: codigo_edificacao_amontante ?? '',
  }); // O ponto a montante é sempre um a mais do tipo atual

  useEffect(() => {
    if (codigo) {
      form.setValue('codigo_edificacao', codigo);
    }
  }, [codigo, form]);

  return (
    <FormContainer {...props}>
      <FormSection>
        <ControlledCombobox
          control={form.control}
          name="codigo_edificacao"
          label="Edificação"
          placeholder={
            edificacaoOptions.isLoading
              ? 'Carregando...'
              : 'Selecione a edificação'
          }
          {...edificacaoOptions}
          isLoading={edificacaoOptions.isLoading}
          readOnly={edificacaoOptions.isLoading || !!codigo}
        />
        <ControlledTextInput
          control={form.control}
          name="localizacao"
          label="Localização"
          placeholder="Informe a localização"
        />
        <ControlledSelect
          control={form.control}
          name="tipo"
          label="Tipo"
          placeholder="Informe o tipo"
          options={tipoPontosOptions.slice(2, tipoPontosOptions.length)}
        />
        <ControlledMaskedInput
          control={form.control}
          name="capacidade"
          label="Capacidade"
          placeholder="Informe a capacidade"
          mask={litroMask}
        />
        <ControlledTextInput
          control={form.control}
          name="material"
          label="Material"
          placeholder="Informe o material"
        />
        <ControlledTextInput
          control={form.control}
          name="fonte_informacao"
          label="Fonte de informação"
          placeholder="Informe a fonte de informação"
        />
        <ControlledCombobox
          control={form.control}
          name="amontante_codigo_edificacao"
          label="Edificação do a montante"
          placeholder={
            edificacaoOptions.isLoading
              ? 'Carregando...'
              : 'Selecione a edificação'
          }
          {...edificacaoOptions}
          readOnly={edificacaoOptions.isLoading}
        />
        <ControlledCombobox
          control={form.control}
          name="amontante_id"
          label="Ponto a montante"
          placeholder={
            pontosOptions.isLoading ? 'Carregando...' : 'Selecione o ponto'
          }
          {...pontosOptions}
          isLoading={pontosOptions.isLoading}
          readOnly={
            typeof codigo_edificacao_amontante !== 'string' ||
            pontosOptions.isLoading
          }
        />
      </FormSection>
      <FormSection className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-1">
        <ControlledTextArea
          control={form.control}
          name="observacao"
          label="Observação"
          placeholder="Informe a observação"
          rows={3}
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
