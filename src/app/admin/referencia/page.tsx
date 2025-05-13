import { CrudLayout } from '@/components/layout/crud';
import { EditarReferencia } from '@/core/components/referencia/ui/editar-referencia';

export default function Pagina() {
  const breadcrumbs = [
    {
      label: 'Parâmetros de referencia',
      route: '/admin/referencia',
    },
  ];
  return (
    <>
      <CrudLayout breadcrumbs={breadcrumbs}>
        <EditarReferencia />
      </CrudLayout>
    </>
  );
}
