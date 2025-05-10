'use client';

import {
  FormContainer,
  FormSection,
  type FormProps,
} from '@/components/form/container';
import { ControlledCombobox } from '@/components/form/input/combobox';
import { ControlledImageInput } from '@/components/form/input/image-input';
import { ControlledSelect } from '@/components/form/input/select';
import { ControlledTextInput } from '@/components/form/input/text-input';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { useEdificacoesOptions } from '../../edificacao/edificacao.utils';
import { tipoPontosOptions, usePontosOptions } from '../../ponto/ponto.utils';
import { type PontoSchema } from '../ponto.form';

interface Props {
  codigo?: string;
}

export const PontoForm: React.FC<FormProps<PontoSchema> & Props> = ({
  form,
  codigo,
  ...props
}) => {
  const tipo = form.watch('tipo');
  const edificacaoOptions = useEdificacoesOptions();
  const codigo_edificacao_amontante = form.watch('amontante_codigo_edificacao');
  const pontosOptions = usePontosOptions({
    q: codigo_edificacao_amontante ?? '',
    tipo: [2],
    limit: 0,
  }); // O ponto a montante é sempre do tipo 3 (RPS)

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
          readOnly={!!codigo || edificacaoOptions.isLoading}
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
          options={tipoPontosOptions.slice(0, 2)}
        />
        <div className={cn({ hidden: tipo !== 0 })}>
          <ControlledTextInput
            control={form.control}
            name="tombo"
            label="Tombo"
            placeholder="Informe o tombo"
          />
        </div>
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
