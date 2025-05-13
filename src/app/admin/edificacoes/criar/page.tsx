import { CrudLayout } from '@/components/layout/crud';
import { CriarEdificacao } from '@/core/components/edificacao/ui/criar-edificacao';

export default function Pagina() {
  const breadcrumbs = [
    {
      route: `/admin/edificacoes/criar`,
      label: 'Criar edificação',
    },
  ];
  return (
    <CrudLayout breadcrumbs={breadcrumbs}>
      <CriarEdificacao />
    </CrudLayout>
  );
}
