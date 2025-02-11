import {
  type ApiMutationOptions,
  type ApiQueryOptions,
  useApiMutation,
  useApiQuery,
} from '@/lib/data-service';
import {
  createEdificacao,
  deleteEdificacao,
  getEdificacao,
  listEdificacoes,
  updateEdificacao,
} from './edificacao.api';
import { type EdificacaoSchema } from './edificacao.form';
import { edificacaoSchemaToDto } from './edificacao.mapper';
import { type Edificacao } from './edificacao.model';

export const useEdificacoes = (options?: ApiQueryOptions<Edificacao[]>) => {
  return useApiQuery({
    queryKey: ['edificacoes'],
    queryFn: async () => {
      const response = await listEdificacoes();
      return response.data;
    },
    ...options,
  });
};

export const useEdificacao = (
  codigo: string,
  options?: ApiQueryOptions<Edificacao>,
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
    errorMessage: 'Não foi possível criar o convênio',
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
    errorMessage: 'Não foi possível editar o convênio',
    ...options,
  });
};

export const useExcluirEdificacao = (options?: ApiMutationOptions<number>) => {
  return useApiMutation<number>({
    mutationFn: (id) => {
      return deleteEdificacao(id);
    },
    invalidateQueries: (id) => [['edificacoes'], ['edificacao', id]],
    successMessage: 'Edificação excluído com sucesso!',
    errorMessage: 'Não foi possível excluir o convênio',
    ...options,
  });
};
