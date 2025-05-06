'use client';

import { FormProps } from '@/components/form/container';
import { ControlledDatePicker } from '@/components/form/input/date-picker';
import { ControlledNumberInput } from '@/components/form/input/number-input';
import { ControlledSelect } from '@/components/form/input/select';
import { ControlledTextInput } from '@/components/form/input/text-input';
import { Button } from '@/components/ui/button';
import { options } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryState } from 'nuqs';
import qs from 'qs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const BooleanOptional = {
  TODOS: 'all',
  TRUE: 'true',
  FALSE: 'false',
} as const;

export type BooleanOptional =
  (typeof BooleanOptional)[keyof typeof BooleanOptional];

export const booleanOptional = Object.values(BooleanOptional);

export const booleanLabel = {
  all: 'Todos',
  true: 'Presença',
  false: 'Ausência',
} as const satisfies Record<BooleanOptional, string>;

export const booleanOptionalOptions = options(booleanOptional, (bool) => [
  bool,
  booleanLabel[bool],
]);

const filterSchema = z.object({
  ponto_id: z.union([z.number(), z.nan()]).optional(),
  sequencia_id: z.union([z.number(), z.nan()]).optional(),
  responsavel: z.string().nullish(),
  data_minima: z.date().nullish(),
  data_maxima: z.date().nullish(),
  temperatura_minima: z.union([z.number(), z.nan()]).optional(),
  temperatura_maxima: z.union([z.number(), z.nan()]).optional(),
  cloro_residual_livre_minimo: z.union([z.number(), z.nan()]).optional(),
  cloro_residual_livre_maximo: z.union([z.number(), z.nan()]).optional(),
  turbidez_minima: z.union([z.number(), z.nan()]).optional(),
  turbidez_maxima: z.union([z.number(), z.nan()]).optional(),
  coliformes_totais: z.nativeEnum(BooleanOptional).default('all'),
  escherichia: z.nativeEnum(BooleanOptional).default('all'),
  cor_minima: z.union([z.number(), z.nan()]).optional(),
  cor_maxima: z.union([z.number(), z.nan()]).optional(),
  ordem: z.string().nullish(),
  codigo_edificacao: z.string().nullish(),
});

type FilterSchema = z.infer<typeof filterSchema>;

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

  const dto = {
    ...(ponto_id && { ponto_id }),
    ...(sequencia_id && { sequencia_id }),
    ...(responsavel && { responsavel }),
    ...(data_minima && { data_minima }),
    ...(data_maxima && { data_maxima }),
    ...(temperatura_minima && { temperatura_minima }),
    ...(temperatura_maxima && { temperatura_maxima }),
    ...(cloro_residual_livre_minimo && { cloro_residual_livre_minimo }),
    ...(cloro_residual_livre_maximo && { cloro_residual_livre_maximo }),
    ...(turbidez_minima && { turbidez_minima }),
    ...(turbidez_maxima && { turbidez_maxima }),
    ...(coliformes_totais && { coliformes_totais }),
    ...(escherichia && { escherichia }),
    ...(cor_minima && { cor_minima }),
    ...(cor_maxima && { cor_maxima }),
    ...(ordem && { ordem }),
    ...(codigo_edificacao && { codigo_edificacao }),
  };

  const filterDtoToSchema = (dto: any) => {
    return {
      ponto_id: dto.ponto_id,
      sequencia_id: dto.sequencia_id,
      responsavel: dto.responsavel,
      data_minima: dto.data_minima ? new Date(dto.data_minima) : null,
      data_maxima: dto.data_maxima ? new Date(dto.data_maxima) : null,
      temperatura_minima: dto.temperatura_minima,
      temperatura_maxima: dto.temperatura_maxima,
      cloro_residual_livre_minimo: dto.cloro_residual_livre_minimo,
      cloro_residual_livre_maximo: dto.cloro_residual_livre_maximo,
      turbidez_minima: dto.turbidez_minima,
      turbidez_maxima: dto.turbidez_maxima,
      coliformes_totais: dto.coliformes_totais,
      escherichia: dto.escherichia,
      cor_minima: dto.cor_minima,
      cor_maxima: dto.cor_maxima,
      ordem: dto.ordem,
      codigo_edificacao: dto.codigo_edificacao,
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
  return (
    <form
      className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      {...props}
    >
      <ControlledTextInput
        control={form.control}
        name="codigo_edificacao"
        label="Código da Edificação"
        placeholder="Informe o código da edificação"
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
      <ControlledTextInput
        control={form.control}
        name="ordem"
        label="Ordem"
        placeholder="Informe a ordem"
      />
      <ControlledNumberInput
        control={form.control}
        name="sequencia_id"
        label="Sequência ID"
        placeholder="Informe o ID da sequência"
      />
      <ControlledNumberInput
        control={form.control}
        name="ponto_id"
        label="Ponto ID"
        placeholder="Informe o ID do ponto"
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
      <Button type="submit" className="col-span-1 md:col-span-2 lg:col-span-3">
        Filtrar
      </Button>
    </form>
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
      Object.entries(dataWithFormattedDates).filter(([_, value]) => {
        // Remove valores nulos, undefined, strings vazias
        if (
          value === null ||
          value === undefined ||
          value === '' ||
          value === 'all' ||
          (typeof value === 'number' && Number.isNaN(value))
        )
          return false;

        if (typeof value === 'number') return true;
        if (typeof value === 'boolean') return true;
        if (typeof value === 'string' && value.trim() !== '') return true;

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
  );
};
