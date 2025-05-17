import { DataListLayout } from '@/components/layout/datalist';
import { ColetasTable } from './table';

interface Props {
  params: Promise<{ sequencia_id: number }>;
}

export default async function Pagina({ params }: Props) {
  const { sequencia_id } = await params;
  return (
    <DataListLayout
      breadcrumbs={[
        {
          route: '/admin/sequencias',
          label: 'Sequência de coletas',
        },
        {
          route: `/admin/sequencias/${sequencia_id}/coletas`,
          label: 'Coletas',
        },
      ]}
      title={`Coletas da sequência ${sequencia_id}`}
      subtitle={`Gerencie as coletas da sequência ${sequencia_id}`}
      navLinks={[
        {
          label: 'Criar coleta',
          route: `/admin/sequencias/${sequencia_id}/coletas/criar`,
        },
      ]}
    >
      <ColetasTable sequencia_id={sequencia_id} />
    </DataListLayout>
  );
}
