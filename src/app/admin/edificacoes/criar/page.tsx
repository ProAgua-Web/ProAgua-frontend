import { CrudLayout } from '@/components/layout/crud';
import { CriarEdificacao } from '@/core/components/edificacao/ui/criar-edificacao';

export default function Pagina() {
  const breadcrumbs = [
    {
      label: 'Edificações',
      route: '/admin/edificacoes',
    },
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
