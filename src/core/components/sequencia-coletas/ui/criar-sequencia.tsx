'use client';

import { useRouter } from 'next/navigation';
import { useSequenciaForm } from '../sequencia.form';
import { useCriarSequencia } from '../sequencia.service';
import { SequenciaForm } from './sequencia-form';

export const CriarSequencia = () => {
  const form = useSequenciaForm();

  const router = useRouter();

  const criarSequencia = useCriarSequencia({
    onSuccess() {
      router.push('/admin/sequencias');
    },
    onFieldError: form.setError,
  });

  const handleSubmit = form.handleSubmit((form) => {
    criarSequencia.mutate(form);
  });

  return (
    <SequenciaForm
      title="Criar nova sequência de coleta"
      subtitle="Preencha os campos abaixo para criar uma nova sequência de coleta no sistema"
      form={form}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      isSubmitting={criarSequencia.isPending}
      isLoading={false}
    />
  );
};
