'use client';

import { DataListLayout } from '@/components/layout/datalist';
import { useEdificacao } from '@/core/components/edificacao/edificacao.service';
import { useParams } from 'next/navigation';
import { Pontos } from './content';

export default function Pagina() {
  const params = useParams();
  const codigo = String(params.codigo);
  const { data: edificacao } = useEdificacao(codigo);

  return (
    <DataListLayout
      title={edificacao?.nome || 'Pontos de Coleta'}
      subtitle="Gerencie os ponto de coleta do sistema."
      breadcrumbs={[
        {
          label: 'Edificações',
          route: '/edificacoes',
        },
        {
          label: 'Pontos de coleta',
          route: `/edificacoes/${codigo}/pontos`,
        },
      ]}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Pontos codigo={codigo} />
      </div>
    </DataListLayout>
  );
}
