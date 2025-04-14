import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CriarUsuario } from '@/core/components/usuario/ui/criar-usuario';

export default function Pagina() {
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
                route: `/admin/usuarios/criar`,
                label: 'Criar usuários',
              },
            ]}
          />
        </div>
        <div className="w-full">
          <CriarUsuario />
        </div>
      </div>
    </div>
  );
}
