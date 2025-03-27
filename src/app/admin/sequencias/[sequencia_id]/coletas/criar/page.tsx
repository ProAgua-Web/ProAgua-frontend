import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CriarColeta } from '@/core/components/coleta/ui/criar-coleta';

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
                route: `/admin/sequencias/${params.id}/coletas/criar`,
                label: 'Criar coleta',
              },
            ]}
          />
        </div>
        <div className="w-full">
          <CriarColeta id={params.id} />
        </div>
      </div>
    </div>
  );
}
