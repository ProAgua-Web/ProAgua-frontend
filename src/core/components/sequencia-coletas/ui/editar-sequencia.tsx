'use client';

import { useRouter } from 'next/navigation';
import { useSequenciaForm } from '../sequencia.form';
import { useEditarSequencia, useSequencia } from '../sequencia.service';
import { SequenciaForm } from './sequencia-form';

interface Props {
  id: number;
}

export const EditarSequencia: React.FC<Props> = ({ id: id }) => {
  const sequencia = useSequencia(id, { gcTime: Infinity });

  const form = useSequenciaForm(sequencia.data);

  const router = useRouter();

  const editarSequencia = useEditarSequencia({
    onSuccess() {
      router.push('/sequencias');
    },
    onFieldError: form.setError,
  });

  const handleSubmit = form.handleSubmit((sequencia) => {
    editarSequencia.mutate({
      id: id,
      sequencia: sequencia,
    });
  });

  return (
    <SequenciaForm
      title="Editar sequência de coleta"
      subtitle="Altere os campos abaixo para editar uma sequência de coleta no sistema"
      form={form}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      isSubmitting={editarSequencia.isPending}
      isLoading={sequencia.isFetching}
    />
  );
};
