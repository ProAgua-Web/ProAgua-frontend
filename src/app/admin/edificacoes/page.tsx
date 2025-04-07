'use client';

import { DataListPage } from '@/components/layout/datalist';
import { useEdificacoes } from '@/core/components/edificacao/edificacao.service';
import { DeckEdificacoes } from '@/core/components/edificacao/ui/edificacao-wrapper';
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
      <DeckEdificacoes edificacoes={edificacoes} pontos={pontos} />
    </DataListPage>
  );
}
