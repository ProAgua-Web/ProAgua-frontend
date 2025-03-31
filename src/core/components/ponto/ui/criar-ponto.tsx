'use client';

import { useRouter } from 'next/navigation';
import { usePontoForm } from '../ponto.form';
import { useCriarPonto } from '../ponto.service';
import { PontoForm } from './ponto-form';

interface Props {
  codigo: string;
}

export const CriarPonto: React.FC<Props> = ({ codigo: codigo }) => {
  const form = usePontoForm();

  const router = useRouter();

  const criarPonto = useCriarPonto({
    onSuccess() {
      router.push(`/admin/edificacoes/${codigo}/pontos`);
    },
    onFieldError(field, error) {
      form.setError(field, error);
    },
  });

  const handleSubmit = form.handleSubmit((form) => {
    criarPonto.mutate(form);
  });

  return (
    <PontoForm
      title="Criar novo ponto de coleta"
      subtitle="Preencha os campos abaixo para criar um novo ponto de coleta no sistema"
      form={form}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      isSubmitting={criarPonto.isPending}
      isLoading={false}
      codigo={codigo}
    />
  );
};
