'use client';

import { DataListPage } from '@/components/layout/datalist';
import { useEdificacoes } from '@/core/components/edificacao/edificacao.service';
import { DeckEdificacoes } from '@/core/components/edificacao/ui/edificacao-wrapper';
import { usePontos } from '@/core/components/ponto/ponto.service';
import { useQueryState } from 'nuqs';
import { Filters } from './filters';

const breadcrumbs = [
  {
    label: 'Edificações e Pontos de Coleta',
    route: '/admin/pontos',
  },
];

export default function Page() {
  const [q] = useQueryState('q', { defaultValue: '' });
  const [campus] = useQueryState('campus', { defaultValue: '' });
  const { data: pontos = [] } = usePontos({ q, campus, limit: 0 });
  const { data: edificacoes = [] } = useEdificacoes({ q, campus, limit: 0 });

  return (
    <DataListPage
      title="Edificações e Pontos de Coleta"
      subtitle="Gerencie as edificações e os pontos de coleta do sistema."
      newItemButton={{
        label: 'Criar edificação',
        link: '/admin/edificacoes/criar',
      }}
      breadcrumbs={breadcrumbs}
    >
      <div className="mb-4 flex w-full flex-col gap-4">
        <Filters />
      </div>
      <DeckEdificacoes edificacoes={edificacoes} pontos={pontos} />
    </DataListPage>
  );
}
