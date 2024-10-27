import { ParametroReferencia } from '../types';
import { APIConsumer } from './APIConsumer';
import { apiUrl } from './APIConsumer';

export const consumerParametrosReferencia = new APIConsumer<
  ParametroReferencia,
  ParametroReferencia
>(`${apiUrl}/api/v1/parametros_referencia/`);
