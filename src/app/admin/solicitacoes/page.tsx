'use client';

import DataListPage from '@/components/layout/paginas/datalist-layout';
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
      newItemButton={{
        label: 'Criar solicitação',
        link: '/admin/solicitacoes/criar',
      }}
    >
      <SolicitacaoDataTable />
    </DataListPage>
  );
}
