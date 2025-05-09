import { useQueryState } from 'nuqs';

export const ordemColetasOptions = [
  { value: 1, label: 'Coleta' },
  { value: 2, label: 'Recoleta' },
];

export function useColetaQueryParams() {
  const queryParams = {
    sequencia_id: useQueryState('sequencia_id', { defaultValue: '' }),
    codigo_edificacao: useQueryState('codigo_edificacao', { defaultValue: '' }),
    ponto_id: useQueryState('ponto_id', { defaultValue: '' }),
    responsavel: useQueryState('responsavel', { defaultValue: '' }),
    data_minima: useQueryState('data_minima', { defaultValue: '' }),
    data_maxima: useQueryState('data_maxima', { defaultValue: '' }),
    temperatura_minima: useQueryState('temperatura_minima', {
      defaultValue: '',
    }),
    temperatura_maxima: useQueryState('temperatura_maxima', {
      defaultValue: '',
    }),
    cloro_residual_livre_minimo: useQueryState('cloro_residual_livre_minimo', {
      defaultValue: '',
    }),
    cloro_residual_livre_maximo: useQueryState('cloro_residual_livre_maximo', {
      defaultValue: '',
    }),
    turbidez_minima: useQueryState('turbidez_minima', { defaultValue: '' }),
    turbidez_maxima: useQueryState('turbidez_maxima', { defaultValue: '' }),
    coliformes_totais: useQueryState('coliformes_totais', {
      defaultValue: 'all',
    }),
    escherichia: useQueryState('escherichia', { defaultValue: 'all' }),
    cor_minima: useQueryState('cor_minima', { defaultValue: '' }),
    cor_maxima: useQueryState('cor_maxima', { defaultValue: '' }),
    ordem: useQueryState('ordem', { defaultValue: '' }),
  };

  return queryParams;
}

export function buildColetaParams(
  queryParams: ReturnType<typeof useColetaQueryParams>,
) {
  return {
    ...(queryParams.sequencia_id[0] && {
      sequencia_id: parseInt(queryParams.sequencia_id[0]),
    }),
    ...(queryParams.codigo_edificacao[0] && {
      codigo_edificacao: queryParams.codigo_edificacao[0],
    }),
    ...(queryParams.ponto_id[0] && {
      ponto_id: parseInt(queryParams.ponto_id[0]),
    }),
    ...(queryParams.responsavel[0] && {
      responsavel: queryParams.responsavel[0],
    }),
    ...(queryParams.data_minima[0] && {
      data_minima: queryParams.data_minima[0],
    }),
    ...(queryParams.data_maxima[0] && {
      data_maxima: queryParams.data_maxima[0],
    }),
    ...(queryParams.temperatura_minima[0] && {
      temperatura_minima: parseFloat(queryParams.temperatura_minima[0]),
    }),
    ...(queryParams.temperatura_maxima[0] && {
      temperatura_maxima: parseFloat(queryParams.temperatura_maxima[0]),
    }),
    ...(queryParams.cloro_residual_livre_minimo[0] && {
      cloro_residual_livre_minimo: parseFloat(
        queryParams.cloro_residual_livre_minimo[0],
      ),
    }),
    ...(queryParams.cloro_residual_livre_maximo[0] && {
      cloro_residual_livre_maximo: parseFloat(
        queryParams.cloro_residual_livre_maximo[0],
      ),
    }),
    ...(queryParams.turbidez_minima[0] && {
      turbidez_minima: parseFloat(queryParams.turbidez_minima[0]),
    }),
    ...(queryParams.turbidez_maxima[0] && {
      turbidez_maxima: parseFloat(queryParams.turbidez_maxima[0]),
    }),
    ...(queryParams.coliformes_totais[0] !== 'all' && {
      coliformes_totais:
        queryParams.coliformes_totais[0] === 'false' ? false : true,
    }),
    ...(queryParams.escherichia[0] !== 'all' && {
      escherichia: queryParams.escherichia[0] === 'false' ? false : true,
    }),
    ...(queryParams.cor_minima[0] && {
      cor_minima: parseFloat(queryParams.cor_minima[0]),
    }),
    ...(queryParams.cor_maxima[0] && {
      cor_maxima: parseFloat(queryParams.cor_maxima[0]),
    }),
    ...(queryParams.ordem[0] && { ordem: queryParams.ordem[0] }),
    limit: 0,
  };
}
