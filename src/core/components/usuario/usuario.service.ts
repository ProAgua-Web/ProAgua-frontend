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
import { EditarUsuarioSchema, type CriarUsuarioSchema } from './usuario.form';
import {
  createUsuarioSchemaToDto,
  updateUsuarioSchemaToDto,
} from './usuario.mapper';
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
  username: string,
  options?: ApiQueryOptions<UsuarioDto>,
) => {
  return useApiQuery({
    queryKey: ['usuario', username],
    queryFn: async () => {
      const response = await getUsuario(username);
      return response.data;
    },
    ...options,
  });
};

export const useCriarUsuario = (
  options?: ApiMutationOptions<CriarUsuarioSchema>,
) => {
  return useApiMutation({
    mutationFn: (usuario) => {
      return createUsuario(createUsuarioSchemaToDto(usuario));
    },
    invalidateQueries: () => [['usuarios']],
    successMessage: 'Usuário cadastrado com sucesso!',
    errorMessage: 'Não foi possível cadastrar o usuário',
    ...options,
  });
};

interface EditarUsuarioArgs {
  username: string;
  usuario: EditarUsuarioSchema;
}

export const useEditarUsuario = (
  options?: ApiMutationOptions<EditarUsuarioArgs>,
) => {
  return useApiMutation<EditarUsuarioArgs>({
    mutationFn: ({ username, usuario }) => {
      return updateUsuario(username, updateUsuarioSchemaToDto(usuario));
    },
    invalidateQueries: ({ username }) => [
      ['usuarios'],
      ['usuario', username],
      ['usuario-autenticado'],
    ],
    successMessage: 'Usuário atualizado com sucesso!',
    errorMessage: 'Não foi possível atualizar o usuário',
    ...options,
  });
};

export const useExcluirUsuario = (options?: ApiMutationOptions<string>) => {
  return useApiMutation<string>({
    mutationFn: (username) => {
      return deleteUsuario(username);
    },
    invalidateQueries: (username) => [
      ['usuarios'],
      ['usuario', username],
      ['usuario-autenticado'],
    ],
    successMessage: 'Usuário excluído com sucesso!',
    errorMessage: 'Não foi possível excluir o usuário',
    ...options,
  });
};
