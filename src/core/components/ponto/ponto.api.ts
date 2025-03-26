import { api, type ApiResponse } from '@/lib/api';
import { type CreatePontoDto, type PontoDto } from './ponto.model';

export interface PontoQueryOptions {
  q?: string;
}

export async function listPontos(params?: PontoQueryOptions) {
  const response = await api.get<ApiResponse<PontoDto[]>>('/pontos', {
    params,
  });
  return response.data;
}

export async function getPonto(id: string, params?: PontoQueryOptions) {
  const response = await api.get<ApiResponse<PontoDto>>(`/pontos/${id}`, {
    params,
  });
  return response.data;
}

export async function createPonto(ponto: CreatePontoDto) {
  await api.post('/pontos', ponto);
}

export async function updatePonto(id: string, ponto: CreatePontoDto) {
  await api.put(`/pontos/${id}`, ponto);
}

export async function deletePontos(id: number) {
  await api.delete(`/pontos/${id}`);
}
