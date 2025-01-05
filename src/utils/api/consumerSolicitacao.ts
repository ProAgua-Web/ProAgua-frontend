import { Solicitacao, SolicitacaoIn } from '../types';
import { APIConsumer, apiUrl } from './APIConsumer';

export const consumerSolicitacao = new APIConsumer<SolicitacaoIn, Solicitacao>(
  `${apiUrl}/solicitacoes`,
);
