import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { EditarSequencia } from '@/core/components/sequencia-coletas/ui/editar-sequencia';

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
                route: '/admin/sequencias',
                label: 'Sequência de coletas',
              },
              {
                route: `/admin/sequencias/${params.id}/editar`,
                label: 'Editar sequência de coleta',
              },
            ]}
          />
        </div>
        <div className="w-full">
          <EditarSequencia id={params.id} />
        </div>
      </div>
    </div>
  );
}
