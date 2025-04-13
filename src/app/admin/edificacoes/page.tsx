'use client';

import { DataListPage } from '@/components/layout/datalist';
import { useEdificacoes } from '@/core/components/edificacao/edificacao.service';
import { CardEdificacao } from '@/core/components/edificacao/ui/card-edificacao';
import { usePontos } from '@/core/components/ponto/ponto.service';
import { useQueryState } from 'nuqs';
import { Filters } from './filters';

export default function Page() {
  const [q] = useQueryState('q', { defaultValue: '' });
  const [campus] = useQueryState('campus', { defaultValue: '' });

  const params = {
    ...(q && { q }),
    ...(campus && { campus }),
    limit: 0,
  };
  const { data: pontos = [] } = usePontos(params);

  const { data: edificacoes = [] } = useEdificacoes(params);

  return (
    <DataListPage
      title="Edificações e Pontos de Coleta"
      subtitle="Gerencie as edificações e os pontos de coleta do sistema."
      newItemButton={{
        label: 'Criar edificação',
        link: '/admin/edificacoes/criar',
      }}
      breadcrumbs={[]}
    >
      <div className="mb-4 flex w-full flex-col gap-4">
        <Filters />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {edificacoes.map((edificacao) => (
          <CardEdificacao key={edificacao.codigo} edificacao={edificacao} />
        ))}
      </div>
    </DataListPage>
  );
}
