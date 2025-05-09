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
      className="h-full w-full lg:w-fit"
      onClick={() => {
        exportarColetas.refetch();
      }}
    >
      Exportar
    </Button>
  );
}
