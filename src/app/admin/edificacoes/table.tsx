'use client';

import { DestructiveAlert } from '@/components/alert-dialog';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import {
  useEdificacoes,
  useExcluirEdificacao,
} from '@/core/components/edificacao/edificacao.service';

import Link from 'next/link';
import { FaRegTrashCan } from 'react-icons/fa6';
import { PiNotePencilBold } from 'react-icons/pi';

export const EdificacaoDataTable = () => {
  const edificacoes = useEdificacoes();
  const excluirEdificacao = useExcluirEdificacao();

  return (
    <DataTable
      isLoading={edificacoes.isLoading || excluirEdificacao.isPending}
      cols={['Código', 'Nome', 'Campus', 'Cronograma']}
      data={
        edificacoes.data?.map((edificacao) => ({
          id: edificacao.codigo,
          Código: edificacao.codigo,
          Nome: edificacao.nome || '',
          Campus: edificacao.campus,
          Cronograma: edificacao.cronograma?.toString() || '',
        })) ?? []
      }
      actions={(edificacao) => (
        <div className="flex gap-2">
          <Link href={`edificacoes/${edificacao.id}/editar`}>
            <Button variant="table-edit">
              <PiNotePencilBold />
            </Button>
          </Link>
          <DestructiveAlert
            onConfirm={() => excluirEdificacao.mutate(edificacao.id)}
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
