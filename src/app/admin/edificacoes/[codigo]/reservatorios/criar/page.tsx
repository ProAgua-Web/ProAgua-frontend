import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CriarReservatorio } from '@/core/components/ponto/ui/criar-reservatorio';

interface Props {
  params: { codigo: string };
}

export default function Pagina({ params }: Props) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-fit flex-row flex-wrap items-center justify-start gap-2 self-start px-8 py-2 lg:px-4">
          <Breadcrumbs
            path={[
              {
                route: `/admin/edificacoes/${params.codigo}/reservatorios/criar`,
                label: 'Criar reservatório',
              },
            ]}
          />
        </div>
        <div className="w-full">
          <CriarReservatorio codigo={params.codigo} />
        </div>
      </div>
    </div>
  );
}
