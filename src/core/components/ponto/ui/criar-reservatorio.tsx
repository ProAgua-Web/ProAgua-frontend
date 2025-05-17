'use client';

import { useRouter } from 'next/navigation';
import { createImagensPonto } from '../ponto.api';
import { usePontoForm } from '../ponto.form';
import { useCriarPonto } from '../ponto.service';
import { ReservatorioForm } from './reservatorio-form';

interface Props {
  codigo: string;
}

export const CriarReservatorio: React.FC<Props> = ({ codigo: codigo }) => {
  const form = usePontoForm();

  const router = useRouter();

  const criarPonto = useCriarPonto({
    async onSuccess(schema, dto) {
      const ponto = dto.data;
      const imagens = schema.imagens;
      await createImagensPonto(ponto.id!, imagens);

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
    <ReservatorioForm
      title="Criar novo reservatório"
      subtitle="Preencha os campos abaixo para criar um reservatório no sistema"
      form={form}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      isSubmitting={criarPonto.isPending}
      isLoading={false}
      codigo={codigo}
    />
  );
};
