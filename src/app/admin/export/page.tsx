import { DataListLayout } from '@/components/layout/datalist';
import { Filters } from './filters';
import { ExportTable } from './table';

export default async function Pagina() {
  const breadcrumbs = [
    {
      label: 'Exportar',
      route: '/admin/export',
    },
  ];
  return (
    <DataListLayout
      breadcrumbs={breadcrumbs}
      title={`Exportar`}
      subtitle={`Gerencie as coletas e exporte os dados`}
    >
      <Filters />
      <ExportTable />
    </DataListLayout>
  );
}
