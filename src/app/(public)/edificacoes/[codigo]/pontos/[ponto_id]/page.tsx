import { DataListLayout } from '@/components/layout/datalist';
import { ColetaPublica } from './content';

interface Props {
  params: { codigo: string; ponto_id: number };
}

async function Pagina({ params }: Props) {
  const { codigo, ponto_id } = await params;

  const breadcrumbs = [
    {
      label: 'Edificações',
      route: '/edificacoes',
    },
    {
      label: 'Pontos de coleta',
      route: `/edificacoes/${codigo}/pontos`,
    },
    {
      label: 'Resultado da coleta',
      route: `/edificacoes/${codigo}/pontos/${ponto_id}`,
    },
  ];

  return (
    <DataListLayout
      breadcrumbs={breadcrumbs}
      title="Resultado da coleta"
      subtitle="Acompanhe os resultados da coleta de água."
    >
      <ColetaPublica ponto_id={ponto_id} />
    </DataListLayout>
  );
}

export default Pagina;
