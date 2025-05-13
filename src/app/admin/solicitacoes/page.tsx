'use client';

import { DataListLayout } from '@/components/layout/datalist';
import { SolicitacaoDataTable } from './table';

export default function Pagina() {
  return (
    <DataListLayout
      breadcrumbs={[
        {
          route: '/admin/solicitacoes',
          label: 'Solicitações',
        },
      ]}
      title="Solicitações"
      subtitle="Gerencie as solicitações do sistema"
      navLinks={[
        {
          label: 'Criar solicitação',
          route: '/admin/solicitacoes/criar',
        },
      ]}
    >
      <SolicitacaoDataTable />
    </DataListLayout>
  );
}
