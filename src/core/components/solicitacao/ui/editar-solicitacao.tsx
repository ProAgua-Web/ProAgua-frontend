'use client';

import { useRouter } from 'next/navigation';
import { useSolicitacaoForm } from '../solicitacao.form';
import { useEditarSolicitacao, useSolicitacao } from '../solicitacao.service';
import { SolicitacaoForm } from './solicitacao-form';

interface Props {
  id: number;
}

export const EditarSolicitacao: React.FC<Props> = ({ id: id }) => {
  const solicitacao = useSolicitacao(id, { gcTime: Infinity });

  const form = useSolicitacaoForm(solicitacao.data);

  const router = useRouter();

  const editarSolicitacao = useEditarSolicitacao({
    onSuccess() {
      router.push('/admin/solicitacoes');
    },
    onFieldError(field, error) {
      form.setError(field, error);
    },
  });

  const handleSubmit = form.handleSubmit((solicitacao) => {
    editarSolicitacao.mutate({
      id: id,
      solicitacao: solicitacao,
    });
  });

  return (
    <SolicitacaoForm
      title="Editar solicitação"
      subtitle="Altere os campos abaixo para editar uma solicitação no sistema"
      form={form}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      isSubmitting={editarSolicitacao.isPending}
      isLoading={solicitacao.isFetching}
    />
  );
};
