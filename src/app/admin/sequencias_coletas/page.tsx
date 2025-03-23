'use client';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { SequenciaDataTable } from './table';

export default function Pagina() {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-full flex-row flex-wrap items-center justify-start gap-2 border-slate-200 bg-white px-8 py-4 lg:px-16">
          <Breadcrumbs
            path={[
              {
                route: '/admin/sequencia_coletas',
                label: 'Sequência de coletas',
              },
              {
                route: `/admin/sequencia_coletas/criar`,
                label: 'Criar sequência de coletas',
              },
            ]}
          />
        </div>
        <div className="w-full">
          <SequenciaDataTable />
        </div>
      </div>
    </div>
  );
}
