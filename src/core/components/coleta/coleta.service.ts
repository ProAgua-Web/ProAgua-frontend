import { ApiResponse } from '@/lib/api';
import {
  type ApiMutationOptions,
  type ApiQueryOptions,
  useApiMutation,
  useApiQuery,
} from '@/lib/data-service';
import {
  type ColetaQueryOptions,
  createColeta,
  deleteColeta,
  exportColetas,
  getColeta,
  getColetaPublica,
  listColetas,
  updateColeta,
} from './coleta.api';
import { type ColetaSchema } from './coleta.form';
import { coletaSchemaToDto } from './coleta.mapper';
import { type ColetaDto } from './coleta.model';

export const useColetas = (
  params?: ColetaQueryOptions,
  options?: ApiQueryOptions<ColetaDto[]>,
) => {
  return useApiQuery({
    queryKey: ['coletas', params],
    queryFn: async (): Promise<ColetaDto[]> => {
      const response = await listColetas(params);
      if ('items' in response.data) {
        return response.data.items as ColetaDto[];
      }
      return response.data;
    },
    ...options,
  });
};

export const useColeta = (id: number, options?: ApiQueryOptions<ColetaDto>) => {
  return useApiQuery({
    enabled: !!id,
    queryKey: ['coleta', id],
    queryFn: async () => {
      const response = await getColeta(id);
      return response.data;
    },
    ...options,
  });
};

export const useColetaPublica = (
  ponto_id: number,
  options?: ApiQueryOptions<ColetaDto>,
) => {
  return useApiQuery({
    enabled: !!ponto_id,
    queryKey: ['coleta', 'publica', ponto_id],
    queryFn: async () => {
      const response = await getColetaPublica(ponto_id);
      return response.data;
    },
    ...options,
  });
};

export const useCriarColeta = (options?: ApiMutationOptions<ColetaSchema>) => {
  return useApiMutation({
    mutationFn: (coleta) => {
      return createColeta(coletaSchemaToDto(coleta));
    },
    invalidateQueries: () => [['coletas']],
    successMessage: 'Coleta criada com sucesso!',
    errorMessage: 'Não foi possível criar a coleta',
    ...options,
  });
};

export interface EditarColetaArgs {
  id: number;
  coleta: ColetaSchema;
}

export const useEditarColeta = (
  options?: ApiMutationOptions<EditarColetaArgs>,
) => {
  return useApiMutation<EditarColetaArgs>({
    mutationFn: ({ id, coleta }) => {
      return updateColeta(id, coletaSchemaToDto(coleta));
    },
    invalidateQueries: ({ id }) => [['coletas'], ['coleta', id]],
    successMessage: 'Coleta editada com sucesso!',
    errorMessage: 'Não foi possível editar a coleta',
    ...options,
  });
};

export const useExcluirColeta = (options?: ApiMutationOptions<number>) => {
  return useApiMutation<number>({
    mutationFn: (id) => {
      return deleteColeta(id);
    },
    invalidateQueries: (id) => [['coletas'], ['coleta', id]],
    successMessage: 'Coleta excluída com sucesso!',
    errorMessage: 'Não foi possível excluir a coleta',
    ...options,
  });
};

export const useExportarColetas = (
  params?: ColetaQueryOptions,
  options?: ApiQueryOptions<ApiResponse<Blob>>,
) => {
  return useApiQuery({
    enabled: false, // Função só funcionará através do refetch
    queryKey: ['coletas', 'exportar', params],
    queryFn: async () => {
      const response = await exportColetas(params);
      const blob = response.data as unknown as Blob;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'coletas-exportadas.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      return response.data;
    },
    ...options,
  });
};
