'use client';

import { useRouter } from 'next/navigation';
import { usePontoForm } from '../ponto.form';
import { useEditarPonto, usePonto } from '../ponto.service';
import { PontoForm } from './ponto-form';

interface Props {
  codigo: string;
  ponto_id: number;
}

export const EditarPonto: React.FC<Props> = ({
  codigo: codigo,
  ponto_id: ponto_id,
}) => {
  const ponto = usePonto(ponto_id, { gcTime: Infinity });

  const form = usePontoForm(ponto.data);

  const router = useRouter();

  const editarPonto = useEditarPonto({
    onSuccess() {
      router.push(`/admin/edificacoes/${codigo}/pontos`);
    },
    onFieldError(field, error) {
      form.setError(field, error);
    },
  });

  const handleSubmit = form.handleSubmit((ponto) => {
    editarPonto.mutate({
      id: ponto_id,
      ponto: ponto,
    });
  });

  return (
    <PontoForm
      title="Editar ponto de coleta"
      subtitle="Altere os campos abaixo para editar um ponto de coleta no sistema"
      form={form}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      isSubmitting={editarPonto.isPending}
      isLoading={ponto.isFetching}
    />
  );
};
