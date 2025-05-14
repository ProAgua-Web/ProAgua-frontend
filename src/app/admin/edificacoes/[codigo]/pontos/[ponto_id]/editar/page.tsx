import { CrudLayout } from '@/components/layout/crud';
import { EditarPonto } from '@/core/components/ponto/ui/editar-ponto';

interface Props {
  params: { codigo: string; ponto_id: number };
}

export default async function Pagina({ params }: Props) {
  const { ponto_id, codigo } = await params;
  const breadcrumbs = [
    {
      label: 'Edificações',
      route: '/admin/edificacoes',
    },
    {
      label: 'Pontos de coleta',
      route: `/admin/edificacoes/${codigo}/pontos`,
    },
    {
      route: `/admin/edificacoes/${codigo}/pontos/${ponto_id}/editar`,
      label: `Editar ponto de coleta ${ponto_id}`,
    },
  ];
  return (
    <CrudLayout breadcrumbs={breadcrumbs}>
      <EditarPonto codigo={codigo} ponto_id={ponto_id} />
    </CrudLayout>
  );
}
