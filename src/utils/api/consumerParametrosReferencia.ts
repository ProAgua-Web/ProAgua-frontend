import { ParametroReferencia } from '../types';
import { APIConsumer, apiUrl } from './APIConsumer';

export const consumerParametrosReferencia = new APIConsumer<
  ParametroReferencia,
  ParametroReferencia
>(`${apiUrl}/parametros_referencia/`);
