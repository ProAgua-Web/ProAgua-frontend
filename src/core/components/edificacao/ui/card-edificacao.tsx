import { Card } from '@/components/common/card';
import { type EdificacaoDto } from '@/core/components/edificacao/edificacao.model';
import { useExcluirEdificacao } from '@/core/components/edificacao/edificacao.service';
import { cn } from '@/lib/utils';

interface Props {
  edificacao: EdificacaoDto;
  isPublic?: boolean;
}

export function CardEdificacao(props: Readonly<Props>) {
  const { edificacao, isPublic } = props;
  const excluirEdificacao = useExcluirEdificacao();
  const adminBaseUrl = !isPublic ? '/admin' : '';

  const pathImage = edificacao.imagens.length
    ? edificacao.imagens[0].src
    : '/sem-imagem.png';

  return (
    <Card>
      <Card.Image
        src={pathImage}
        alt={`Imagem da edificação ${edificacao.codigo}`}
        link={`${adminBaseUrl}/edificacoes/${edificacao.codigo}/pontos`}
      />

      <Card.Content isPublic={isPublic}>
        <Card.Header>
          <Card.Subtitle>{edificacao.codigo}</Card.Subtitle>

          <Card.Title>{edificacao.nome}</Card.Title>

          <Card.Actions className={cn(isPublic && 'hidden')}>
            <Card.Action
              href={`/admin/edificacoes/${edificacao.codigo}/editar`}
            >
              Editar
            </Card.Action>

            <Card.DestructiveAction
              onConfirm={() => excluirEdificacao.mutate(edificacao.codigo)}
            >
              Excluir
            </Card.DestructiveAction>
          </Card.Actions>
        </Card.Header>
      </Card.Content>
    </Card>
  );
}
