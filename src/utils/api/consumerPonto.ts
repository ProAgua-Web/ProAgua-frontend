import { Ponto, PontoIn } from '../types';
import { APIConsumer, apiUrl } from './APIConsumer';

export const consumerPonto = new APIConsumer<PontoIn, Ponto>(
  `${apiUrl}/pontos`,
);
