'use client';

import { DataListLayout } from '@/components/layout/datalist';
import { Button } from '@/components/ui/button';
import { useEdificacao } from '@/core/components/edificacao/edificacao.service';
import { EditIcon } from 'lucide-react';
import Link from 'next/link';
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
      navLinks={[
        {
          label: 'Criar ponto',
          route: `/admin/edificacoes/${codigo}/pontos/criar`,
        },
        {
          label: 'Criar reservatório',
          route: `/admin/edificacoes/${codigo}/reservatorios/criar`,
        },
      ]}
      breadcrumbs={[
        {
          label: 'Edificações',
          route: '/admin/edificacoes',
        },
        {
          label: 'Pontos de coleta',
          route: `/admin/edificacoes/${codigo}/pontos`,
        },
      ]}
      subItens={
        <Button variant={'edit'} asChild>
          <Link href={`/admin/edificacoes/${codigo}/editar`}>
            <EditIcon size={16} /> Editar
          </Link>
        </Button>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Pontos codigo={codigo} />
      </div>
    </DataListLayout>
  );
}
