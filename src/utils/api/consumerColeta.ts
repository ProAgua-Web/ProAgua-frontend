import { ColetaIn, Coleta } from '../types';
import { APIConsumer } from './APIConsumer';
import { apiUrl } from './APIConsumer';

export const consumerColeta = new APIConsumer<ColetaIn, Coleta>(
  `${apiUrl}/api/v1/coletas/`,
);
