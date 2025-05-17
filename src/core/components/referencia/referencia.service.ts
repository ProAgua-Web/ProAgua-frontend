import {
  type ApiMutationOptions,
  type ApiQueryOptions,
  useApiMutation,
  useApiQuery,
} from '@/lib/data-service';
import { getReferencia, updateReferencia } from './referencia.api';
import { type ReferenciaSchema } from './referencia.form';
import { referenciaSchemaToDto } from './referencia.mapper';
import { type ReferenciaDto } from './referencia.model';

export const useReferencia = (options?: ApiQueryOptions<ReferenciaDto>) => {
  return useApiQuery({
    queryKey: ['referencia'],
    queryFn: async () => {
      const response = await getReferencia();
      return response.data;
    },
    ...options,
  });
};

export interface EditarReferenciaArgs {
  referencia: ReferenciaSchema;
}

export const useEditarReferencia = (
  options?: ApiMutationOptions<EditarReferenciaArgs>,
) => {
  return useApiMutation<EditarReferenciaArgs>({
    mutationFn: ({ referencia }) => {
      return updateReferencia(referenciaSchemaToDto(referencia));
    },
    invalidateQueries: () => [['referencia']],
    successMessage: 'Parâmetros de referência editados com sucesso!',
    errorMessage: 'Não foi possível editar os parâmetros de referência',
    ...options,
  });
};
