import { api, ApiResponse } from '@/lib/api';
import { ReferenciaDto } from './referencia.model';

export async function getReferencia() {
  const response = await api.get<ApiResponse<ReferenciaDto>>(
    '/parametros_referencia',
  );
  return response.data;
}

export async function updateReferencia(referencia: ReferenciaDto) {
  await api.put(`/parametros_referencia`, referencia);
}
