import { getUsuarioByUsername } from '@/core/components/usuario/usuario.api';
import { type UsuarioDto } from '@/core/components/usuario/usuario.model';
import {
  type ApiMutationOptions,
  type ApiQueryOptions,
  useApiMutation,
  useApiQuery,
} from '@/lib/data-service';
import {
  removerTokenDoLocalStorage,
  salvarTokenNoLocalStorage,
} from '@/lib/storage';
import {
  entrar,
  primeiroAcesso,
  type PrimeiroAcessoDTO,
  recuperarAcesso,
  type RecuperarAcessoDTO,
  redefinirSenha,
  type RedefinirSenhaDTO,
} from './autenticacao.api';

export interface Credenciais {
  username: string;
  password: string;
}

export interface Token {
  id: number;
  username: string;
  accessToken: string;
}

export const useEntrar = ({
  onSuccess,
  onError,
}: ApiMutationOptions<Credenciais, Token> = {}) => {
  return useApiMutation<Credenciais, Token>({
    mutationFn: async (credenciais) => {
      const response = await entrar(credenciais);
      return response.data;
    },
    invalidateQueries: () => [['usuario-autenticado']],
    onSuccess(credenciais, token) {
      salvarTokenNoLocalStorage(token);
      onSuccess?.(credenciais, token);
    },
    onError(erro, credenciais) {
      removerTokenDoLocalStorage();
      onError?.(erro, credenciais);
    },
    successMessage: 'Usuário autenticado com sucesso',
    errorMessage: 'Erro ao autenticar usuário',
  });
};

export async function obterUsuarioAutenticado(
  username: string,
): Promise<UsuarioDto> {
  const response = await getUsuarioByUsername(username);
  return response.data;
}

export const useUsuarioAutenticado = (
  username?: string,
  options?: ApiQueryOptions<UsuarioDto | null>,
) => {
  return useApiQuery({
    queryKey: ['usuario-autenticado', username],
    queryFn: () => {
      if (!username) {
        return null;
      }
      return obterUsuarioAutenticado(username);
    },
    ...options,
  });
};

export type PrimeiroAcesso = PrimeiroAcessoDTO;

export function usePrimeiroAcesso(
  options?: ApiMutationOptions<PrimeiroAcesso>,
) {
  return useApiMutation({
    mutationFn: primeiroAcesso,
    invalidateQueries: () => [['usuario-autenticado']],
    successMessage: 'Senha alterada com sucesso!',
    ...options,
  });
}

export type RecuperarAcesso = RecuperarAcessoDTO;

export function useRecuperarAcesso(
  options?: ApiMutationOptions<RecuperarAcesso>,
) {
  return useApiMutation({
    mutationFn: recuperarAcesso,
    successMessage: 'Código de recuperação enviado com sucesso!',
    errorMessage: 'Erro ao enviar código de recuperação',
    errorDescription: 'Verifique se o e-mail informado está correto.',
    ...options,
  });
}

export type RedefinirSenha = RedefinirSenhaDTO;

export function useRedefinirSenha(
  options?: ApiMutationOptions<RedefinirSenha>,
) {
  return useApiMutation({
    mutationFn: redefinirSenha,
    successMessage: 'Senha redefinida com sucesso!',
    errorMessage: 'Erro ao redefinir senha',
    errorDescription: 'Verifique se o código de recuperação está correto.',
    ...options,
  });
}
