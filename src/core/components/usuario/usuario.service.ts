import {
  createUsuario,
  deleteUsuario,
  getUsuario,
  listUsuarios,
  updateUsuario,
} from '@/core/components/usuario/usuario.api';
import {
  useApiMutation,
  useApiQuery,
  type ApiMutationOptions,
  type ApiQueryOptions,
} from '@/lib/data-service';
import { type UsuarioSchema } from './usuario.form';
import { usuarioSchemaToDto } from './usuario.mapper';
import { type UsuarioDto } from './usuario.model';

export const useUsuarios = (options?: ApiQueryOptions<UsuarioDto[]>) => {
  return useApiQuery({
    queryKey: ['usuarios'],
    queryFn: async () => {
      const response = await listUsuarios();
      if ('items' in response.data) {
        return response.data.items as UsuarioDto[];
      }
      return response.data;
    },
    ...options,
  });
};

export const useUsuario = (
  id: number,
  options?: ApiQueryOptions<UsuarioDto>,
) => {
  return useApiQuery({
    queryKey: ['usuario', id],
    queryFn: async () => {
      const response = await getUsuario(id);
      return response.data;
    },
    ...options,
  });
};

export const useCriarUsuario = (
  options?: ApiMutationOptions<UsuarioSchema>,
) => {
  return useApiMutation({
    mutationFn: (usuario) => {
      return createUsuario(usuarioSchemaToDto(usuario));
    },
    invalidateQueries: () => [['usuarios']],
    successMessage: 'Usuário cadastrado com sucesso!',
    errorMessage: 'Não foi possível cadastrar o usuário',
    ...options,
  });
};

interface EditarUsuarioArgs {
  id: number;
  usuario: UsuarioSchema;
}

export const useEditarUsuario = (
  options?: ApiMutationOptions<EditarUsuarioArgs>,
) => {
  return useApiMutation<EditarUsuarioArgs>({
    mutationFn: ({ id, usuario }) => {
      return updateUsuario(id, usuarioSchemaToDto(usuario));
    },
    invalidateQueries: ({ id }) => [
      ['usuarios'],
      ['usuario', id],
      ['usuario-autenticado'],
    ],
    successMessage: 'Usuário atualizado com sucesso!',
    errorMessage: 'Não foi possível atualizar o usuário',
    ...options,
  });
};

export const useExcluirUsuario = (options?: ApiMutationOptions<number>) => {
  return useApiMutation<number>({
    mutationFn: (id) => {
      return deleteUsuario(id);
    },
    invalidateQueries: (id) => [
      ['usuarios'],
      ['usuario', id],
      ['usuario-autenticado'],
    ],
    successMessage: 'Usuário excluído com sucesso!',
    errorMessage: 'Não foi possível excluir o usuário',
    ...options,
  });
};
