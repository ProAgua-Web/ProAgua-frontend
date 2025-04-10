import {
  ImagemDto,
  createImages,
  deleteImages,
  updateImages,
} from '@/core/common/imagem/imagem.api';
import { api, type ApiResponse } from '@/lib/api';
import {
  type CreateSolicitacaoDto,
  type SolicitacaoDto,
  type UpdateSolicitacaoDto,
} from './solicitacao.model';

export async function listSolicitacoes() {
  const response =
    await api.get<ApiResponse<SolicitacaoDto[]>>('/solicitacoes');
  return response.data;
}

export async function getSolicitacao(id: number) {
  const response = await api.get<ApiResponse<SolicitacaoDto>>(
    `/solicitacoes/${id}`,
  );
  return response.data;
}

export async function createSolicitacao(
  solicitacao: CreateSolicitacaoDto,
): Promise<ApiResponse<SolicitacaoDto>> {
  const response = await api.post('/solicitacoes', solicitacao);
  return response.data;
}

export async function updateSolicitacao(
  id: number,
  solicitacao: UpdateSolicitacaoDto,
) {
  await api.put(`/solicitacoes/${id}`, solicitacao);
}

export async function deleteSolicitacao(id: number) {
  await api.delete(`/solicitacoes/${id}`);
}

export async function createImagensSolicitacao(
  id: number,
  imagens: Array<File | ImagemDto>,
) {
  return createImages({ entityPath: 'solicitacoes', identifier: id }, imagens);
}

export async function deleteImagensSolicitacao(
  id: number,
  imagens: ImagemDto[],
) {
  return deleteImages({ entityPath: 'solicitacoes', identifier: id }, imagens);
}

export async function updateImagensSolicitacao(
  id: number,
  imagensForm: Array<File | ImagemDto>,
  imagensExistentes: ImagemDto[],
) {
  return updateImages(
    { entityPath: 'solicitacoes', identifier: id },
    imagensForm,
    imagensExistentes,
  );
}
