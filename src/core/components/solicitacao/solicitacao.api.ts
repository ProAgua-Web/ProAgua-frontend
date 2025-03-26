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

export async function createSolicitacao(solicitacao: CreateSolicitacaoDto) {
  await api.post('/solicitacoes', solicitacao);
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
