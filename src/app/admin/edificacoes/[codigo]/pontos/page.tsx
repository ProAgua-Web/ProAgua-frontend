import { DataListLayout } from '@/components/layout/datalist';
import { Pontos } from './content';

interface Props {
  params: { codigo: string };
}

export default async function Page({ params }: Props) {
  const { codigo } = await params;

  return (
    <DataListLayout
      title="Pontos de coleta"
      subtitle="Gerencie os ponto de coleta do sistema."
      navLinks={[
        {
          label: 'Criar ponto',
          route: `/admin/edificacoes/${codigo}/pontos/criar`,
        },
        {
          label: 'Criar reservatório',
          route: `/admin/edificacoes/${codigo}/reservatorios/criar`,
        },
      ]}
      breadcrumbs={[
        {
          label: 'Pontos de coleta',
          route: `/admin/edificacoes/${codigo}/pontos`,
        },
      ]}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Pontos codigo={codigo} />
      </div>
    </DataListLayout>
  );
}
