import { CrudLayout } from '@/components/layout/crud';
import { CriarColeta } from '@/core/components/coleta/ui/criar-coleta';

interface Props {
  params: Promise<{ sequencia_id: number }>;
}

export default async function Pagina({ params }: Props) {
  const { sequencia_id } = await params;
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
      route: `/admin/sequencias/${sequencia_id}/coletas/criar`,
      label: 'Criar coleta',
    },
  ];
  return (
    <CrudLayout breadcrumbs={breadcrumbs}>
      <CriarColeta id={sequencia_id} />
    </CrudLayout>
  );
}
