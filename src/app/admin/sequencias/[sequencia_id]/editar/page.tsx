import { CrudLayout } from '@/components/layout/crud';
import { EditarSequencia } from '@/core/components/sequencia-coletas/ui/editar-sequencia';

interface Props {
  params: { sequencia_id: number };
}

export default async function Pagina({ params }: Props) {
  const { sequencia_id } = await params;
  const breadcrumbs = [
    {
      route: '/admin/sequencias',
      label: 'Sequência de coletas',
    },
    {
      route: `/admin/sequencias/${sequencia_id}/editar`,
      label: `Editar sequência de coleta ${sequencia_id}`,
    },
  ];
  return (
    <CrudLayout breadcrumbs={breadcrumbs}>
      <EditarSequencia sequencia_id={sequencia_id} />
    </CrudLayout>
  );
}
