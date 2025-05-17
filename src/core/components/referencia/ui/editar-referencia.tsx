'use client';

import { useRouter } from 'next/navigation';
import { useReferenciaForm } from '../referencia.form';
import { useEditarReferencia, useReferencia } from '../referencia.service';
import { ReferenciaForm } from './referencia-form';

export const EditarReferencia: React.FC = () => {
  const referencia = useReferencia({ gcTime: Infinity });

  const form = useReferenciaForm(referencia?.data);

  const router = useRouter();

  const editarReferencia = useEditarReferencia({
    onSuccess() {
      router.push(`/admin/referencia`);
    },
    onFieldError(field, error) {
      form.setError(field, error);
    },
  });

  const handleSubmit = form.handleSubmit((referencia) => {
    editarReferencia.mutate({
      referencia: referencia,
    });
  });

  return (
    <ReferenciaForm
      title="Editar os parâmetros de referência"
      subtitle="Altere os campos abaixo para editar os parâmetros de referência no sistema"
      form={form}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      isSubmitting={editarReferencia.isPending}
      isLoading={referencia.isFetching}
    />
  );
};
