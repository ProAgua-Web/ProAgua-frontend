import { Sequencia, SequenciaIn } from '../types';
import { APIConsumer, apiUrl } from './APIConsumer';

export const consumerSequencia = new APIConsumer<SequenciaIn, Sequencia>(
  `${apiUrl}/sequencias`,
);
