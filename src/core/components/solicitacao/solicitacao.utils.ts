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
  OUTRO: 'Outro',
} as const;

export type TipoSolicitacao =
  (typeof TipoSolicitacao)[keyof typeof TipoSolicitacao];

export const tipoSolicitacao = Object.values(TipoSolicitacao);

export const tipoSolicitacaoLabel = {
  'Limpeza de reservatório': 'Limpeza de reservatório',
  'Instalação de ponto de coleta': 'Instalação de ponto de coleta',
  'Conserto de reservatório': 'Conserto de reservatório',
  'Outro': 'Outro',
} as const satisfies Record<TipoSolicitacao, string>;

export const tipoSolicitacaoOptions = options(tipoSolicitacao, (t) => [
  t,
  tipoSolicitacaoLabel[t],
]);

interface DetalhesSolicitacao {
  objetivo: string;
  justificativa: string;
}

export const SolicitacaoDefaultValues: Record<
  TipoSolicitacao,
  DetalhesSolicitacao
> = {
  'Outro': {
    objetivo: '',
    justificativa: '',
  },
  'Limpeza de reservatório': {
    objetivo:
      'Contribuir para a preservação da potabilidade da água para consumo humano da UFERSA.',
    justificativa:
      '- Comprovação da necessidade de limpeza do reservatório de água, a partir de amostragem de água no âmbito do projeto “Qualidade da água para consumo humano: estudo no sistema da UFERSA-Mossoró” (cadastro na PROPPG: PIB10009-2019).\n\n' +
      '- Preservação da potabilidade da água conforme previsto na NBR 5626/2020 (ABNT, 2020, p. 40)¹:\n' +
      '[...] “Todas as partes acessíveis dos componentes que têm contato com a água devem ser limpas periodicamente.” [...]\n\n' +
      'Obs.: Para limpeza de reservatório de água, recomenda-se o procedimento especificado no Anexo F da NBR 5626/2020.',
  },
  'Instalação de ponto de coleta': {
    objetivo:
      'Possibilitar a coleta de água a montante do reservatório superior.',
    justificativa:
      'Verificação no local com apoio do encanador, assim como, comprovação da necessidade de existência de ponto de coleta de água, a partir de amostragem de água no âmbito do projeto “Qualidade da água para consumo humano: estudo no sistema da UFERSA-Mossoró” (cadastro na PROPPG: PIB10009- 2019).\n',
  },
  'Conserto de reservatório': {
    objetivo:
      'Contribuir para a proteção sanitária e preservação da potabilidade da água para consumo humano na UFERSA.',
    justificativa:
      'Verificação no local e comprovação da necessidade de substituição ou conserto da tampa do reservatório de água inferior, a partir de amostragem de água no âmbito do projeto “Qualidade da água para consumo humano: estudo no sistema da UFERSA-Mossoró” (cadastro na PROPPG: PIB10009-2019).\n\n' +
      '- Proteção sanitária e preservação da potabilidade de água conforme previsto na NBR 5626/2020 (ABNT, 2020, p. 14) ¹:\n' +
      '[...] “O reservatório deve ser um recipiente estanque, com tampa ou abertura\n' +
      'com porta de acesso, opaca, firmemente presa na sua posição quando fechada.”\n\n' +
      '- Preservação da potabilidade da água conforme previsto na NBR 5626/2020 (ABNT, 2020, p. 40):\n' +
      '[...] “Deve-se fazer uma verificação periódica para se assegurar que as tampas dos reservatórios estão posicionadas e fixadas nos locais corretos e impedem o ingresso de corpos estranhos ou água de outras fontes no reservatório.” [...]\n\n' +
      '- O padrão de potabilidade da água para consumo humano é estabelecido em\n' +
      'Portaria do Ministério da Saúde² ³ ⁴;',
  },
};
