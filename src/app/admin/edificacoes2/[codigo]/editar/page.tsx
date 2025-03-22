import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { EditarEdificacao } from '@/core/components/edificacao/ui/editar-edificacao';

interface Props {
  params: { codigo: string };
}

export default function Pagina({ params }: Props) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full flex-row flex-wrap items-center justify-start gap-2 border-slate-200 bg-white px-8 py-4 lg:px-16">
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
        <div className="w-full">
          <EditarEdificacao codigo={params.codigo} />
        </div>
      </div>
    </div>
  );
}
