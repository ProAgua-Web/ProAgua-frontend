import { CrudLayout } from '@/components/layout/crud';
import { CriarUsuario } from '@/core/components/usuario/ui/criar-usuario';

export default function Pagina() {
  const breadcrumbs = [
    {
      route: '/admin/usuarios',
      label: 'Usuários',
    },
    {
      route: `/admin/usuarios/criar`,
      label: 'Criar usuários',
    },
  ];
  return (
    <CrudLayout breadcrumbs={breadcrumbs}>
      <CriarUsuario />
    </CrudLayout>
  );
}
