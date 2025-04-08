import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { EditarColeta } from '@/core/components/coleta/ui/editar-coleta';

interface Props {
  params: { sequencia_id: number; coleta_id: number };
}

export default async function Pagina({ params }: Props) {
  const { sequencia_id, coleta_id } = await params;
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
                route: `/admin/sequencias/${sequencia_id}/coletas`,
                label: 'Coletas',
              },
              {
                route: `/admin/sequencias/${sequencia_id}/coletas/${coleta_id}/editar`,
                label: 'Editar coleta',
              },
            ]}
          />
        </div>
        <div className="w-full">
          <EditarColeta sequencia_id={sequencia_id} coleta_id={coleta_id} />
        </div>
      </div>
    </div>
  );
}
