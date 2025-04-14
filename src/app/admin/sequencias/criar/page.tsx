import { CrudLayout } from '@/components/layout/crud';
import { CriarSequencia } from '@/core/components/sequencia-coletas/ui/criar-sequencia';

export default function Pagina() {
  const breadcrumbs = [
    {
      route: '/admin/sequencias',
      label: 'Sequência de coletas',
    },
    {
      route: `/admin/sequencias/criar`,
      label: 'Criar sequência de coleta',
    },
  ];
  return (
    <CrudLayout breadcrumbs={breadcrumbs}>
      <CriarSequencia />
    </CrudLayout>
  );
}
