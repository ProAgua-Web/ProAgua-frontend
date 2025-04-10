'use client';

import { useRouter } from 'next/navigation';
import { updateImagensPonto } from '../ponto.api';
import { usePontoForm } from '../ponto.form';
import { useEditarPonto, usePonto } from '../ponto.service';
import { PontoForm } from './ponto-form';

interface Props {
  ponto_id: number;
}

export const EditarPonto: React.FC<Props> = ({ ponto_id: ponto_id }) => {
  const id = ponto_id;
  const ponto = usePonto(id, { gcTime: Infinity });

  const form = usePontoForm(ponto.data);

  const router = useRouter();

  const editarPonto = useEditarPonto({
    onSuccess() {
      const imagensDto = ponto.data?.imagens || [];
      const imagensForm = form.getValues('imagens');

      updateImagensPonto(id, imagensForm, imagensDto);

      router.push(`/admin/edificacoes`);
    },
    onFieldError(field, error) {
      form.setError(field, error);
    },
  });

  const handleSubmit = form.handleSubmit((ponto) => {
    editarPonto.mutate({
      id,
      ponto,
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
