import { useDebouncedState } from '@/lib/hooks/use-debounced-state';
import { options } from '@/lib/utils';
import { useMemo } from 'react';
import { type Edificacao } from './edificacao.model';
import { useEdificacoes } from './edificacao.service';

export function buscarEdificacoes(
  edificacoes: Edificacao[],
  busca: string,
): Edificacao[] {
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
      (c) => [c.codigo, c.nome],
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

export const useModalidadeEdificacoesOptions = () => {
  const edificacoes = useEdificacoes();

  const [[busca, buscaDebounce], [, setBuscaEdificacoes]] =
    useDebouncedState('');
  const edificacoesOptions = useMemo(() => {
    if (!edificacoes.data) {
      return [];
    }

    const particular = { value: 0, label: 'Particular' };

    if (!busca) {
      return [
        particular,
        ...options(edificacoes.data, (c) => [c.codigo, c.nome]),
      ];
    }

    return [
      particular,
      ...options(buscarEdificacoes(edificacoes.data, busca), (c) => [
        c.codigo,
        c.nome,
      ]),
    ];
  }, [edificacoes.data, busca]);

  const props = useMemo(
    () => ({
      options: edificacoesOptions,
      onSearch: setBuscaEdificacoes,
      isLoading: buscaDebounce.isPending() || edificacoes.isLoading,
    }),
    [edificacoes, edificacoesOptions, setBuscaEdificacoes, buscaDebounce],
  );

  return props;
};
