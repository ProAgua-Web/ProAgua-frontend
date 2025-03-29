import { useDebouncedState } from '@/lib/hooks/use-debounced-state';
import { options } from '@/lib/utils';
import { useMemo } from 'react';
import { type PontoQueryOptions } from './ponto.api';
import { type PontoDto } from './ponto.model';
import { usePontos } from './ponto.service';

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
  const pontos = usePontos(params);

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
