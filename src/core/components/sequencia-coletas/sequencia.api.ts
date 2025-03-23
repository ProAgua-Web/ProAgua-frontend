import { api, type ApiResponse } from '@/lib/api';
import {
  type CriarSequenciaDto,
  type EditarSequenciaDto,
  type SequenciaDto,
} from './sequencia.model';

export async function listSequencias() {
  const response = await api.get<ApiResponse<SequenciaDto[]>>('/sequencias');
  return response.data;
}

export async function getSequencia(id: number) {
  const response = await api.get<ApiResponse<SequenciaDto>>(
    `/sequencias/${id}`,
  );
  return response.data;
}

export async function createSequencia(sequencia: CriarSequenciaDto) {
  await api.post('/sequencias', sequencia);
}

export async function updateSequencia(
  id: number,
  sequencia: EditarSequenciaDto,
) {
  await api.put(`/sequencias/${id}`, sequencia);
}

export async function deleteSequencia(id: number) {
  await api.delete(`/sequencias/${id}`);
}
