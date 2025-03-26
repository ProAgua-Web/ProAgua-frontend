import { api, type ApiResponse } from '@/lib/api';
import {
  type CreateEdificacaoDto,
  type EdificacaoDto,
  type UpdateEdificacaoDto,
} from './edificacao.model';

export async function listEdificacoes() {
  const response = await api.get<ApiResponse<EdificacaoDto[]>>('/edificacoes');
  return response.data;
}

export async function getEdificacao(codigo: string) {
  const response = await api.get<ApiResponse<EdificacaoDto>>(
    `/edificacoes/${codigo}`,
  );
  return response.data;
}

export async function createEdificacao(edificacao: CreateEdificacaoDto) {
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
