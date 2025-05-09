import { DataListLayout } from '@/components/layout/datalist';
import { ExportarButton } from './button.exportar';
import { Filters } from './filters';
import { ExportTable } from './table';

export default async function Pagina() {
  const breadcrumbs = [
    {
      label: 'Exportar',
      route: '/admin/exportar',
    },
  ];

  return (
    <DataListLayout
      breadcrumbs={breadcrumbs}
      title={`Exportar`}
      subtitle={`Gerencie as coletas e exporte os dados`}
      subItens={<ExportarButton />}
    >
      <Filters />
      <ExportTable />
    </DataListLayout>
  );
}
