import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CriarPonto } from '@/core/components/ponto/ui/criar-ponto';

interface Props {
  params: { codigo: string };
}

export default async function Pagina({ params }: Props) {
  const { codigo } = await params;
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col items-center">
        <div className="flex w-fit flex-row flex-wrap items-center justify-start gap-2 self-start px-8 py-2 lg:px-4">
          <Breadcrumbs
            path={[
              {
                route: `/admin/edificacoes/${codigo}/pontos/criar`,
                label: 'Criar ponto',
              },
            ]}
          />
        </div>
        <div className="w-full">
          <CriarPonto codigo={codigo} />
        </div>
      </div>
    </div>
  );
}
