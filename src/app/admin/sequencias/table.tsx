'use client';

import { DestructiveAlert } from '@/components/alert-dialog';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import {
  useExcluirSequencia,
  useSequencias,
} from '@/core/components/sequencia-coletas/sequencia.service';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import { FaRegTrashCan } from 'react-icons/fa6';
import { HiEye } from 'react-icons/hi2';
import { PiNotePencilBold } from 'react-icons/pi';

export const SequenciaDataTable = () => {
  const sequencias = useSequencias();
  const excluirSequencia = useExcluirSequencia();

  return (
    <DataTable
      isLoading={sequencias.isLoading || excluirSequencia.isPending}
      cols={[
        'Código',
        'Amostragem',
        'Ponto',
        'Status Message',
        'Última Coleta',
        'Quantidade de Coletas',
      ]}
      data={
        sequencias.data?.map((sequencia) => ({
          'id': sequencia.id?.toString() || '',
          'Código': sequencia.id?.toString() || '',
          'Amostragem': sequencia.amostragem?.toString() || '',
          'Ponto': sequencia.ponto
            ? sequencia.ponto.localizacao +
              ' - ' +
              sequencia.ponto.edificacao.codigo
            : '',
          'Status Message': sequencia.status_message || '',
          'Última Coleta': sequencia.ultima_coleta?.toString() || '',
          'Quantidade de Coletas':
            sequencia.quantidade_coletas?.toString() || '',
        })) ?? []
      }
      actions={(sequencia) => (
        <div className="flex gap-2">
          <Link href={`sequencias/${sequencia.id}/coletas`}>
            <Button variant="table-view">
              <HiEye />
            </Button>
          </Link>
          <Link href={`sequencias/${sequencia.id}/coletas/criar`}>
            <Button variant="table-add">
              <FaPlus />
            </Button>
          </Link>
          <Link href={`sequencias/${sequencia.id}/editar`}>
            <Button variant="table-edit">
              <PiNotePencilBold />
            </Button>
          </Link>
          <DestructiveAlert
            onConfirm={() => excluirSequencia.mutate(Number(sequencia.id))}
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
