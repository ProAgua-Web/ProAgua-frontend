'use client';

import { DataListLayout } from '@/components/layout/datalist';
import { UsuarioDataTable } from './table';

export default function Pagina() {
  return (
    <DataListLayout
      breadcrumbs={[
        {
          route: '/admin/usuarios',
          label: 'Usuários',
        },
      ]}
      title="Usuários"
      subtitle="Gerencie os usuários do sistema"
      navLinks={[
        {
          label: 'Criar usuário',
          route: '/admin/usuarios/criar',
        },
      ]}
    >
      <UsuarioDataTable />
    </DataListLayout>
  );
}
