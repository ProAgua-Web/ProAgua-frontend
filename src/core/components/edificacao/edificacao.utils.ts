import { useDebouncedState } from '@/lib/hooks/use-debounced-state';
import { options } from '@/lib/utils';
import { useMemo } from 'react';
import { usePontosBySequenciaId } from '../ponto/ponto.service';
import { type EdificacaoDto } from './edificacao.model';
import { useEdificacoes } from './edificacao.service';

export function buscarEdificacoes(
  edificacoes: EdificacaoDto[],
  busca: string,
): EdificacaoDto[] {
  if (!busca) {
    return edificacoes;
  }
  busca = busca.toLocaleLowerCase();

  return edificacoes.filter(
    (edificacao) =>
      edificacao.nome.toLocaleLowerCase().includes(busca) ||
      edificacao.codigo.toLocaleLowerCase().includes(busca) ||
      edificacao.campus.toLocaleLowerCase().includes(busca) ||
      edificacao.cronograma.toString().includes(busca),
  );
}

export const useEdificacoesOptions = () => {
  const edificacoes = useEdificacoes();

  const [
    [buscaEdificacoes, buscaEdificacoesDebounce],
    [, setBuscaEdificacoes],
  ] = useDebouncedState('');
  const edificacoesOptions = useMemo(() => {
    return options(
      buscarEdificacoes(edificacoes.data ?? [], buscaEdificacoes),
      (e) => [e.codigo, `${e.codigo} - ${e.nome}`],
    );
  }, [edificacoes.data, buscaEdificacoes]);

  const props = useMemo(
    () => ({
      options: edificacoesOptions,
      onSearch: setBuscaEdificacoes,
      isLoading: buscaEdificacoesDebounce.isPending() || edificacoes.isLoading,
    }),
    [
      edificacoes,
      edificacoesOptions,
      setBuscaEdificacoes,
      buscaEdificacoesDebounce,
    ],
  );

  return props;
};

export const edificacaoToString = (edificacao: EdificacaoDto): string => {
  return `${edificacao.codigo} - ${edificacao.nome}`;
};

export const useEdificacoesOptionsBySequenciaId = (sequencia_id?: number) => {
  const pontos = usePontosBySequenciaId(sequencia_id);
  const edificacoes = Array.from(
    new Map(
      pontos.data?.map((ponto) => [
        ponto.edificacao.codigo,
        ponto.edificacao,
      ]) ?? [],
    ).values(),
  );
  const [
    [buscaEdificacoes, buscaEdificacoesDebounce],
    [, setBuscaEdificacoes],
  ] = useDebouncedState('');
  const edificacoesOptions = useMemo(() => {
    return options(
      buscarEdificacoes(edificacoes ?? [], buscaEdificacoes),
      (e) => [e.codigo, `${e.codigo} - ${e.nome}`],
    );
  }, [edificacoes, buscaEdificacoes]);

  const props = useMemo(
    () => ({
      options: edificacoesOptions,
      onSearch: setBuscaEdificacoes,
      isLoading: buscaEdificacoesDebounce.isPending() || pontos.isLoading,
    }),
    [
      edificacoes,
      edificacoesOptions,
      setBuscaEdificacoes,
      buscaEdificacoesDebounce,
    ],
  );
  return props;
};
