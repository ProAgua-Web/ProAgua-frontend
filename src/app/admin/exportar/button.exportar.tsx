'use client';

import { Button } from '@/components/ui/button';
import { useExportarColetas } from '@/core/components/coleta/coleta.service';
import {
  buildColetaParams,
  useColetaQueryParams,
} from '@/core/components/coleta/coleta.utils';

export function ExportarButton() {
  const queryParams = useColetaQueryParams();
  const params = buildColetaParams(queryParams);
  const exportarColetas = useExportarColetas(params);

  return (
    <Button
      variant="add"
      size="wide"
      onClick={() => {
        exportarColetas.refetch();
      }}
    >
      Exportar
    </Button>
  );
}
