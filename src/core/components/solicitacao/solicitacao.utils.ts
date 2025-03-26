import { useDebouncedState } from '@/lib/hooks/use-debounced-state';
import { options } from '@/lib/utils';
import { useMemo } from 'react';
import { type SolicitacaoDto } from './solicitacao.model';
import { useSolicitacoes } from './solicitacao.service';

export function buscarSolicitacoes(
  solicitacoes: SolicitacaoDto[],
  busca: string,
): SolicitacaoDto[] {
  if (!busca) {
    return solicitacoes;
  }
  busca = busca.toLocaleLowerCase();

  return solicitacoes.filter(
    (solicitacao) =>
      solicitacao.tipo.toLocaleLowerCase().includes(busca) ||
      solicitacao.justificativa.toLocaleLowerCase().includes(busca) ||
      solicitacao.objetivo.toString().includes(busca) ||
      solicitacao.status.toLocaleLowerCase().includes(busca),
  );
}

export const useSolicitacoesOptions = () => {
  const solicitacoes = useSolicitacoes();

  const [
    [buscaSolicitacoes, buscaSolicitacoesDebounce],
    [, setBuscaSolicitacoes],
  ] = useDebouncedState('');
  const solicitacoesOptions = useMemo(() => {
    return options(
      buscarSolicitacoes(solicitacoes.data ?? [], buscaSolicitacoes),
      (s) => [s.id!, `${s.id} - ${s.tipo}`],
    );
  }, [solicitacoes.data, buscaSolicitacoes]);

  const props = useMemo(
    () => ({
      options: solicitacoesOptions,
      onSearch: setBuscaSolicitacoes,
      isLoading:
        buscaSolicitacoesDebounce.isPending() || solicitacoes.isLoading,
    }),
    [
      solicitacoes,
      solicitacoesOptions,
      setBuscaSolicitacoes,
      buscaSolicitacoesDebounce,
    ],
  );

  return props;
};

export const StatusSolicitacao = {
  PENDENTE: 'Pendente',
  EM_ANDAMENTO: 'Em andamento',
  CONCLUIDO: 'Concluido',
} as const;

export type StatusSolicitacao =
  (typeof StatusSolicitacao)[keyof typeof StatusSolicitacao];

export const statusSolicitacao = Object.values(StatusSolicitacao);

export const statusSolicitacaoLabel = {
  'Pendente': 'Pendente',
  'Em andamento': 'Em andamento',
  'Concluido': 'Concluido',
} as const satisfies Record<StatusSolicitacao, string>;

export const statusSolicitacaoOptions = options(statusSolicitacao, (s) => [
  s,
  statusSolicitacaoLabel[s],
]);

export const TipoSolicitacao = {
  LIMPEZA_RESERVATORIO: 'Limpeza de reservatório',
  INSTALACAO_PONTO: 'Instalação de ponto de coleta',
  CONSERTO_RESERVATORIO: 'Conserto de reservatório',
} as const;

export type TipoSolicitacao =
  (typeof TipoSolicitacao)[keyof typeof TipoSolicitacao];

export const tipoSolicitacao = Object.values(TipoSolicitacao);

export const tipoSolicitacaoLabel = {
  'Limpeza de reservatório': 'Limpeza de reservatório',
  'Instalação de ponto de coleta': 'Instalação de ponto de coleta',
  'Conserto de reservatório': 'Conserto de reservatório',
} as const satisfies Record<TipoSolicitacao, string>;

export const tipoSolicitacaoOptions = options(tipoSolicitacao, (t) => [
  t,
  tipoSolicitacaoLabel[t],
]);
