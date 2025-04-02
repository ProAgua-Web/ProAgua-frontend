'use client';
import { DataListPage } from '@/components/layout/datalist';
import { ColetasTable } from './table';

interface Props {
  params: { sequencia_id: number };
}

export default function Pagina({ params }: Props) {
  return (
    <DataListPage
      breadcrumbs={[
        {
          route: '/admin/sequencias',
          label: 'Sequência de coletas',
        },
        {
          route: `/admin/sequencias/${params.sequencia_id}/coletas`,
          label: 'Coletas',
        },
      ]}
      title={`Coletas da sequência ${params.sequencia_id}`}
      subtitle={`Gerencie as coletas da sequência ${params.sequencia_id}`}
      newItemButton={{
        label: 'Criar coleta',
        link: `/admin/sequencias/${params.sequencia_id}/coletas/criar`,
      }}
    >
      <ColetasTable sequencia_id={params.sequencia_id} />
    </DataListPage>
  );
}
