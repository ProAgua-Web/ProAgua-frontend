import {
  type ApiMutationOptions,
  type ApiQueryOptions,
  useApiMutation,
  useApiQuery,
} from '@/lib/data-service';
import {
  createSequencia,
  deleteSequencia,
  getSequencia,
  listSequencias,
  updateSequencia,
} from './sequencia.api';
import { type SequenciaSchema } from './sequencia.form';
import {
  criarSequenciaSchemaToDto,
  editarSequenciaSchemaToDto,
} from './sequencia.mapper';
import { type CriarSequenciaDto, type SequenciaDto } from './sequencia.model';

export const useSequencias = (options?: ApiQueryOptions<SequenciaDto[]>) => {
  return useApiQuery({
    queryKey: ['sequencias'],
    queryFn: async (): Promise<SequenciaDto[]> => {
      const response = await listSequencias();
      if ('items' in response.data) {
        return response.data.items as SequenciaDto[];
      }
      return response.data;
    },
    ...options,
  });
};

export const useSequencia = (
  id: number,
  options?: ApiQueryOptions<SequenciaDto>,
) => {
  return useApiQuery({
    queryKey: ['sequencia', id],
    queryFn: async () => {
      const response = await getSequencia(id);
      return response.data;
    },
    ...options,
  });
};

export const useCriarSequencia = (
  options?: ApiMutationOptions<CriarSequenciaDto>,
) => {
  return useApiMutation({
    mutationFn: (sequencia) => {
      return createSequencia(criarSequenciaSchemaToDto(sequencia));
    },
    invalidateQueries: () => [['sequencias']],
    successMessage: 'Sequência criada com sucesso!',
    errorMessage: 'Não foi possível criar o convênio',
    ...options,
  });
};

export interface EditarSequenciaArgs {
  id: number;
  sequencia: SequenciaSchema;
}

export const useEditarSequencia = (
  options?: ApiMutationOptions<EditarSequenciaArgs>,
) => {
  return useApiMutation<EditarSequenciaArgs>({
    mutationFn: ({ id, sequencia }) => {
      return updateSequencia(id, editarSequenciaSchemaToDto(sequencia));
    },
    invalidateQueries: ({ id }) => [['sequencias'], ['sequencia', id]],
    successMessage: 'Sequência editada com sucesso!',
    errorMessage: 'Não foi possível editar a sequência',
    ...options,
  });
};

export const useExcluirSequencia = (options?: ApiMutationOptions<number>) => {
  return useApiMutation<number>({
    mutationFn: (id) => {
      return deleteSequencia(id);
    },
    invalidateQueries: (id) => [['sequencias'], ['sequencia', id]],
    successMessage: 'Sequência excluída com sucesso!',
    errorMessage: 'Não foi possível excluir a sequência',
    ...options,
  });
};
