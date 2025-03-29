'use client';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HiOutlinePlus } from 'react-icons/hi2';
import { SolicitacaoDataTable } from './table';

export default function Pagina() {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-fit flex-row flex-wrap items-center justify-start gap-2 self-start px-8 py-2 lg:px-4">
          <Breadcrumbs
            path={[
              {
                route: '/admin/solicitacoes',
                label: 'Solicitações',
              },
            ]}
          />
        </div>
        <div className="flex w-full flex-row justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-semibold text-primary-800">
              Solicitações
            </h1>
            <p className="text-xs text-slate-500">
              Gerencie as solicitações do sistema
            </p>
          </div>
          <div>
            <Link href="/admin/solicitacoes/criar">
              <Button variant="add" className="h-full" asChild>
                <HiOutlinePlus size={20} />
                Criar solicitação
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full">
          <SolicitacaoDataTable />
        </div>
      </div>
    </div>
  );
}
