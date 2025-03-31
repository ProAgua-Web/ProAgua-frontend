import { api, type ApiResponse } from '@/lib/api';
import {
  type CreatePontoDto,
  type PontoDto,
  type UpdatePontoDto,
} from './ponto.model';

export interface PontoQueryOptions {
  q?: string;
  tipo?: Array<number>;
  limit?: number;
}

export async function listPontos(params?: PontoQueryOptions) {
  const response = await api.get<ApiResponse<PontoDto[]>>('/pontos', {
    params,
    paramsSerializer: {
      indexes: null,
    },
  });
  return response.data;
}

export async function getPonto(id: number) {
  const response = await api.get<ApiResponse<PontoDto>>(`/pontos/${id}`);
  return response.data;
}

export async function getPontosBySequenciaId(sequencia_id: number) {
  const response = await api.get<ApiResponse<PontoDto[]>>(
    `/sequencias/${sequencia_id}/pontos`,
  );
  return response.data;
}

export async function createPonto(ponto: CreatePontoDto) {
  await api.post('/pontos', ponto);
}

export async function updatePonto(id: number, ponto: UpdatePontoDto) {
  await api.put(`/pontos/${id}`, ponto);
}

export async function deletePontos(id: number) {
  await api.delete(`/pontos/${id}`);
}
