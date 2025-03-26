import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { EditarSolicitacao } from '@/core/components/solicitacao/ui/editar-solicitacao';

interface Props {
  params: { id: number };
}

export default function Pagina({ params }: Props) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-fit flex-row flex-wrap items-center justify-start gap-2 self-start px-8 py-2 lg:px-4">
          <Breadcrumbs
            path={[
              {
                route: '/admin/solicitacoes',
                label: 'Solicitações',
              },
              {
                route: `/admin/solicitacoes/${params.id}/editar`,
                label: 'Editar solicitação',
              },
            ]}
          />
        </div>
        <div className="w-full">
          <EditarSolicitacao id={params.id} />
        </div>
      </div>
    </div>
  );
}
