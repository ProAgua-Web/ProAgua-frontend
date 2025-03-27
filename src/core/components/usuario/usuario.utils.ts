import { useDebouncedState } from '@/lib/hooks/use-debounced-state';
import { options } from '@/lib/utils';
import { useMemo } from 'react';
import { type UsuarioDto } from './usuario.model';
import { useUsuarios } from './usuario.service';

export function buscarUsuario(
  usuarios: UsuarioDto[],
  busca: string,
): UsuarioDto[] {
  if (!busca) {
    return usuarios;
  }
  busca = busca.toLocaleLowerCase();

  return usuarios.filter(
    (usuario) =>
      usuario.first_name.toLocaleLowerCase().includes(busca) ||
      usuario.last_name.toLocaleLowerCase().includes(busca) ||
      usuario.username.toLocaleLowerCase().includes(busca) ||
      usuario.email.toString().includes(busca),
  );
}

export const useUsuariosOptions = () => {
  const usuarios = useUsuarios();

  const [[buscaUsuarios, buscaUsuariosDebounce], [, setBuscaUsuarios]] =
    useDebouncedState('');
  const usuariosOptions = useMemo(() => {
    return options(buscarUsuario(usuarios.data ?? [], buscaUsuarios), (u) => [
      u.id!,
      // `${u.id} - ${u.first_name} ${u.last_name}`,
      `${u.id} - ${u.username}`,
    ]);
  }, [usuarios.data, buscaUsuarios]);

  const props = useMemo(
    () => ({
      options: usuariosOptions,
      onSearch: setBuscaUsuarios,
      isLoading: buscaUsuariosDebounce.isPending() || usuarios.isLoading,
    }),
    [usuarios, usuariosOptions, setBuscaUsuarios, buscaUsuariosDebounce],
  );

  return props;
};
