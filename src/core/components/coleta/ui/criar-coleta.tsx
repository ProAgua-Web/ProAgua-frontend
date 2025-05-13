'use client';

import { useRouter } from 'next/navigation';
import { useColetaForm } from '../coleta.form';
import { useCriarColeta } from '../coleta.service';
import { ColetaForm } from './coleta-form';

interface Props {
  id: number;
}

export const CriarColeta: React.FC<Props> = ({ id: id }) => {
  const form = useColetaForm();

  const router = useRouter();

  const criarColeta = useCriarColeta({
    onSuccess() {
      router.push(`/admin/sequencias/${id}/coletas`);
    },
    onFieldError(field, error) {
      form.setError(field, error);
    },
  });

  const handleSubmit = form.handleSubmit((form) => {
    criarColeta.mutate(form);
  });

  return (
    <ColetaForm
      title="Criar nova coleta"
      subtitle="Preencha os campos abaixo para criar uma nova coleta no sistema"
      form={form}
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      isSubmitting={criarColeta.isPending}
      isLoading={false}
      sequencia_id={id}
    />
  );
};
