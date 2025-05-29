import { Card } from '@/components/common/card';
import { type EdificacaoDto } from '@/core/components/edificacao/edificacao.model';
import { useExcluirEdificacao } from '@/core/components/edificacao/edificacao.service';
import { cn } from '@/lib/utils';

interface Props {
  edificacao: EdificacaoDto;
}

export function CardEdificacao(props: Readonly<Props>) {
  //const { autenticado } = useAutenticacao();
  const autenticado = false;
  console.log('autenticado', autenticado);
  const { edificacao } = props;
  const excluirEdificacao = useExcluirEdificacao();
  const isPublic = !autenticado;

  const pathImage = edificacao.imagens?.[0]?.src || '/sem-imagem.png';

  return (
    <Card>
      <Card.Image
        src={pathImage}
        alt={`Imagem da edificação ${edificacao.codigo}`}
        link={`/edificacoes/${edificacao.codigo}/pontos`}
      />

      <Card.Content isPublic={isPublic}>
        <Card.Header>
          <Card.Subtitle>{edificacao.codigo}</Card.Subtitle>

          <Card.Title>{edificacao.nome}</Card.Title>

          <Card.Actions className={cn(autenticado && 'hidden')}>
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
