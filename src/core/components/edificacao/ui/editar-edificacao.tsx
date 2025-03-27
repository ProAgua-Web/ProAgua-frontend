'use client';

import { useRouter } from 'next/navigation';
import { useEdificacaoForm } from '../edificacao.form';
import { useEdificacao, useEditarEdificacao } from '../edificacao.service';
import { EdificacaoForm } from './edificacao-form';

interface Props {
  codigo: string;
}

export const EditarEdificacao: React.FC<Props> = ({ codigo: codigo }) => {
  const edificacao = useEdificacao(codigo, { gcTime: Infinity });

  const form = useEdificacaoForm(edificacao.data);

  const router = useRouter();

  const editarEdificacao = useEditarEdificacao({
    onSuccess() {
      router.push('/edificacoes');
    },
    onFieldError(field, error) {
      form.setError(field, error);
    },
  });

  const handleSubmit = form.handleSubmit((edificacao) => {
    editarEdificacao.mutate({
      codigo,
      edificacao,
    });
  });

  return (
    <EdificacaoForm
      title="Editar edificação"
      subtitle="Altere os campos abaixo para editar uma edificação no sistema"
      form={form}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      isSubmitting={editarEdificacao.isPending}
      isLoading={edificacao.isFetching}
    />
  );
};
