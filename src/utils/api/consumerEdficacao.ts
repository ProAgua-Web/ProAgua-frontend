import { Edificacao, EdificacaoIn } from '../types';
import { APIConsumer, apiUrl } from './APIConsumer';

export const consumerEdficacao = new APIConsumer<EdificacaoIn, Edificacao>(
  `${apiUrl}/api/v1/edificacoes`,
);
