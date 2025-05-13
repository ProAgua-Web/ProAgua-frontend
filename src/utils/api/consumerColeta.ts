import { Coleta, ColetaIn } from '../types';
import { APIConsumer, apiUrl } from './APIConsumer';

export const consumerColeta = new APIConsumer<ColetaIn, Coleta>(
  `${apiUrl}/coletas`,
);
