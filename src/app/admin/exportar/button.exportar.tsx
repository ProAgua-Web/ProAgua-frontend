'use client';

import { Button } from '@/components/ui/button';
import { useExportarColetas } from '@/core/components/coleta/coleta.service';
import {
  buildColetaParams,
  useColetaQueryParams,
} from '@/core/components/coleta/coleta.utils';
import { Suspense } from 'react';

export function ExportarButton() {
  const queryParams = useColetaQueryParams();
  const params = buildColetaParams(queryParams);
  const exportarColetas = useExportarColetas(params);

  return (
    <Suspense>
      <Button
        variant="add"
        size="wide"
        onClick={async () => {
          await exportarColetas.refetch();
        }}
      >
        Exportar
      </Button>
    </Suspense>
  );
}
