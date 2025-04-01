'use client';

import DataListPage from '@/components/layout/datalist';
import { EdificacaoDataTable } from './table';

export default function Pagina() {
  return (
    <DataListPage
      breadcrumbs={[
        {
          route: '/admin/edificacoes',
          label: 'Edificações',
        },
      ]}
      title="Edificações"
      subtitle="Gerencie as edificações do sistema"
      newItemButton={{
        label: 'Criar edificação',
        link: '/admin/edificacoes/criar',
      }}
    >
      <EdificacaoDataTable />
    </DataListPage>
  );
}
