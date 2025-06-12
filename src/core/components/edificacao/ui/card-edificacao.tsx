import { Card } from '@/components/common/card';
import { type EdificacaoDto } from '@/core/components/edificacao/edificacao.model';
import { useExcluirEdificacao } from '@/core/components/edificacao/edificacao.service';
import { useAutenticacao } from '@/lib/autenticacao';
import { cn } from '@/lib/utils';

interface Props {
  edificacao: EdificacaoDto;
}

export function CardEdificacao(props: Readonly<Props>) {
  const { autenticado } = useAutenticacao();
  const { edificacao } = props;
  const excluirEdificacao = useExcluirEdificacao();
  const isPublic = !autenticado;

  const adminBaseUrl = !isPublic ? '/admin' : '';

  const pathImage = edificacao.imagens?.[0]?.src || '/sem-imagem.png';

  return (
    <Card>
      <Card.Image
        src={pathImage}
        alt={`Imagem da edificação ${edificacao.codigo}`}
        link={autenticado ?
          `${adminBaseUrl}/edificacoes/${edificacao.codigo}/pontos` :
          `/edificacoes/${edificacao.codigo}/pontos`}
      />

      <Card.Content isPublic={isPublic}>
        <Card.Header>
          <Card.Subtitle>{edificacao.codigo}</Card.Subtitle>

          <Card.Title>{edificacao.nome}</Card.Title>

          <Card.Actions className={cn(!autenticado && 'hidden')}>
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