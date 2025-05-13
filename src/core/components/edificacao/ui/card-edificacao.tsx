import { Card } from '@/components/common/card';
import { type EdificacaoDto } from '@/core/components/edificacao/edificacao.model';
import { useExcluirEdificacao } from '@/core/components/edificacao/edificacao.service';

export function CardEdificacao(props: Readonly<{ edificacao: EdificacaoDto }>) {
  const { edificacao } = props;
  const excluirEdificacao = useExcluirEdificacao();

  const pathImage = edificacao.imagens.length
    ? edificacao.imagens[0].src
    : '/sem-imagem.png';

  return (
    <Card>
      <Card.Image
        src={pathImage}
        alt={`Imagem da edificação ${edificacao.codigo}`}
        link={`/admin/edificacoes/${edificacao.codigo}/pontos`}
      />

      <Card.Content>
        <Card.Header>
          <Card.Subtitle>{edificacao.codigo}</Card.Subtitle>

          <Card.Title>{edificacao.nome}</Card.Title>

          <Card.Actions>
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
