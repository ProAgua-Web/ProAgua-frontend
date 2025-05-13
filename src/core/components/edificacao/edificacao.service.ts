import {
  type ApiMutationOptions,
  type ApiQueryOptions,
  useApiMutation,
  useApiQuery,
} from '@/lib/data-service';
import {
  createEdificacao,
  deleteEdificacao,
  EdificacaoQueryOptions,
  getEdificacao,
  listEdificacoes,
  updateEdificacao,
} from './edificacao.api';

import { type EdificacaoSchema } from './edificacao.form';
import { edificacaoSchemaToDto } from './edificacao.mapper';
import { type EdificacaoDto } from './edificacao.model';

export const useEdificacoes = (
  params?: EdificacaoQueryOptions,
  options?: ApiQueryOptions<EdificacaoDto[]>,
) => {
  return useApiQuery({
    queryKey: ['edificacoes', params],
    queryFn: async () => {
      const response = await listEdificacoes(params);
      if ('items' in response.data) {
        return response.data.items as EdificacaoDto[];
      }
      return response.data;
    },
    ...options,
  });
};

export const useEdificacao = (
  codigo: string,
  options?: ApiQueryOptions<EdificacaoDto>,
) => {
  return useApiQuery({
    queryKey: ['edificacao', codigo],
    queryFn: async () => {
      const response = await getEdificacao(codigo);
      return response.data;
    },
    ...options,
  });
};

export const useCriarEdificacao = (
  options?: ApiMutationOptions<EdificacaoSchema>,
) => {
  return useApiMutation<EdificacaoSchema>({
    mutationFn: (edificacao) => {
      return createEdificacao(edificacaoSchemaToDto(edificacao));
    },
    invalidateQueries: () => [['edificacoes']],
    successMessage: 'Edificação criado com sucesso!',
    errorMessage: 'Não foi possível criar a edificação',
    ...options,
  });
};

export interface EditarEdificacaoArgs {
  codigo: string;
  edificacao: EdificacaoSchema;
}

export const useEditarEdificacao = (
  options?: ApiMutationOptions<EditarEdificacaoArgs>,
) => {
  return useApiMutation<EditarEdificacaoArgs>({
    mutationFn: ({ codigo, edificacao }) => {
      return updateEdificacao(codigo, edificacaoSchemaToDto(edificacao));
    },
    invalidateQueries: ({ codigo }) => [
      ['edificacoes'],
      ['edificacao', codigo],
    ],
    successMessage: 'Edificação editado com sucesso!',
    errorMessage: 'Não foi possível editar a edificação',
    ...options,
  });
};

export const useExcluirEdificacao = (options?: ApiMutationOptions<string>) => {
  return useApiMutation<string>({
    mutationFn: (id) => {
      return deleteEdificacao(id);
    },
    invalidateQueries: (id) => [['edificacoes'], ['edificacao', id]],
    successMessage: 'Edificação excluído com sucesso!',
    errorMessage: 'Não foi possível excluir a edificação',
    ...options,
  });
};
