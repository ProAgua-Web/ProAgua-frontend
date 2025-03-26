'use client';

import { DestructiveAlert } from '@/components/alert-dialog';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import {
  useExcluirSolicitacao,
  useSolicitacoes,
} from '@/core/components/solicitacao/solicitacao.service';
import {
  statusSolicitacaoLabel,
  tipoSolicitacaoLabel,
} from '@/core/components/solicitacao/solicitacao.utils';
import { formatDate } from '@/lib/utils';

import Link from 'next/link';
import { FaRegTrashCan } from 'react-icons/fa6';
import { PiNotePencilBold } from 'react-icons/pi';

export const SolicitacaoDataTable = () => {
  const solicitacoes = useSolicitacoes();
  const excluirSolicitacao = useExcluirSolicitacao();

  return (
    <DataTable
      isLoading={solicitacoes.isLoading || excluirSolicitacao.isPending}
      cols={['Código', 'Edificação', 'Tipo', 'Data', 'Status']}
      data={
        solicitacoes.data?.map((solicitacao) => ({
          id: solicitacao.id!,
          Código: solicitacao.id!.toString(),
          Edificação: solicitacao.ponto.edificacao.codigo,
          Tipo: tipoSolicitacaoLabel[solicitacao.tipo],
          Data: formatDate(solicitacao.data),
          Status: statusSolicitacaoLabel[solicitacao.status],
        })) ?? []
      }
      actions={(solicitacao) => (
        <div className="flex gap-2">
          <Link href={`solicitacoes/${solicitacao.id}/editar`}>
            <Button variant="table-edit">
              <PiNotePencilBold />
            </Button>
          </Link>
          <DestructiveAlert
            onConfirm={() => excluirSolicitacao.mutate(Number(solicitacao.id))}
          >
            <Button variant="table-delete">
              <FaRegTrashCan />
            </Button>
          </DestructiveAlert>
        </div>
      )}
    />
  );
};
