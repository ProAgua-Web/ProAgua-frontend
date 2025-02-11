import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { EditarEdificacao } from '@/core/components/edificacao/ui/editar-edificacao';

interface Props {
  params: { codigo: string };
}

export default function Pagina({ params }: Props) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <div className="flex w-full max-w-full shrink flex-col items-center">
        <div className="flex w-full flex-col bg-primary-500 pb-2 lg:items-center">
          <div className="flex flex-row flex-wrap items-center justify-between gap-2 px-4 lg:w-3/4 lg:px-0">
            <div className="flex flex-col pt-4 lg:pt-8">
              <Breadcrumbs
                path={[
                  { route: '/admin/edificacoes', label: 'Edificações' },
                  {
                    route: `/admin/edificacoes/${params.codigo}/editar`,
                    label: 'Editar edificação',
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="w-full pt-2 lg:w-3/4">
          <EditarEdificacao codigo={params.codigo} />
        </div>
      </div>
    </div>
  );
}
