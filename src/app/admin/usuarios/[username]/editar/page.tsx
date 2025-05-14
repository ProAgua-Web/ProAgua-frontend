import { CrudLayout } from '@/components/layout/crud';
import { EditarUsuario } from '@/core/components/usuario/ui/editar-usuario';

interface Props {
  params: { username: string };
}

export default async function Pagina({ params }: Props) {
  const { username } = await params;
  const breadcrumbs = [
    {
      route: '/admin/usuarios',
      label: 'Usuários',
    },
    {
      route: `/admin/usuarios/${username}/editar`,
      label: `Editar usuário ${username}`,
    },
  ];
  return (
    <CrudLayout breadcrumbs={breadcrumbs}>
      <EditarUsuario username={username} />
    </CrudLayout>
  );
}
