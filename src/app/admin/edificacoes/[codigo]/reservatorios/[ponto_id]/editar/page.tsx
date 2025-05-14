import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { EditarReservatorio } from '@/core/components/ponto/ui/editar-reservatorio';

interface Props {
  params: { codigo: string; ponto_id: number };
}

export default async function Pagina({ params }: Props) {
  const { codigo, ponto_id } = await params;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-fit flex-row flex-wrap items-center justify-start gap-2 self-start px-8 py-2 lg:px-4">
          <Breadcrumbs
            path={[
              {
                label: 'Edificações',
                route: '/admin/edificacoes',
              },
              {
                label: 'Pontos de coleta',
                route: `/admin/edificacoes/${codigo}/pontos`,
              },
              {
                route: `/admin/edificacoes/${ponto_id}/reservatorios/${ponto_id}/editar`,
                label: `Editar reservatório ${ponto_id}`,
              },
            ]}
          />
        </div>
        <div className="w-full">
          <EditarReservatorio codigo={codigo} ponto_id={ponto_id} />
        </div>
      </div>
    </div>
  );
}
