'use client';

import { useRouter } from 'next/navigation';
import { createImagensSolicitacao } from '../solicitacao.api';
import { useSolicitacaoForm } from '../solicitacao.form';
import { useCriarSolicitacao } from '../solicitacao.service';
import { SolicitacaoForm } from './solicitacao-form';

export const CriarSolicitacao = () => {
  const form = useSolicitacaoForm();

  const router = useRouter();

  const criarSolicitacao = useCriarSolicitacao({
    async onSuccess(schema, dto) {
      const solicitacao = dto.data;
      const imagens = schema.imagens;

      await createImagensSolicitacao(solicitacao.id!, imagens);

      router.push('/admin/solicitacoes');
    },
    onFieldError(field, error) {
      form.setError(field, error);
    },
  });

  const handleSubmit = form.handleSubmit((form) => {
    criarSolicitacao.mutate(form);
  });

  return (
    <SolicitacaoForm
      title="Criar nova solicitação"
      subtitle="Preencha os campos abaixo para criar uma nova solicitação no sistema"
      form={form}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      isSubmitting={criarSolicitacao.isPending}
      isLoading={false}
    />
  );
};
