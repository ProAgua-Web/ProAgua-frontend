import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { EditarColeta } from '@/core/components/coleta/ui/editar-coleta';

interface Props {
  params: { sequencia_id: number; coleta_id: number };
}

export default function Pagina({ params }: Props) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-fit flex-row flex-wrap items-center justify-start gap-2 self-start px-8 py-2 lg:px-4">
          <Breadcrumbs
            path={[
              {
                route: '/admin/sequencias',
                label: 'Sequência de coletas',
              },
              {
                route: `/admin/sequencias/${params.sequencia_id}/coletas`,
                label: 'Coletas',
              },
              {
                route: `/admin/sequencias/${params.sequencia_id}/coletas/${params.coleta_id}/editar`,
                label: 'Editar coleta',
              },
            ]}
          />
        </div>
        <div className="w-full">
          <EditarColeta
            sequencia_id={params.sequencia_id}
            coleta_id={params.coleta_id}
          />
        </div>
      </div>
    </div>
  );
}
