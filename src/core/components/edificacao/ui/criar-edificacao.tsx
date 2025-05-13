'use client';

import { useRouter } from 'next/navigation';
import { createImagensEdificacao } from '../edificacao.api';
import { useEdificacaoForm } from '../edificacao.form';
import { useCriarEdificacao } from '../edificacao.service';
import { EdificacaoForm } from './edificacao-form';

export const CriarEdificacao = () => {
  const form = useEdificacaoForm();

  const router = useRouter();

  const criarEdificacao = useCriarEdificacao({
    onSuccess() {
      const codigo = form.getValues('codigo');
      const imagens = form.getValues('imagens');

      createImagensEdificacao(codigo, imagens);

      router.push('/admin/edificacoes');
    },
    onFieldError(field, error) {
      form.setError(field, error);
    },
  });

  const handleSubmit = form.handleSubmit((form) => {
    criarEdificacao.mutate(form);
  });

  return (
    <EdificacaoForm
      title="Criar nova edificação"
      subtitle="Preencha os campos abaixo para criar uma nova edificação no sistema"
      form={form}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      isSubmitting={criarEdificacao.isPending}
      isLoading={false}
    />
  );
};
