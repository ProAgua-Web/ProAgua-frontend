import {
  createImages,
  deleteImages,
  ImagemDto,
  updateImages,
} from '@/core/common/imagem/imagem.api';
import { api, type ApiResponse } from '@/lib/api';
import {
  type CreateEdificacaoDto,
  type EdificacaoDto,
  type UpdateEdificacaoDto,
} from './edificacao.model';

export interface EdificacaoQueryOptions {
  q?: string;
  campus?: string;
  limit?: number;
}

export async function listEdificacoes(params?: EdificacaoQueryOptions) {
  const response = await api.get<ApiResponse<EdificacaoDto[]>>('/edificacoes', {
    params,
  });
  return response.data;
}

export async function getEdificacao(codigo: string) {
  const response = await api.get<ApiResponse<EdificacaoDto>>(
    `/edificacoes/${codigo}`,
  );
  return response.data;
}

export async function createEdificacao(edificacao: CreateEdificacaoDto) {
  const formData = new FormData();

  await api.post('/edificacoes', edificacao);
}

export async function updateEdificacao(
  codigo: string,
  edificacao: UpdateEdificacaoDto,
) {
  await api.put(`/edificacoes/${codigo}`, edificacao);
}

export async function deleteEdificacao(codigo: string) {
  await api.delete(`/edificacoes/${codigo}`);
}

export async function createImagensEdificacao(
  codigo: string,
  imagens: Array<File | ImagemDto>,
) {
  return createImages(
    { entityPath: 'edificacoes', identifier: codigo },
    imagens,
  );
}

export async function deleteImagensEdificacao(
  codigo: string,
  imagens: ImagemDto[],
) {
  return deleteImages(
    { entityPath: 'edificacoes', identifier: codigo },
    imagens,
  );
}

export async function updateImagensEdificacao(
  codigo: string,
  imagensForm: Array<File | ImagemDto>,
  imagensExistentes: ImagemDto[],
) {
  return updateImages(
    { entityPath: 'edificacoes', identifier: codigo },
    imagensForm,
    imagensExistentes,
  );
}
