import { CrudLayout } from '@/components/layout/crud';
import { EditarEdificacao } from '@/core/components/edificacao/ui/editar-edificacao';

interface Props {
  params: { codigo: string };
}

export default async function Pagina({ params }: Props) {
  const { codigo } = await params;
  const breadcrumbs = [
    {
      route: `/admin/edificacoes/${codigo}/editar`,
      label: 'Editar edificação',
    },
  ];

  return (
    <CrudLayout breadcrumbs={breadcrumbs}>
      <EditarEdificacao codigo={codigo} />
    </CrudLayout>
  );
}
