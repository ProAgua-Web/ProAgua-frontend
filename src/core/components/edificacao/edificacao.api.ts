import { ImagemDTO } from '@/core/common/imagem/imagem.api';
import { api, type ApiResponse } from '@/lib/api';
import { Campus } from '@/lib/utils';

export interface EdificacaoDTO {
  codigo: string;
  nome: string;
  campus: Campus;
  cronograma: number;
  imagens: ImagemDTO[];
  pontos_url: string;
  informacoes_gerais?: string;
}

export interface CreateEdificacaoDTO {
  codigo: string;
  nome: string;
  campus: Campus;
  cronograma: number;
  informacoes_gerais?: string | null;
  imagens: ImagemDTO[];
}

export async function listEdificacoes() {
  const response = await api.get<ApiResponse<EdificacaoDTO[]>>('/edificacoes');
  return response.data;
}

export async function getEdificacao(codigo: string) {
  const response = await api.get<ApiResponse<EdificacaoDTO>>(
    `/edificacoes/${codigo}`,
  );
  return response.data;
}

export async function createEdificacao(edificacao: CreateEdificacaoDTO) {
  await api.post('/edificacoes', edificacao);
}

export async function updateEdificacao(
  codigo: string,
  edificacao: CreateEdificacaoDTO,
) {
  await api.put(`/edificacoes/${codigo}`, edificacao);
}

export async function deleteEdificacao(id: number) {
  await api.delete(`/edificacoes/${id}`);
}
