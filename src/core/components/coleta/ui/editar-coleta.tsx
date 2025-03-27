'use client';

import { useRouter } from 'next/navigation';
import { useColetaForm } from '../coleta.form';
import { useColeta, useEditarColeta } from '../coleta.service';
import { ColetaForm } from './coleta-form';

interface Props {
  sequencia_id: number;
  coleta_id: number;
}

export const EditarColeta: React.FC<Props> = ({
  sequencia_id: sequencia_id,
  coleta_id: coleta_id,
}) => {
  const coleta = useColeta(coleta_id, { gcTime: Infinity });

  const form = useColetaForm(coleta.data);

  const router = useRouter();

  const editarColeta = useEditarColeta({
    onSuccess() {
      router.push(`/admin/sequencias/${sequencia_id}/coletas`);
    },
    onFieldError: form.setError,
  });

  const handleSubmit = form.handleSubmit((coleta) => {
    editarColeta.mutate({
      id: coleta_id,
      coleta: coleta,
    });
  });

  return (
    <ColetaForm
      title="Editar coleta"
      subtitle="Altere os campos abaixo para editar uma coleta no sistema"
      form={form}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      isSubmitting={editarColeta.isPending}
      isLoading={coleta.isFetching}
    />
  );
};
