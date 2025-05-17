import { type PontoDto } from '@/core/components/ponto/ponto.model';
import { useExcluirPonto } from '@/core/components/ponto/ponto.service';
import { cn } from '@/lib/utils';
import { Card } from '../../../../components/common/card';
import { tipoOptionsLabel } from '../../ponto/ponto.utils';

interface Props {
  ponto: PontoDto;
  isPublic?: boolean;
}

export function CardPonto(props: Readonly<Props>) {
  const { ponto, isPublic } = props;
  const tipo = ponto.tipo < 2 ? 'pontos' : 'reservatorios';
  const excluirPonto = useExcluirPonto();
  const adminBaseUrl = !isPublic ? '/admin' : '';

  const pathImage = ponto.imagens[0]?.src || '/sem-imagem.png';

  return (
    <Card>
      {pathImage && (
        <Card.Image
          src={pathImage}
          alt={`Imagem do ponto de coleta ${ponto.id}`}
          link={`/edificacoes/${ponto.edificacao.codigo}/pontos/${ponto.id}`}
        />
      )}

      <Card.Content isPublic={isPublic}>
        <Card.Header>
          <Card.Subtitle>
            {tipoOptionsLabel(ponto.tipo)}
            {ponto.tombo && ` (${ponto.tombo})`}
          </Card.Subtitle>

          <Card.Title>{ponto.localizacao}</Card.Title>

          <Card.Actions className={cn(isPublic && 'hidden')}>
            <Card.Action
              href={`${adminBaseUrl}/edificacoes/${ponto.edificacao.codigo}/${tipo}/${ponto.id}/editar`}
            >
              Editar
            </Card.Action>

            <Card.DestructiveAction
              onConfirm={() => excluirPonto.mutate(ponto.id!)}
            >
              Excluir
            </Card.DestructiveAction>
          </Card.Actions>
        </Card.Header>
      </Card.Content>
    </Card>
  );
}
