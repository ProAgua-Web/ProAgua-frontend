'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useExportarSolicitacao } from '../solicitacao.service';

export function ExportarButton(id: number) {
  const exportarSolicitacao = useExportarSolicitacao(id);

  return (
    <Button
      variant="add"
      className={cn('h-full w-full lg:w-fit', !id && 'hidden')}
      size="wide"
      onClick={async () => {
        await exportarSolicitacao.refetch();
      }}
    >
      Exportar
    </Button>
  );
}
