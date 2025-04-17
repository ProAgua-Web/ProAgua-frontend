'use client';

import { sair as logout } from '@/core/common/autenticacao/autenticacao.api';
import {
  type Token,
  useEntrar,
  useUsuarioAutenticado,
} from '@/core/common/autenticacao/autenticacao.service';
import { type UsuarioDto } from '@/core/components/usuario/usuario.model';
import { useToast } from '@/lib/hooks/use-toast';
import {
  removerTokenDoLocalStorage,
  tokenSalvoNoLocalStorage,
} from '@/lib/storage';
import { AxiosError } from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export interface CredenciaisDTO {
  username: string;
  password: string;
}

interface NaoAutenticado {
  token: null;
  // csrfToken: string | null;
  autenticando: false;
  usuario: null;
  autenticado: false;
}

interface Autenticando {
  token: Token | null;
  // csrfToken: string | null;
  autenticando: true;
  usuario: null;
  autenticado: false;
}

interface Autenticado {
  token: Token;
  // csrfToken: string | null;
  autenticando: false;
  usuario: UsuarioDto;
  autenticado: true;
}

type Sessao = NaoAutenticado | Autenticando | Autenticado;

type ContextoDeAutenticacao = Sessao & {
  entrar: ReturnType<typeof useEntrar>;
  sair: () => void;
};

const AutenticacaoContext = createContext<ContextoDeAutenticacao>({
  autenticando: false,
  autenticado: false,
  usuario: null,
  token: null,
  // csrfToken: null,
  entrar: (() => {}) as unknown as ReturnType<typeof useEntrar>,
  sair: () => {},
});

export const AutenticacaoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState(tokenSalvoNoLocalStorage());
  // const [csrfToken, setCSRFToken] = useState(csrfTokenSalvoNoLocalStorage());

  const router = useRouter();

  const entrar = useEntrar({
    onSuccess(_, token) {
      setToken(token);
    },
    onError() {
      setToken(null);
    },
  });

  const sair = useCallback(() => {
    logout();
    removerTokenDoLocalStorage();
    setToken(null);
    router.push('/');
  }, [setToken, router]);

  const usuarioAutenticado = useUsuarioAutenticado(token?.username);

  const { toast } = useToast();
  const pathname = usePathname();

  // useEffect(() => {
  //   if (
  //     !usuarioAutenticado.isFetching &&
  //     usuarioAutenticado.data?.alterarSenha &&
  //     pathname !== '/primeiro-acesso'
  //   ) {
  //     router.push('/primeiro-acesso');
  //     toast({
  //       title: 'Primeiro acesso',
  //       description: 'Você precisa alterar sua senha para continuar.',
  //       variant: 'warning',
  //     });
  //   }
  // }, [
  //   pathname,
  //   usuarioAutenticado.isFetching,
  //   usuarioAutenticado.data,
  //   router,
  //   toast,
  // ]);

  // Executa somente uma vez, quando a aplicação é iniciada
  // Recupera a autenticação a partir do localStorage
  useEffect(() => {
    async function recuperarAutenticacao() {
      try {
        const tokenSalvo = tokenSalvoNoLocalStorage();
        // const csrfTokenSalvo = csrfTokenSalvoNoLocalStorage();
        // const csrfToken = csrfTokenSalvo || (await getCsrftoken()).csrfToken;
        // salvarCSRFTokenNoLocalStorage(csrfToken);

        if (!tokenSalvo) {
          return;
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast({
            title: 'Sessão expirada',
            description: 'Faça login novamente para continuar.',
            variant: 'destructive',
          });

          removerTokenDoLocalStorage();
          setToken(null);
        } else {
          toast({
            title: 'Erro ao recuperar dados de sessão',
            description: 'Verifique sua conexão e tente novamente.',
            variant: 'destructive',
          });
        }

        router.push('/login');
      }
    }

    void recuperarAutenticacao();
  }, [router, toast]);

  useEffect(() => {
    const usuario = usuarioAutenticado.data;
    if (!usuario) {
      return;
    }
  }, [usuarioAutenticado.data]);

  const contexto: ContextoDeAutenticacao = useMemo(() => {
    const funcoes = { entrar, sair };
    const usuario = usuarioAutenticado.data;

    if (!token || !usuario) {
      return {
        token: null,
        // csrfToken: null,
        autenticando: entrar.isPending,
        usuario: null,
        autenticado: false,
        ...funcoes,
      };
    }

    return {
      token,
      // csrfToken,
      autenticando: false,
      usuario,
      autenticado: true,
      ...funcoes,
    };
  }, [
    entrar,
    sair,
    token,
    // csrfToken,
    usuarioAutenticado.data,
    usuarioAutenticado.isPending,
  ]);

  return (
    <AutenticacaoContext.Provider value={contexto}>
      {children}
    </AutenticacaoContext.Provider>
  );
};

export const useAutenticacao = () => {
  return useContext(AutenticacaoContext);
};
