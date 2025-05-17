import { CrudLayout } from '@/components/layout/crud';
import { CriarPonto } from '@/core/components/ponto/ui/criar-ponto';

interface Props {
  params: Promise<{ codigo: string }>;
}

export default async function Pagina({ params }: Props) {
  const { codigo } = await params;
  const breadcrumbs = [
    {
      label: 'Edificações',
      route: '/admin/edificacoes',
    },
    {
      label: 'Pontos de coleta',
      route: `/admin/edificacoes/${codigo}/pontos`,
    },
    {
      route: `/admin/edificacoes/${codigo}/pontos/criar`,
      label: 'Criar ponto',
    },
  ];
  return (
    <CrudLayout breadcrumbs={breadcrumbs}>
      <CriarPonto codigo={codigo} />
    </CrudLayout>
  );
}
