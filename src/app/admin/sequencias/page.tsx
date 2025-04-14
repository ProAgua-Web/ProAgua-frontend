'use client';

import { DataListLayout } from '@/components/layout/datalist';
import { SequenciaDataTable } from './table';

export default function Pagina() {
  return (
    <DataListLayout
      breadcrumbs={[
        {
          route: '/admin/sequencias',
          label: 'Sequência de coletas',
        },
      ]}
      title="Sequência de coletas"
      subtitle="Gerencie as sequências de coletas do sistema"
      newItemButton={[
        {
          label: 'Criar sequência',
          route: '/admin/sequencias/criar',
        },
      ]}
    >
      <SequenciaDataTable />
    </DataListLayout>
  );
}
