import {
  createImages,
  deleteImages,
  updateImages,
  type ImagemDto,
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
  const response = await api.post<ApiResponse<SolicitacaoDto>>(
    '/solicitacoes',
    solicitacao,
  );
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
  return await createImages(
    { entityPath: 'solicitacoes', identifier: id },
    imagens,
  );
}

export async function deleteImagensSolicitacao(
  id: number,
  imagens: ImagemDto[],
) {
  return await deleteImages(
    { entityPath: 'solicitacoes', identifier: id },
    imagens,
  );
}

export async function updateImagensSolicitacao(
  id: number,
  imagensForm: Array<File | ImagemDto>,
  imagensExistentes: ImagemDto[],
) {
  return await updateImages(
    { entityPath: 'solicitacoes', identifier: id },
    imagensForm,
    imagensExistentes,
  );
}

export async function exportSolicitacao(id: number) {
  const response = await api.get<ApiResponse<Blob>>(
    `/solicitacoes/${id}/document`,
    {
      responseType: 'blob',
    },
  );

  const contentDisposition = response.headers['content-disposition'] as
    | string
    | undefined;
  const filename =
    contentDisposition
      ?.split(';')
      .find((part) => part.trim().startsWith('filename='))
      ?.split('=')[1]
      ?.replace(/"/g, '') ?? 'default-filename';

  return {
    data: response.data,
    filename,
  };
}
