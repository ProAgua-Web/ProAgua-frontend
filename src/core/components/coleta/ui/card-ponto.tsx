import { type PontoDto } from '@/core/components/ponto/ponto.model';
import { useExcluirPonto } from '@/core/components/ponto/ponto.service';
import { TIPOS_PONTOS } from '@/utils/types';
import { Card } from '../../../../components/common/card';

export function CardPonto(props: Readonly<{ ponto: PontoDto }>) {
  const { ponto } = props;
  const tipo = ponto.tipo < 2 ? 'pontos' : 'reservatorios';
  const excluirPonto = useExcluirPonto();

  const pathImage = ponto.imagens.length
    ? ponto.imagens[0].src
    : '/sem-imagem.png';

  return (
    <Card>
      {pathImage && (
        <Card.Image
          src={pathImage}
          alt={`Imagem do ponto de coleta ${ponto.id}`}
        />
      )}

      <Card.Content>
        <Card.Header>
          <Card.Subtitle>
            {TIPOS_PONTOS[ponto.tipo]}
            {ponto.tombo && ` (${ponto.tombo})`}
          </Card.Subtitle>

          <Card.Title>{ponto.localizacao}</Card.Title>

          <Card.Actions>
            <Card.Action
              href={`/admin/edificacoes/${ponto.edificacao.codigo}/${tipo}/${ponto.id}/editar`}
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
