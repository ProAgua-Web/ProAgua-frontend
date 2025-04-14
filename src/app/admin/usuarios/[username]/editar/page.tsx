import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { EditarUsuario } from '@/core/components/usuario/ui/editar-usuario';

interface Props {
  params: { username: string };
}

export default async function Pagina({ params }: Props) {
  const { username } = await params;
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-fit flex-row flex-wrap items-center justify-start gap-2 self-start px-8 py-2 lg:px-4">
          <Breadcrumbs
            path={[
              {
                route: '/admin/usuarios',
                label: 'Usuários',
              },
              {
                route: `/admin/usuarios/${username}/editar`,
                label: 'Editar usuário',
              },
            ]}
          />
        </div>
        <div className="w-full">
          <EditarUsuario username={username} />
        </div>
      </div>
    </div>
  );
}
