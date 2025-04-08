import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CriarColeta } from '@/core/components/coleta/ui/criar-coleta';

interface Props {
  params: { sequencia_id: number };
}

export default async function Pagina({ params }: Props) {
  const { sequencia_id } = await params;
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
                route: `/admin/sequencias/${sequencia_id}/coletas/criar`,
                label: 'Criar coleta',
              },
            ]}
          />
        </div>
        <div className="w-full">
          <CriarColeta id={sequencia_id} />
        </div>
      </div>
    </div>
  );
}
