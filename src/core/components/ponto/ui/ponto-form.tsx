'use client';

import {
  FormContainer,
  FormSection,
  type FormProps,
} from '@/components/form/container';
import { ControlledCombobox } from '@/components/form/input/combobox';
import { ControlledFileInput } from '@/components/form/input/file-input';
import { ControlledSelect } from '@/components/form/input/select';
import { ControlledTextInput } from '@/components/form/input/text-input';
import { cn } from '@/lib/utils';
import { useEdificacoesOptions } from '../../edificacao/edificacao.utils';
import { usePontosOptions } from '../../ponto/ponto.utils';
import { type PontoSchema } from '../ponto.form';

interface Props {
  codigo?: string;
}

export const PontoForm: React.FC<FormProps<PontoSchema> & Props> = ({
  form,
  codigo: codigo,
  ...props
}) => {
  const edificacaoOptions = useEdificacoesOptions();
  const tipo = form.watch('tipo');
  const pontosOptions = usePontosOptions({ tipo: [3] }); // O ponto a montante é sempre do tipo 3 (RPS)

  if (codigo) {
    form.setValue('codigo_edificacao', codigo);
  }

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
          disabled={edificacaoOptions.isLoading}
          {...edificacaoOptions}
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
          options={[
            { label: 'Bebedouro', value: 1 },
            { label: 'Torneira', value: 2 },
          ]}
        />
        <div className={cn({ hidden: tipo !== 1 })}>
          <ControlledTextInput
            control={form.control}
            name="tombo"
            label="Tombo"
            placeholder="Informe o tombo"
          />
        </div>
        <ControlledCombobox
          control={form.control}
          name="amontante"
          label="Ponto a montante"
          placeholder={
            pontosOptions.isLoading ? 'Carregando...' : 'Selecione o ponto'
          }
          disabled={pontosOptions.isLoading}
          {...pontosOptions}
        />
      </FormSection>
      <FormSection className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-1">
        <ControlledFileInput
          control={form.control}
          name="imagens"
          label="Imagens"
        />
      </FormSection>
    </FormContainer>
  );
};
