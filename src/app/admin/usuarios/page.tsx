'use client';

import { DataListPage } from '@/components/layout/datalist';
import { UsuarioDataTable } from './table';

export default function Pagina() {
  return (
    <DataListPage
      breadcrumbs={[
        {
          route: '/admin/usuarios',
          label: 'Usuários',
        },
      ]}
      title="Usuários"
      subtitle="Gerencie os usuários do sistema"
      newItemButton={[
        {
          label: 'Criar usuário',
          route: '/admin/usuarios/criar',
        },
      ]}
    >
      <UsuarioDataTable />
    </DataListPage>
  );
}
