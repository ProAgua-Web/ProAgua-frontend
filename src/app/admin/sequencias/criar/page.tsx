import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CriarSequencia } from '@/core/components/sequencia-coletas/ui/criar-sequencia';

export default function Pagina() {
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
                route: `/admin/sequencias/criar`,
                label: 'Criar sequência de coleta',
              },
            ]}
          />
        </div>
        <div className="w-full">
          <CriarSequencia />
        </div>
      </div>
    </div>
  );
}
