'use client';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HiOutlinePlus } from 'react-icons/hi2';
import { ColetasTable } from './table';

interface Props {
  params: { sequencia_id: number };
}

export default function Pagina({ params }: Props) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-fit flex-row flex-wrap items-center justify-start gap-2 self-start px-8 py-2 lg:px-4">
          <Breadcrumbs
            path={[
              {
                route: '/admin/sequencias',
                label: 'Sequência de coletas',
              },
              {
                route: `/admin/sequencias/${params.sequencia_id}/coletas`,
                label: 'Coletas',
              },
            ]}
          />
        </div>
        <div className="flex w-full flex-row justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-semibold text-primary-800">
              Coletas da sequência {params.sequencia_id}
            </h1>
            <p className="text-xs text-slate-500">
              Gerencie as coletas da sequência {params.sequencia_id}
            </p>
          </div>
          <div>
            <Button variant="add" className="h-full" asChild>
              <Link
                href={`/admin/sequencias/${params.sequencia_id}/coletas/criar`}
                className="flex items-center gap-2"
              >
                <HiOutlinePlus size={20} />
                Criar coleta
              </Link>
            </Button>
          </div>
        </div>
        <div className="w-full">
          <ColetasTable sequencia_id={params.sequencia_id} />
        </div>
      </div>
    </div>
  );
}
