'use client';

import { DataListPage } from '@/components/layout/datalist';
import { SolicitacaoDataTable } from './table';

export default function Pagina() {
  return (
    <DataListPage
      breadcrumbs={[
        {
          route: '/admin/solicitacoes',
          label: 'Solicitações',
        },
      ]}
      title="Solicitações"
      subtitle="Gerencie as solicitações do sistema"
      newItemButton={[
        {
          label: 'Criar solicitação',
          route: '/admin/solicitacoes/criar',
        },
      ]}
    >
      <SolicitacaoDataTable />
    </DataListPage>
  );
}
