import { api, type ApiResponse } from '@/lib/api';
import {
  type ColetaDto,
  type CreateColetaDto,
  type UpdateColetaDto,
} from './coleta.model';

export interface ColetaQueryOptions {
  pontoId?: number;
  sequenciaId?: number;
}

export async function listColetas(params?: ColetaQueryOptions) {
  const response = await api.get<ApiResponse<ColetaDto[]>>('/coletas', {
    params,
  });
  return response.data;
}

export async function getColeta(id: number) {
  const response = await api.get<ApiResponse<ColetaDto>>(`/coletas/${id}`);
  return response.data;
}

export async function createColeta(coleta: CreateColetaDto) {
  await api.post('/coletas', coleta);
}

export async function updateColeta(id: number, coleta: UpdateColetaDto) {
  await api.put(`/coletas/${id}`, coleta);
}

export async function deleteColeta(id: number) {
  await api.delete(`/coletas/${id}`);
}
