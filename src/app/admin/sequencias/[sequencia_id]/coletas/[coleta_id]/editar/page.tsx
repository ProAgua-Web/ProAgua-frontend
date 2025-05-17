import { CrudLayout } from '@/components/layout/crud';
import { EditarColeta } from '@/core/components/coleta/ui/editar-coleta';

interface Props {
  params: Promise<{ sequencia_id: number; coleta_id: number }>;
}

export default async function Pagina({ params }: Props) {
  const { sequencia_id, coleta_id } = await params;
  const breadcrumbs = [
    {
      route: '/admin/sequencias',
      label: 'Sequência de coletas',
    },
    {
      route: `/admin/sequencias/${sequencia_id}/coletas`,
      label: 'Coletas',
    },
    {
      route: `/admin/sequencias/${sequencia_id}/coletas/${coleta_id}/editar`,
      label: `Editar coleta ${coleta_id}`,
    },
  ];

  return (
    <CrudLayout breadcrumbs={breadcrumbs}>
      <EditarColeta sequencia_id={sequencia_id} coleta_id={coleta_id} />
    </CrudLayout>
  );
}
