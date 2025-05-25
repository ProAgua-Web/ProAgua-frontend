import { api, type ApiResponse } from '@/lib/api';
import {
  type ColetaDto,
  type CreateColetaDto,
  type UpdateColetaDto,
} from './coleta.model';

export interface ColetaQueryOptions {
  ponto_id?: number;
  sequencia_id?: number;
  responsavel?: string;
  data_minima?: string;
  data_maxima?: string;
  temperatura_minima?: number;
  temperatura_maxima?: number;
  cloro_residual_livre_minimo?: number;
  cloro_residual_livre_maximo?: number;
  turbidez_minima?: number;
  turbidez_maxima?: number;
  coliformes_totais?: boolean;
  escherichia?: boolean;
  status?: boolean;
  cor_minima?: number;
  cor_maxima?: number;
  ordem?: string;
  codigo_edificacao?: string;
  limit?: number;
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

export async function getColetaPublica(ponto_id: number) {
  const response = await api.get<ApiResponse<ColetaDto>>(
    `/public/pontos/${ponto_id}/coleta`,
  );
  return response.data;
}

export async function exportColetas(params?: ColetaQueryOptions) {
  const response = await api.get<ApiResponse<Blob>>('/coletas/excel', {
    params,
    responseType: 'blob',
  });

  const contentDisposition = response.headers['content-disposition'] as
    | string
    | undefined;
  const filename =
    contentDisposition
      ?.split(';')[1]
      ?.split('filename=')[1]
      ?.replace(/"/g, '') ?? 'default-filename';

  return {
    data: response.data,
    filename,
  };
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
