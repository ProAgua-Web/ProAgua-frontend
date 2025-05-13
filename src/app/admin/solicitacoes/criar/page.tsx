import { CrudLayout } from '@/components/layout/crud';
import { CriarSolicitacao } from '@/core/components/solicitacao/ui/criar-solicitacao';

export default function Pagina() {
  const breadcrumbs = [
    {
      route: '/admin/solicitacoes',
      label: 'Solicitações',
    },
    {
      route: `/admin/solicitacoes/criar`,
      label: 'Criar solicitações',
    },
  ];
  return (
    <CrudLayout breadcrumbs={breadcrumbs}>
      <CriarSolicitacao />
    </CrudLayout>
  );
}
