import { CrudLayout } from '@/components/layout/crud';
import { EditarSolicitacao } from '@/core/components/solicitacao/ui/editar-solicitacao';

interface Props {
  params: { id: number };
}

export default async function Pagina({ params }: Props) {
  const { id } = await params;
  const breadcrumbs = [
    {
      route: '/admin/solicitacoes',
      label: 'Solicitações',
    },
    {
      route: `/admin/solicitacoes/${id}/editar`,
      label: 'Editar solicitação',
    },
  ];
  return (
    <CrudLayout breadcrumbs={breadcrumbs}>
      <EditarSolicitacao id={id} />
    </CrudLayout>
  );
}
