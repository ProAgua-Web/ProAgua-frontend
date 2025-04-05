'use client';

import { useToast, type ToastFn } from '@/lib/hooks/use-toast';
import {
  useMutation,
  useQuery,
  useQueryClient,
  type MutationFunction,
  type QueryKey,
  type QueryOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { type ApiErrorResponse } from './api';

type Router = ReturnType<typeof useRouter>;

export function handleAuthorizationError(router: Router, toast: ToastFn) {
  router.push('/login');
  toast({
    title: 'Sessão expirada',
    description: 'Faça login novamente para continuar.',
    variant: 'destructive',
  });
}

export function handleAuthenticationError(toast: ToastFn) {
  toast({
    title: 'Erro de autenticação',
    description: 'Nome de usuário ou senha inválidos',
    variant: 'destructive',
  });
}

export function useApiQuery<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<
    TQueryFnData,
    ApiErrorResponse | Error,
    TData,
    TQueryKey
  >,
) {
  const { toast } = useToast();
  const router = useRouter();
  const query = useQuery(options);

  useEffect(() => {
    setTimeout(() => {
      if (query.error instanceof AxiosError) {
        if (query.error.response?.status === 401) {
          handleAuthorizationError(router, toast);
        }
        if (query.error.response?.status === 401) {
          handleAuthenticationError(toast);
        }
      }
    }, 0);
  }, [query.error, router, toast]);

  return query;
}

export type ApiQueryOptions<TData = void> = Omit<
  QueryOptions<TData, ApiErrorResponse | Error>,
  'queryKey' | 'queryFn'
>;

type FieldErrorHandler = (
  field: 'root',
  error: { type: 'manual'; message: string },
) => void;

interface UseApiMutationOptions<TEntrada = void, TSaida = void> {
  mutationFn: MutationFunction<TSaida, TEntrada>;
  invalidateQueries?: (entrada: TEntrada, saida: TSaida) => QueryKey[];
  onSuccess?: (entrada: TEntrada, saida: TSaida) => void;
  onError?: (erro: ApiErrorResponse, entrada: TEntrada) => void;
  onFieldError?: FieldErrorHandler;
  successMessage?: string;
  errorMessage?: string;
  errorDescription?: string;
}

export function useApiMutation<TEntrada = void, TSaida = void>({
  mutationFn,
  onSuccess,
  onError,
  onFieldError,
  invalidateQueries,
  successMessage = 'Operação realizada com sucesso!',
  errorMessage = 'Não foi possível realizar a operação',
  errorDescription = 'Erro desconhecido. Verifique se os dados estão corretos e tente novamente.',
}: UseApiMutationOptions<TEntrada, TSaida>) {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<TSaida, ApiErrorResponse | Error, TEntrada>({
    mutationFn,
    onSuccess(saida, entrada) {
      if (successMessage) {
        toast({ title: successMessage, variant: 'success' });
      }

      invalidateQueries?.(entrada, saida).forEach((queryKey) => {
        void queryClient.invalidateQueries({ queryKey });
      });

      onSuccess?.(entrada, saida);
    },
    onError(error, entrada) {
      if (!(error instanceof AxiosError)) {
        toast({
          title: errorMessage,
          description: errorDescription,
          variant: 'destructive',
        });

        return;
      }

      if (error.response?.status === 403) {
        handleAuthorizationError(router, toast);
        return;
      }

      if (error.response?.status === 401) {
        handleAuthenticationError(toast);
        return;
      }

      if (
        error.response &&
        typeof error.response.data === 'object' &&
        'errors' in error.response.data
      ) {
        const erro = error.response.data as ApiErrorResponse;

        if (onFieldError) {
          for (const err of erro.errors) {
            if (err.field !== 'error') {
              onFieldError(err.field as 'root', {
                type: 'manual',
                message: err.message,
              });
            }
          }
        }

        toast({
          title: errorMessage,
          description: erro.errors.map((error) => error.message).join(', '),
          variant: 'destructive',
        });

        onError?.(erro, entrada);
      }
    },
  });

  return mutation;
}

export type ApiMutationOptions<TEntrada = void, TSaida = void> = Pick<
  UseApiMutationOptions<TEntrada, TSaida>,
  'onSuccess' | 'onError' | 'onFieldError'
>;
