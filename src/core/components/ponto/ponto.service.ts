import { ApiResponse } from '@/lib/api';
import {
  type ApiMutationOptions,
  type ApiQueryOptions,
  useApiMutation,
  useApiQuery,
} from '@/lib/data-service';
import {
  createPonto,
  deletePontos,
  getPonto,
  getPontosBySequenciaId,
  listPontos,
  type PontoQueryOptions,
  updatePonto,
} from './ponto.api';
import { type PontoSchema } from './ponto.form';
import { pontoSchemaToDto } from './ponto.mapper';
import { type PontoDto } from './ponto.model';

export const usePontos = (
  params?: PontoQueryOptions,
  options?: ApiQueryOptions<PontoDto[]>,
) => {
  return useApiQuery({
    queryKey: ['pontos', params],
    queryFn: async () => {
      const response = await listPontos(params);
      if ('items' in response.data) {
        return response.data.items as PontoDto[];
      }
      return response.data;
    },
    ...options,
  });
};

export const usePontosBySequenciaId = (
  sequencia_id?: number,
  options?: ApiQueryOptions<PontoDto[]>,
) => {
  return useApiQuery({
    enabled: !!sequencia_id,
    queryKey: ['pontos', 'sequencia', sequencia_id],
    queryFn: async () => {
      const response = await getPontosBySequenciaId(sequencia_id!);
      if ('items' in response.data) {
        return response.data.items as PontoDto[];
      }
      return response.data;
    },
    ...options,
  });
};

export const usePonto = (id: number, options?: ApiQueryOptions<PontoDto>) => {
  return useApiQuery({
    queryKey: ['ponto', id],
    queryFn: async () => {
      const response = await getPonto(id);
      return response.data;
    },
    ...options,
  });
};

export const useCriarPonto = (
  options?: ApiMutationOptions<PontoSchema, ApiResponse<PontoDto>>,
) => {
  return useApiMutation({
    mutationFn: (ponto) => {
      return createPonto(pontoSchemaToDto(ponto));
    },
    invalidateQueries: () => [['pontos']],
    successMessage: 'Ponto criado com sucesso!',
    errorMessage: 'Não foi possível criar o ponto',
    ...options,
  });
};

export interface EditarPontoArgs {
  id: number;
  ponto: PontoSchema;
}

export const useEditarPonto = (
  options?: ApiMutationOptions<EditarPontoArgs>,
) => {
  return useApiMutation<EditarPontoArgs>({
    mutationFn: ({ id, ponto }) => {
      return updatePonto(id, pontoSchemaToDto(ponto));
    },
    invalidateQueries: ({ id }) => [['pontos'], ['ponto', id]],
    successMessage: 'Ponto editado com sucesso!',
    errorMessage: 'Não foi possível editar o ponto',
    ...options,
  });
};

export const useExcluirPonto = (options?: ApiMutationOptions<number>) => {
  return useApiMutation<number>({
    mutationFn: (id) => {
      return deletePontos(id);
    },
    invalidateQueries: (id) => [['pontos'], ['ponto', id]],
    successMessage: 'Ponto excluído com sucesso!',
    errorMessage: 'Não foi possível excluir o ponto',
    ...options,
  });
};
