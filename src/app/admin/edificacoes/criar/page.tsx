import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CriarEdificacao } from '@/core/components/edificacao/ui/criar-edificacao';

export default function Pagina() {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-fit flex-row flex-wrap items-center justify-start gap-2 self-start px-8 py-2 lg:px-4">
          <Breadcrumbs
            path={[
              { route: '/admin/edificacoes', label: 'Edificações' },
              {
                route: `/admin/edificacoes/criar`,
                label: 'Criar edificação',
              },
            ]}
          />
        </div>
        <div className="w-full">
          <CriarEdificacao />
        </div>
      </div>
    </div>
  );
}
