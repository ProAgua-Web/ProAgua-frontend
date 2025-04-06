import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { EditarPonto } from '@/core/components/ponto/ui/editar-ponto';

interface Props {
  params: { codigo: string; ponto_id: number };
}

export default function Pagina({ params }: Props) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-fit flex-row flex-wrap items-center justify-start gap-2 self-start px-8 py-2 lg:px-4">
          <Breadcrumbs
            path={[
              {
                route: `/admin/edificacoes/${params.ponto_id}/pontos/${params.ponto_id}/editar`,
                label: 'Editar ponto de coleta',
              },
            ]}
          />
        </div>
        <div className="w-full">
          <EditarPonto codigo={params.codigo} ponto_id={params.ponto_id} />
        </div>
      </div>
    </div>
  );
}
