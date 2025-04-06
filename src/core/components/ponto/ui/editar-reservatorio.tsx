'use client';

import { useRouter } from 'next/navigation';
import { usePontoForm } from '../ponto.form';
import { useEditarPonto, usePonto } from '../ponto.service';
import { ReservatorioForm } from './reservatorio-form';

interface Props {
  codigo: string;
  ponto_id: number;
}

export const EditarReservatorio: React.FC<Props> = ({
  codigo: codigo,
  ponto_id: ponto_id,
}) => {
  const ponto = usePonto(ponto_id, { gcTime: Infinity });

  const form = usePontoForm(ponto.data);

  const router = useRouter();

  const editarPonto = useEditarPonto({
    onSuccess() {
      router.push(`/admin/edificacoes`);
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
    <ReservatorioForm
      title="Editar reservatório"
      subtitle="Altere os campos abaixo para editar um reservatório no sistema"
      form={form}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      isSubmitting={editarPonto.isPending}
      isLoading={ponto.isFetching}
    />
  );
};
