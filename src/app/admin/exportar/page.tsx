import { DataListLayout } from '@/components/layout/datalist';
import { Suspense } from 'react';
import { ExportarButton } from './button.exportar';
import { Filters } from './filters';
import { ExportTable } from './table';

export default function Pagina() {
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
      subItens={
        <Suspense>
          <ExportarButton />
        </Suspense>
      }
    >
      <Suspense>
        <Filters />
        <ExportTable />
      </Suspense>
    </DataListLayout>
  );
}
