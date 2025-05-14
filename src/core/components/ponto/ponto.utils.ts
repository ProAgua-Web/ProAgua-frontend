import { useDebouncedState } from '@/lib/hooks/use-debounced-state';
import { options } from '@/lib/utils';
import { useMemo } from 'react';
import { type PontoQueryOptions } from './ponto.api';
import { type PontoDto } from './ponto.model';
import { usePontos, usePontosBySequenciaId } from './ponto.service';

export function buscarPontos(pontos: PontoDto[], busca: string): PontoDto[] {
  if (!busca) {
    return pontos;
  }
  busca = busca.toLocaleLowerCase();

  return pontos.filter(
    (ponto) =>
      ponto.edificacao.nome.toLocaleLowerCase().includes(busca) ||
      ponto.edificacao.codigo.toLocaleLowerCase().includes(busca) ||
      ponto.localizacao.toLocaleLowerCase().includes(busca) ||
      ponto.tombo?.toString().includes(busca),
  );
}

export const usePontosOptions = (params?: PontoQueryOptions) => {
  const pontos = usePontos({ ...params, limit: 0 });

  const [[buscaPontos, buscaPontosDebounce], [, setBuscaPontos]] =
    useDebouncedState('');
  const pontosOptions = useMemo(() => {
    return options(buscarPontos(pontos.data ?? [], buscaPontos), (p) => [
      p.id!,
      `${p.id} - ${p.localizacao} ${p.tombo ? `(${p.tombo})` : ''}`,
    ]);
  }, [pontos.data, buscaPontos]);

  const props = useMemo(
    () => ({
      options: pontosOptions,
      onSearch: setBuscaPontos,
      isLoading: buscaPontosDebounce.isPending() || pontos.isLoading,
    }),
    [pontos, pontosOptions, setBuscaPontos, buscaPontosDebounce],
  );

  return props;
};

export const usePontosOptionsBySequenciaIdEdificacao = (
  sequencia_id?: number,
  codigo_edificacao?: string,
) => {
  const pontosEdificacao = usePontos({
    q: codigo_edificacao,
  });
  const pontosSequencia = usePontosBySequenciaId(sequencia_id);

  const pontos = useMemo(() => {
    if (!pontosEdificacao.data || !pontosSequencia.data) {
      return [];
    }
    return pontosSequencia.data.filter((ponto) =>
      pontosEdificacao.data.some(
        (p) => p.id === ponto.id && p.edificacao.codigo === codigo_edificacao,
      ),
    );
  }, [pontosEdificacao.data, pontosSequencia.data, codigo_edificacao]);
  const [[buscaPontos, buscaPontosDebounce], [, setBuscaPontos]] =
    useDebouncedState('');
  const pontosOptions = useMemo(() => {
    return options(buscarPontos(pontos, buscaPontos), (p) => [
      p.id!,
      `${p.id} - ${p.localizacao} ${p.tombo ? `(${p.tombo})` : ''}`,
    ]);
  }, [pontos, buscaPontos]);
  const props = useMemo(
    () => ({
      options: pontosOptions,
      onSearch: setBuscaPontos,
      isLoading: buscaPontosDebounce.isPending() || pontosEdificacao.isLoading,
    }),
    [
      pontos,
      pontosOptions,
      setBuscaPontos,
      buscaPontosDebounce,
      pontosEdificacao.isLoading,
      pontosSequencia.isLoading,
    ],
  );
  return props;
};

export const tipoPontosOptions = [
  { label: 'Bebedouro', value: 0 },
  { label: 'Torneira', value: 1 },
  { label: 'RPS', value: 2 },
  { label: 'RPI', value: 3 },
  { label: 'RDI', value: 4 },
  { label: 'RDS', value: 5 },
  { label: 'CAERN', value: 6 },
];

export const pontoToString = (ponto: PontoDto): string => {
  return `${tipoPontosOptions[ponto.tipo].label} - ${ponto.localizacao}${ponto.tombo ? ` (${ponto.tombo})` : ''}`;
};
