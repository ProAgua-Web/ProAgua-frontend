'use client';

import { type FormProps } from '@/components/form/container';
import { ControlledCombobox } from '@/components/form/input/combobox';
import { ControlledDatePicker } from '@/components/form/input/date-picker';
import { ControlledNumberInput } from '@/components/form/input/number-input';
import { ControlledSelect } from '@/components/form/input/select';
import { ControlledTextInput } from '@/components/form/input/text-input';
import { Button } from '@/components/ui/button';
import { booleanOptionalOptions } from '@/core/common/utils';
import { ordemColetasOptions } from '@/core/components/coleta/coleta.utils';
import { useEdificacoesOptions } from '@/core/components/edificacao/edificacao.utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryState } from 'nuqs';
import qs from 'qs';
import { Suspense, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { filterSchema, type FilterSchema } from './exportar.form';

interface FilterDto {
  ponto_id?: string | null;
  sequencia_id?: string | null;
  responsavel?: string | null;
  data_minima?: string | null;
  data_maxima?: string | null;
  temperatura_minima?: number | null;
  temperatura_maxima?: number | null;
  cloro_residual_livre_minimo?: number | null;
  cloro_residual_livre_maximo?: number | null;
  turbidez_minima?: number | null;
  turbidez_maxima?: number | null;
  coliformes_totais?: boolean | null;
  escherichia?: boolean | null;
  status?: boolean | null;
  cor_minima?: number | null;
  cor_maxima?: number | null;
  ordem?: number | null;
  codigo_edificacao?: string | null;
}

export const useFilterForm = () => {
  const [ponto_id] = useQueryState('ponto_id', { defaultValue: '' });
  const [sequencia_id] = useQueryState('sequencia_id', { defaultValue: '' });
  const [responsavel] = useQueryState('responsavel', { defaultValue: '' });
  const [data_minima] = useQueryState('data_minima', { defaultValue: '' });
  const [data_maxima] = useQueryState('data_maxima', { defaultValue: '' });
  const [temperatura_minima] = useQueryState('temperatura_minima', {
    defaultValue: '',
  });
  const [temperatura_maxima] = useQueryState('temperatura_maxima', {
    defaultValue: '',
  });
  const [cloro_residual_livre_minimo] = useQueryState(
    'cloro_residual_livre_minimo',
    { defaultValue: '' },
  );
  const [cloro_residual_livre_maximo] = useQueryState(
    'cloro_residual_livre_maximo',
    { defaultValue: '' },
  );
  const [turbidez_minima] = useQueryState('turbidez_minima', {
    defaultValue: '',
  });
  const [turbidez_maxima] = useQueryState('turbidez_maxima', {
    defaultValue: '',
  });
  const [coliformes_totais] = useQueryState('coliformes_totais', {
    defaultValue: '',
  });
  const [escherichia] = useQueryState('escherichia', { defaultValue: '' });
  const [cor_minima] = useQueryState('cor_minima', { defaultValue: '' });
  const [cor_maxima] = useQueryState('cor_maxima', { defaultValue: '' });
  const [ordem] = useQueryState('ordem', { defaultValue: '' });
  const [codigo_edificacao] = useQueryState('codigo_edificacao', {
    defaultValue: '',
  });
  const [status] = useQueryState('status', { defaultValue: '' });

  const dto = useMemo(
    () => ({
      ...(ponto_id && { ponto_id }),
      ...(sequencia_id && { sequencia_id }),
      ...(responsavel && { responsavel }),
      ...(data_minima && { data_minima }),
      ...(data_maxima && { data_maxima }),
      ...(temperatura_minima && {
        temperatura_minima: Number(temperatura_minima),
      }),
      ...(temperatura_maxima && {
        temperatura_maxima: Number(temperatura_maxima),
      }),
      ...(cloro_residual_livre_minimo && {
        cloro_residual_livre_minimo: Number(cloro_residual_livre_minimo),
      }),
      ...(cloro_residual_livre_maximo && {
        cloro_residual_livre_maximo: Number(cloro_residual_livre_maximo),
      }),
      ...(turbidez_minima && { turbidez_minima: Number(turbidez_minima) }),
      ...(turbidez_maxima && { turbidez_maxima: Number(turbidez_maxima) }),
      ...(coliformes_totais && {
        coliformes_totais: coliformes_totais === 'true',
      }),
      ...(escherichia && { escherichia: escherichia === 'true' }),
      ...(status && { status: status === 'true' }),
      ...(cor_minima && { cor_minima: Number(cor_minima) }),
      ...(cor_maxima && { cor_maxima: Number(cor_maxima) }),
      ...(ordem && { ordem: Number(ordem) }),
      ...(codigo_edificacao && { codigo_edificacao }),
    }),
    [
      ponto_id,
      sequencia_id,
      responsavel,
      data_minima,
      data_maxima,
      temperatura_minima,
      temperatura_maxima,
      cloro_residual_livre_minimo,
      cloro_residual_livre_maximo,
      turbidez_minima,
      turbidez_maxima,
      coliformes_totais,
      escherichia,
      status,
      cor_minima,
      cor_maxima,
      ordem,
      codigo_edificacao,
    ],
  );

  const filterDtoToSchema = (dto: Partial<FilterDto>): FilterSchema => {
    return {
      ponto_id: dto.ponto_id ? Number(dto.ponto_id) : undefined,
      sequencia_id: dto.sequencia_id ? Number(dto.sequencia_id) : undefined,
      responsavel: dto.responsavel || null,
      data_minima: dto.data_minima ? new Date(dto.data_minima) : null,
      data_maxima: dto.data_maxima ? new Date(dto.data_maxima) : null,
      temperatura_minima: dto.temperatura_minima
        ? Number(dto.temperatura_minima)
        : undefined,
      temperatura_maxima: dto.temperatura_maxima
        ? Number(dto.temperatura_maxima)
        : undefined,
      cloro_residual_livre_minimo: dto.cloro_residual_livre_minimo
        ? Number(dto.cloro_residual_livre_minimo)
        : undefined,
      cloro_residual_livre_maximo: dto.cloro_residual_livre_maximo
        ? Number(dto.cloro_residual_livre_maximo)
        : undefined,
      turbidez_minima: dto.turbidez_minima
        ? Number(dto.turbidez_minima)
        : undefined,
      turbidez_maxima: dto.turbidez_maxima
        ? Number(dto.turbidez_maxima)
        : undefined,
      coliformes_totais:
        dto.coliformes_totais === true
          ? 'true'
          : dto.coliformes_totais === false
            ? 'false'
            : 'all',
      escherichia:
        dto.escherichia === true
          ? 'true'
          : dto.escherichia === false
            ? 'false'
            : 'all',
      status:
        dto.status === true ? 'true' : dto.status === false ? 'false' : 'all',
      cor_minima: dto.cor_minima ? Number(dto.cor_minima) : undefined,
      cor_maxima: dto.cor_maxima ? Number(dto.cor_maxima) : undefined,

      ordem: dto.ordem ? Number(dto.ordem) : null,
      codigo_edificacao: dto.codigo_edificacao || null,
    };
  };

  const form = useForm<FilterSchema>({
    resolver: zodResolver(filterSchema),
    defaultValues: dto ? filterDtoToSchema(dto) : undefined,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    const currentValues = form.getValues();
    const newValues = filterDtoToSchema(dto);

    if (JSON.stringify(currentValues) !== JSON.stringify(newValues)) {
      form.reset(newValues);
    }
  }, [dto, form]);

  return form;
};

export const FilterForm: React.FC<FormProps<FilterSchema>> = ({
  form,
  isLoading,
  isSubmitting,
  ...props
}) => {
  const edificacaoOptions = useEdificacoesOptions();

  return (
    <Suspense fallback={<div>Carregando filtros...</div>}>
      <form
        className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        {...props}
      >
        <ControlledCombobox
          control={form.control}
          name="codigo_edificacao"
          label="Código da Edificação"
          placeholder="Informe o código da edificação"
          {...edificacaoOptions}
        />
        <ControlledTextInput
          control={form.control}
          name="responsavel"
          label="Responsável"
          placeholder="Informe o responsável"
        />
        <ControlledDatePicker
          control={form.control}
          name="data_minima"
          label="Data mínima"
          placeholder="Informe a data mínima"
        />
        <ControlledDatePicker
          control={form.control}
          name="data_maxima"
          label="Data máxima"
          placeholder="Informe a data máxima"
        />
        <ControlledNumberInput
          control={form.control}
          name="temperatura_minima"
          label="Temperatura mínima"
          placeholder="Informe a temperatura mínima"
        />
        <ControlledNumberInput
          control={form.control}
          name="temperatura_maxima"
          label="Temperatura máxima"
          placeholder="Informe a temperatura máxima"
        />
        <ControlledNumberInput
          control={form.control}
          name="cloro_residual_livre_minimo"
          label="Cloro residual livre mínimo"
          placeholder="Informe o cloro residual livre mínimo"
        />
        <ControlledNumberInput
          control={form.control}
          name="cloro_residual_livre_maximo"
          label="Cloro residual livre máximo"
          placeholder="Informe o cloro residual livre máximo"
        />
        <ControlledNumberInput
          control={form.control}
          name="turbidez_minima"
          label="Turbidez mínima"
          placeholder="Informe a turbidez mínima"
        />
        <ControlledNumberInput
          control={form.control}
          name="turbidez_maxima"
          label="Turbidez máxima"
          placeholder="Informe a turbidez máxima"
        />
        <ControlledNumberInput
          control={form.control}
          name="cor_minima"
          label="Cor mínima"
          placeholder="Informe a cor mínima"
        />
        <ControlledNumberInput
          control={form.control}
          name="cor_maxima"
          label="Cor máxima"
          placeholder="Informe a cor máxima"
        />
        <ControlledSelect
          control={form.control}
          name="ordem"
          label="Ordem"
          placeholder="Informe a ordem"
          options={[{ value: 0, label: 'Todas' }, ...ordemColetasOptions]}
        />
        <ControlledNumberInput
          control={form.control}
          name="sequencia_id"
          label="Sequência ID"
          placeholder="Informe o ID da sequência"
        />
        <ControlledSelect
          control={form.control}
          name="coliformes_totais"
          label="Coliformes Totais"
          placeholder="Selecione coliformes totais"
          options={booleanOptionalOptions}
        />
        <ControlledSelect
          control={form.control}
          name="escherichia"
          label="Escherichia coli"
          placeholder="Selecione Escherichia coli"
          options={booleanOptionalOptions}
        />
        <ControlledSelect
          control={form.control}
          name="status"
          label="Status"
          placeholder="Selecione o status"
          options={booleanOptionalOptions}
        />
        <Button
          type="submit"
          className="col-span-1 md:col-span-2 lg:col-span-3"
          disabled={isLoading || isSubmitting}
        >
          Filtrar
        </Button>
      </form>
    </Suspense>
  );
};

export const Filters: React.FC = () => {
  const form = useFilterForm();

  const { handleSubmit } = form;
  const onSubmit = handleSubmit((data) => {
    // Converte valores de data para strings no formato ISO antes de filtrar
    const dataWithFormattedDates = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value instanceof Date
          ? value.toISOString().split('T')[0] // Extrai apenas a parte da data (YYYY-MM-DD)
          : value,
      ]),
    );

    // Filtra os campos nulos, undefined, strings vazias e valores padrão
    const filteredData = Object.fromEntries(
      Object.entries(dataWithFormattedDates).filter(([key, value]) => {
        // Remove valores nulos, undefined, strings vazias
        if (
          value === null ||
          value === undefined ||
          value === '' ||
          value === 'all' ||
          (key === 'ordem' && value === 0) ||
          (typeof value === 'number' && Number.isNaN(value))
        ) {
          return false;
        }

        if (typeof value === 'number') {
          return true;
        }
        if (typeof value === 'boolean') {
          return true;
        }
        if (typeof value === 'string' && value.trim() !== '') {
          return true;
        }

        return false;
      }),
    );

    const queryString = qs.stringify(filteredData, { skipNulls: true });
    const url = `${window.location.pathname}?${queryString}`;
    window.history.replaceState(null, '', url);
  });
  const onCancel = () => {
    console.log('Form cancelled');
  };

  return (
    <Suspense fallback={<div>Carregando filtros...</div>}>
      <div className="space-between relative flex gap-2">
        <FilterForm
          form={form}
          title="Filtro"
          subtitle="Escolha os parâmetros para filtrar as coletas do sistema"
          onSubmit={onSubmit}
          onCancel={onCancel}
          isLoading={false}
          isSubmitting={false}
        />
      </div>
    </Suspense>
  );
};
