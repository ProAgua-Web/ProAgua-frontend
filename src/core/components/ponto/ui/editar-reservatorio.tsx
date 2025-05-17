'use client';

import { useRouter } from 'next/navigation';
import { updateImagensPonto } from '../ponto.api';
import { usePontoForm } from '../ponto.form';
import { useEditarPonto, usePonto } from '../ponto.service';
import { ReservatorioForm } from './reservatorio-form';

interface Props {
  codigo: string;
  ponto_id: number;
}

export const EditarReservatorio: React.FC<Props> = ({ ponto_id, codigo }) => {
  const id = ponto_id;
  const ponto = usePonto(id, { gcTime: Infinity });

  const form = usePontoForm(ponto.data);

  const router = useRouter();

  const editarPonto = useEditarPonto({
    async onSuccess() {
      const imagensDto = ponto.data?.imagens || [];
      const imagensForm = form.getValues('imagens');

      await updateImagensPonto(id, imagensForm, imagensDto);

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
