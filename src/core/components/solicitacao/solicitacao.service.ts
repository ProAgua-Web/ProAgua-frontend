import { ApiResponse } from '@/lib/api';
import {
  type ApiMutationOptions,
  type ApiQueryOptions,
  useApiMutation,
  useApiQuery,
} from '@/lib/data-service';
import {
  createSolicitacao,
  deleteSolicitacao,
  exportSolicitacao,
  getSolicitacao,
  listSolicitacoes,
  updateSolicitacao,
} from './solicitacao.api';
import { type SolicitacaoSchema } from './solicitacao.form';
import { solicitacaoSchemaToDto } from './solicitacao.mapper';
import { type SolicitacaoDto } from './solicitacao.model';

export const useSolicitacoes = (
  options?: ApiQueryOptions<SolicitacaoDto[]>,
) => {
  return useApiQuery({
    queryKey: ['solicitacoes'],
    queryFn: async () => {
      const response = await listSolicitacoes();
      if ('items' in response.data) {
        return response.data.items as SolicitacaoDto[];
      }
      return response.data;
    },
    ...options,
  });
};

export const useSolicitacao = (
  id: number,
  options?: ApiQueryOptions<SolicitacaoDto>,
) => {
  return useApiQuery({
    queryKey: ['solicitacao', id],
    queryFn: async () => {
      const response = await getSolicitacao(id);
      return response.data;
    },
    ...options,
  });
};

export const useCriarSolicitacao = (
  options?: ApiMutationOptions<SolicitacaoSchema, ApiResponse<SolicitacaoDto>>,
) => {
  return useApiMutation({
    mutationFn: (solicitacao) => {
      return createSolicitacao(solicitacaoSchemaToDto(solicitacao));
    },
    invalidateQueries: () => [['solicitacoes']],
    successMessage: 'Solicitação criada com sucesso!',
    errorMessage: 'Não foi possível criar a solicitação',
    ...options,
  });
};

export interface EditarSolicitacaoArgs {
  id: number;
  solicitacao: SolicitacaoSchema;
}

export const useEditarSolicitacao = (
  options?: ApiMutationOptions<EditarSolicitacaoArgs>,
) => {
  return useApiMutation<EditarSolicitacaoArgs>({
    mutationFn: ({ id, solicitacao }) => {
      return updateSolicitacao(id, solicitacaoSchemaToDto(solicitacao));
    },
    invalidateQueries: ({ id }) => [['solicitacoes'], ['solicitacao', id]],
    successMessage: 'Solicitação editada com sucesso!',
    errorMessage: 'Não foi possível editar a solicitação',
    ...options,
  });
};

export const useExcluirSolicitacao = (options?: ApiMutationOptions<number>) => {
  return useApiMutation<number>({
    mutationFn: (id) => {
      return deleteSolicitacao(id);
    },
    invalidateQueries: (id) => [['solicitacoes'], ['solicitacao', id]],
    successMessage: 'Solicitação excluída com sucesso!',
    errorMessage: 'Não foi possível excluir a solicitação',
    ...options,
  });
};

export const useExportarSolicitacao = (
  id: number,
  options?: ApiQueryOptions<ApiResponse<Blob>>,
) => {
  return useApiQuery({
    enabled: false,
    queryKey: ['solicitacao', id, 'documento'],
    queryFn: async () => {
      const response = await exportSolicitacao(id);
      const blob = response.data as unknown as Blob;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'solicitacao-documento.docx');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      return response.data;
    },
    ...options,
  });
};
