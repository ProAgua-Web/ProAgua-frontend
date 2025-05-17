import {
  createImages,
  deleteImages,
  type ImagemDto,
  updateImages,
} from '@/core/common/imagem/imagem.api';
import { api, type ApiResponse } from '@/lib/api';
import {
  type CreatePontoDto,
  type PontoDto,
  type UpdatePontoDto,
} from './ponto.model';

export interface PontoQueryOptions {
  q?: string;
  campus?: string;
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

export async function listPontosPublicos(params?: PontoQueryOptions) {
  const response = await api.get<ApiResponse<PontoDto[]>>('/public/pontos', {
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

export async function getPontoPublico(id: number) {
  const response = await api.get<ApiResponse<PontoDto>>(`/public/pontos/${id}`);
  return response.data;
}

export async function getPontosBySequenciaId(sequencia_id: number) {
  const response = await api.get<ApiResponse<PontoDto[]>>(
    `/sequencias/${sequencia_id}/pontos`,
  );
  return response.data;
}

export async function createPonto(
  ponto: CreatePontoDto,
): Promise<ApiResponse<PontoDto>> {
  const response = await api.post<ApiResponse<PontoDto>>('/pontos', ponto);
  return response.data;
}

export async function updatePonto(id: number, ponto: UpdatePontoDto) {
  await api.put(`/pontos/${id}`, ponto);
}

export async function deletePontos(id: number) {
  await api.delete(`/pontos/${id}`);
}

export async function createImagensPonto(
  id: number,
  imagens: Array<File | ImagemDto>,
) {
  return await createImages({ entityPath: 'pontos', identifier: id }, imagens);
}

export async function deleteImagensPonto(id: number, imagens: ImagemDto[]) {
  return await deleteImages({ entityPath: 'pontos', identifier: id }, imagens);
}

export async function updateImagensPonto(
  id: number,
  imagensForm: Array<File | ImagemDto>,
  imagensExistentes: ImagemDto[],
) {
  return await updateImages(
    { entityPath: 'pontos', identifier: id },
    imagensForm,
    imagensExistentes,
  );
}
