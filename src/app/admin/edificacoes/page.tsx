'use client';

import { DataListLayout } from '@/components/layout/datalist';
import { useEdificacoes } from '@/core/components/edificacao/edificacao.service';
import { CardEdificacao } from '@/core/components/edificacao/ui/card-edificacao';
import { useQueryState } from 'nuqs';
import { Suspense } from 'react';
import { Filters } from './filters';

const EdificacoesContent = () => {
  const [q] = useQueryState('q', { defaultValue: '' });
  const [campus] = useQueryState('campus', { defaultValue: '' });

  const params = {
    ...(q && { q }),
    ...(campus && { campus }),
    limit: 0,
  };

  const { data: edificacoes = [] } = useEdificacoes(params);

  return (
    <>
      <div className="mb-4 flex w-full flex-col gap-4">
        <Filters />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {edificacoes.map((edificacao) => (
          <CardEdificacao key={edificacao.codigo} edificacao={edificacao} />
        ))}
      </div>
    </>
  );
};

export default function Pagina() {
  const breadcrumbs = [
    {
      label: 'Edificações',
      route: '/admin/edificacoes',
    },
  ];

  return (
    <>
      <DataListLayout
        title="Edificações e Pontos de Coleta"
        subtitle="Gerencie as edificações e os pontos de coleta do sistema."
        navLinks={[
          {
            label: 'Criar edificação',
            route: '/admin/edificacoes/criar',
          },
        ]}
        breadcrumbs={breadcrumbs}
      >
        <Suspense fallback={<div>Carregando...</div>}>
          <EdificacoesContent />
        </Suspense>
      </DataListLayout>
    </>
  );
}
